package com.springboot.app.accounts.controller;

import com.springboot.app.accounts.dto.request.LoginRequest;
import com.springboot.app.accounts.dto.request.SignupRequest;
import com.springboot.app.accounts.dto.response.JwtResponse;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.accounts.entity.Role;
import com.springboot.app.accounts.enumeration.RoleName;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.repository.RoleRepository;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.security.jwt.JwtUtils;
import com.springboot.app.security.userprinal.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		// authenticate the user by using the AuthenticationManager
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		// set the user authentication in the SecurityContext object to authenticate the user in the application
		// and allow access to the resources
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		// get the UserDetailsImpl object from the authentication object
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		// get the roles of the user and collect them in a set of strings separated by commas between them
		// and return the response
		Set<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority()) // get the role name from the authority object and return it as a string value
				.collect(Collectors.toSet());

		return ResponseEntity.ok(new JwtResponse(jwt,
				userDetails.getId(),
				userDetails.getUsername(),
				userDetails.getEmail(),
				roles));
	}

	/**
	 * This method will register a new user in the application
	 * and return a success message if the user is registered successfully.
	 * @param signUpRequest
	 * @return
	 */
	@PostMapping("/signup")
	public ResponseEntity<ObjectResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		// check if the username is already taken or if the email is already in use
		// and return an error message if true then return an error message
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new ObjectResponse("failed","Error: Username is already taken!",null));
		}
		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new ObjectResponse("failed","Error: Email is already in use!",null));
		}

		// Create new user's account
		User user = new User(
				signUpRequest.getUsername(),
				signUpRequest.getEmail(),
				encoder.encode(signUpRequest.getPassword())); // encode the password before saving it in the database

		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			// if the user does not specify the role, then assign the user role by default
			Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			// if the user specifies the role, then assign the role to the user
			strRoles.forEach(role -> {
				switch (role) {
					case "admin":
						Role adminRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(adminRole);
						break;
					case "mod":
						Role modRole = roleRepository.findByName(RoleName.ROLE_MODERATOR)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(modRole);
						break;
					default:
						Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
								.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
						roles.add(userRole);
				}
			});
		}
		// set the roles of the user and save the user in the database and return a success message
		user.setRoles(roles);
		userRepository.save(user);
		return ResponseEntity.ok(new ObjectResponse("success","User registered successfully!",user));
	}



}

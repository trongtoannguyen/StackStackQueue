package com.springboot.app.accounts.controller;

import com.springboot.app.accounts.enumeration.AuthProvider;
import com.springboot.app.accounts.service.UserService;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.MessageResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.security.dto.CurrentUser;
import com.springboot.app.security.dto.request.LoginRequest;
import com.springboot.app.security.dto.request.PasswordResetRequest;
import com.springboot.app.security.dto.request.SignupRequest;
import com.springboot.app.security.dto.response.JwtResponse;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.accounts.entity.Role;
import com.springboot.app.accounts.enumeration.RoleName;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.repository.RoleRepository;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.security.entity.RefreshToken;
import com.springboot.app.security.exception.ResourceNotFoundException;
import com.springboot.app.security.exception.TokenRefreshException;
import com.springboot.app.security.jwt.JwtUtils;
import com.springboot.app.security.service.RefreshTokenService;
import com.springboot.app.security.userprinal.UserDetailsImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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

	@Autowired
	RefreshTokenService refreshTokenService;

	@Autowired
	private UserService userService;

	/**
	 * This method will register a new user in the application
	 * and return a success message if the user is registered successfully.
	 * @param signUpRequest
	 * @return
	 */
	@PostMapping("/signup")
	public ResponseEntity<ObjectResponse> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		ServiceResponse<User> response = userService.createNewUser(signUpRequest);
		if (response.getAckCode() != AckCodeType.SUCCESS) {
			String errorMessage = String.join(", ", response.getMessages());
			return ResponseEntity.badRequest().body(new ObjectResponse("400","User not created. "+errorMessage,null));
		}
		return ResponseEntity.ok(new ObjectResponse("201","User created",response.getDataObject()));
	}


	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

		Set<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toSet());

		ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

		RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());
		ResponseCookie jwtRefreshCookie = jwtUtils.generateRefreshJwtCookie(refreshToken.getToken());
		String avatar = refreshToken.getUser().getAvatar();
		String imageUrl = refreshToken.getUser().getImageUrl();
		String name = refreshToken.getUser().getName();

		return ResponseEntity.ok()
//                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
				.header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
				.body(new JwtResponse(
						jwtCookie.getValue(),
						userDetails.getId(),
						userDetails.getUsername(),
						userDetails.getEmail(),
						roles,
						avatar,
						imageUrl,
						name
				));
	}


	@PostMapping("/signout")
	public ResponseEntity<?> logoutUser() {
		Object principle = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if (!principle.toString().equals("anonymousUser")) {
			Long userId = ((UserDetailsImpl) principle).getId();
			refreshTokenService.deleteByUserId(userId);
		}
		ResponseCookie jwtCookie = jwtUtils.getCleanJwtCookie();
		ResponseCookie jwtRefreshCookie = jwtUtils.getCleanJwtRefreshCookie();

		return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
				.header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
				.body(new MessageResponse("You've been signed out!"));
	}

	@PostMapping("/refreshtoken")
	public ResponseEntity<?> refreshtoken(HttpServletRequest request) {
		String refreshToken = jwtUtils.getJwtRefreshFromCookies(request);

		if ((refreshToken != null) && (!refreshToken.isEmpty())) {
			return refreshTokenService.findByToken(refreshToken)
					.map(refreshTokenService::verifyExpiration)
					.map(RefreshToken::getUser)
					.map(user -> {
						ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(user);

						return ResponseEntity.ok()
								.header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
								.body(new MessageResponse("Token is refreshed successfully!"));
					})
					.orElseThrow(() -> new TokenRefreshException(refreshToken,
							"Refresh token is not in database!"));
		}

		return ResponseEntity.badRequest().body(new ObjectResponse("400","Refresh Token is empty!",null));
	}


	@GetMapping("/user/me")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getCurrentUser(@CurrentUser UserDetailsImpl userDetails) {

		Set<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toSet());

		ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);

		RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());
		ResponseCookie jwtRefreshCookie = jwtUtils.generateRefreshJwtCookie(refreshToken.getToken());
		String avatar = refreshToken.getUser().getAvatar();
		String imageUrl = refreshToken.getUser().getImageUrl();
		String name = refreshToken.getUser().getName();

		return ResponseEntity.ok()
				.header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
				.body(new JwtResponse(
						jwtCookie.getValue(),
						userDetails.getId(),
						userDetails.getUsername(),
						userDetails.getEmail(),
						roles,
						avatar,
						imageUrl,
						name
				));
	}
}

package com.springboot.app.security.jwt;


import com.springboot.app.security.userprinal.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

public class AuthTokenFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private UserDetailsServiceImpl userDetailsService;
	private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

	/**
	 * This method will be triggered for every incoming request
	 * and it will check if the request has a valid JWT token.
	 * @param request
	 * @param response
	 * @param filterChain
	 * @throws ServletException
	 * @throws IOException
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			// get jwt from request header if it exists
			// and is valid then set the user authentication in the SecurityContext object to authenticate the user in the application and allow access to the resources
			String jwt = parseJwt(request);
			if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
				String username = jwtUtils.getUserNameFromJwtToken(jwt);

				UserDetails userDetails = userDetailsService.loadUserByUsername(username);
				// create an authentication object and set the user authentication in the SecurityContext object
				// to authenticate the user in the application
				// and allow access to the resources associated with the user roles and authorities
				UsernamePasswordAuthenticationToken authentication =
						new UsernamePasswordAuthenticationToken(
								userDetails,
								null,
								userDetails.getAuthorities());
				// set the details of the user authentication in the SecurityContext object to authenticate the user in the application
				// and allow access to the resources associated with the user roles and authorities and return the response to the client
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				// set the user authentication in the SecurityContext object to authenticate the user in the application
				// and allow access to the resources associated with the user roles and authorities and return the response to the client
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch (Exception e) {
			logger.error("Cannot set user authentication: {}", e);
		}
		filterChain.doFilter(request, response);
	}

	/**
	 * This method will parse the JWT token from the Authorization header of the request.
	 * @param request
	 * @return
	 */
	private String parseJwt(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");
		if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7); // remove "Bearer " from the Authorization header
		}
		return null;
	}
}

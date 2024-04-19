package com.springboot.app.security.service;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.security.entity.RefreshToken;
import com.springboot.app.security.exception.TokenRefreshException;
import com.springboot.app.security.repository.RefreshTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
	@Value("${springboot.app.jwtRefreshExpirationMs}")
	private Long refreshTokenDurationMs;

	@Autowired
	private RefreshTokenRepository refreshTokenRepository;

	@Autowired
	private UserRepository userRepository;

	public Optional<RefreshToken> findByToken(String token) {
		return refreshTokenRepository.findByToken(token);
	}

	public RefreshToken createRefreshToken(Long userId) {
		User user = userRepository.findById(userId).get();

		RefreshToken refreshToken = refreshTokenRepository.findByUser(user)
				.orElse(new RefreshToken());

		refreshToken.setUser(user);
		refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
		refreshToken.setToken(UUID.randomUUID().toString());
		refreshToken.setAvailable(true);

		refreshToken = refreshTokenRepository.save(refreshToken);
		return refreshToken;
	}

	public RefreshToken verifyExpiration(RefreshToken token) {
		if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
			refreshTokenRepository.delete(token);
			throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
		}

		return token;
	}

	@Transactional
	public int deleteByUserId(Long userId) {
		return refreshTokenRepository.deleteByUser(userRepository.findById(userId).get());
	}
}

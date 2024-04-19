package com.springboot.app.accounts.service.impl;

import com.springboot.app.accounts.entity.PasswordReset;
import com.springboot.app.accounts.repository.PasswordResetRepository;
import com.springboot.app.accounts.service.PasswordResetService;
import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.repository.UserDAO;
import com.springboot.app.search.QuerySpec;
import com.springboot.app.utils.JSFUtils;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionInterceptor;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Service
public class PasswordResetServiceImpl implements PasswordResetService{

	private static final Logger logger = LoggerFactory.getLogger(PasswordResetServiceImpl.class);

	private final PasswordResetRepository passwordResetRepository;

	private final UserDAO userDAO;
	@Autowired
	public PasswordResetServiceImpl(UserDAO userDAO, PasswordResetRepository passwordResetRepository) {
		this.userDAO = userDAO;
		this.passwordResetRepository = passwordResetRepository;
	}

	private static final String applicationName = "Tech Forum";

	public ServiceResponse<Void> sendPasswordResetEmail(String email) {
		ServiceResponse<Void> response = new ServiceResponse<>();

		// check if passwordReset already exists for the given email
		if(passwordResetExists(email)) {
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessage("password.reset.exists");
		}
		else if(userDAO.isEmailExists(email)) {
			PasswordReset passwordReset = new PasswordReset();
			passwordReset.setEmail(email);
			passwordReset.setResetKey(UUID.randomUUID().toString());

			// save passwordReset
			passwordResetRepository.save(passwordReset);

			try{
				emailPasswordReset(passwordReset);
			}
			catch(Exception e) {
				logger.error("Error sending password reset email", e);
				response.setAckCode(AckCodeType.FAILURE);
				response.addMessage("password.reset.email.error");
				TransactionInterceptor.currentTransactionStatus().setRollbackOnly();
				return response;
			}
			response.setAckCode(AckCodeType.SUCCESS);
			response.addMessage("password.reset.email.sent");
		}
		else {
			response.setAckCode(AckCodeType.FAILURE);
			response.addMessage("email.not.found");
		}
		return response;
	}

	/**
	 * Helper method to check if a password reset request already exists for the given email
	 * @param email
	 * @return
	 */

	public boolean passwordResetExists(String email) {
		return passwordResetRepository.countEntities(email).longValue() > 0;
	}

	/**
	 * Helper method to send password reset email
	 * @param passwordReset
	 */

	public void emailPasswordReset(PasswordReset passwordReset) throws Exception {
	}


	/*
	 * replace the following patterns: #username, #email, and #confirm-url with values from registration and system
	 */
	public String buildPasswordResetEmailContent(String emailTemplate, PasswordReset passwordReset) {
		emailTemplate.replaceAll("#username", userDAO.getUsernameForEmail(passwordReset.getEmail()))
				.replaceAll("#email", passwordReset.getEmail())
				.replaceAll("#reset-url",
						"<a href=\""
								+ JSFUtils.getBaseURL() + "reset-password?key=" + passwordReset.getResetKey()
								+ "\">" + this.applicationName + "</a>");
		return emailTemplate;
	}


	@Value("${Scheduled.cleanPasswordReset.timePassed.minutes}")
	private int timePassedMinutes;

	@Scheduled(fixedRateString = "${Scheduled.cleanPasswordReset.interval.miliseconds}",
			initialDelayString = "${Scheduled.cleanPasswordReset.initialDelay.miliseconds}")
	@Transactional(readOnly = false)
	public void cleanPasswordRest() {
		logger.info("Cleaning up password reset requests older than {} minutes", timePassedMinutes);
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MINUTE, -timePassedMinutes);
		Date thresholdDate = cal.getTime();
		Integer deletedCount = passwordResetRepository.deleteLessThan(thresholdDate);
		logger.info("Deleted {} password reset requests", deletedCount);
	}
}

package com.springboot.app.utils;

public class Validators {
	public static boolean isUsernameValid(String username) {
		return username.matches("^[A-Za-z][A-Za-z0-9-_]{4,23}$");
	}

	public static boolean isEmailValid(String email) {
		return email.matches("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$");
	}

	public static boolean isPasswordValid(String password) {
		return password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%!]).{8,24}$");
	}

	public static boolean isValicIPAddress(String ipAddress) {
		return ipAddress.matches("^([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\."
				+ "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\."
				+ "([01]?\\d\\d?|2[0-4]\\d|25[0-5])\\."
				+ "([01]?\\d\\d?|2[0-4]\\d|25[0-5])$");
	}

	public static boolean isValidRole(String role) {
		return role.equals("ADMIN") || role.equals("USER") || role.equals("MODERATOR");
	}
}

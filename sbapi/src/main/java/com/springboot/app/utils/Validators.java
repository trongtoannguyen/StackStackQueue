package com.springboot.app.utils;

public class Validators {
	public static boolean isEmailValid(String email) {
		return email.matches("^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$");
	}

	public static boolean isPasswordValid(String password) {
		return password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$");
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

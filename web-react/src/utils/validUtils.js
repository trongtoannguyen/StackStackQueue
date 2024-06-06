import { USER_REGEX, EMAIL_REGEX, PWD_REGEX } from "../constants";

// Extracted validation logic
export const validateName = (username) => USER_REGEX.test(username);
export const validateEmail = (email) => EMAIL_REGEX.test(email);
export const validatePassword = (password) => PWD_REGEX.test(password);
export const validateConfirm = (password, confirm) => password === confirm;



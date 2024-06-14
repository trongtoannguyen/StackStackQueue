import 'dart:ffi';

import 'package:equatable/equatable.dart';
import 'package:formz/formz.dart';

class UserEntity extends Equatable {
  final Long id;
  final String username;
  final String email;
  final String name;
  final String avatar;
  final String imageUrl;
  final String accessToken;

  const UserEntity(this.id, this.username, this.email, this.name, this.avatar,
      this.imageUrl, this.accessToken);

  factory UserEntity.fromJson(Map<dynamic, dynamic> json) {
    return UserEntity(
      (json['id'] ?? 0) as Long,
      (json['username'] ?? "") as String,
      (json['email'] ?? "") as String,
      (json['name'] ?? "") as String,
      (json['avatar'] ?? "") as String,
      (json['imageUrl'] ?? "") as String,
      (json['accessToken'] ?? "") as String,
    );
  }

  @override
  List<Object?> get props => [
        id,
        username,
        email,
        name,
        avatar,
        imageUrl,
        accessToken,
      ];
}

//------------------------------------------------------------------------------
enum EmailValidationError { invalid }

class Email extends FormzInput<String, EmailValidationError> {
  const Email.pure() : super.pure('');

  const Email.dirty([super.value = '']) : super.dirty();

  static final RegExp _emailRegExp = RegExp(
    r'^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
  );

  @override
  EmailValidationError? validator(String? value) {
    return _emailRegExp.hasMatch(value ?? '')
        ? null
        : EmailValidationError.invalid;
  }
}

//------------------------------------------------------------------------------

enum PasswordValidationError { invalid }

class Password extends FormzInput<String, PasswordValidationError> {
  const Password.pure() : super.pure('');

  const Password.dirty([super.value = '']) : super.dirty();

  static final _passwordRegExp =
      RegExp(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$');

  @override
  PasswordValidationError? validator(String? value) {
    return _passwordRegExp.hasMatch(value ?? '')
        ? null
        : PasswordValidationError.invalid;
  }
}
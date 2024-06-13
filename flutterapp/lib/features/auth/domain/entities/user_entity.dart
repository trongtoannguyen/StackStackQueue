import 'package:equatable/equatable.dart';
import 'package:formz/formz.dart';

class UserEntity extends Equatable {
  final String id;
  final String username;
  final String email;
  final String name;
  final String avatar;
  final String imageUrl;
  final String accessToken;
  final List<String> roles;

  const UserEntity(this.id, this.username, this.email, this.name, this.avatar,
      this.imageUrl, this.accessToken, this.roles);

  factory UserEntity.fromJson(Map<dynamic, dynamic> json) {
    return UserEntity(
      json['id'],
      json['username'],
      json['email'],
      json['name'],
      json['avatar'],
      json['imageUrl'],
      json['accessToken'],
      List<String>.from(json['roles']),
    );
  }

  @override
  List<Object?> get props => [
        id,
        email,
        username,
        name,
        accessToken,
        avatar,
        imageUrl,
        roles,
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
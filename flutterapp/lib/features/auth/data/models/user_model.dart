import 'dart:convert';
import 'dart:ffi';

import 'package:flutterapp/features/auth/domain/entities/user_entity.dart';

class UserModel extends UserEntity {
  const UserModel(
    super.id,
    super.username,
    super.email,
    super.name,
    super.avatar,
    super.imageUrl,
    super.accessToken,
  );

  factory UserModel.fromMap(Map<String, dynamic> json) {
    return UserModel(
      json['id'] as Long,
      json['username'] as String,
      json['email'] as String,
      json['name'] as String,
      json['avatar'] as String,
      json['imageUrl'] as String,
      json['accessToken'] as String,
    );
  }

  factory UserModel.fromJson(source) => UserModel.fromMap(json.decode(source));
}
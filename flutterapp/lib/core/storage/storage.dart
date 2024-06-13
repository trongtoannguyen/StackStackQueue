import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutterapp/features/auth/domain/entities/user_entity.dart';

class Storage {
  static final Storage _instance = Storage._internal();

  factory Storage() => _instance;

  Storage._internal();

  FlutterSecureStorage secureStorage = const FlutterSecureStorage();
  String token = '';
  String userId = '';
  UserEntity currentUser = const UserEntity('', '', '', '', '', '', '', []);
}
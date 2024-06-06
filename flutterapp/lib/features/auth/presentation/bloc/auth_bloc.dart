import 'dart:io';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutterapp/core/storage/storage.dart';
import 'package:flutterapp/core/usecases/register_user_core.dart';

import '../../../../core/usecases/login_user_core.dart';
import '../../domain/usecases/login_user.dart';
import '../../domain/usecases/register_user.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final LoginUser _loginUserUsecase;
  final RegisterUser _registerUser;
  AuthBloc({
    required RegisterUser registerUser,
    required LoginUser loginUserUsecase,
  })  : _loginUserUsecase = loginUserUsecase,
        _registerUser = registerUser,
        super(Unauthenticated()) {
    on<AppStarted>((event, emit) async {
      var token = await _getToken();
      if (token != null) {
        emit(Authenticated());
      } else {
        emit(Unauthenticated());
      }
    });
    on<LoggedIn>((event, emit) async {
      final email = event.email;
      final password = event.password;

      final token = await _loginUserUsecase.call(
        Params(
          email: email,
          password: password,
        ),
      );
      token.fold((l) => print('error'), (tk) {
        _saveToken(tk);
        emit(Authenticated());
      });
    });
    on<LoggedOut>((event, emit) async {
      Storage().token = '';
      Storage().userId = '';
      await _deleteToken();
      await _deleteUserId();
      emit(Unauthenticated());
    });
    on<Register>((event, emit) async {
      final username = event.username;
      final email = event.email;
      final password = event.password;

      final res = await _registerUser.call(
        ParamsRegister(
          email: email,
          password: password,
          username: username,
        ),
      );
      res.fold((l) => print('error'), (res) => print(res));
    });
  }

  Future<String?> _getToken() async {
    return await Storage().secureStorage.read(key: 'token') ?? '';
  }

  Future<void> _deleteUserId() async {
    await Storage().secureStorage.delete(key: 'userId');
  }

  Future<void> _deleteToken() async {
    await Storage().secureStorage.delete(key: 'token');
  }

  Future<void> _saveToken(String token) async {
    await Storage().secureStorage.write(key: 'token', value: token);
  }
}
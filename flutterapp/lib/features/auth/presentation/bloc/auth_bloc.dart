import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

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
    on<AppStarted>((event, emit) {
      // TODO: implement event handler
    });
    on<LoggedIn>((event, emit) async {});
    on<LoggedOut>((event, emit) async {});
    on<Register>((event, emit) async {});
  }
}
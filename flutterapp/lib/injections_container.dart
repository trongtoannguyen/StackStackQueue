import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

import 'features/auth/data/data_sources/auth_data_source.dart';
import 'features/auth/data/repository/auth_repo_impl.dart';
import 'features/auth/domain/repository/auth_repo.dart';
import 'features/auth/domain/usecases/login_user.dart';
import 'features/auth/domain/usecases/register_user.dart';
import 'features/auth/presentation/bloc/auth_bloc.dart';

final serviceLocator = GetIt.instance;

void init() {
  //----------------------------features
  //bloc
  serviceLocator.registerFactory(
    () => AuthBloc(
      loginUserUsecase: serviceLocator(),
      registerUser: serviceLocator(),
    ),
  );
  //useCases
  serviceLocator
      .registerLazySingleton(() => LoginUser(repository: serviceLocator()));

  serviceLocator
      .registerLazySingleton(() => RegisterUser(repository: serviceLocator()));

  //Repository
  serviceLocator.registerLazySingleton<AuthRepo>(
      () => AuthRepoImpl(authDataSource: serviceLocator()));

  //data sources
  // data sources

  serviceLocator.registerLazySingleton<AuthDataSource>(
      () => AuthDataSourceImp(client: serviceLocator()));
  //----------------------------core
  //---------------------------- external dependencies
  serviceLocator.registerLazySingleton(() => http.Client());
}
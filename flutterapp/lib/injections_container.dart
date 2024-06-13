import 'package:flutterapp/features/forums/presentation/bloc/discussion_bloc.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

import 'features/auth/data/data_sources/auth_data_source.dart';
import 'features/auth/data/repository/auth_repo_impl.dart';
import 'features/auth/domain/repository/auth_repo.dart';
import 'features/auth/domain/usecases/login_user.dart';
import 'features/auth/domain/usecases/register_user.dart';
import 'features/auth/presentation/bloc/auth_bloc.dart';
import 'features/forums/data/data_sources/discussion_data_sources.dart';
import 'features/forums/data/repository/discussion_repo_impl.dart';
import 'features/forums/domain/repository/discussion_repo.dart';
import 'features/forums/domain/usecases/create_discussion.dart';
import 'features/forums/domain/usecases/get_all_discussion.dart';

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

  serviceLocator.registerFactory(
    () => DiscussionBloc(
      createDiscussionUseCase: serviceLocator(),
      getDiscussionUseCase: serviceLocator(),
    ),
  );

  //useCases
  serviceLocator
      .registerLazySingleton(() => LoginUser(repository: serviceLocator()));

  serviceLocator
      .registerLazySingleton(() => RegisterUser(repository: serviceLocator()));

  serviceLocator.registerLazySingleton(
      () => CreateDiscussionUseCase(discussionRepository: serviceLocator()));

  serviceLocator.registerLazySingleton(
      () => GetAllDiscussionUseCase(discussionRepository: serviceLocator()));

  //Repository
  serviceLocator.registerLazySingleton<AuthRepo>(
      () => AuthRepoImpl(authDataSource: serviceLocator()));

  serviceLocator.registerLazySingleton<DiscussionRepo>(
      () => DiscussionRepoImpl(discussionDataSource: serviceLocator()));

  //data sources

  serviceLocator.registerLazySingleton<AuthDataSource>(
      () => AuthDataSourceImp(client: serviceLocator()));

  serviceLocator.registerLazySingleton<DiscussionDataSource>(
      () => DiscussionDataSourceImp(client: serviceLocator()));
  //----------------------------core
  //---------------------------- external dependencies
  serviceLocator.registerLazySingleton(() => http.Client());
}
import 'package:flutterapp/features/forums/presentation/bloc/discussion_bloc.dart';
import 'package:flutterapp/features/members/data/data_sources/member_data_source.dart';
import 'package:get_it/get_it.dart';
import 'package:http/http.dart' as http;

import 'features/auth/data/data_sources/auth_data_source.dart';
import 'features/auth/data/repository/auth_repo_impl.dart';
import 'features/auth/domain/repository/auth_repo.dart';
import 'features/auth/domain/usecases/change_pro_img.dart';
import 'features/auth/domain/usecases/login_user.dart';
import 'features/auth/domain/usecases/register_user.dart';
import 'features/auth/presentation/bloc/auth_bloc.dart';
import 'features/forums/data/data_sources/discussion_data_source.dart';
import 'features/forums/data/repository/discussion_repo_impl.dart';
import 'features/forums/domain/repository/discussion_repo.dart';
import 'features/forums/domain/usecases/create_discussion.dart';
import 'features/forums/domain/usecases/get_all_discussion.dart';
import 'features/members/data/repository/member_repo_impl.dart';
import 'features/members/domain/repository/member_repo.dart';
import 'features/members/domain/usecases/get_all_memeber.dart';
import 'features/members/presentation/bloc/member_bloc.dart';

final serviceLocator = GetIt.instance;

void init() {
  //----------------------------features
  //bloc
  serviceLocator.registerFactory(
    () => AuthBloc(
      loginUserUsecase: serviceLocator(),
      registerUser: serviceLocator(),
      changeProImg: serviceLocator(),
    ),
  );

  serviceLocator.registerFactory(
    () => MemberBloc(
      getAllMemberUseCase: serviceLocator(),
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

  serviceLocator
      .registerLazySingleton(() => ChangeProImg(repository: serviceLocator()));

  serviceLocator.registerLazySingleton(
      () => CreateDiscussionUseCase(discussionRepository: serviceLocator()));

  serviceLocator.registerLazySingleton(
      () => GetAllDiscussionUseCase(discussionRepository: serviceLocator()));

  serviceLocator.registerLazySingleton(
      () => GetAllMemberUseCase(memberRepository: serviceLocator()));

  //Repository
  serviceLocator.registerLazySingleton<AuthRepo>(
      () => AuthRepoImpl(authDataSource: serviceLocator()));

  serviceLocator.registerLazySingleton<DiscussionRepo>(
      () => DiscussionRepoImpl(discussionDataSource: serviceLocator()));

  serviceLocator.registerLazySingleton<MemberRepo>(
      () => MemberRepoImpl(memberDataSource: serviceLocator()));

  //data sources

  serviceLocator.registerLazySingleton<AuthDataSource>(
      () => AuthDataSourceImp(client: serviceLocator()));

  serviceLocator.registerLazySingleton<MemberDataSource>(
      () => MemberDataSourceImp(client: serviceLocator()));

  serviceLocator.registerLazySingleton<DiscussionDataSource>(
      () => DiscussionDataSourceImp(client: serviceLocator()));
  //----------------------------core
  //---------------------------- external dependencies
  serviceLocator.registerLazySingleton(() => http.Client());
}
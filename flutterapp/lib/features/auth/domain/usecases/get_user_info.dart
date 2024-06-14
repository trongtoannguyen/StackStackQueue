import 'package:dartz/dartz.dart';
import 'package:flutterapp/core/exceptions/failure.dart';
import 'package:flutterapp/core/usecases/get_user_info.dart';
import 'package:flutterapp/features/auth/domain/entities/user_entity.dart';
import 'package:flutterapp/features/auth/domain/repository/auth_repo.dart';

class GetUserInfo implements GetUserInfoParams<UserEntity, ParamsGetUserInfo> {
  final AuthRepo authRepo;

  GetUserInfo({required this.authRepo});

  @override
  Future<Either<Failure, UserEntity>> call(ParamsGetUserInfo params) async {
    return await authRepo.getUserInfo(params.ownerId);
  }
}
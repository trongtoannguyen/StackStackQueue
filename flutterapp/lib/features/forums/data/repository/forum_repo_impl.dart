import 'package:dartz/dartz.dart';
import 'package:flutterapp/core/exceptions/error.dart';
import 'package:flutterapp/core/exceptions/failure.dart';
import 'package:flutterapp/features/forums/domain/entities/forum_entity.dart';
import 'package:flutterapp/features/forums/domain/repository/forum_repo.dart';

import '../data_sources/forum_data_source.dart';

class ForumRepoImpl implements ForumRepo {
  final ForumDataSource forumDataSource;

  ForumRepoImpl({required this.forumDataSource});

  @override
  Future<Either<Failure, List<ForumEntity>>> getAllForum() async {
    try {
      final forums = await forumDataSource.getAllForum();
      return Right(forums);
    } on ServerException {
      return Left(ServerFailure());
    }
  }
}
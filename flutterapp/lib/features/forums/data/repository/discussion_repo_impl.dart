import 'package:dartz/dartz.dart';
import 'package:flutterapp/features/forums/data/models/discussion_model.dart';
import 'package:flutterapp/features/forums/domain/entities/discussion_entity.dart';
import 'package:flutterapp/features/forums/domain/repository/discussion_repo.dart';

import '../../../../core/exceptions/error.dart';
import '../../../../core/exceptions/failure.dart';
import '../data_sources/discussion_data_source.dart';

class DiscussionRepoImpl extends DiscussionRepo {
  final DiscussionDataSource _discussionDataSource;

  DiscussionRepoImpl({
    required DiscussionDataSource discussionDataSource,
  }) : _discussionDataSource = discussionDataSource;

  @override
  Future<Either<Failure, String>> createDiscussion(
      {required String title,
      required String content,
      required int forumId}) async {
    try {
      final response =
          await _discussionDataSource.createDiscussion(title, content, forumId);
      return Right(response);
    } on ServerException {
      return Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failure, List<DiscussionEntity>>> getAllDiscussion() async {
    try {
      final response = await _discussionDataSource.getAllDiscussion();
      return Right(response);
    } on ServerException {
      return Left(ServerFailure());
    }
  }
}
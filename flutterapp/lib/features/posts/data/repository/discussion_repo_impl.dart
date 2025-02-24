import 'dart:io';

import 'package:dartz/dartz.dart';
import 'package:flutterapp/core/exceptions/error.dart';
import 'package:flutterapp/core/exceptions/failure.dart';
import 'package:flutterapp/core/usecases/posts/create_comment.dart';
import 'package:flutterapp/core/usecases/posts/create_discussion.dart';
import 'package:flutterapp/core/usecases/posts/get_all_comment.dart';
import 'package:flutterapp/features/forums/domain/entities/forum_entity.dart';
import 'package:flutterapp/features/posts/data/data_sources/discussion_data_source.dart';
import 'package:flutterapp/features/posts/data/models/comment_model.dart';
import 'package:flutterapp/features/posts/domain/entities/comment_entity.dart';
import 'package:flutterapp/features/posts/domain/repository/discussion_repo.dart';

class DiscussionRepoImpl implements DiscussionRepo {
  final DiscussionDataSource discussionDataSource;

  DiscussionRepoImpl({required this.discussionDataSource});

  @override
  Future<Either<Failure, CommentEntity>> createComment({
    required String content,
    required int discussionId,
    required File? imageURL,
  }) async {
    try {
      final result = await discussionDataSource.createComment(
          content, discussionId, imageURL);
      if (result == null) return Left(ServerFailure());
      return Right(result);
    } on ServerException {
      return Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failure, String>> createDiscussion({
    required String title,
    required String content,
    required int forumId,
  }) async {
    try {
      final result =
          await discussionDataSource.createDiscussion(title, content, forumId);
      if (result == null) return Left(ServerFailure());
      return Right(result);
    } on ServerException {
      return Left(ServerFailure());
    }
  }

  @override
  Future<Either<Failure, List<CommentModel>>> getAllCommentBy(
      int discussionId) async {
    try {
      final comments =
          await discussionDataSource.getAllCommentsBy(discussionId);
      return Right(comments);
    } on ServerException {
      return Left(ServerFailure());
    }
  }
}
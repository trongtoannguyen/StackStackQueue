import 'package:dartz/dartz.dart';
import 'package:flutterapp/features/forums/domain/entities/discussion_entity.dart';

import '../../../../core/exceptions/failure.dart';

abstract class DiscussionRepo {
  Future<Either<Failure, List<DiscussionEntity>>> getAllDiscussion();

  Future<Either<Failure, String>> createDiscussion({
    required String title,
    required String content,
    required int forumId,
  });
}
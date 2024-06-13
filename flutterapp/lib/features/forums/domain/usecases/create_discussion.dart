import 'package:dartz/dartz.dart';
import 'package:flutterapp/core/exceptions/failure.dart';

import '../../../../core/usecases/create_discussion.dart';
import '../repository/discussion_repo.dart';

class CreateDiscussionUseCase
    implements CreateDiscussionParams<void, ParamsDiscussion> {
  final DiscussionRepo discussionRepository;

  CreateDiscussionUseCase({required this.discussionRepository});
  @override
  Future<Either<Failure, String>> call(ParamsDiscussion params) async {
    return await discussionRepository.createDiscussion(
      title: params.title,
      content: params.content,
      forumId: params.forumId,
    );
  }
}
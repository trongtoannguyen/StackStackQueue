import 'package:dartz/dartz.dart';
import 'package:flutterapp/core/usecases/get_all_discussion.dart';
import 'package:flutterapp/features/forums/domain/entities/discussion_entity.dart';

import '../../../../core/exceptions/failure.dart';
import '../../../../core/usecases/get_user_info.dart';
import '../repository/discussion_repo.dart';

class GetAllDiscussionUseCase
    implements GetAllDiscussion<List<DiscussionEntity>, NoParams> {
  final DiscussionRepo discussionRepository;

  GetAllDiscussionUseCase({required this.discussionRepository});

  @override
  Future<Either<Failure, List<DiscussionEntity>>> call(NoParams params) async {
    return await discussionRepository.getAllDiscussion();
  }
}
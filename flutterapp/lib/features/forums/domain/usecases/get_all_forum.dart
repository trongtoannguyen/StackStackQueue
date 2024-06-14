import 'package:dartz/dartz.dart';
import 'package:flutterapp/core/exceptions/failure.dart';
import 'package:flutterapp/features/forums/domain/repository/forum_repo.dart';

import '../entities/forum_entity.dart';

class GetAllForumUseCase {
  final ForumRepo _forumRepository;

  GetAllForumUseCase(this._forumRepository);

  Future<Either<Failure, List<ForumEntity>>> call() async {
    return await _forumRepository.getAllForum();
  }
}
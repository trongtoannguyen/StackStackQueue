import 'package:dartz/dartz.dart';
import 'package:flutterapp/core/exceptions/failure.dart';

import '../entities/forum_entity.dart';

abstract class ForumRepo {
  Future<Either<Failure, List<ForumEntity>>> getAllForum();
}
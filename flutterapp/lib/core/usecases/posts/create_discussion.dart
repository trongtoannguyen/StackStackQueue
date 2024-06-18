import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';

import '../../exceptions/failure.dart';

abstract class CreateDiscussionParams<Type, ParamsDiscussion> {
  Future<Either<Failure, Type>> call(ParamsDiscussion params);
}

class ParamsDiscussion extends Equatable {
  final String title;
  final String content;
  final int forumId;
  const ParamsDiscussion({
    required this.title,
    required this.content,
    required this.forumId,
  });

  @override
  List<Object?> get props => [title, content, forumId];
}
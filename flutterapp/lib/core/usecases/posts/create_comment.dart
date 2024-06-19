import 'dart:io';

import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';

import '../../exceptions/failure.dart';

abstract class CreateCommentParams<Type, ParamsComment> {
  Future<Either<Failure, Type>> call(ParamsComment params);
}

class ParamsComment extends Equatable {
  final String content;
  final int discussionId;
  final File? imageURL;

  const ParamsComment(
      {required this.content, required this.discussionId, this.imageURL});

  @override
  List<Object?> get props => [content, discussionId, imageURL];
}
import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';

import '../exceptions/failure.dart';

abstract class GetAllComment<Type, ParamsCommentBy> {
  Future<Either<Failure, Type>> call(ParamsCommentBy params);
}

class ParamsCommentBy extends Equatable {
  final int discussionId;
  const ParamsCommentBy({
    required this.discussionId,
  });

  @override
  List<Object?> get props => [discussionId];
}
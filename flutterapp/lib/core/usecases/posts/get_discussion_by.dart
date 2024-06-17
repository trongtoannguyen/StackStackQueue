import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:flutterapp/core/exceptions/failure.dart';

abstract class GetDiscussionByParamsCore<Type, ParamsGetDiscussionBy> {
  Future<Either<Failure, Type>> call(ParamsGetDiscussionBy params);
}

class ParamsGetDiscussionBy extends Equatable {
  final int discussionId;
  const ParamsGetDiscussionBy({required this.discussionId});

  @override
  List<Object?> get props => [discussionId];
}
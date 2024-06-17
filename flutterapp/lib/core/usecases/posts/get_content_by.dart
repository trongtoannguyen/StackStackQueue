import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:flutterapp/core/exceptions/failure.dart';

abstract class GetContentByParamsCore<Type, ParamsGetContentBy> {
  Future<Either<Failure, Type>> call(ParamsGetContentBy params);
}

class ParamsGetContentBy extends Equatable {
  final int commentId;
  const ParamsGetContentBy({required this.commentId});

  @override
  List<Object?> get props => [commentId];
}
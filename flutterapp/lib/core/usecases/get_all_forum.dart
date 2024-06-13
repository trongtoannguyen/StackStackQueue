import 'package:dartz/dartz.dart';

import '../exceptions/failure.dart';

abstract class GetAllForum<Type, NoParams> {
  Future<Either<Failure, Type>> call(NoParams params);
}
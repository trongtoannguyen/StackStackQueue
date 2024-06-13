import 'package:dartz/dartz.dart';

import '../exceptions/failure.dart';

abstract class GetAllDiscussion<Type, NoParams> {
  Future<Either<Failure, Type>> call(NoParams params);
}
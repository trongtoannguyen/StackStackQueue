import 'dart:ffi';

import 'package:equatable/equatable.dart';

class ForumGroupEntity extends Equatable {
  final Long? id;
  final String? title;

  const ForumGroupEntity({required this.id, required this.title});

  @override
  List<Object?> get props => [id, title];
}
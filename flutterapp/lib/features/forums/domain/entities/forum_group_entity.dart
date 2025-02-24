import 'dart:ffi';

import 'package:equatable/equatable.dart';

class ForumGroupEntity extends Equatable {
  final int? id;
  final String? title;
  final String? color;

  const ForumGroupEntity(
      {required this.id, required this.title, required this.color});

  @override
  List<Object?> get props => [id, title, color];
}
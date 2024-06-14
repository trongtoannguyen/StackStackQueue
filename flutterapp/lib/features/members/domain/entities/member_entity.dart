import 'dart:ffi';

import 'package:equatable/equatable.dart';

class MemberEntity extends Equatable {
  final Long id;
  final String username;
  final String name;
  final String email;
  final String avatar;
  final String imageUrl;
  final Long totalDiscussions;
  final Long totalComments;
  final Long reputation;

  const MemberEntity({
    required this.id,
    required this.username,
    required this.name,
    required this.email,
    required this.avatar,
    required this.imageUrl,
    required this.totalDiscussions,
    required this.totalComments,
    required this.reputation,
  });

  @override
  List<Object?> get props => [
        id,
        username,
        name,
        email,
        avatar,
        imageUrl,
        totalDiscussions,
        totalComments,
        reputation
      ];
}
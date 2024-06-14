import 'dart:convert';
import 'dart:ffi';

import 'package:flutterapp/features/members/domain/entities/member_entity.dart';

class MemberModel extends MemberEntity {
  MemberModel({
    required Long id,
    required String username,
    required String name,
    required String email,
    required String avatar,
    required String imageUrl,
    required Long totalDiscussions,
    required Long totalComments,
    required Long reputation,
  }) : super(
          id: id,
          username: username,
          name: name,
          email: email,
          avatar: avatar,
          imageUrl: imageUrl,
          totalDiscussions: totalDiscussions,
          totalComments: totalComments,
          reputation: reputation,
        );

  factory MemberModel.fromMap(Map<String, dynamic> json) {
    return MemberModel(
      id: json['id'] as Long,
      username: json['username'],
      name: json['name'],
      email: json['email'],
      avatar: json['avatar'],
      imageUrl: json['imageUrl'],
      totalDiscussions: json['totalDiscussions'],
      totalComments: json['totalComments'],
      reputation: json['reputation'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'username': username,
      'name': name,
      'email': email,
      'avatar': avatar,
      'imageUrl': imageUrl,
      'totalDiscussions': totalDiscussions,
      'totalComments': totalComments,
      'reputation': reputation,
    };
  }

  factory MemberModel.fromJson(source) =>
      MemberModel.fromMap(json.decode(source));
}
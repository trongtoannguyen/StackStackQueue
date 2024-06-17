import 'dart:convert';

import 'package:flutterapp/features/forums/domain/entities/forum_entity.dart';

class ForumModel extends ForumEntity {
  const ForumModel(
      {required super.id,
      required super.title,
      required super.totalComments,
      required super.discussions});

  factory ForumModel.fromMap(Map<String, dynamic> json) {
    List<DiscussionModel> discussion = jsonDecode(json["discussions"])
        .map((e) => DiscussionModel.fromJson(e))
        .toList();

    return ForumModel(
      id: (json['_id'] ?? '') as int,
      title: (json['title'] ?? '') as String,
      totalComments: (json['totalComments'] ?? '') as int,
      discussions: discussion,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "title": title,
      "totalComments": totalComments,
      "discussions": discussions,
    };
  }

  factory ForumModel.fromJson(source) => ForumModel.fromMap(source);
}

class DiscussionModel extends DiscussionEntity {
  const DiscussionModel(
      {required super.discussionId,
      required super.discussionTitle,
      required super.createdAt,
      required super.username,
      required super.name,
      required super.avatar,
      required super.imageUrl});

  factory DiscussionModel.fromMap(Map<String, dynamic> json) {
    return DiscussionModel(
      discussionId: (json['discussionId'] ?? '') as int,
      discussionTitle: (json['discussionTitle'] ?? '') as String,
      createdAt: (json['createdAt'] ?? '') as DateTime,
      username: (json['username'] ?? '') as String,
      name: (json['name'] ?? '') as String,
      avatar: (json['avatar'] ?? '') as String,
      imageUrl: (json['imageUrl'] ?? '') as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "discussionId": discussionId,
      "discussionTitle": discussionTitle,
      "createdAt": createdAt,
      "username": username,
      "name": name,
      "avatar": avatar,
      "imageUrl": imageUrl,
    };
  }

  factory DiscussionModel.fromJson(source) => DiscussionModel.fromMap(source);
}
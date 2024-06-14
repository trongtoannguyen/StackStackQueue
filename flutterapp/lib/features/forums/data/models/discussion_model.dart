import 'dart:convert';

import 'package:flutterapp/features/forums/domain/entities/discussion_entity.dart';

class DiscussionModel extends DiscussionEntity {
  const DiscussionModel({
    required super.id,
    required super.title,
    required super.content,
    required super.forumId,
    required super.forumName,
    required super.authorId,
    required super.createdAt,
    required super.updatedAt,
  });

  factory DiscussionModel.fromMap(Map<String, dynamic> json) {
    return DiscussionModel(
      id: json['_id'] ?? '',
      title: json['title'] ?? '',
      content: json['content'] ?? '',
      forumId: json['forumId'] ?? 0,
      forumName: json['forumName'] ?? '',
      authorId: json['authorId'] ?? '',
      createdAt: json['createdAt'] ?? '',
      updatedAt: json['updatedAt'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "title": title,
      "content": content,
      "forumId": forumId,
      "forumName": forumName,
      "authorId": authorId,
      "createdAt": createdAt,
      "updatedAt": updatedAt,
    };
  }

  factory DiscussionModel.fromJson(source) =>
      DiscussionModel.fromMap(json.decode(source));
}
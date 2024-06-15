import 'dart:convert';

import 'package:flutterapp/features/forums/domain/entities/forum_group_entity.dart';

class ForumsGroupModel extends ForumGroupEntity {
  const ForumsGroupModel({
    required super.id,
    required super.title,
  });

  factory ForumsGroupModel.fromMap(Map<String, dynamic> json) {
    return ForumsGroupModel(id: json["id"], title: json["title"]);
  }

  factory ForumsGroupModel.fromJson(source) =>
      ForumsGroupModel.fromMap(json.decode(source));
}
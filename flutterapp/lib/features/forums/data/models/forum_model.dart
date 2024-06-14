import 'package:flutterapp/features/forums/domain/entities/forum_entity.dart';

class ForumModel extends ForumEntity {
  const ForumModel(
      {required super.id,
      required super.title,
      required super.description,
      required super.createdAt,
      required super.updatedAt});

  factory ForumModel.fromMap(Map<String, dynamic> json) {
    return ForumModel(
      id: json['_id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      createdAt: json['createdAt'] ?? '',
      updatedAt: json['updatedAt'] ?? '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "title": title,
      "description": description,
      "createdAt": createdAt,
      "updatedAt": updatedAt,
    };
  }

  factory ForumModel.fromJson(source) => ForumModel.fromMap(source);
}
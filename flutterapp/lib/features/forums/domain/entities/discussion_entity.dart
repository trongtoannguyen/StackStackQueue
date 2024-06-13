import 'package:equatable/equatable.dart';

class DiscussionEntity extends Equatable {
  final String? id;
  final String? authorId;
  final String? title;
  final String? content;

  final String? forumId;
  final String? createdAt;
  final String? updatedAt;

  const DiscussionEntity({
    required this.id,
    required this.authorId,
    required this.title,
    required this.content,
    required this.forumId,
    required this.createdAt,
    required this.updatedAt,
  });

  @override
  List<Object?> get props =>
      [id, authorId, title, content, forumId, createdAt, updatedAt];
}
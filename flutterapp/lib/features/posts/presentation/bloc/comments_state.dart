part of 'comments_bloc.dart';

abstract class CommentsState extends Equatable {
  const CommentsState();
}

final class CommentsLoading extends CommentsState {
  @override
  List<Object> get props => [];
}

class CommentsLoaded extends CommentsState {
  final List<CommentEntity> comments;
  final int discussionId;

  const CommentsLoaded({
    this.comments = const <CommentEntity>[],
    required this.discussionId,
  });

  @override
  List<Object> get props => [comments, discussionId];
}

class CommentsError extends CommentsState {
  @override
  List<Object?> get props => throw UnimplementedError();
}
part of 'comments_bloc.dart';

abstract class CommentsState extends Equatable {
  const CommentsState();

  @override
  List<Object> get props => [];
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

class CommentsError extends CommentsState {}

class CreateDiscussionLoading extends CommentsState {}

class CreateDiscussionLoaded extends CommentsState {}

class CreateDiscussionFailure extends CommentsState {}

class AddCommentLoading extends CommentsState {}

class AddCommentLoaded extends CommentsState {}

class AddCommentFailure extends CommentsState {}
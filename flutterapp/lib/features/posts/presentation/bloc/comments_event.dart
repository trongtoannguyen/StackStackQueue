part of 'comments_bloc.dart';

abstract class CommentsEvent extends Equatable {
  const CommentsEvent();
  @override
  List<Object> get props => [];
}

class LoadCommentsEvent extends CommentsEvent {
  final int discussionId;

  const LoadCommentsEvent({this.discussionId = 1});

  @override
  List<Object> get props => [discussionId];
}

class AddCommentEvent extends CommentsEvent {
  final int discussionId;
  final String comment;

  const AddCommentEvent({
    required this.discussionId,
    required this.comment,
  });

  @override
  List<Object> get props => [discussionId, comment];
}
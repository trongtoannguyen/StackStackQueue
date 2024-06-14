part of 'discussion_bloc.dart';

abstract class DiscussionEvent extends Equatable {
  const DiscussionEvent();

  @override
  List<Object> get props => [];

  get forumId => null;
}

class GetDiscussionEvent extends DiscussionEvent {}

class CreateDiscussion extends DiscussionEvent {
  final String title;
  final String content;
  final int forumId;

  const CreateDiscussion({
    required this.title,
    required this.content,
    required this.forumId,
  });

  @override
  List<Object> get props => [title, content, forumId];
}

class DiscussionRequestCompleted extends DiscussionEvent {}
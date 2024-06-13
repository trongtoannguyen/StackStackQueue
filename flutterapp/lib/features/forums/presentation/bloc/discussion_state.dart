part of 'discussion_bloc.dart';

enum DiscussionEventStatus { initial, loading, success, failure }

abstract class DiscussionState extends Equatable {
  const DiscussionState();

  @override
  List<Object> get props => [];
}

class DiscussionInitial extends DiscussionState {}

class DiscussionLoading extends DiscussionState {}

class DiscussionSuccess extends DiscussionState {
  final List<DiscussionEntity> discussionEntity;

  const DiscussionSuccess({required this.discussionEntity});
}

class DiscussionFailure extends DiscussionState {}
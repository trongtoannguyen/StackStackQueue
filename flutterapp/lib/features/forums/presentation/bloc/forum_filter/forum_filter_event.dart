part of 'forum_filter_bloc.dart';

sealed class ForumFilterEvent extends Equatable {
  const ForumFilterEvent();

  @override
  List<Object> get props => [];
}

final class UpdateFilter extends ForumFilterEvent {
  const UpdateFilter();

  @override
  List<Object> get props => [];
}

final class UpdateForums extends ForumFilterEvent {
  final ForumFilter forumFilter;

  const UpdateForums({this.forumFilter = ForumFilter.all});

  @override
  List<Object> get props => [forumFilter];
}
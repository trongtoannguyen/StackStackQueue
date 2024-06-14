part of 'member_bloc.dart';

abstract class MemberEvent extends Equatable {
  const MemberEvent();

  @override
  List<Object> get props => [];
}

class GetMemberEvent extends MemberEvent {}

class MemberRequestCompleted extends MemberEvent {}
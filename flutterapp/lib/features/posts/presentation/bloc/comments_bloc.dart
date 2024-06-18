import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutterapp/core/usecases/posts/get_all_comment.dart';
import 'package:flutterapp/features/posts/domain/entities/comment_entity.dart';
import 'package:flutterapp/features/posts/domain/usecases/get_comments_by.dart';

part 'comments_event.dart';
part 'comments_state.dart';

class CommentsBloc extends Bloc<CommentsEvent, CommentsState> {
  //domain usecase
  final GetAllCommentsUseCase _getAllCommentsUseCase;

  CommentsBloc({
    required GetAllCommentsUseCase getAllCommentsUseCase,
  })  : _getAllCommentsUseCase = getAllCommentsUseCase,
        super(CommentsLoading()) {
    on<LoadCommentsEvent>((event, emit) async {
      final discussionId = event.discussionId;
      await _getAllCommentsUseCase
          .call(ParamsCommentsBy(discussionId: discussionId))
          .then((comments) {
        comments.fold(
          (failure) => emit(CommentsError()),
          (comments) => emit(CommentsLoaded(
            comments: comments,
            discussionId: event.discussionId,
          )),
        );
      });
    });
  }
}
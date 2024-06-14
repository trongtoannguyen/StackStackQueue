import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutterapp/core/usecases/create_discussion.dart';
import 'package:flutterapp/core/usecases/get_all_discussion.dart';
import 'package:flutterapp/core/usecases/get_user_info.dart';
import 'package:flutterapp/features/forums/domain/entities/discussion_entity.dart';
import 'package:flutterapp/features/forums/domain/usecases/create_discussion.dart';

import '../../domain/usecases/get_all_discussion.dart';

part 'discussion_event.dart';
part 'discussion_state.dart';

class DiscussionBloc extends Bloc<DiscussionEvent, DiscussionState> {
  final CreateDiscussionUseCase _createDiscussionUseCase;
  final GetAllDiscussionUseCase _getDiscussionUseCase;

  DiscussionBloc(
      {required CreateDiscussionUseCase createDiscussionUseCase,
      required GetAllDiscussionUseCase getDiscussionUseCase})
      : _getDiscussionUseCase = getDiscussionUseCase,
        _createDiscussionUseCase = createDiscussionUseCase,
        super(DiscussionInitial()) {
    on<DiscussionEvent>((event, emit) async {
      emit(DiscussionLoading());
      try {
        final discussions = await _getDiscussionUseCase.call(NoParams());
        discussions.fold(
          (l) => emit(DiscussionFailure()),
          (discussion) => emit(
            DiscussionSuccess(discussionEntity: discussion),
          ),
        );
      } catch (err) {
        print(err);
      }
    });
    on<CreateDiscussion>((event, emit) {
      final title = event.title;
      final content = event.content;
      final forumId = event.forumId;

      final response = _createDiscussionUseCase.call(
        ParamsDiscussion(
          title: title,
          content: content,
          forumId: forumId,
        ),
      );
    });
  }
}
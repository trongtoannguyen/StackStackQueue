import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterapp/features/feed/presentation/widgets/build_datetime.dart';
import 'package:flutterapp/features/posts/domain/entities/comment_entity.dart';
import 'package:flutterapp/features/posts/presentation/bloc/comments_bloc.dart';

class CommentsScreen extends StatefulWidget {
  const CommentsScreen({super.key, required this.discussionTitle});

  final String discussionTitle;

  @override
  State<CommentsScreen> createState() => _CommentsScreenState();
}

class _CommentsScreenState extends State<CommentsScreen> {
  String get title => widget.discussionTitle;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: 700,
              child: BlocBuilder<CommentsBloc, CommentsState>(
                builder: (context, state) {
                  if (state is CommentsLoading) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  } else if (state is CommentsLoaded) {
                    return Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: ListView.builder(
                        shrinkWrap: true,
                        itemCount: state.comments.length,
                        itemBuilder: (context, index) =>
                            commentItem(context, state.comments[index]),
                      ),
                    );
                  } else if (state is CommentsError) {
                    return const Center(child: Text('Error connection'));
                  } else {
                    return const Center(child: Text('EMPTY'));
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Card commentItem(BuildContext context, CommentEntity comment) {
    return Card(
      child: Container(
        margin: const EdgeInsets.all(8),
        padding: const EdgeInsets.all(8),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                const SizedBox(
                  height: 50,
                  width: 50,
                  child: Icon(Icons.person),
                ),
                const SizedBox(
                  width: 8,
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      comment.title,
                      style: const TextStyle(
                        fontSize: 18.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    buildCreatedAt(comment.author.username, comment.createdAt),
                  ],
                ),
              ],
            ),
            const SizedBox(
              height: 4,
            ),
            Container(
              padding: const EdgeInsets.all(8),
              child: Text(comment.content),
            )
          ],
        ),
      ),
    );
  }
}
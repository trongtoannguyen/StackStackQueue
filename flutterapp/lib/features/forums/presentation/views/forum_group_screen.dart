import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterapp/config/theme/theme_manager.dart';
import 'package:flutterapp/features/forums/domain/entities/forum_entity.dart';
import 'package:flutterapp/features/forums/presentation/bloc/froum_bloc/forum_bloc.dart';
import 'package:provider/provider.dart';

import '../../../feed/presentation/widgets/appbar_widget.dart';

class ForumGroupScreen extends StatelessWidget {
  final TabController tabController;
  final String title;
  final int groupId;

  const ForumGroupScreen(
      {super.key,
      required this.tabController,
      required this.title,
      required this.groupId});

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          SizedBox(
            height: 700,
            // child: BlocBuilder<ForumBloc, ForumState>(
            //   builder: (context, state) {
            //     if (state is ForumInitial) {
            //       return Text("EMPTY");
            //     } else if (state is ForumLoading) {
            //       return const Center(
            //         child: CircularProgressIndicator(),
            //       );
            //     } else if (state is ForumSuccess) {
            //       return ListView.builder(
            //           itemCount: state.forums.length,
            //           itemBuilder: (context, index) {
            //             return ForumItemWidget(forum: state.forums[index]);
            //           });
            //     } else if (state is ForumFailure) {
            //       return const Text("Error connection");
            //     } else {
            //       return const Text('default');
            //     }
            //   },
            // ),
            child: Text('Forums'),
          ),
        ],
      ),
    );
  }
}

class ForumItemWidget extends StatelessWidget {
  final ForumEntity forum;

  const ForumItemWidget({
    super.key,
    required this.forum,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Text('Item'),
      subtitle: Text('Subtitle'),
      leading: const Icon(Icons.signpost),
      trailing: Icon(Icons.arrow_forward_ios),
    );
  }
}
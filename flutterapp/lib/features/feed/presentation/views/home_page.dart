import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterapp/config/contants/constants.dart';
import 'package:flutterapp/core/network/api_urls.dart';
import 'package:flutterapp/features/feed/presentation/widgets/app_drawer_widget.dart';
import 'package:flutterapp/features/forums/domain/entities/forum_entity.dart';
import 'package:flutterapp/features/forums/domain/entities/forum_group_entity.dart';
import 'package:flutterapp/features/forums/presentation/bloc/forum_filter/forum_filter_bloc.dart';
import 'package:flutterapp/features/forums/presentation/bloc/froum_bloc/forum_bloc.dart';
import 'package:flutterapp/features/forums/presentation/bloc/group_bloc/group_bloc.dart';
import 'package:flutterapp/features/forums/presentation/views/forum_group_screen.dart';
import 'package:flutterapp/features/posts/presentation/bloc/comments_bloc.dart';
import 'package:flutterapp/features/posts/presentation/views/comments_screen.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';
import '../../../../config/theme/theme_manager.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>
    with SingleTickerProviderStateMixin {
  late TabController tabController;
  late String title;

  final groups = <ForumGroupEntity>[];

  @override
  void initState() {
    tabController = TabController(length: 4, vsync: this);
    tabController.addListener(() {
      setState(() {});
    });

    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        drawer: AppDrawer(),
        appBar: AppBar(
          centerTitle: true,
          //tabcontroller.index can be used to get the name of current index value of the tabview.
          title: Text(tabController.index == 0
              ? TextConstants.titleTab_1
              : tabController.index == 1
                  ? TextConstants.titleTab_2
                  : tabController.index == 2
                      ? TextConstants.titleTab_3
                      : TextConstants.titleTab_4),
          backgroundColor: Colors.transparent,
          elevation: 0,
          iconTheme: Theme.of(context).iconTheme,
          actions: [
            Consumer<ThemeService>(builder: (context, ThemeService theme, _) {
              return IconButton(
                  onPressed: () {
                    theme.toggleTheme();
                  },
                  icon: Icon(theme.darkTheme!
                      ? Icons.sunny
                      : CupertinoIcons.moon_stars));
            })
          ],
          bottom: TabBar(
              onTap: (tabIndex) {
                switch (tabIndex) {
                  case 0:
                    // tabController.animateTo(0);
                    BlocProvider.of<ForumFilterBloc>(context).add(
                      const UpdateForums(
                        forumFilter: ForumFilter.all,
                      ),
                    );
                    break;
                  case 1:
                    // tabController.animateTo(1);
                    BlocProvider.of<ForumFilterBloc>(context).add(
                      const UpdateForums(
                        forumFilter: ForumFilter.g1,
                      ),
                    );
                    break;
                  case 2:
                    // tabController.animateTo(2);
                    BlocProvider.of<ForumFilterBloc>(context).add(
                      const UpdateForums(
                        forumFilter: ForumFilter.g2,
                      ),
                    );
                    break;
                  case 3:
                    // tabController.animateTo(3);
                    BlocProvider.of<ForumFilterBloc>(context).add(
                      const UpdateForums(
                        forumFilter: ForumFilter.g3,
                      ),
                    );
                    break;
                }
              },
              controller: tabController,
              tabs: [
                Tab(
                  text: TextConstants.titleTab_1,
                  icon: Icon(
                    Icons.signpost,
                    color: Colors.indigo.shade500,
                  ),
                ),
                Tab(
                    text: TextConstants.titleTab_2,
                    icon: Icon(
                      Icons.signpost,
                      color: Colors.indigo.shade500,
                    )),
                Tab(
                    text: TextConstants.titleTab_3,
                    icon: Icon(
                      Icons.signpost,
                      color: Colors.indigo.shade500,
                    )),
                Tab(
                    text: TextConstants.titleTab_4,
                    icon: Icon(
                      Icons.signpost,
                      color: Colors.indigo.shade500,
                    ))
              ]),
        ),
        body: TabBarView(
          controller: tabController,
          children: [
            _toForumGroup(tabController, TextConstants.titleTab_1),
            _toForumGroup(tabController, TextConstants.titleTab_2),
            _toForumGroup(tabController, TextConstants.titleTab_3),
            _toForumGroup(tabController, TextConstants.titleTab_4)
          ],
        ),
      ),
    );
  }

//-------------------End of HomePage-------------------

  BlocConsumer<ForumFilterBloc, ForumFilterState> _toForumGroup(
      TabController tabController, String title) {
    return BlocConsumer<ForumFilterBloc, ForumFilterState>(
      listener: (context, state) {
        if (state is ForumFilterLoaded) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Forums loaded'),
            ),
          );
        }
      },
      builder: (context, state) {
        if (state is ForumFilterLoading) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        } else if (state is ForumFilterLoaded && state.forums.isEmpty) {
          return const Center(
            child: Text('No forums found'),
          );
        } else if (state is ForumFilterLoaded) {
          return Padding(
            padding: const EdgeInsets.all(16.0),
            child: ListView.builder(
                shrinkWrap: true,
                itemCount: state.forums.length,
                itemBuilder: (context, index) {
                  return _forumItemCard(context, state.forums[index]);
                }),
          );
        } else {
          return const Text('Something went wrong');
        }
      },
    );
  }

  Card _forumItemCard(BuildContext context, ForumEntity forum) {
    if (forum.discussions.isEmpty) {
      return Card(
        margin: const EdgeInsets.only(bottom: 8.0),
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Row(
                children: [
                  Text(
                    '${(forum.title)?.toUpperCase()}',
                    style: const TextStyle(
                      fontSize: 18.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  IconButton(
                    onPressed: () {
                      // Navigator.of(context).push(
                      //   MaterialPageRoute(
                      //     builder: (context) => ForumGroupScreen(
                      //       forumId: forum.id,
                      //     ),
                      //   ),
                      // );
                    },
                    icon: const Icon(Icons.add_circle_sharp),
                  ),
                ],
              ),
              const SizedBox(
                height: 4,
              ),
              const Text('No discussions found'),
            ],
          ),
        ),
      );
    }
    return Card(
      margin: const EdgeInsets.only(bottom: 8.0),
      child: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: <Widget>[
            Row(
              children: [
                Text(
                  '${(forum.title)?.toUpperCase()}',
                  style: const TextStyle(
                    fontSize: 18.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                IconButton(
                  onPressed: () {
                    // Navigator.of(context).push(
                    //   MaterialPageRoute(
                    //     builder: (context) => CreateDiscussionScreen(
                    //       forumId: forum.id,
                    //     ),
                    //   ),
                    // );
                  },
                  icon: const Icon(Icons.add_circle_sharp),
                ),
              ],
            ),
            const SizedBox(
              height: 4,
            ),
            //list of discussions
            ListView.builder(
                shrinkWrap: true,
                itemCount: forum.discussions.length,
                itemBuilder: (context, index) {
                  return _discussionItemCard(
                      context, forum.discussions[index], forum.id);
                }),
          ],
        ),
      ),
    );
  }

  Container _discussionItemCard(
      BuildContext context, DiscussionEntity discussion, int? forumId) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8.0),
      child: Row(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: _buildImage(discussion),
          ),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Row(
                  children: [
                    Text(
                      '#${discussion.discussionTitle}',
                      style: const TextStyle(
                        fontSize: 18.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    IconButton(
                      onPressed: () {
                        context.read<CommentsBloc>().add(LoadCommentsEvent(
                              discussionId: discussion.discussionId!,
                            ));
                        Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (context) => CommentsScreen(
                              discussionTitle:
                                  discussion.discussionTitle ?? 'Discussion',
                            ),
                          ),
                        );
                      },
                      icon: const Icon(Icons.arrow_forward),
                    )
                  ],
                ),
                const SizedBox(
                  height: 4,
                ),
                buildCreatedAt(discussion),
                const SizedBox(
                  height: 8,
                ),
                //list of discussions
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget buildCreatedAt(DiscussionEntity discussion) {
    DateTime createdAt = discussion.createdAt ?? DateTime.now();
    String name = discussion.name ?? discussion.username ?? "Anonymous";
    return Text(
      '$name created at: ${DateFormat('dd-MM-yyyy HH:mm').format(createdAt)}',
      style: const TextStyle(
        fontSize: 14.0,
      ),
    );
  }

  Widget _buildImage(DiscussionEntity discussion) {
    final imagePath = discussion.imageUrl != ''
        ? discussion.imageUrl
        : '${ApiUrls.avatarUrl}/${discussion.avatar}';
    if (imagePath == null) {
      return Container(
        width: 50,
        height: 50,
        color: Colors.grey,
        child: const Icon(Icons.person),
      );
    }
    final image = NetworkImage(imagePath);
    return ClipOval(
      child: Material(
        color: Colors.transparent,
        child: Ink.image(
          image: image,
          fit: BoxFit.cover,
          width: 50,
          height: 50,
        ),
      ),
    );
  }
}
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutterapp/config/contants/constants.dart';
import 'package:flutterapp/features/forums/presentation/views/forum_group_screen.dart';
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
          bottom: TabBar(controller: tabController, tabs: [
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
            ForumGroupScreen(
              tabController: tabController,
              title: TextConstants.titleTab_1,
            ),
            ForumGroupScreen(
              tabController: tabController,
              title: TextConstants.titleTab_2,
            ),
            ForumGroupScreen(
              tabController: tabController,
              title: TextConstants.titleTab_3,
            ),
            ForumGroupScreen(
              tabController: tabController,
              title: TextConstants.titleTab_4,
            )
          ],
        ),
      ),
    );
  }
}
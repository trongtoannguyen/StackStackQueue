import 'package:flutter/material.dart';
import 'package:flutterapp/config/theme/theme_manager.dart';
import 'package:provider/provider.dart';

import '../../../feed/presentation/widgets/appbar_widget.dart';

class ForumGroupScreen extends StatelessWidget {
  final TabController tabController;
  final String title;

  const ForumGroupScreen(
      {super.key, required this.tabController, required this.title});
  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Column(
        children: [
          const SizedBox(height: 20),
          Text(
            title,
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 20),
          ListView.builder(
            shrinkWrap: true,
            itemCount: 30,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text('Item $index'),
                subtitle: Text('Subtitle $index'),
                leading: const Icon(Icons.signpost),
                trailing: Icon(Icons.arrow_forward_ios),
              );
            },
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:flutterapp/config/theme/theme_manager.dart';
import 'package:provider/provider.dart';

import '../../../feed/presentation/widgets/appbar_widget.dart';

class ForumsScreen extends StatefulWidget {
  const ForumsScreen({super.key});

  @override
  State<ForumsScreen> createState() => _ForumsScreenState();
}

class _ForumsScreenState extends State<ForumsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(context),
      body: const Center(
        child: Text('Forums'),
      ),
    );
  }
}
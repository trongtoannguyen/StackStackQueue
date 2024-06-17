import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class DiscussionScreen extends StatefulWidget {
  const DiscussionScreen({super.key});

  @override
  State<DiscussionScreen> createState() => _DiscussionScreenState();
}

class _DiscussionScreenState extends State<DiscussionScreen> {
  TextEditingController title = TextEditingController();
  TextEditingController content = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        actions: [
          Row(
            children: [
              const SizedBox(
                width: 10,
              ),
              ElevatedButton(
                onPressed: () {},
                child: const Text('Post'),
              ),
            ],
          )
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(28.0),
        child: Column(
          children: [
            TextField(
              controller: title,
              decoration: const InputDecoration(
                hintText: 'Title',
              ),
            ),
            const SizedBox(
              height: 10,
            ),
            TextField(
              controller: content,
              decoration: const InputDecoration(
                hintText: 'Content',
              ),
            ),
            const SizedBox(
              height: 10,
            ),
          ],
        ),
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            onPressed: () {
              Navigator.pushNamed(context, '/discussion');
            },
            child: const Icon(Icons.add),
          ),
        ],
      ),
    );
  }
}
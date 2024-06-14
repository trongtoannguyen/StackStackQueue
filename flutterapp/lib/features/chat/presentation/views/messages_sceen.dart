import 'package:flutter/material.dart';
import 'package:flutterapp/config/theme/theme_manager.dart';
import 'package:provider/provider.dart';

class MessagesScreen extends StatefulWidget {
  const MessagesScreen({super.key});

  @override
  State<MessagesScreen> createState() => _MessagesScreenState();
}

class _MessagesScreenState extends State<MessagesScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Messages Page'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            // SizedBox(
            //   height: 700,
            //   child: BlocBuilder<MemberBloc, MemberState>(
            //     builder: (context, state) {
            //       if (state is MemberInitial) {
            //         return const Center(
            //           child: Text("EMPTY"),
            //         );
            //       } else if (state is MemberLoading) {
            //         return const Center(
            //           child: CircularProgressIndicator(),
            //         );
            //       } else if (state is MemberSuccess) {
            //         return ListView.builder(
            //           itemCount: state.memberEntity.length,
            //           itemBuilder: (context, index) {
            //             final member = state.memberEntity[index];
            //             return ListTile(
            //               title: Text(member.name),
            //               subtitle: Text(member.username),
            //             );
            //           },
            //         );
            //       } else if (state is MemberFailure) {
            //         return const Text('error');
            //       } else {
            //         return const Text('default');
            //       }
            //     },
            //   ),
            // ),
            SizedBox(
              height: 700,
              child: Text("Messages page"),
            ),
          ],
        ),
      ),
    );
  }
}
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterapp/config/theme/theme_manager.dart';
import 'package:flutterapp/features/members/presentation/bloc/member_bloc.dart';
import 'package:provider/provider.dart';

class MemberListScreen extends StatefulWidget {
  const MemberListScreen({super.key});

  @override
  State<MemberListScreen> createState() => _MemberListScreenState();
}

class _MemberListScreenState extends State<MemberListScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Members'),
        iconTheme: Theme.of(context).iconTheme,
        actions: [
          Consumer<ThemeService>(builder: (context, ThemeService theme, _) {
            return IconButton(
                onPressed: () {
                  theme.toggleTheme();
                },
                icon: Icon(theme.darkTheme! ? Icons.sunny : Icons.dark_mode));
          })
        ],
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
            const Text('Members'),
            const Text('Members'),
          ],
        ),
      ),
    );
  }
}
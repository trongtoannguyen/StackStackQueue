import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterapp/config/theme/theme_manager.dart';
import 'package:flutterapp/features/members/presentation/bloc/member_bloc.dart';
import 'package:provider/provider.dart';

import '../../../feed/presentation/widgets/appbar_widget.dart';
import '../widgets/member_item_widget.dart';

class MemberListScreen extends StatefulWidget {
  const MemberListScreen({super.key});

  @override
  State<MemberListScreen> createState() => _MemberListScreenState();
}

class _MemberListScreenState extends State<MemberListScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: buildAppBar(context),
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: 700,
              child: BlocBuilder<MemberBloc, MemberState>(
                builder: (context, state) {
                  if (state is MemberInitial) {
                    return const Center(
                      child: Text("EMPTY"),
                    );
                  } else if (state is MemberLoading) {
                    return const Center(
                      child: CircularProgressIndicator(),
                    );
                  } else if (state is MemberSuccess) {
                    return GridView.builder(
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 4.0,
                        mainAxisSpacing: 4.0,
                      ),
                      itemCount: state.memberEntity.length,
                      itemBuilder: (context, index) =>
                          MemberItem(user: state.memberEntity[index]),
                    );
                  } else if (state is MemberFailure) {
                    return const Text('error');
                  } else {
                    return const Text('default');
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
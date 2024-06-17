import 'package:flutter/material.dart';
import 'package:flutterapp/core/network/api_urls.dart';
import 'package:flutterapp/features/members/domain/entities/member_entity.dart';
import 'package:flutterapp/features/members/presentation/widgets/button_widget.dart';
import 'package:flutterapp/features/members/presentation/widgets/numbers_widget.dart';
import 'package:flutterapp/features/members/presentation/widgets/profile_widget.dart';
import 'package:flutterapp/features/profile/presentation/views/profile_screen.dart';

class MemberItem extends StatelessWidget {
  const MemberItem({super.key, required this.user});

  final MemberEntity user;

  @override
  Widget build(BuildContext context) {
    final avatar = user.imageUrl != ""
        ? user.imageUrl
        : '${ApiUrls.API_BASE_URL}/user-stat/images/${user.avatar}';
    return SingleChildScrollView(
      child: Container(
        padding: const EdgeInsets.all(10.0),
        child: Card(
          shadowColor: Colors.white38,
          child: Column(
            children: [
              const SizedBox(height: 20),
              ProfileWidget(
                imagePath: avatar,
                width: 100,
                height: 100,
              ),
              const SizedBox(height: 10),
              InkWell(
                  onTap: () {
                    //route to profile screen
                    Navigator.pushNamed(
                      context,
                      "/profile",
                      arguments: user.username,
                    );
                  },
                  child: buildName(user)),
              Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    buildFollowButton(),
                    const SizedBox(width: 8),
                    buildChatButton(),
                    const SizedBox(width: 8),
                  ],
                ),
              ),
              const SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }

  //----------------------------------------------------------------
  Widget buildName(MemberEntity user) {
    final name = user.name != "" ? user.name : user.username;
    return Column(
      children: [
        Text(
          name,
          style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
        ),
        const SizedBox(height: 4),
      ],
    );
  }

  Widget buildFollowButton() => ButtonWidget(
        text: 'Follow',
        onClicked: () {},
      );
  Widget buildChatButton() => ButtonWidget(
        text: 'Chat',
        onClicked: () {},
      );
}
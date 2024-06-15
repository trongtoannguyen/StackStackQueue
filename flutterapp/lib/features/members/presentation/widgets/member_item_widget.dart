import 'package:flutter/material.dart';
import 'package:flutterapp/core/api_urls.dart';
import 'package:flutterapp/features/members/domain/entities/member_entity.dart';
import 'package:flutterapp/features/members/presentation/widgets/button_widget.dart';
import 'package:flutterapp/features/members/presentation/widgets/numbers_widget.dart';
import 'package:flutterapp/features/members/presentation/widgets/profile_widget.dart';

class MemberItem extends StatelessWidget {
  const MemberItem({super.key, required this.user});

  final MemberEntity user;

  @override
  Widget build(BuildContext context) {
    final avatar = user.imageUrl != ""
        ? user.imageUrl
        : '${ApiUrls.API_BASE_URL}/user-stat/images/${user.avatar}';
    return Card(
      shadowColor: Colors.white38,
      child: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(height: 4),
            ProfileWidget(
              imagePath: avatar,
            ),
            const SizedBox(height: 4),
            buildName(user),
            Center(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  buildFollowButton(),
                  const SizedBox(width: 8),
                  buildChatButton(),
                ],
              ),
            ),
            const SizedBox(height: 4),
          ],
        ),
      ),
    );
  }

  //----------------------------------------------------------------
  Widget buildName(MemberEntity user) => Column(
        children: [
          Text(
            user.name,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
          ),
          const SizedBox(height: 4),
        ],
      );

  Widget buildFollowButton() => ButtonWidget(
        text: 'Follow',
        onClicked: () {},
      );
  Widget buildChatButton() => ButtonWidget(
        text: 'Chat',
        onClicked: () {},
      );
}
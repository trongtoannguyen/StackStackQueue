import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_widget_from_html/flutter_widget_from_html.dart';
import 'package:flutterapp/config/theme/theme_manager.dart';
import 'package:flutterapp/core/network/api_urls.dart';

import 'package:flutterapp/core/utils/user_preferences.dart';
import 'package:flutterapp/features/profile/domain/entities/user_pro_entity.dart';
import 'package:flutterapp/features/profile/presentation/bloc/profile_bloc.dart';
import 'package:flutterapp/features/profile/presentation/widgets/profile_drawer_widget.dart';
import 'package:flutterapp/features/profile/presentation/widgets/editProfileScreen_widget.dart';
import 'package:intl/intl.dart';
import 'package:provider/provider.dart';

import '../../data/models/user_pre_model.dart';
import '../widgets/appbar_widget.dart';
import '../widgets/button_widget.dart';
import '../widgets/numbers_widget.dart';
import '../widgets/profile_widget.dart';

class ProfileScreen extends StatefulWidget {
  final String ownerId;
  const ProfileScreen({super.key, required this.ownerId});

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen>
    with TickerProviderStateMixin {
  int _currentTabIndex = 0;
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const user = UserPreferences.myUser;
    return Scaffold(
      drawer: ProfileDrawerWidget(),
      appBar: buildAppBar(context),
      body: BlocBuilder<ProfileBloc, ProfileState>(
        builder: (context, state) {
          if (state is ProfileLoading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          } else if (state is ProfileLoaded) {
            return buildProfile(state.userPro);
          } else if (state is ProfileError) {
            return const Center(child: Text('Error connection'));
          } else {
            return const Center(child: Text('EMPTY'));
          }
        },
      ),
    );
  }

  // Build Profile----------------------------------------------------------------
  Widget buildProfile(UserProEntity user) {
    String imagePath = "";
    if (user.avatar != null && user.avatar != "") {
      imagePath = '${ApiUrls.avatarUrl}/${user.avatar}';
    } else {
      imagePath = user.imageUrl ??
          "https://lh3.googleusercontent.com/a/ACg8ocIKA_Jkp2pWe0wuRjRJvAGJ0_tdjLSK2iBDmIVGTjRAe6B6EJDW=s96-c";
    }

    return ListView(
      physics: const BouncingScrollPhysics(),
      children: [
        ProfileWidget(
          imagePath: imagePath,
          onClicked: () async {},
        ),
        const SizedBox(height: 14),
        buildName(user),
        const SizedBox(height: 14),
        Center(child: buildUpgradeButton()),
        const SizedBox(height: 14),
        NumbersWidget(user: user),
        const SizedBox(height: 24),
        //buildAbout(user),
        buildTabBar(),
        buildTabContent(user),
      ],
    );
  }

  // Build Tab Bar----------------------------------------------------------------
  Widget buildTabBar() {
    return Padding(
      padding:
          const EdgeInsets.only(top: 2.0), // Adjust the padding value as needed
      child: TabBar(
        tabs: const [
          Tab(text: 'Activities'),
          Tab(text: 'Profile'),
        ],
        controller: _tabController,
        onTap: (index) {
          setState(() {
            _currentTabIndex = index;
          });
        },
      ),
    );
  }

  Widget buildTabContent(UserProEntity user) {
    switch (_currentTabIndex) {
      case 0:
        return buildActivities(user); // Implement remark tab content
      case 1:
        return buildAbout(user);
      default:
        return Container();
    }
  }

  // Build Name----------------------------------------------------------------
  Widget buildName(UserProEntity user) => Column(
        children: [
          Text(
            user.name ?? user.username ?? "Anonymous",
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
          ),
          const SizedBox(height: 2),
          Text(
            user.email ?? "No email",
            style: const TextStyle(color: Colors.grey),
          ),
          const SizedBox(height: 4),
          const Center(
            child: Text(
              "No bio",
              style: TextStyle(
                fontSize: 16,
                height: 2, // Adjust the line height as desired
                fontWeight: FontWeight.normal,
                fontStyle: FontStyle.italic,
                color: Color.fromARGB(255, 172, 161, 161),
              ),
              textAlign: TextAlign.center, // Center-align the text
            ),
          )
        ],
      );

  Widget buildUpgradeButton() => ButtonWidget(
        text: 'Follow',
        onClicked: () {},
      );

  // Build About (Profile Tab)----------------------------------------------------------------
  Widget buildAbout(UserProEntity user) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 33, vertical: 30),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SizedBox(height: 10),
                      SizedBox(
                        height: 26,
                        child: Text(
                          'Name',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      SizedBox(height: 26),
                      SizedBox(
                        height: 26,
                        child: Text(
                          'Email',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      SizedBox(height: 26),
                      SizedBox(
                        height: 26,
                        child: Text(
                          'Date of Birth',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      SizedBox(height: 26),
                      SizedBox(
                        height: 26,
                        child: Text(
                          'Gender',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      SizedBox(height: 26),
                      SizedBox(
                        height: 26,
                        child: Text(
                          'Address',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      SizedBox(height: 48),
                    ],
                  ),
                ),
                const SizedBox(width: 15),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 10),
                      SizedBox(
                        height: 26,
                        child: Text(
                          user.name ?? user.username ?? "Anonymous",
                          style: const TextStyle(
                            fontSize: 16,
                            height: 1.6,
                          ),
                        ),
                      ),
                      const SizedBox(height: 22),
                      SizedBox(
                        height: 26,
                        child: Text(
                          user.email ?? "No email",
                          style: const TextStyle(
                            fontSize: 16,
                            height: 1.7,
                          ),
                        ),
                      ),
                      const SizedBox(height: 22),
                      SizedBox(
                        height: 26,
                        child: Text(
                          DateFormat('dd-MM-yyyy').format(user.birthDate),
                          style: const TextStyle(
                            fontSize: 16,
                            height: 1.7,
                          ),
                        ),
                      ),
                      const SizedBox(height: 22),
                      SizedBox(
                        height: 26,
                        child: Text(
                          "${user.gender}",
                          style: const TextStyle(
                            fontSize: 16,
                            height: 1.7,
                          ),
                        ),
                      ),
                      const SizedBox(height: 22),
                      SizedBox(
                        height: 26,
                        child: Text(
                          user.address ?? "No address",
                          style: const TextStyle(
                            fontSize: 16,
                            height: 1.7,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                // Navigate to the edit profile screen
                // Navigator.push(
                //   context,
                //   MaterialPageRoute(
                //     builder: (context) => EditProfileScreen(user: user),
                //   ),
                // );
              },
              child: const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.edit),
                  SizedBox(width: 8),
                  Text('Edit Profile'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Build (Activities Tab)----------------------------------------------------------------
  Widget buildActivities(UserProEntity user) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 33, vertical: 30),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 16),
            if (user.comments!.isNotEmpty)
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: user.comments!.length,
                itemBuilder: (context, index) {
                  final post = user.comments![index];
                  return buildFavoritePostItem(post);
                },
                separatorBuilder: (context, index) =>
                    const SizedBox(height: 16),
              )
            else
              const Center(
                child: Text('No posts yet.'),
              ),
          ],
        ),
      ),
    );
  }

// Build a single favorite post item
  Widget buildFavoritePostItem(CommentEntity comment) {
    // Split the string into title, description, and dateAdded

    String title = comment.discussionTitle;
    String description = comment.content;
    DateTime dateAdded = comment.createdAt;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: const TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 8),
        Container(
          padding: const EdgeInsets.all(8),
          child: HtmlWidget(description),
        ),
        const SizedBox(height: 8),
        Row(
          children: [
            const Icon(Icons.date_range, size: 16),
            const SizedBox(width: 4),
            Text(
              dateAdded.toString(),
              style: const TextStyle(
                fontSize: 14,
                color: Colors.grey,
              ),
            ),
          ],
        ),
      ],
    );
  }
}
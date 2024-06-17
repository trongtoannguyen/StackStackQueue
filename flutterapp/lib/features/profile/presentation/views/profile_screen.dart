import 'package:flutter/material.dart';
import 'package:flutterapp/config/theme/theme_manager.dart';

import 'package:flutterapp/core/utils/user_preferences.dart';
import 'package:flutterapp/features/profile/presentation/widgets/profile_drawer_widget.dart';
import 'package:flutterapp/features/profile/presentation/widgets/editProfileScreen_widget.dart';
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
    _tabController = TabController(length: 3, vsync: this);
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
      body: ListView(
        physics: const BouncingScrollPhysics(),
        children: [
          ProfileWidget(
            imagePath: user.imagePath,
            onClicked: () async {},
          ),
          const SizedBox(height: 14),
          buildName(user),
          const SizedBox(height: 14),
          Center(child: buildUpgradeButton()),
          const SizedBox(height: 14),
          const NumbersWidget(),
          const SizedBox(height: 24),
          //buildAbout(user),
          buildTabBar(),
          buildTabContent(user),
        ],
      ),
    );
  }

  // Build Tab Bar----------------------------------------------------------------
  Widget buildTabBar() {
    return Padding(
      padding:
          const EdgeInsets.only(top: 2.0), // Adjust the padding value as needed
      child: TabBar(
        tabs: const [
          Tab(text: 'Profile'),
          Tab(text: 'Activities'),
          Tab(text: 'Bookmark'),
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

  Widget buildTabContent(User user) {
    switch (_currentTabIndex) {
      case 0: // Profile tab
        return buildAbout(user);
      case 1: // Activities tab
        return Container(); // Implement activities tab content
      case 2: // Remark tab
        return buildBookmark(user); // Implement remark tab content
      default:
        return Container();
    }
  }

  // Build Name----------------------------------------------------------------
  Widget buildName(User user) => Column(
        children: [
          Text(
            user.name,
            style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 24),
          ),
          const SizedBox(height: 2),
          Text(
            user.email,
            style: const TextStyle(color: Colors.grey),
          ),
          const SizedBox(height: 4),
          Center(
            child: Text(
              user.bio,
              style: const TextStyle(
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
  Widget buildAbout(User user) {
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
                      Text(
                        'Name',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 26),
                      Text(
                        'Email',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 26),
                      Text(
                        'Date of Birth',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 26),
                      Text(
                        'Gender',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 26),
                      Text(
                        'Address',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 48),
                      Text(
                        'Bio',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(width: 15),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 10),
                      Text(
                        user.name,
                        style: const TextStyle(
                          fontSize: 16,
                          height: 1.6,
                        ),
                      ),
                      const SizedBox(height: 22),
                      Text(
                        user.email,
                        style: const TextStyle(
                          fontSize: 16,
                          height: 1.7,
                        ),
                      ),
                      const SizedBox(height: 22),
                      Text(
                        user.birthday,
                        style: const TextStyle(
                          fontSize: 16,
                          height: 1.7,
                        ),
                      ),
                      const SizedBox(height: 22),
                      Text(
                        user.gender,
                        style: const TextStyle(
                          fontSize: 16,
                          height: 1.7,
                        ),
                      ),
                      const SizedBox(height: 22),
                      Text(
                        user.address,
                        style: const TextStyle(
                          fontSize: 16,
                          height: 1.7,
                        ),
                      ),
                      const SizedBox(height: 22),
                      Text(
                        user.bio,
                        style: const TextStyle(
                          fontSize: 16,
                          height: 1.7,
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
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => EditProfileScreen(user: user),
                  ),
                );
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

  // Build (Bookmark Tab)----------------------------------------------------------------
  Widget buildBookmark(User user) {
    return SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 33, vertical: 30),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Favorite Posts',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            if (user.favoritePosts.isNotEmpty)
              ListView.separated(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: user.favoritePosts.length,
                itemBuilder: (context, index) {
                  final post = user.favoritePosts[index];
                  return buildFavoritePostItem(post);
                },
                separatorBuilder: (context, index) =>
                    const SizedBox(height: 16),
              )
            else
              const Center(
                child: Text('No favorite posts yet.'),
              ),
          ],
        ),
      ),
    );
  }

// Build a single favorite post item
  Widget buildFavoritePostItem(String postString) {
    // Split the string into title, description, and dateAdded
    List<String> parts = postString.split('|');
    if (parts.length != 3) {
      return const SizedBox
          .shrink(); // Return an empty widget if the format is invalid
    }

    String title = parts[0];
    String description = parts[1];
    DateTime dateAdded = DateTime.parse(parts[2]);

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
        Text(
          description,
          style: const TextStyle(
            fontSize: 16,
            height: 1.5,
          ),
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

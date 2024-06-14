import 'package:flutter/material.dart';
import 'package:flutterapp/config/theme/theme_manager.dart';
import 'package:provider/provider.dart';

class ProfileScreen extends StatelessWidget {
  final String ownerId;

  const ProfileScreen({super.key, required this.ownerId});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile $ownerId'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Center(
              child: SizedBox(
                height: 100,
                child: CircleAvatar(
                  radius: 50,
                  // backgroundImage: const AssetImage('assets/images/avatar.png'),
                  backgroundImage: const NetworkImage(
                      'https://lh3.googleusercontent.com/a/ACg8ocIKA_Jkp2pWe0wuRjRJvAGJ0_tdjLSK2iBDmIVGTjRAe6B6EJDW=s96-c'),
                ),
              ),
            ),
            const SizedBox(height: 10),
            Text(ownerId),
            const SizedBox(height: 10),
            ElevatedButton(
              onPressed: () {},
              child: const Text('Edit Profile'),
            ),
            SizedBox(
              height: 700,
              child: Text("Profile page"),
            ),
          ],
        ),
      ),
    );
  }
}
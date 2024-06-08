import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterapp/core/storage/storage.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';

import '../../../../config/theme/theme_manager.dart';
import '../../../auth/presentation/bloc/auth_bloc.dart';
import '../../../profile/presentation/views/profile_screen.dart';

class FeedScreen extends StatefulWidget {
  const FeedScreen({super.key});

  @override
  State<FeedScreen> createState() => _FeedScreenState();
}

class _FeedScreenState extends State<FeedScreen> {
  File? image;

  Future pickImage() async {
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.gallery);
      if (image == null) return;

      final imagePathObject = File(image.path);
      setState(() {
        this.image = imagePathObject;
      });
    } on PlatformException catch (err) {
      print('failed');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(
        child: BlocBuilder<AuthBloc, AuthState>(
          builder: (context, state) {
            // if (state is ProfPicLoading) {
            //   return const CircularProgressIndicator();
            // } else if (state is ProfPicSuccess) {
            //   return
            // }
            return ListView(
              children: [
                ListTile(
                  leading: const Icon(
                    Icons.person,
                    size: 70,
                  ),
                  trailing: Column(
                    children: [
                      image != null
                          ? TextButton(
                              onPressed: () {
                                context
                                    .read<AuthBloc>()
                                    .add(ChangeProfPic(image!));
                              },
                              child: const Text('Submit'))
                          : TextButton(
                              onPressed: () => pickImage(),
                              child: const Text('Change Pic')),
                    ],
                  ),
                ),
                BlocBuilder<AuthBloc, AuthState>(
                  builder: (context, state) {
                    return Padding(
                      padding: EdgeInsets.symmetric(horizontal: 10),
                      child: ListTile(
                        title: Text('name'),
                        subtitle: InkWell(
                            onTap: () async {
                              String? ownerId = await Storage()
                                  .secureStorage
                                  .read(key: 'userId');

                              Navigator.of(context).push(
                                MaterialPageRoute(
                                  builder: (context) => ProfileScreen(
                                    ownerId: ownerId!,
                                  ),
                                ),
                              );
                            },
                            child: Text('Software Architecth')),
                      ),
                    );
                  },
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    height: 0.5,
                    color: Colors.white,
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      TextButton(
                        onPressed: () {},
                        child: Text('Groups'),
                      ),
                      TextButton(
                        onPressed: () {},
                        child: Text('Events'),
                      ),
                      TextButton(
                        onPressed: () {
                          context.read<AuthBloc>().add(LoggedOut());
                        },
                        child: Text('Log out'),
                      ),
                    ],
                  ),
                )
              ],
            );
          },
        ),
      ),
      appBar: AppBar(
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
            SizedBox(
              height: 700,
            ),
          ],
        ),
      ),
    );
  }
}
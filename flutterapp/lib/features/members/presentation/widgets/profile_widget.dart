import 'dart:io';

import 'package:flutter/material.dart';

class ProfileWidget extends StatelessWidget {
  final String imagePath;

  const ProfileWidget({
    super.key,
    required this.imagePath,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: buildImage(),
    );
  }

  Widget buildImage() {
    final image = NetworkImage(imagePath);

    return ClipOval(
      child: Material(
        color: Colors.transparent,
        child: Ink.image(
          image: image,
          fit: BoxFit.cover,
          width: 100,
          height: 100,
        ),
      ),
    );
  }
}
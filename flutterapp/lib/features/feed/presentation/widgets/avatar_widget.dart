import 'package:flutter/material.dart';
import 'package:flutterapp/core/network/api_urls.dart';

Widget buildAvatar(
    {String? imageUrl, String? avatar, double? width, double? height}) {
  final imagePath = imageUrl != '' ? imageUrl : '${ApiUrls.avatarUrl}/$avatar';

  if (imagePath == null) {
    return Container(
      width: width,
      height: height,
      color: Colors.grey,
      child: const Icon(Icons.person),
    );
  }
  final image = NetworkImage(imagePath);
  return ClipOval(
    child: Material(
      color: Colors.transparent,
      child: Ink.image(
        image: image,
        fit: BoxFit.cover,
        width: width,
        height: height,
      ),
    ),
  );
}
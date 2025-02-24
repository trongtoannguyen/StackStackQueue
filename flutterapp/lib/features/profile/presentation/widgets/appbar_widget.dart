import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutterapp/config/theme/theme_manager.dart';
import 'package:provider/provider.dart';

AppBar buildAppBar(BuildContext context) {
  final icon = CupertinoIcons.moon_stars;

  return AppBar(
    // leading: BackButton(),
    backgroundColor: Colors.transparent,
    elevation: 0,
    actions: [
      Consumer<ThemeService>(builder: (context, ThemeService theme, _) {
        return IconButton(
            onPressed: () {
              theme.toggleTheme();
            },
            icon: Icon(
                theme.darkTheme! ? Icons.sunny : CupertinoIcons.moon_stars));
      })
    ],
  );
}

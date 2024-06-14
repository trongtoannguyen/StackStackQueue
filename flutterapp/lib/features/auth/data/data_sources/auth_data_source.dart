import 'dart:convert';
import 'dart:io';
import 'package:flutterapp/core/exceptions/error.dart';
import 'package:flutterapp/core/storage/storage.dart';
import 'package:flutterapp/core/api_urls.dart';
import 'package:flutterapp/features/auth/domain/entities/user_entity.dart';
import 'package:http/http.dart' as http;

import 'package:flutterapp/features/auth/data/models/user_model.dart';

abstract class AuthDataSource {
  Future<String> handleRegister(
    String email,
    String password,
    String username,
  );
  Future<String> handleLogin(String email, String password);
  Future<UserModel> getUserInfo(String ownerId);
  Future<String> changeProfilePic(File file);
}

const uri = '${ApiUrls.API_BASE_URL}/auth';
const uri1 = '${ApiUrls.API_BASE_URL}/auth/changePic';

class AuthDataSourceImp implements AuthDataSource {
  final http.Client client;

  AuthDataSourceImp({required this.client});
  //---------------------------------------------------------

  @override
  Future<String> handleRegister(
    String email,
    String password,
    String username,
  ) async {
    String response = "Unexpected error";
    try {
      http.Response res = await http.post(
        Uri.parse('$uri/signup'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          'email': email,
          'password': password,
          'username': username,
        }),
      );
      Map jsonResponse = json.decode(res.body);
      print(res.body);
      if (res.statusCode == 201) {
        return "User created successfully";
      } else {
        throw Exception();
      }
    } catch (err) {
      response = err.toString();
    }
    return response;
  }

//---------------------------------------------------------
  @override
  Future<String> handleLogin(String email, String password) async {
    http.Response res = await http.post(
      Uri.parse('$uri/signin'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode({
        'username': email,
        'password': password,
      }),
    );
    Map jsonResponse = json.decode(res.body);
    print(res.body);

    if (res.statusCode == 200) {
      String userId = jsonResponse['username'];
      _saveUserId(userId);
      return jsonResponse['accessToken'];
    } else {
      throw Exception();
    }
  }
  //---------------------------------------------------------

  Future<void> _saveUserId(String userId) async {
    await Storage().secureStorage.write(key: 'userId', value: userId);
  }

  //---------------------------------------------------------

  @override
  Future<UserModel> getUserInfo(String ownerId) async {
    http.Response res = await http.get(
      Uri.parse('$uri/user/$ownerId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );
    Map jsonResponse = json.decode(res.body);
    print(res.body);

    if (res.statusCode == 200) {
      return UserModel.fromJson(jsonResponse);
    } else {
      throw Exception();
    }
  }
  //---------------------------------------------------------

  @override
  Future<String> changeProfilePic(File file) async {
    String res = "Unexpected error";
    try {
      String? ownerId = await Storage().secureStorage.read(key: 'userId');

      if (ownerId == null) {
        throw Exception();
      }

      http.MultipartRequest request = http.MultipartRequest(
        'POST',
        Uri.parse('$uri1'),
      );
      request.files.add(
        await http.MultipartFile.fromPath(
          'image',
          file.path,
        ),
      );
      http.StreamedResponse res = await request.send();
      String resStr = await res.stream.bytesToString();
      print(resStr);
      if (res.statusCode == 200) {
        return resStr;
      } else {
        throw Exception();
      }
    } catch (err) {
      res = err.toString();
    }
    return res;
  }
}
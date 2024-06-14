import 'dart:convert';

import 'package:flutterapp/core/exceptions/error.dart';
import 'package:flutterapp/core/api_urls.dart';

import '../../../../core/storage/storage.dart';
import '../models/discussion_model.dart';
import 'package:http/http.dart' as http;

abstract class DiscussionDataSource {
  Future<String> createDiscussion(String title, String content, int forumId);
  Future<List<DiscussionModel>> getAllDiscussion();
}

const uri = '${ApiUrls.API_BASE_URL}/mobile/discussion';

class DiscussionDataSourceImp implements DiscussionDataSource {
  final http.Client client;

  DiscussionDataSourceImp({required this.client});
  //---------------------------------------------------------

  @override
  Future<String> createDiscussion(
      String title, String content, int forumId) async {
    String response = "Unexpected error";
    try {
      String? ownerId = await Storage().secureStorage.read(key: 'userId');
      print(ownerId);

      if (ownerId == null) {
        throw ServerException('User not found in the storage');
      }
      String? token =
          await Storage().secureStorage.read(key: 'token'); //accessToken
      print(token);

      http.Response res = await http.post(
        Uri.parse('$uri/create'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode({
          'title': title,
          'content': content,
          'forumId': forumId,
        }),
      );
      Map jsonResponse = json.decode(res.body);
      print(res.body);

      if (res.statusCode == 201) {
        return "Discussion created successfully";
      } else {
        throw ServerException('Server error');
      }
    } catch (err) {
      response = err.toString();
    }
    return response;
  }

  //---------------------------------------------------------
  @override
  Future<List<DiscussionModel>> getAllDiscussion() async {
    List<DiscussionModel> discussions = [];
    try {
      http.Response res = await http.get(Uri.parse('$uri/all'));
      List jsonResponse = json.decode(res.body);
      if (res.statusCode == 200) {
        discussions =
            jsonResponse.map((e) => DiscussionModel.fromMap(e)).toList();
        print(discussions);
      } else {
        throw Exception();
      }
    } catch (err) {
      print(err);
    }
    return discussions;
  }
}
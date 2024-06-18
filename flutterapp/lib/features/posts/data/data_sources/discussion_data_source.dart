import 'dart:convert';
import 'package:flutterapp/core/network/api_urls.dart';
import 'package:http/http.dart' as http;

import 'package:flutterapp/core/exceptions/error.dart';
import 'package:flutterapp/core/network/session.dart';

import '../models/comment_model.dart';

abstract class DiscussionDataSource {
  //get all Comments
  Future<List<CommentModel>> getAllCommentsBy(int discussionId);
}

const uri = '${ApiUrls.API_BASE_URL}/mobile/forum';

class DiscussionDataSourceImpl implements DiscussionDataSource {
  final NetworkService client;

  DiscussionDataSourceImpl({required this.client});

  @override
  Future<List<CommentModel>> getAllCommentsBy(int id) async {
    List<CommentModel> comments = [];
    try {
      http.Response res = await client.get('$uri/discussions/$id');
      List jsonResponse = json.decode(res.body);
      print(res.body);
      if (res.statusCode == 200) {
        comments = jsonResponse.map((e) => CommentModel.fromJson(e)).toList();
      } else {
        throw ServerException('Error getAllCommentsBy');
      }
    } catch (err) {
      print('Error getAllCommentsBy: ${err.toString()}');
      throw ServerException(err.toString());
    }
    return comments;
  }
}
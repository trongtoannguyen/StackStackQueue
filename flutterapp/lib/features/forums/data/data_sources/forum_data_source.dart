import 'dart:convert';

import 'package:flutterapp/core/network/api_urls.dart';
import 'package:flutterapp/core/network/session.dart';
import 'package:flutterapp/features/forums/data/models/forum_group_model.dart';

import '../../../../core/exceptions/error.dart';
import '../models/forum_model.dart';
import 'package:http/http.dart' as http;

abstract class ForumDataSource {
  Future<List<ForumModel>> getAllForum();
  Future<List<ForumModel>> getAllForumByGroup(int groupId);

  Future<List<ForumsGroupModel>> getAllForumGroup(); //top heading
}

const uri = '${ApiUrls.API_BASE_URL}/mobile/forum';

class ForumDataSourceImp implements ForumDataSource {
  final NetworkService client;

  ForumDataSourceImp({required this.client});
  //---------------------------------------------------------

  @override
  Future<List<ForumModel>> getAllForum() async {
    List<ForumModel> forums = [];
    try {
      http.Response res = await client.get('$uri/forums-info/all');
      List jsonResponse = json.decode(res.body);
      print(res.body);
      if (res.statusCode == 200) {
        forums = jsonResponse.map((e) => ForumModel.fromJson(e)).toList();
      } else {
        throw ServerException('Error getAllForum');
      }
    } catch (err) {
      print(err.toString());
      throw ServerException(err.toString());
    }
    return forums;
  }

  //---------------------------------------------------------

  @override
  Future<List<ForumModel>> getAllForumByGroup(int id) async {
    List<ForumModel> forums = [];
    try {
      http.Response res = await client.get('$uri/forums-info/$id');
      List jsonResponse = json.decode(res.body);
      print(res.body);
      if (res.statusCode == 200) {
        forums = jsonResponse.map((e) => ForumModel.fromJson(e)).toList();
      } else {
        throw ServerException('Error getAllForumByGroup');
      }
    } catch (err) {
      print('Error getAllForumByGroup: ${err.toString()}');
      throw ServerException(err.toString());
    }
    return forums;
  }

  //---------------------------------------------------------
  @override
  Future<List<ForumsGroupModel>> getAllForumGroup() async {
    List<ForumsGroupModel> groups = [];
    try {
      http.Response res = await client.get('$uri/groups');
      List jsonResponse = json.decode(res.body);
      print(res.body);
      if (res.statusCode == 200) {
        groups = jsonResponse.map((e) => ForumsGroupModel.fromJson(e)).toList();
      } else {
        throw ServerException('Server error');
      }
    } catch (err) {
      throw ServerException(err.toString());
    }
    return groups;
  }
}
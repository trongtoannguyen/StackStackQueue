import 'dart:convert';

import 'package:flutterapp/core/api_urls.dart';

import '../../../../core/exceptions/error.dart';
import '../models/forum_model.dart';
import 'package:http/http.dart' as http;

abstract class ForumDataSource {
  Future<List<ForumModel>> getAllForum();
}

const uri = '${ApiUrls.API_BASE_URL}/mobile/forum';

class ForumDataSourceImp implements ForumDataSource {
  final http.Client client;

  ForumDataSourceImp({required this.client});
  //---------------------------------------------------------

  @override
  Future<List<ForumModel>> getAllForum() async {
    List<ForumModel> forums = [];
    try {
      http.Response res = await http.get(
        Uri.parse('$uri/all'),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );
      List jsonResponse = json.decode(res.body);
      print(res.body);
      if (res.statusCode == 200) {
        forums = jsonResponse.map((e) => ForumModel.fromJson(e)).toList();
      } else {
        throw ServerException('Server error');
      }
    } catch (err) {
      print(err.toString());
      throw ServerException(err.toString());
    }
    return forums;
  }
}
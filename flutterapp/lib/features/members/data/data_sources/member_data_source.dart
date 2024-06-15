import 'dart:convert';

import 'package:flutterapp/core/api_urls.dart';
import 'package:flutterapp/core/exceptions/error.dart';

import '../models/member_model.dart';
import 'package:http/http.dart' as http;

abstract class MemberDataSource {
  Future<List<MemberModel>> getAllMember();
}

const uri = '${ApiUrls.API_BASE_URL}/mobile/member';

class MemberDataSourceImp implements MemberDataSource {
  final http.Client client;

  MemberDataSourceImp({required this.client});
  //---------------------------------------------------------

  @override
  Future<List<MemberModel>> getAllMember() async {
    List<MemberModel> members = [];
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
        for (var member in jsonResponse) {
          members.add(MemberModel.fromMap(member));
        }
        print(members);
      } else {
        print("Error: Server returned");
        throw ServerException('Server error');
      }
    } catch (err) {
      print(err.toString());
      throw ServerException(err.toString());
    }
    return members;
  }

  //---------------------------------------------------------
}
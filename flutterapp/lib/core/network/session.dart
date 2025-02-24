import 'dart:convert';

import 'package:flutterapp/core/network/api_urls.dart';
import 'package:flutterapp/core/storage/storage.dart';
import 'package:http/http.dart' as http;

const uri = '${ApiUrls.API_BASE_URL}/auth';

class NetworkService {
  Future<http.Response> get(String url) async {
    String? accessToken = await getAccessToken();
    http.Response response = await http.get(Uri.parse(url), headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $accessToken',
    });
    //check if the response has error 401
    if (response.statusCode == 401) {
      //handle the error
      String? newAccessToken = await _refreshToken();
      if (newAccessToken != null) {
        // Save new access token
        _saveAccessToken(newAccessToken);

        response = await http.get(Uri.parse(url), headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $accessToken',
        });
      }
    }
    //update cookie
    updateCookie(response);
    return response;
  }

  Future<http.Response> post(String url, dynamic data) async {
    String? accessToken = await getAccessToken();

    http.Response response =
        await http.post(Uri.parse(url), body: data, headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer $accessToken',
    });
    //check if the response has error 401
    if (response.statusCode == 401) {
      //handle the error
      String? newAccessToken = await _refreshToken();
      if (newAccessToken != null) {
        // Save new access token
        _saveAccessToken(newAccessToken);
        // Retry the failed request with the new access token
        response = await http.post(Uri.parse(url), body: data, headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $newAccessToken',
        });
      }
    }
    //update cookie
    updateCookie(response);
    return response;
  }

  void updateCookie(http.Response response) async {
    String? rawCookie = response.headers['set-cookie'];
    if (rawCookie != null) {
      await Storage().secureStorage.write(key: 'cookies', value: rawCookie);
      // int index = rawCookie.indexOf(';');
      // headers['cookie'] =
      //     (index == -1) ? rawCookie : rawCookie.substring(0, index);
    }
  }

  Future<String?> _refreshToken() async {
    String? cookies = await Storage().secureStorage.read(key: 'cookies');

    try {
      final response =
          await http.post(Uri.parse('$uri/refreshtoken'), headers: {
        'Cookie': cookies ?? '',
      });
      if (response.statusCode == 200) {
        final Map body = json.decode(response.body);
        String? newAccessToken = body['accessToken'];
        //update cookie
        // updateCookie(response);
        return newAccessToken;
      }
    } catch (e) {
      // Handle errors (e.g., log them, rethrow them, etc.)
      print(e);
    }
    return null;
  }

  Future<void> _saveAccessToken(String accessToken) async {
    await Storage().secureStorage.write(key: 'token', value: accessToken);
  }

  //get access token
  Future<String?> getAccessToken() async {
    return await Storage().secureStorage.read(key: 'token');
  }
}
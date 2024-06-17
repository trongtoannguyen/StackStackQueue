import 'dart:convert';
import 'dart:io';

abstract class ProfileDataSource {
  Future<List<String>> handlegetPro(
    String id,
    String first_name,
    String last_name,
    String email,
    String bio,
    String image,
    String birth_date,
    String gender,
    String phone,
    String profile_banner,
  );
  Future<String> handlegetAllPro(String id, String email);

}

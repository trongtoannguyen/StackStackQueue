package com.springboot.app.accounts.service;

import com.springboot.app.accounts.dto.responce.MobileMemberResponse;
import com.springboot.app.accounts.dto.responce.MobileUserInfoResponse;
import com.springboot.app.dto.response.ServiceResponse;

import java.util.List;

public interface MobileUserService {

	ServiceResponse<List<MobileMemberResponse>> getAllMembers();

	ServiceResponse<MobileUserInfoResponse> getMemberByUsername(String username);
}

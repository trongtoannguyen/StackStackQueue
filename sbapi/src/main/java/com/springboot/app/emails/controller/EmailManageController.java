package com.springboot.app.emails.controller;

import com.springboot.app.dto.response.AckCodeType;
import com.springboot.app.dto.response.ObjectResponse;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.emails.entity.EmailOption;
import com.springboot.app.emails.service.EmailOptionsService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/email-manage")
public class EmailManageController {
	private static final Logger logger = LoggerFactory.getLogger(EmailManageController.class);


	private final EmailOptionsService emailOptionService;

	@Autowired
	public EmailManageController(EmailOptionsService emailOptionService) {
		this.emailOptionService = emailOptionService;
	}

	@GetMapping
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ObjectResponse> getEmailOptionById() {
		Long id = 1L;
		logger.info("Get email option by id {}", id);
		ServiceResponse<EmailOption> response = emailOptionService.getEmailOptionById(id);
		if(response.getAckCode() != AckCodeType.SUCCESS) {
			return ResponseEntity.badRequest().body(new ObjectResponse("400",response.getMessages().getFirst(),null));
		}
		return ResponseEntity.ok(new ObjectResponse("200","Email option retrieved",response.getDataObject()));
	}

	@PostMapping("/add")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ObjectResponse> addEmailOption(@Valid @RequestBody EmailOption emailOption) {
		logger.info("Add email option");
		ServiceResponse<EmailOption> response = emailOptionService.saveEmailOption(emailOption);
		if(response.getAckCode() != AckCodeType.SUCCESS) {
			return ResponseEntity.badRequest().body(new ObjectResponse("400",response.getMessages().getFirst(),null));
		}
		return ResponseEntity.ok(new ObjectResponse("201","Email option added",response.getDataObject()));
	}

	@PutMapping("/update")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ObjectResponse> updateEmailOption(@Valid @RequestBody EmailOption emailOption) {
		Long id = 1L;
		logger.info("Update email option by id {}", id);
		ServiceResponse<Void> response = emailOptionService.updateEmailOption(id, emailOption);
		if(response.getAckCode() != AckCodeType.SUCCESS) {
			return ResponseEntity.badRequest().body(new ObjectResponse("400",response.getMessages().getFirst(),null));
		}
		return ResponseEntity.ok(new ObjectResponse("200","Email option updated",null));
	}

}

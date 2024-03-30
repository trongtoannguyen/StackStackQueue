package com.springboot.app.accounts.google;

import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.enumeration.ProviderName;
import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProvider extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Enumerated(EnumType.STRING)
	private ProviderName providerName;

	private String providerCode;

	private User user;
}

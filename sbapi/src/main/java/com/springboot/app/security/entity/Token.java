package com.springboot.app.security.entity;

import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Token extends BaseEntity{
	@PrePersist
	public void setExpirationDate(){
		this.expirationDate = LocalDateTime.now().plusDays(1);
		this.available = true;
	}
	@PreUpdate
	public void updateExpirationDate(){
		this.expirationDate = LocalDateTime.now().plusDays(1);
	}
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String token;

	@Column(name = "expiration_date",columnDefinition = "DATETIME")
	private LocalDateTime expirationDate;

	private boolean available;

//	@ManyToOne(fetch = FetchType.LAZY)
//	@JoinColumn(name = "user_id")
//	private User user;
}

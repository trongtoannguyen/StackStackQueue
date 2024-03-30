package com.springboot.app.discussions.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "file_info")
@Data
public class FileInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name", length = 200)
	private String name;

	@Column(name = "content_type", length = 200)
	private String contentType;

	@Column(name = "url", length = 200)
	private String path;


}

package com.springboot.app.accounts.entity;

import com.springboot.app.accounts.dto.responce.AccountInfoResponse;
import com.springboot.app.forums.entity.CommentInfo;
import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name="user_stats")
@Data
@NoArgsConstructor
public class UserStat extends BaseEntity {

	@PrePersist
	public void prePersist() {
		LocalDateTime now = LocalDateTime.now();
		this.setCreatedAt(now);
		this.setUpdatedAt(now);
	}

	@PreUpdate
	public void preUpdate() {
		this.setUpdatedAt(java.time.LocalDateTime.now());
	}

	@Id
	@GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name="last_comment_info_id",foreignKey = @ForeignKey(name = "FK_USER_STAT_LAST_COMMENT_INFO"))
	private CommentInfo lastComment; // info about the last comment in the forum, use for display

	@Column(name="comment_count")
	private long commentCount;

	@Column(name="discussion_count")
	private long discussionCount; // number of discussions created by the user

	@Column(name="reputation")
	private long reputation;

	@Column(name="profile_viewed")
	private long profileViewed;

	@Column(name="last_login")
	private LocalDateTime lastLogin;

	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name="user_badges",
			joinColumns = {@JoinColumn(name="user_id", foreignKey = @ForeignKey(name="FK_USER_BADGES_USER_ID"))},
			inverseJoinColumns = {@JoinColumn(name="badge_id", foreignKey = @ForeignKey(name="FK_USER_BADGES_BADGE_ID"))},
			indexes = {@Index(name="IDX_USER_BADGES", columnList = "USER_ID,BADGE_ID")})
	private List<Badge> badges;


	public void addReputation(long value) {
		this.reputation += value;
	}

	public void addCommentCount(long value) {
		this.commentCount += value;
	}

	public void addDiscussionCount(long value) {
		this.discussionCount += value;
	}

	public void addProfileViewed(long value) {
		this.profileViewed += value;
	}

	public void addBadge(Badge badge) {
		this.badges.add(badge);
	}

	public void removeBadge(Badge badge) {
		this.badges.remove(badge);
	}







}

package com.springboot.app.discussions.entity;

import com.springboot.app.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="comment_votes")
public class CommentVote extends BaseEntity {
	@Id
	@GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
	private Long id;

	@Column(name="voter_up_count")
	private int voterUpCount;

	@Column(name="voter_down_count")
	private int voterDownCount;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinTable(
			name="comment_vote_id",
			joinColumns = {@JoinColumn(name="comment_vote_id", foreignKey = @ForeignKey(name="FK_COMMENT_VOTE_COMMENT_ID"))},
			inverseJoinColumns = {@JoinColumn(name="vote_id", foreignKey = @ForeignKey(name="FK_COMMENT_VOTE_VOTE_ID"))},
			indexes = {@Index(name="IDX_COMMENT_VOTE_VOTE", columnList = "COMMENT_VOTE_ID,VOTE_ID")})
	private Set<Vote> votes;


}

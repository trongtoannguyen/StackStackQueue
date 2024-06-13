package com.springboot.app.config;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.springboot.app.accounts.entity.AvatarOption;
import com.springboot.app.accounts.entity.Person;
import com.springboot.app.accounts.entity.Role;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.entity.UserStat;
import com.springboot.app.accounts.enumeration.AccountStatus;
import com.springboot.app.accounts.enumeration.RoleName;
import com.springboot.app.accounts.repository.RoleRepository;
import com.springboot.app.accounts.repository.UserRepository;
import com.springboot.app.bagdes.Badge;
import com.springboot.app.bagdes.BadgeService;
import com.springboot.app.dto.response.ServiceResponse;
import com.springboot.app.emails.entity.EmailOption;
import com.springboot.app.emails.entity.RegistrationOption;
import com.springboot.app.emails.repository.EmailOptionRepository;
import com.springboot.app.forums.dto.ForumDTO;
import com.springboot.app.forums.entity.Comment;
import com.springboot.app.forums.entity.CommentOption;
import com.springboot.app.forums.entity.Discussion;
import com.springboot.app.forums.entity.DiscussionStat;
import com.springboot.app.forums.entity.Forum;
import com.springboot.app.forums.service.DiscussionService;
import com.springboot.app.forums.service.ForumService;
import com.springboot.app.service.GenericService;
import com.springboot.app.tags.Tag;
import com.springboot.app.tags.TagService;

@Configuration
public class DatabaseInit {
	private static final Logger logger = LoggerFactory.getLogger(DatabaseInit.class);

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private ForumService forumService;

	@Autowired
	private DiscussionService discussionService;

	@Autowired
	private TagService tagService;

	@Autowired
	private GenericService genericService;

	@Autowired
	private EmailOptionRepository emailOptionRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private BadgeService badgeService;

	@Bean
	CommandLineRunner initDatabase(RoleRepository roleRepository, UserRepository userRepository) {
		return new CommandLineRunner() {
			@Override
			public void run(String... args) throws Exception {
				logger.info("Database is running...");
				addRoles(roleRepository);
				addAdmin(userRepository, roleRepository);

				createRegistrationOption();
				createEmailOption();
				createCommentOption();
				createAvatarOption();
				createBadgeDefault();
			}
		};
	}

	private void addRoles(RoleRepository roleRepository) {
		List<Role> roles = roleRepository.findAll();
		if (!roles.isEmpty()) {
			return;
		}
		roleRepository.save(new Role(1, RoleName.ROLE_ADMIN));
		roleRepository.save(new Role(2, RoleName.ROLE_USER));
		roleRepository.save(new Role(3, RoleName.ROLE_MODERATOR));
		logger.info("Roles added to the database.");
	}

	private void addAdmin(UserRepository userRepository, RoleRepository roleRepository) {
		List<Role> roleList = roleRepository.findAll();
		if (roleList.isEmpty()) {
			return;
		}
		List<User> users = userRepository.findAll();
		if (!users.isEmpty()) {
			return;
		}
		User ad = new User();

		ad.setUsername("admin");
		ad.setEmail("admin@gmail.com");
		ad.setPassword(encoder.encode("Admin@123"));

		Set<Role> r = roleList.stream().collect(HashSet::new, HashSet::add, HashSet::addAll);
		ad.setRoles(r);
		ad.setAccountStatus(AccountStatus.ACTIVE);

		Person p = new Person();
		p.setFirstName("System");
		p.setLastName("Admin");
		p.setPhone("1234567890");
		p.setAddress("Ho Chi Minh City, Vietnam");
		p.setBio("Admin Bio");

		ad.setPerson(p);

		UserStat userStat = new UserStat();
		userStat.setCreatedBy(ad.getUsername());
		ad.setStat(userStat);

		userRepository.save(ad);
		logger.info("Account of admin added to th database.");

//		Forum forum = createAnouncementsForum(ad);
//		Discussion discussion = createWelcomeDiscussion(ad, forum);
//		createBulletinTag(discussion);

	}

	private void createBulletinTag(Discussion discussion) {
		Tag tag = new Tag();
		tag.setLabel("Bulletin");
		tag.setColor("1e90ff");

		tagService.createNewTag(tag);

		discussion.setTags(List.of(tag));
		genericService.updateEntity(discussion);
		logger.info("Bulletin tag created.");
	}

	private Forum createAnouncementsForum(User user) {
		Forum forum = new Forum();
		forum.setTitle("Announcements");
		forum.setDescription("Announcements from the forum administrators");
		forum.setCreatedBy(user.getUsername());
		forum.setActive(false);
		forum.setIcon("fa fa-bullhorn");
		forum.setColor("ff7e00");

		ForumDTO forumdto = forumService.addForum(forum, null, user.getUsername()).getDataObject();
		forum = modelMapper.map(forumdto, Forum.class);

		logger.info("Announcements forum created.");
		return forum;
	}

	private Discussion createWelcomeDiscussion(User user, Forum forum) {
		Discussion discussion = new Discussion();
		discussion.setForum(forum);
		discussion.setCreatedBy(user.getUsername());
		discussion.setStat(new DiscussionStat());
		discussion.setSticky(true);
		discussion.setImportant(true);
		discussion.setTitle("Welcome to the forum");

		Comment comment = new Comment();
		comment.setContent("Welcome to the forum. This is the first discussion created by the system.");

		discussion = discussionService.addDiscussion(discussion, comment, user.getUsername(), Collections.emptyList(),
				Collections.emptyList()).getDataObject();

		logger.info("Welcome discussion created.");
		return discussion;
	}

	private void createEmailOption() {
		try {
			EmailOption emailOption = emailOptionRepository.findById(1L).orElse(null);
			if (emailOption != null) {
				logger.info("Email option already exists.");
			} else {
				emailOption = new EmailOption();
				emailOption.setId(1L);
				emailOption.setCreatedBy("admin");
				emailOption.setHost("smtp.gmail.com");
				emailOption.setPort(587);
				emailOption.setUsername("techforum1368@gmail.com");
				emailOption.setPassword("hqsjdkrlaujgcxrk");
				emailOption.setTlsEnable(true);
				emailOption.setAuthentication(true);

				emailOptionRepository.save(emailOption);
				logger.info("Email option created.");
			}
		} catch (Exception e) {
			logger.error("Error creating email option: " + e.getMessage());
		}
	}

	public void createRegistrationOption() {
		RegistrationOption registrationOption = genericService.getEntity(RegistrationOption.class, 1L).getDataObject();
		if (registrationOption != null) {
			logger.info("Registration option already exists.");
		} else {
			logger.info("Registration option created.");
			registrationOption = new RegistrationOption();
			registrationOption.setId(1L);
			registrationOption.setCreatedBy("admin");
			registrationOption.setUpdatedBy("admin");
			registrationOption.setEnableEmailConfirm(true);

			registrationOption.setRegistrationEmailSubject(REGISTRATION_EMAIL_SUBJECT);
			registrationOption.setRegistrationEmailTemplate(REGISTRATION_EMAIL_TEMPLATE);
			registrationOption.setPasswordResetEmailSubject(PASSWORD_RESET_EMAIL_SUBJECT);
			registrationOption.setPasswordResetEmailTemplate(PASSWORD_RESET_EMAIL_TEMPLATE);

			registrationOption.setCreatedAt(LocalDateTime.now());
			genericService.saveEntity(registrationOption);
		}
	}

	/*
	 * Default values on first time system initialization
	 */
	private static final String REGISTRATION_EMAIL_SUBJECT = "Confirm account registration at TechForum";

	private static final String REGISTRATION_EMAIL_TEMPLATE = "<p><strong>Hi #username</strong>,</p>"
			+ "<p>This email&nbsp;<strong>#email</strong>&nbsp;has been used for account registration on <strong>TechForum</strong>.</p>"
			+ "<p>If that wasn&#39;t your intention, kindly ignore this email. Otherwise, please lick on this link #confirm-url to activate your account.</p>"
			+ "<p>Regards,</p>";

	private static final String PASSWORD_RESET_EMAIL_SUBJECT = "Password reset requested at TechForum";

	private static final String PASSWORD_RESET_EMAIL_TEMPLATE = "<p><strong>Hi #username</strong>,</p>"
			+ "<p>Here is the <strong>#reset-url</strong> to reset your password in <strong>TechForum</strong></p>"
			+ "<p>If you didn&#39;t request this, kindly ignore this email.</p>" + "<p>Regards,</p>";

	private void createCommentOption() {
		CommentOption commentOption = genericService.getEntity(CommentOption.class, 1L).getDataObject();
		if (commentOption != null) {
			logger.info("Comment option already exists.");
		} else {
			commentOption = new CommentOption();
			commentOption.setId(1L);
			commentOption.setCreatedBy("admin");
			commentOption.setUpdatedBy("admin");

			// default values
			commentOption.setMinCharDiscussionTitle(1);
			commentOption.setMaxCharDiscussionTitle(80);
			commentOption.setMinCharDiscussionContent(1);
			commentOption.setMaxCharDiscussionContent(10000 * 1024); // 10,2400KB ~ 10MB
			commentOption.setMaxDiscussionThumbnail(5);
			commentOption.setMaxDiscussionAttachment(5);
			commentOption.setMaxByteDiscussionThumbnail(5000 * 1024); // 5120KB ~ 5MB
			commentOption.setMaxByteDiscussionAttachment(5000 * 1024); // 5120KB ~ 5MB
			commentOption.setAllowDiscussionTitleEdit(true);

			commentOption.setMinCharCommentTitle(1);
			commentOption.setMaxCharCommentTitle(80);
			commentOption.setMinCharCommentContent(1);
			commentOption.setMaxCharCommentContent(10000 * 1024); // 10,000KB ~ 10MB
			commentOption.setMaxCommentThumbnail(3);
			commentOption.setMaxCommentAttachment(3);
			commentOption.setMaxByteCommentThumbnail(5000 * 1024); // 1000KB ~ 5MB
			commentOption.setMaxByteCommentAttachment(5000 * 1024); // 1000KB ~ 5MB
			commentOption.setAllowCommentEdit(true);

			genericService.saveEntity(commentOption);
			logger.info("Comment option created.");
		}
	}

	private void createAvatarOption() {

		AvatarOption avatarOption = genericService.getEntity(AvatarOption.class, 1L).getDataObject();
		if (avatarOption != null) {
			logger.info("Avatar option already exists.");
		} else {
			avatarOption = new AvatarOption();
			avatarOption.setId(1L);
			avatarOption.setMaxFileSize(5 * 1024); // ~500KB
			avatarOption.setMaxWidth(800);
			avatarOption.setMaxHeight(800);

			avatarOption.setCreatedBy("admin");
			avatarOption.setUpdatedBy("admin");
			genericService.saveEntity(avatarOption);
			logger.info("Avatar option created.");
		}
	}

	private void createBadgeDefault() {
		ServiceResponse<List<Badge>> response = badgeService.getAllBadges();
		if (response.getDataObject() != null && !response.getDataObject().isEmpty()) {
			logger.info("Badge default already exists.");
		} else {
			logger.info("Badge default not exists. Create badge default.");
			badgeService.createBadge();
			badgeService.createTraineeBadge();
			badgeService.createBronzeBadge();
			badgeService.createSilverBadge();
			badgeService.createGoldBadge();
			badgeService.createPlatinumBadge();
			logger.info("Badge default created.");
		}
	}

}

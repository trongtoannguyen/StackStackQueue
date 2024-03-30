package com.springboot.app.config;

import com.springboot.app.accounts.enumeration.AccountStatus;
import com.springboot.app.accounts.entity.Role;
import com.springboot.app.accounts.enumeration.RoleName;
import com.springboot.app.accounts.entity.User;
import com.springboot.app.accounts.repository.RoleRepository;
import com.springboot.app.accounts.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Set;

@Configuration
public class Database {
	private static final Logger logger = LoggerFactory.getLogger(Database.class);

	@Autowired
	PasswordEncoder encoder;


	@Bean
	CommandLineRunner initDatabase(RoleRepository roleRepository, UserRepository userRepository) {
		return new CommandLineRunner() {
			@Override
			public void run(String... args) throws Exception {
				logger.info("Database is running...");
				List<Role> roles=roleRepository.findAll();
				if(roles.isEmpty()){
					roleRepository.save(new Role(1,RoleName.ROLE_ADMIN));
					roleRepository.save(new Role(2,RoleName.ROLE_USER));
					roleRepository.save(new Role(3,RoleName.ROLE_MODERATOR));
					logger.info("Roles added to the database.");
				}
				List<User> users=userRepository.findAll();
				if(users.isEmpty()){
					User ad = new User(
							"admin@gmail.com",
							"admin@gmail.com",
							encoder.encode("admin@gmail.com"),
							AccountStatus.valueOf("ACTIVE")
							);
					Set<Role> r = Set.of(roleRepository.findByName(RoleName.ROLE_ADMIN).get());
					ad.setRoles(r);
					userRepository.save(ad);
					logger.info("Account of admin added to th database.");
				}
			}
		};
	}

}

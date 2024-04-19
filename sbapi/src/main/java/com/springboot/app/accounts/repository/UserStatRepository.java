package com.springboot.app.accounts.repository;

import com.springboot.app.accounts.entity.UserStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserStatRepository extends JpaRepository<UserStat, Long> {
}

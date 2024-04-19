package com.springboot.app.accounts.repository;

import com.springboot.app.accounts.entity.DeletedUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletedUserRepository extends JpaRepository<DeletedUser, Long> {
}

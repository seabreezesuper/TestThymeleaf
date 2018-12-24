package com.example.material.dao;

import org.springframework.stereotype.Component;

import com.example.material.entity.User;

public interface UserDao {

	public User getUser(String userId,String password);
}

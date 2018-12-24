package com.example.material.mapper;

import com.example.material.entity.User;

public interface UserMapper {
	User getUser(String userId,String password);
}

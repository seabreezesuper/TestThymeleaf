package com.example.material.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.material.dao.MybatisUserDaoImpl;
import com.example.material.entity.User;

@Component
public class LoginByUserPasswordServiceImpl implements LoginService {

	
	@Autowired
	MybatisUserDaoImpl userDao;
	
	@Override
	public User login(String[] args) {
		
		String userId = args[0];
		String password = args[1];
		
		User user = userDao.getUser(userId,password);
		
		return user;
	}

}

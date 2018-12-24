package com.example.material.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.material.common.MTECommon;
import com.example.material.entity.User;
import com.example.material.form.LoginForm;
import com.example.material.service.LoginByUserPasswordServiceImpl;

@RestController
@EnableAutoConfiguration
public class MainController implements WebMvcConfigurer{
	
	@Autowired
	LoginByUserPasswordServiceImpl loginByUserPasswordServiceImpl;

	@RequestMapping(MTECommon.STR_REQUEST_HOME)
	public ModelAndView home(HttpServletRequest request) {

		return new ModelAndView(MTECommon.STR_VIEW_LOGIN);
	}
	

	@PostMapping(MTECommon.STR_REQUEST_LOGIN)
	public ModelAndView login(@Valid LoginForm loginForm, BindingResult bindingResult, HttpServletRequest request,
			HttpSession httpSession) throws IOException, InterruptedException {
		
		String userId = loginForm.getUserId();
		String password = loginForm.getPassword();

		String[] arg = { userId, password };
		User user = loginByUserPasswordServiceImpl.login(arg);
		
		if (user != null) {

			// 设置用户名到session
			String userName = user.getUserName();
			
			System.out.println(userName);
			request.setAttribute(MTECommon.STR_LOGINUSERNAME, userName);

			return new ModelAndView(MTECommon.STR_VIEW_MENU); //登陆成功，跳转到菜单页面
		} else {
			
			request.setAttribute(MTECommon.STR_ERRMSG, MTECommon.STR_CN_LOGIN_FAILED);
			return new ModelAndView(MTECommon.STR_VIEW_ERROR);// 失败页面
		}
		
	}
}

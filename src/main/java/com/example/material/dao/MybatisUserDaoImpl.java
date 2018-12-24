package com.example.material.dao;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.stereotype.Component;

import com.example.material.common.MTECommon;
import com.example.material.entity.User;
import com.example.material.mapper.UserMapper;

@Component
public class MybatisUserDaoImpl implements UserDao {

	@Override
	public User getUser(String userId,String password) {
		User user = null;
		SqlSession session = null;

		try {
			String resource = MTECommon.STR_XML_MYBATIS_CONFIG;
			InputStream in = Resources.getResourceAsStream(resource);
			SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(in);

			session = sqlSessionFactory.openSession();
			
			// 得到用户对象
			UserMapper mapper = session.getMapper(UserMapper.class);
			user = mapper.getUser(userId,password);
			
			//System.out.println(user.getUserName());

			session.commit();
		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			session.close();
		}

		return user;
	}

}

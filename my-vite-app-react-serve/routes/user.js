const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// 用户数据路径
const usersFilePath = path.join(__dirname, '../data/users.json');

// 注册新用户
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '用户名和密码不能为空' });
  }

  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: '用户名已存在' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, password: hashedPassword };
  users.push(newUser);

  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  res.status(201).json({ message: '注册成功' });
});

// 用户登录
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: '用户名或密码错误' });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ message: '用户名或密码错误' });
  }

  // 生成 JWT
  const token = jwt.sign({ userId: user.username }, 'secret_key', { expiresIn: '1h' });
  res.json({ message: '登录成功', token });
});

module.exports = router;

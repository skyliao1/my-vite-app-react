const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/api');
const userRoutes = require('./routes/user'); // 新增用户路由
const app = express();
const PORT = 5000;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 路由
app.use('/api', productRoutes);
app.use('/auth', userRoutes); // 用户相关路由

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

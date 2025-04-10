const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// 商品数据路径
const productsFilePath = path.join(__dirname, '../data/products.json');
// 购物车数据路径
const cartFilePath = path.join(__dirname, '../data/cart.json');
// 获取购物车
router.get('/cart', (req, res) => {
  const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));
  res.json(cart);
});
// 获取所有商品
router.get('/products', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  res.json(products);
});

// 模拟购物车接口 - 添加商品到购物车
let cart = []; // 模拟内存中的购物车

router.post('/cart/add', (req, res) => {
  const { productId } = req.body;
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ message: '商品未找到' });
  }

  const existingItem = cart.find((item) => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  res.json(cart);
});

// 模拟购物车接口 - 移除商品
router.post('/cart/remove', (req, res) => {
  const { productId } = req.body;

  cart = cart
    .map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
    .filter((item) => item.quantity > 0);

  res.json(cart);
});

// 获取购物车内容
router.get('/cart', (req, res) => {
  res.json(cart);
});
// 获取所有分类
router.get('/categories', (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
  const categories = [...new Set(products.map((p) => p.category))]; // 提取唯一分类
  res.json(categories);
});

module.exports = router;

#!/usr/bin/env node
const fetch = require('node-fetch');
const express = require('express');
const op = require('./action');
const router = require('./router');
const baseUrl = 'https://movie.douban.com/j/search_subjects';
const app = express();
const port = 3000;

const start = () => {
  fetchDouban()
};
const fetchDouban = () => {
  fetch(`${baseUrl}?type=movie&tag=%E7%83%AD%E9%97%A8}&page_limit=100&page_start=0`)
  .then(response => response.json())
  .then(data => { op.opdata(data) })
  .catch(err => op.err(err))
};
app.set('trust proxy', 'loopback');
app.use((req, res, next) => {
  console.log('init................');
  next(); // 如果不把控制权交出，请求就会挂起， 目前不清楚 怎么重新启用挂起的请求。
})
app.use('/about', router); // router
app.set('view engine', 'pug'); // 设置默认view 引擎为pug 即jade
app.use('/', (req, res, next) => next()); // 中间件
app.get('/', (req, res) => {
  start();
  res.render('index', {
    title: 'Hey',
    message: 'Welcome'
  });
});
app.use('/index/:id', (req, res, next) => next());
app.get('/index/:id', (req, res) => res.send('index'));

app.listen(port, () => { console.log(`listening on port ${port}`); });

var express = require('express');
//加载express的路由模块
var models=require('../db/model');
var markdown = require('markdown').markdown;


var router = express.Router();
//指向首页
/* GET home page. */
router.get('/', function(req, res, next) {
  //populate("user")把user属性转换为对象  exec执行匿名函数
  models.Article.find({}).populate('user').exec(function (err,articles) {
    // console.log(articles);
    articles.forEach(function (article) {
      article.content = markdown.toHTML(article.content);
    });
    res.render('index', { title: '博客',articles:articles });
  });

});

module.exports = router;

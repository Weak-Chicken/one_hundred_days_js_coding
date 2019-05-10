// var express = require('express');
// var superagent = require('superagent');
// var cheerio = require('cheerio');

import express from 'express';
import superagent from 'superagent';
import cheerio from 'cheerio';

var app = express();

app.get('/', function (req, res, next) {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get('https://cnodejs.org/')
      .end(function (err, sres) {
        // 常规的错误处理
        if (err) {
          return next(err);
        }
        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是 jquery 的内容了
        var $ = cheerio.load(sres.text);
        var topicItems = [];
        $('#topic_list .topic_title').each(function (idx, element) {
          var $element = $(element);
          topicItems.push({
            title: $element.attr('title'),
            href: $element.attr('href'),
          });
        });

        var authorItems = [];
        $('#topic_list .user_avatar img').each(function (idx, element) {
          var $author = $(element);
          authorItems.push({
            author: $author.attr('title')
          })
        })

        // console.log(topicItems);
        // console.log(authorItems);

        topicItems.forEach((item,index) => {
          item['author'] = authorItems[index];
        });
  
        res.send(topicItems);
      });
  });

app.listen(3000, function(req, res) {
    console.log('app is running at port 3000');
});
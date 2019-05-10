// var superagent = require('superagent');
// var cheerio = require('cheerio');
// var eventproxy = require('eventproxy');
// var url = require('url');

import superagent from 'superagent';
import cheerio from 'cheerio';
import eventproxy from 'eventproxy';
import url from 'url';

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
  .end(function (err, res) {
    if (err) {
      return console.error(err);
    }
    var topicUrls = [];
    var $ = cheerio.load(res.text);
    // 获取首页所有的链接
    $('#topic_list .topic_title').each((idx, element) => {
      var $element = $(element);
      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
      // 我们用 url.resolve 来自动推断出完整 url，变成
      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
      var href = url.resolve(cnodeUrl, $element.attr('href'));
      topicUrls.push(href);
    });

    console.log(topicUrls);

    let ep = new eventproxy();

    ep.after('topic_html', topicUrls.length, (topics) => {
      topics = topics.map((topic, index, arr) => {
        let topicUrl = topic[0];
        let topicHtml = topic[1];
        let authorHtml = topic[2];

        var $ = cheerio.load(topicHtml);
        var $2 = cheerio.load(authorHtml);
        return ({
          title: $('.topic_full_title').text().trim(),
          href: topicUrl,
          comment1: $('.reply_content').eq(0).text().trim(),
          author1: $('.reply_author').eq(0).text(),
          score1: $2('.user_profile .unstyled .big').eq(0).text(),
        });
      });

      console.log(topics);
    });

    topicUrls.forEach((item, index) => {
      setTimeout(() => {      
        superagent.get(item)
        .end((err, res) => {
          if (err) {
              return console.error(err);
          }
          console.log('fetch ' + item + ' successful');

          var $ = cheerio.load(res.text);
          var author1Url;
          console.log($('.reply_author').eq(0).attr('href'));
          if (!(typeof($('.reply_author').eq(0).attr('href')) == "undefined")) {
            author1Url = url.resolve(cnodeUrl, $('.reply_author').eq(0).attr('href'));
            superagent.get(author1Url)
              .end((err, authorRes) => {
                if (err) {
                  return console.error(err);
                }

            ep.emit('topic_html', [item, res.text, authorRes.text]);
            });
          } else {
            ep.emit('topic_html', [item, res.text, '']);
          }
          // console.log(author1Url);
        });}, index * 100);
    })
  });

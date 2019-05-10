'use strict';

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _eventproxy = require('eventproxy');

var _eventproxy2 = _interopRequireDefault(_eventproxy);

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var superagent = require('superagent');
// var cheerio = require('cheerio');
// var eventproxy = require('eventproxy');
// var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

_superagent2.default.get(cnodeUrl).end(function (err, res) {
  if (err) {
    return console.error(err);
  }
  var topicUrls = [];
  var $ = _cheerio2.default.load(res.text);
  // 获取首页所有的链接
  $('#topic_list .topic_title').each(function (idx, element) {
    var $element = $(element);
    // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
    // 我们用 url.resolve 来自动推断出完整 url，变成
    // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
    // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
    var href = _url2.default.resolve(cnodeUrl, $element.attr('href'));
    topicUrls.push(href);
  });

  console.log(topicUrls);

  var ep = new _eventproxy2.default();

  ep.after('topic_html', topicUrls.length, function (topics) {
    topics = topics.map(function (topic, index, arr) {
      var topicUrl = topic[0];
      var topicHtml = topic[1];
      var authorHtml = topic[2];

      var $ = _cheerio2.default.load(topicHtml);
      var $2 = _cheerio2.default.load(authorHtml);
      return {
        title: $('.topic_full_title').text().trim(),
        href: topicUrl,
        comment1: $('.reply_content').eq(0).text().trim(),
        author1: $('.reply_author').eq(0).text(),
        score1: $2('.user_profile .unstyled .big').eq(0).text()
      };
    });

    console.log(topics);
  });

  topicUrls.forEach(function (item, index) {
    setTimeout(function () {
      _superagent2.default.get(item).end(function (err, res) {
        if (err) {
          return console.error(err);
        }
        console.log('fetch ' + item + ' successful');

        var $ = _cheerio2.default.load(res.text);
        var author1Url;
        console.log($('.reply_author').eq(0).attr('href'));
        if (!(typeof $('.reply_author').eq(0).attr('href') == "undefined")) {
          author1Url = _url2.default.resolve(cnodeUrl, $('.reply_author').eq(0).attr('href'));
          _superagent2.default.get(author1Url).end(function (err, authorRes) {
            if (err) {
              return console.error(err);
            }

            ep.emit('topic_html', [item, res.text, authorRes.text]);
          });
        } else {
          ep.emit('topic_html', [item, res.text, '']);
        }
        // console.log(author1Url);
      });
    }, index * 100);
  });
});
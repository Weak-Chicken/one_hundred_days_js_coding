<template>
    <div class="posts">
        <ul>
          <li v-for="post in posts" v-bind:key="post.id">
            <img v-bind:src="post.author.avatar_url" v-bind:title="post.author.loginname">
            <span>
              {{ post.reply_count }}/{{ post.visit_count }}
            </span>
            span.to
            {{post.title}}
            {{ post.last_reply_at}}
            
          </li>
        </ul>
    </div>
</template>

<script>
// import axios from 'axios';

export default {
    name: 'posts',

    data() {
        return {
            posts: [
                    {
                        "id": "5cbfd9aca86ae80ce64b3175",
                        "author_id": "4f447c2f0a8abae26e01b27d",
                        "tab": "share",
                        "content": "<div class=\"markdown-text\"><h2>前言</h2>\n<p>时隔一年，Node.js 12 如约而至，正式发布第一个 <a href=\"https://github.com/nodejs/Release\">Current</a> 版本。</p>\n<p>该版本带来了诸如：</p>\n<ul>\n<li>V8 更新带来好多不错的特性。</li>\n<li>HTTP 解析速度提升。</li>\n<li>启动速度大幅提升。</li>\n<li>更好的诊断报告和堆分析工具。</li>\n<li>ESM 模块更新。</li>\n</ul>\n<p>原文地址：<a href=\"https://medium.com/\">https://medium.com/</a><a href=\"/user/nodejs\">@nodejs</a>/introducing-node-js-12-76c41a1b3f3f\n语雀地址：<a href=\"https://www.yuque.com/egg/nodejs/nodejs-12\">https://www.yuque.com/egg/nodejs/nodejs-12</a></p>\n<h2>LTS vs Current</h2>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/84182/1556074709431-35af45b8-ec7a-4a81-83d8-155eb519f04a.png#align=left&amp;display=inline&amp;height=389&amp;name=image.png&amp;originHeight=500&amp;originWidth=960&amp;size=58313&amp;status=done&amp;width=746\" alt=\"image.png\"></p>\n<p>如果你不了解 Node.js 的  Long Term Support 发布策略的话，一定要看看 <a href=\"https://github.com/nodejs/Release\">https://github.com/nodejs/Release</a> 。</p>\n<p>就目前而言，Node.js 6.x 和 8.x 将在 2019 年末结束 LTS 的支持，大家尽快升级到 10.x 吧。</p>\n<h2>快速体验</h2>\n<pre class=\"prettyprint language-bash\"><code>$ nvs add node&#x2F;12\n$ nvs use 12\n$ node -v\nv12.0.0\n</code></pre><p>具体参考这篇文章：<a href=\"https://zhuanlan.zhihu.com/p/63403762\">科普文：使用 nvs 管理本地 Node.js 版本</a></p>\n<h2>V8 更新到 7.4</h2>\n<blockquote>\n<p>大部分情况下，我们不用去考虑性能问题，坐等 V8 版本更新就好了。（大雾）</p>\n</blockquote>\n<p>本次版本更新，也带来了好几个不错的特性：</p>\n<ul>\n<li><a href=\"https://v8.dev/blog/v8-release-72#async-stack-traces\">异步堆栈跟踪</a></li>\n<li><a href=\"https://v8.dev/blog/v8-release-74#faster-calls-with-arguments-mismatch\">参数调用不匹配时的调用速度优化</a></li>\n<li><a href=\"https://v8.dev/blog/v8-release-73#faster-await\">更快的 await</a></li>\n<li><a href=\"https://v8.dev/blog/v8-release-72#javascript-parsing\">更快的 JavaScript 解析速度</a></li>\n</ul>\n<p><strong>同时，跑了下我们 Egg 的一些内部测试，发现序列化有 10~20% 的性能提升，恐怖如斯！</strong></p>\n<p>另，奇丑无比的 <a href=\"https://github.com/tc39/proposal-class-fields\">Private Class Fields</a> 也能用了：</p>\n<pre class=\"prettyprint language-javascript\"><code>class IncreasingCounter {\n  #count = 0;\n  \n  get value() {\n    console.log(&#x27;Getting the current value!&#x27;);\n    return this.#count;\n  }\n  increment() {\n    this.#count++;\n  }\n}\n</code></pre><h2>HTTP 解析速度提升</h2>\n<p>默认的 HTTP 解析器切换为 <a href=\"https://github.com/nodejs/llhttp\">llhttp</a> ，性能提升恐怖如斯：</p>\n<p><img src=\"https://cdn.nlark.com/yuque/0/2019/png/84182/1556072499637-686bb0e3-c75c-424c-851f-ad88aff183a2.png#align=left&amp;display=inline&amp;height=231&amp;name=image.png&amp;originHeight=404&amp;originWidth=1302&amp;size=88775&amp;status=done&amp;width=746\" alt=\"image.png\"></p>\n<blockquote>\n<p>点评：恐怖如斯。</p>\n</blockquote>\n<h2>启动速度提升</h2>\n<p>通过 <a href=\"https://v8.dev/blog/code-caching\">v8 code cache</a> 的支持，<a href=\"https://github.com/nodejs/node/pull/27161\">在构建时提前为内置库生成代码缓存</a>，从而提升 30% 的启动耗时。\n同时，通过<a href=\"https://github.com/nodejs/node/pull/24950\">重用主进程缓存</a>，Workers Threads 的启动速度提升了 60% 。</p>\n<blockquote>\n<p>点评：恐怖如斯。</p>\n</blockquote>\n<h2>Workers Threads</h2>\n<p>在 10.x 已经引入的 <a href=\"https://nodejs.org/api/worker_threads.html\">Workers Threads</a> 特性，在 12.x 里面默认启用，无需使用 <code>--experimental-worker</code> 开启。同时基于上一条的介绍，启动的速度也得到大幅提升。</p>\n<p>相关介绍：[<a href=\"https://medium.com/\">https://medium.com/</a><a href=\"/user/Trott\">@Trott</a>/using-worker-threads-in-node-js-80494136dbb6](<a href=\"https://medium.com/\">https://medium.com/</a><a href=\"/user/Trott\">@Trott</a>/using-worker-threads-in-node-js-80494136dbb6)</p>\n<h2>诊断报告</h2>\n<p>提供了新的实验性功能『诊断报告』，一个非常有用的特性。\n可用于帮助分析诸如：崩溃，性能问题，内存泄漏，高 CPU 占用等等问题。详见 <a href=\"https://medium.com/the-node-js-collection/easily-identify-problems-in-node-js-applications-with-diagnostic-report-dc82370d8029\">这篇文章</a>。</p>\n<blockquote>\n<p>点评：这也是 <a href=\"https://www.aliyun.com/product/nodejs\">AliNode</a> 之前的一个卖点之一。</p>\n</blockquote>\n<h2>Heap Dump</h2>\n<p>以前我们分析问题的时候，需要手动安装对应的类库或者使用 AliNode。</p>\n<p>在 12.x 里面内置了该功能，详见：</p>\n<ul>\n<li><a href=\"https://github.com/nodejs/node/pull/27133\">https://github.com/nodejs/node/pull/27133</a></li>\n<li><a href=\"https://github.com/nodejs/node/pull/26501\">https://github.com/nodejs/node/pull/26501</a></li>\n</ul>\n<blockquote>\n<p>点评：又一个 <a href=\"https://www.aliyun.com/product/nodejs\">AliNode</a> 的功能被内置了。但其实影响不大，AliNode 的核心在于分析平台，这块的采集能力，本来他们就打算开源回馈出去的。</p>\n</blockquote>\n<p>同时，由于上述提到的 V8 升级，现在可以按照可用内存动态调整堆大小了。</p>\n<h2>ESM 模块方案更新</h2>\n<p>ES6 模块仍然还在实验阶段，不过有了新的方式，具体参见<a href=\"https://medium.com/%5B@nodejs%5D(/user/nodejs)/announcing-a-new-experimental-modules-1be8d2d6c2ff\">这篇文章</a>。</p>\n<blockquote>\n<p>点评：让子弹再飞一会，该特性真的不是痛点，不急。</p>\n</blockquote>\n<h2>其他更新</h2>\n<ul>\n<li>更好的原生模块支持，<a href=\"https://nodejs.org/api/n-api.html#n_api_n_api\">N-API</a> 升级为版本 4，并 backport 到 Node.js 8.x 和 10.x。详细参见<a href=\"https://medium.com/the-node-js-collection/new-features-bring-native-add-ons-close-to-being-on-par-with-js-modules-cd4f9b8e4b4\">这篇文章</a>。</li>\n<li>TLS 升级为 1.3， <a href=\"https://developer.ibm.com/blogs/openssl-111-has-landed-in-nodejs-master-and-why-its-important-for-nodejs-lts-releases/\">增强安全功能</a>。</li>\n<li>随着 C++ 编译器的更新，现在要求 <code>GCC 6</code> 和 <code>glibc 2.17</code> ，对应的操作系统 Win7 和 macOS 10，详细参见<a href=\"https://github.com/nodejs/node/blob/v12.x/BUILDING.md#platform-list\">这篇文章</a>。</li>\n</ul>\n<p>不过目前 node-gyp 的一些原生模块会编译失败：</p>\n<pre class=\"prettyprint language-bash\"><code>nunjucks@3.2.0 › chokidar@2.1.5 › fsevents@^1.2.7 optional error: Error: Run &quot;sh -c node install&quot; error, exit code 1\n    at ChildProcess.&lt;anonymous&gt; (&#x2F;Users&#x2F;tz&#x2F;.npm-global&#x2F;lib&#x2F;node_modules&#x2F;tnpm&#x2F;node_modules&#x2F;_runscript@1.3.0@runscript&#x2F;index.js:74:21)\n    at ChildProcess.emit (events.js:196:13)\n    at maybeClose (internal&#x2F;child_process.js:1000:16)\n    at Process.ChildProcess._handle.onexit (internal&#x2F;child_process.js:267:5)\n</code></pre></div>",
                        "title": "Node 12 值得关注的新特性",
                        "last_reply_at": "2019-04-28T04:05:39.564Z",
                        "good": false,
                        "top": true,
                        "reply_count": 20,
                        "visit_count": 7333,
                        "create_at": "2019-04-24T03:36:12.582Z",
                        "author": {
                            "loginname": "atian25",
                            "avatar_url": "https://avatars2.githubusercontent.com/u/227713?v=4&s=120"
                        }
                    },
                    {
                        "id": "5bd4772a14e994202cd5bdb7",
                        "author_id": "504c28a2e2b845157708cb61",
                        "tab": "share",
                        "content": "<div class=\"markdown-text\"><p>2018年10月27日晚上，突然收到服务器不能访问的告警通知，拜托了狼叔 <a href=\"/user/i5ting\">@i5ting</a> 帮忙看看，结果登不上也ping不通。\n后来收到短信，发现是被ucloud封了，短信内容如下：</p>\n<blockquote>\n<p>【UCloud】尊敬的UCloud用户，您的IP：123.59.77.142  存在URL ：<a href=\"https://cnodejs.org/topic/57239bce5a26c4a841ecbf01\">https://cnodejs.org/topic/57239bce5a26c4a841ecbf01</a> （详细信息请查看邮箱）包含违禁内容（包括但不限于翻墙等），违反了国家有关法律法规。目前依主管单位要求，对您的IP予以封停，请您尽快处理违规内容。待处理完成后请联系技术支持重新开启业务。[4000188113]</p>\n</blockquote>\n<p>然后联系了ucloud的客服，一下就打通了，对方态度挺好处理问题也快。ucloud说是运营商那边封的，不是他们的检测机制。所以需要联系运营商解决。\n考虑到各位亲爱的网友们的行为我无法控制，那么一直跟越来越严格的审查系统对抗只会让自己疲惫，所以我就站点迁到国外。来到了aws jp。</p>\n<p>我大致测了测，电信和移动的访问速度非常快，100ms以内，联通会慢一点，400ms以内吧。</p>\n<p>建议翻墙访问。</p>\n</div>",
                        "title": "服务器迁移至 aws 日本机房",
                        "last_reply_at": "2019-04-22T12:39:07.911Z",
                        "good": false,
                        "top": true,
                        "reply_count": 188,
                        "visit_count": 36763,
                        "create_at": "2018-10-27T14:33:14.694Z",
                        "author": {
                            "loginname": "alsotang",
                            "avatar_url": "https://avatars1.githubusercontent.com/u/1147375?v=4&s=120"
                        }
                    },
                    {
                        "id": "5b101b058a4f51e140d9440c",
                        "author_id": "5b094f5257137f22415c4685",
                        "tab": "ask",
                        "content": "<div class=\"markdown-text\"><h1>付费VPN推荐</h1>\n<p>更新：<a href=\"https://www.wallmama.com/best-vpn-china-2019/\">2019年便宜好用的翻墙VPN推荐</a></p>\n<h2>免费VPN服务最好不要用</h2>\n<p>用免费VPN服务，网络流量流经一个不可信的第三方，是件危险的事。你的流量里可能有没有充分加密保护的敏感信息：密码，银行账号，私密资料，访问历史等，流量劫持的潜在风险还不止这些。</p>\n<h2>破解的VPN软件更危险</h2>\n<p>这更危险，此类破解软件挂马带病毒是很常见的事，贪便宜从不明来源下载，很快让你的电脑裸奔；况且，破解软件不能更新，即使能用，也只能用极有限的时间。</p>\n<h2>国内的付费VPN服务想用也用不了</h2>\n<p>去年，GreenVPN被关。</p>\n<p>国内还剩多少可用的付费VPN服务，没统计过，越来越少吧，即使还有也离被关不远了。国内某些小众搜索引擎的结果页里偶尔还出现一些不入流（骗钱）的产品。</p>\n<p>也许存在传说中的“已注册“的服务，但国内政策风险太大，不建议购买。</p>\n<h2>国外的付费VPN服务能用的已经不多</h2>\n<p>绝大多数在这几年也陆续沦陷了，国内无法直接购买，买VPN要先上VPN，本身就很无奈。</p>\n<p>不是所有的付费VPN厂商都重视中国市场，只有一线大厂才可以，小厂商的财力、人力、技术能力都没大到能长期保证国内用户能持续使用服务的程度。</p>\n<h2>国外付费VPN推荐</h2>\n<p>下面推荐的服务商都</p>\n<ul>\n<li>\n<p>重视中国用户，国内还能直接支付宝购买</p>\n</li>\n<li>\n<p>全球服务器，好用的客户端</p>\n</li>\n<li>\n<p>提供额外加强服务，持续改进算法和服务质量</p>\n</li>\n<li>\n<p>支持无条件退款</p>\n</li>\n</ul>\n<p><strong>国内还能用支付宝买到</strong>的国外付费vpn推荐：</p>\n<h2>VPN推荐一：<a href=\"https://indx.cc/exp\">ExpressVPN</a></h2>\n<p>全球148+服务器所在地 / 无限流量 / 多协议，包括openVPN / 一键连接 / 同时3台设备 / 256-bit AES加密 / 支付宝支付 / 支持路由器连接 / 完全IP隐藏 / 零日志 / 全终端覆盖 / 30天无条件退款 / Split tunneling技术 + 浏览器插件，同时访问内外网 / <strong>推荐原因：速度相对最快</strong></p>\n<h2>VPN推荐二：<a href=\"https://indx.cc/veepn\">Veepn</a></h2>\n<p><strong>支持同时十个连接</strong>，支持支付宝付款 ，DNS隐私保护，无日志，全终端支持，高性价比。</p>\n<h2>VPN推荐三：<a href=\"https://indx.cc/vyr\">VyprVPN</a></h2>\n<p>70+自有服务器所在地，200,000+IP地址 / 无限流量 / 多协议，独家混淆协议 / 一键连接 / 同时5台设备 / 支持P2P / 变色龙加密，<strong>推荐原因：连接相对最稳定</strong> / 支付宝支付 / 支持路由器连接 / NAT安全机制 / DNS加密 / 全终端覆盖 / 2年款最大优惠 / 30天无条件退款 / 按程序控制网络技术，同时访问内外网</p>\n<h2>VPN推荐四：<a href=\"https://indx.cc/nrd\">Nord</a></h2>\n<p>3400+服务器 / 无限流量 / 支持Onion over vpn / 一键连接 / 同时6台设备 / 支持P2P / 双重加密 / 支付宝支付 / 支持路由器连接 / CyberSec安全技术 / 零日志 / 专业客户端 / 2年款最大优惠 / 随时退款 / 浏览器代理插件，同时访问内外网 / <strong>推荐原因：随时退款</strong></p>\n<h2>自建VPN方案</h2>\n<p>自建VPN是否成功，得靠运气，像<a href=\"https://www.vultr.com/?ref=6996621\">Vultr</a>这样的IP池比较大，但国内用户也特别多，准备好换IP吧，长远没有付费VPN靠谱。</p>\n<h2>付费VPN稳定性与速度</h2>\n<p>没有100%稳定的VPN服务，每年特殊时间段的连接质量都不好，容易断线。</p>\n<p>一年中大部分时间，日常使用Google，收发Gmail，使用Youtube还是稳定的。</p>\n<p>1080P的油管通常是不可能的，只在极少时间还算流畅，720P多数时候比较流畅。</p>\n<p>日常使用，偶尔断线，基本换服务器位置重连即可。</p>\n<p>即使是同一个服务，在一天不同时段，或在不同地域访问，服务质量也可能天差地别，没人知道具体原因，所以如果你在旅行途中，如果要保证最大限度的可连接性，可以考虑常备两个以上的服务，如果一个服务暂时出问题，另一个替上。</p>\n<h2>用好试用期</h2>\n<p>一线服务商都提供免费试用或至少7天的无条件退款，利用好试用期，充分检测服务质量，不满意及时退款，因为各服务在不同地域服务质量不同，所以一定要自己试一试。</p>\n</div>",
                        "title": "2019国外付费vpn推荐",
                        "last_reply_at": "2019-04-29T10:34:15.136Z",
                        "good": false,
                        "top": false,
                        "reply_count": 23,
                        "visit_count": 22333,
                        "create_at": "2018-05-31T15:55:49.256Z",
                        "author": {
                            "loginname": "wallmama",
                            "avatar_url": "https://avatars3.githubusercontent.com/u/39631585?v=4&s=120"
                        }
                    }
            ],
        }
    },


}
</script>


<!--Copied from [SD-Gaming](https://github.com/SD-Gaming/Vue2.0_CNode.bbs)-->
<style scoped>
	.posts {
		background-color: white;
		padding: 0.5rem;
		margin: 1rem 20rem;
	}
	.posts li {
		list-style: none;
		margin-bottom: 14px;
		border-bottom: 1px solid #E7E7E7;
		line-height: 30px;
	}
	.posts ul li img {
		width: 1.5rem;
		height: 1.5rem;
	}
	.posts li span {
		display: inline-block;
		text-align: center;
		width: 70px;
		font-size: 12px;
		margin: 0 10px;
	}
	.posts a {
		text-decoration: none;
		color: inherit;
	    -o-text-overflow: ellipsis;
	    white-space: nowrap;
	    display: inline-block;
	    vertical-align: middle;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    max-width: 70%;
	}
	.posts a:visited {
		color:#858585;
	}	
	.posts .last_reply {
		float: right;
   		font-size: 0.7rem;
   	    margin-top: 0.3rem;
  }
  .to_right {
    float: right;
  }
</style>

## 什么是XSS攻击？
XSS简单点来说，就是攻击者想尽一切办法将可以执行的代码注入网页中。
XSS可以分为很多种类型，但是总体上分为两类：持久型和非持久型.
**持久型**也就是攻击的代码被服务端写进入数据库中，这种攻击危害性很大，因为如果网站访问量很大的话，就会导致大量正常访问页面的用户都受到攻击。
如：对于评论功能来说，就得防范持久型XSS攻击，因为我们可以在评论中输入`<script>alert(1)</script>`这样的内容
这种情况如果前后端没有做好防御的话，这段评论就会被存储到数据库中，这样每个打开该页面的用户都会被攻击到。
**非持久型**想对于前者的危害就要小得多了，一般通过修改URL参数的方式加入攻击代码，诱导用户访问链接从而进行攻击。
举例来说，如果页面需要从URL获取某些参数作为内容的话，不经过过滤就会导致代码被执行
```
<!-- http://www.xxx.com?name=<script>alert(1)</script> -->
<div>{name}</div>
```
但是对于这种攻击方式来说，如果用户使用Chrome这类浏览器的话，浏览器就会自动帮助用户防御攻击。
但我们不能因此就不防御此类攻击了，因为我们不能确定用户都使用了该类浏览器

## 如何防范XSS攻击

对于XSS攻击来说，通产有两种方式可以防御

### 转义字符

```
//首先对于用户的输入应该是永远不信任的。最普遍的做法就是转义输入输出的内容，对于引号、尖括号、斜杆进行转义
function escape(str){
	str = str.replace(/&/g,'&amp；')
	str = str.replace(/</g,'&lt;')
	str = str.replace(/>/g,'&gt;')
	str = str.replace(/"/g,'&quto;')
	str = str.replace(/'/g,'&#39;')
	str = str.replace(/`/g,'&#96;')
	str = str.replace(/\//g,'&#x2F;')
	return str
}
// 通过转义可以进攻击代码<script>alert(1)</script>变成
// --》&lt;script&gt;alert(1)&lt;&#x2F;script&gt;
escape('<script>alert(1)</script>')
/*但是对于富文本来说，显然不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。
对于这种情况，通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签
和标签属性实在太多，更加推荐使用白名单的方式。
*/
const xss = require('xss')
let html= xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
// --> <h1> XSS Demo</h1>&lt;script&gt;alert("xss")&lt;&#x2F;script&gt;
// 以上示例使用了js-xss形式来实现，可以看到在输出中保留了h1标签且过滤了script标签。 
```
### CSP

CSP本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。
我们只需要配置规则，如何拦截由浏览器自己实现的。我们可以通过这种方式来尽量减少XSS攻击。
 通常可以通过这两种方式来开启CSP：
 

 1. 设置HTTP Header中的Content-Security-Policy
 2. 设置meta 标签的方式 `<meta http-equiv="Content-Security-Policy">` 

这里以设置HTTP Header 来举例

 - 只允许加载本站资源`Content-Security -Policy: default-src 'self'`
 - 只允许加载HTTPS协议图片`Content-Security-Policy: img-src https://*`
 - 允许加载任何来源框架`Content-Security-Policy:child-src 'none'`
 
可以设置的属性还有很多 ，只要开发者配置了正确的规制，那么即使网站存在漏洞，攻击者也不能执行它的攻击代码。


##cookie、sessionStorage、localStorage、indexDB的区别
-------
|特性|cookie|localStorage|sessionStorage|indexDB|
-|-|-|-|-|
数据生命周期|一般由服务器生成，可以设置过期时间|除非被清理，否则一直存在|页面关闭就清理|除非被清理否则一直存在|
数据存储大小|4k|5M|5M|依据不同浏览器大小不同|
与服务器通信|每次都会携带在header中，对于请求性能有影响|不参与|不参与|不参与|

-------
从上表可知，cookie 已经不建议用于存储。如果没有大量数据数据存储需求的话，可以使用localStorage和sessionStorage。对于不怎么需要改变的数据尽量使用localStorage存储，否则可以用sessionStorage存储
----
##cookie的安全性
---
|属性|作用|
-|-|
value|如果用于保存用户登录状态，应该将该值加密，不能使用明文的用户标识|
http-only|不能通过JS访问Cookie，减少Xss（跨站脚本攻击）攻击|
secure|只能在协议为HTTPS的请求中携带|
same-site|规定浏览器不能在跨域请求中携带cookie，减少CSRF（跨站请求伪造）攻击|

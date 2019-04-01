##cookie、sessionStorage、localStorage、indexDB的区别
-------
|特性|cookie|localStorage|sessionStorage|indexDB|
-|-|-|-|-|
数据生命周期|一般由服务器生成，可以设置过期时间|除非被清理，否则一直存在|页面关闭就清理|除非被清理否则一直存在|
数据存储大小|4k|5M|5M|依据不同浏览器大小不同|
与服务器通信|每次都会携带在header中，对于请求性能有影响|不参与|不参与|不参与|

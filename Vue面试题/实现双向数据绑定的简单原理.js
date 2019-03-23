<!-- Vue2.0 的双向数据绑定是同过 Object.defineProperty实现的 -->
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<input type="text" id="userName">
	<br>
	<span id="uName"></span>
	<script>
		var obj = {
			pwd:"123456"
		};
		Object.defineProperty(obj,"userName",{//vue实现双向数据绑定的原理  get 和set是 自动触发的
			// value:"Jack"
			get:function(){
				console.log("get init");
			},
			set:function(val){
				console.log("set init");
				document.getElementById('uName').innerText = val;
				document.getElementById('userName').innerText = val;
			}
		});
		document.getElementById("userName").addEventListener("keyup",function(event){
			// document.getElementById("uName").innerText = event.target.value;
			obj.userName = event.target.value;
		})
	</script>
</body>
</html>

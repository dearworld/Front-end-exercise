/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value.trim();
	var value = document.getElementById('aqi-value-input').value.trim();
	//输入校验
	var regCity = /^[a-zA-Z\u4E00-\u9FA5]+$/;
	var regValue = /[\d*]/;
	if(!regCity.test(city)){
		alert("城市名称必须是中英文字符！");
		city.value = ''; //清除数据
		return;
	}
	if(!regValue.test(value)){
		alert("空气质量指数必须为整数!");
		value.value = '';
		return;
	}
	aqiData[city] = value;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var arr = Object.keys(aqiData);
	var aqiList = document.getElementById('aqi-table');
	if(arr.length != 0){
		aqiList.innerHTML='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
		for(var key in aqiData){
			var tr = document.createElement('tr');
			tr.innerHTML = '<td>'+ key +'</td><td>'+aqiData[key]+'</td><td><button class="del-btn">删除</button></td>';
			aqiList.appendChild(tr);
		}
	}else{
		aqiList.innerHTML='';
		alert('没有表格数据');
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
	// 删除aqiData中的对应数据
	// 先获取制定元素
	var tr = target.parentElement.parentElement;
	var city = tr.children[0].innerText;
	delete aqiData[city];
	console.log(aqiData);
	renderAqiList();
}

function init() {
	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById('add-btn').onclick = addBtnHandle;
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	var table = document.getElementById("aqi-table");
    /*var arrBtnDel = table.getElementsByClassName("del-btn");*/
	table.addEventListener('click',function(e){
		if(e.target && e.target.nodeName.toLowerCase() === 'button'){
			delBtnHandle(e.target);
		}
	})
}

init();
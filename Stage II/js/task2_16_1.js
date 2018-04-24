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
	var city = document.getElementById('aqi-city-input').value;
	var value = document.getElementById('aqi-value-input').value;
	if(city==undefined ||city == ''){
		alert('您输入的城市名称为空');
	}
	if(value==undefined ||value == ''){
		alert('您输入的空气质量指数为空');
	}
	aqiData[city] = value;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var aqiList = document.getElementById('aqi-table');
	if(aqiData!=null){
		aqiList.innerHTML='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
		for(var key in aqiData){
			var tr = document.createElement('tr');
			tr.innerHTML = '<td>'+ key +'</td><td>'+aqiData[key]+'</td><td><button id="delBtn">删除</button></td>';
			aqiList.appendChild(tr);
		}
	}else{
		alert('表格没有数据');
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
function delBtnHandle() {
	// 删除aqiData中的对应数据
	// 先获取制定元素
	var td = documet.getElementById('delBtn').parentElement.firstElementChild;
	console.log(td);
	renderAqiList();
}

function init() {
	document.getElementById('add-btn').onclick = addBtnHandle;
	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	document.getElementById('delBtn').onclick = addBtnHandle;
	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

init();
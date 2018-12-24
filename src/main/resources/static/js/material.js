// 用户登录
function doUserLogin(){
	
	// Input Login Name
	if (loginForm.userId.value == null || loginForm.userId.value == ""){
		alert("用户名称不能为空");
		loginForm.userId.focus();
		return false;
	} 
    // Input Password
    if (loginForm.password.value == null || loginForm.password.value == "") {
      alert("用户密码不能为空");
      loginForm.password.focus();
      return false;
    }
	
	loginForm.submit();
}

// 游客登录
function doGuestLogin(){
	//loginForm.accessMode.value = 'guest';
	loginForm.submit();

//    $.ajax({
//        type: 'post', 
//        dataType: 'text',
//        url:"/url?userId=001&password=001",
//        success: function (data) {
//        	alert(decodeURIComponent(data))
//        }
//    });
}

// 注销
function doLogout(){
	result = confirm("确认要注销吗？");
	if(result){
		window.location.href = "/logout";
	}
}

function gotoLogin(){
	
	window.location.href = "MTELogin.do?action=logout";
	
}

// 响应回车键
function doLoginKeyDown(){

	if (event.keyCode==13){
		doUserLogin();
	}

}


function showAddAuthDialog(){

	// var department = addAuthForm.department.value;
	// send('AuthAdmin.do?action=getProjectList&department='+department,'getProjectList');
	
	var dialogDiv = document.getElementById("addAuth");
	var maskDiv = document.getElementById("mask");
	
	dialogDiv.style.display = "block";
	maskDiv.style.display = "block";
}


function hideAddAuthDialog(){

	var dialogDiv = document.getElementById("addAuth");
	var maskDiv = document.getElementById("mask");
	
	dialogDiv.style.display = "none";
	maskDiv.style.display = "none";
}


// 提交
function submitAddAuth() {
	
	var userId = addAuthForm.userId.value;
	var userName = addAuthForm.userName.value;
	var department = addAuthForm.department.value;
	var projectId = addAuthForm.projectId.value;
	var line = addAuthForm.line.value;
	var authorityType = addAuthForm.authorityType.value;
	
	//alert(userId);
	
	// 类型检查
	if(userId==""){
		alert("工号不能为空！");
		addAuthForm.userId.focus();
		return false
	}
	
	// 工号必须为英文和数字组合
	var reg = /^[\w]+$/;
	if(!reg.test(userId)){
		alert("工号必须为英文和数字组合！请重新输入！");
		addAuthForm.userId.value = "";
		addAuthForm.userId.focus();
		return false
	}
	
	if(userName==""){
		alert("姓名不能为空！");
		addAuthForm.userName.focus();
		return false
	}
	
	if(department==""){
		alert("部门不能为空！");
		addAuthForm.department.focus();
		return false
	}
	
	if(projectId==""){
		alert("工程不能为空！");
		addAuthForm.projectId.focus();
		return false
	}
	
	if(line==""){
		alert("拉别不能为空！");
		addAuthForm.line.focus();
		return false
	}
	

	// alert('AuthAdmin.do?action=addAuth&userId='+userId+'&userName='+encodeURI(userName)+'&line='+encodeURI(line)+'&projectId='+projectId+'&authorityType='+authorityType)
	// addAuthForm.submit();
	send('AuthAdmin.do?action=addAuth&userId='+userId+'&userName='+encodeURI(userName)+'&line='+encodeURI(line)+'&projectId='+projectId+'&authorityType='+authorityType,"addAuth");
	
	
}

// 清空输入
function clearInput(){
	addItemForm.itemCode.value="";
	addItemForm.itemDesc.value="";
	addItemForm.itemSpec.value="";
	addItemForm.itemUnit.value="";
	addItemForm.itemType.value="";
	// addItemForm.usageType.value="";
	addItemForm.maxQty.value="";
	addItemForm.minQty.value="";
	addItemForm.stock.value="";
	addItemForm.memo.value="";
}

// 清空输入
function clearAuthInput(){
	
	addAuthForm.userId.value="";
	addAuthForm.userName.value = "";
	addAuthForm.department.value = "";     
	addAuthForm.department.options[0].selected=true;
	addAuthForm.projectId.options.length = 0;
	addAuthForm.line.value = "";
	addAuthForm.authorityType.options[0].selected=true;
	
	addAuthForm.userName.disabled = false;
	addAuthForm.department.disabled = false;
	addAuthForm.projectId.disabled = false;
	addAuthForm.line.disabled = false;

}

function doMTEAdminLoad(){
// var resultMsg = document.getElementById("resultMsg");
// if(resultMsg!=null){
// if(resultMsg.value != ""){
// alert(resultMsg.value);
// }
// }
	var notEnoughCount = 0; 
	
	// 遍历查询结果
	var mteTable = document.getElementById("mteTable");
	var trNodeArr = mteTable.getElementsByTagName("tr");
	for(j=1;j<trNodeArr.length;j++){
		var tdNodeArr = trNodeArr[j].getElementsByTagName("td");
		for(k=0;k<tdNodeArr.length;k++){
			var maxQty = tdNodeArr[7].innerHTML;
			var minQty = tdNodeArr[8].innerHTML;
			var stock = tdNodeArr[9].innerHTML;
			
			if(parseInt(stock) > parseInt(maxQty)){
				tdNodeArr[k].style.backgroundColor = "orange"; 
			}
			
			if(parseInt(stock) < parseInt(minQty)){
				tdNodeArr[k].style.backgroundColor = "#FFB5B5"; 
				notEnoughCount++;
			}

		}
	}
	
//	if(notEnoughCount>0){
//		alert("部分部品的在库数量小于最小数量，请及时发注补充库存！");
//	}
	
	var itemTotal = queryForm.itemTotal.value;
	var pageSelected = queryForm.pageSelected.value;
	
	if( itemTotal != "" ){
		// 分页部分
		$("#pager").pagination({
	       	items: itemTotal,
	       	itemsOnPage: 20,
	       	prevText: '上一页', 
			nextText: '下一页', 
			strTotal: '共',
			strPage: '页',
	       	cssStyle: 'dark-theme',
	       	onPageClick: changePage
  		 });
	   		 
	   	 if(pageSelected != ""){
	   	 	$("#pager").pagination('drawPage', pageSelected);
	   		 	   		 
		 }
   	}
}

function doAuthAdminLoad(){
	
	var itemTotal = queryForm.itemTotal.value;
	var pageSelected = queryForm.pageSelected.value;
	var department = queryForm.department.value;
	var lastSelectedDepartment = queryForm.departmentHidden.value;
	var lastSelectedProject = queryForm.projectHidden.value;
	var lastSelectedLine = queryForm.lineHidden.value;

	
	if( itemTotal != "" ){
		// 分页部分
		$("#pager").pagination({
	       	items: itemTotal,
	       	itemsOnPage: 20,
	       	prevText: '上一页', 
			nextText: '下一页', 
			strTotal: '共',
			strPage: '页',
	       	cssStyle: 'dark-theme',
	       	onPageClick: changePage
  		 });
	   		 
	   	 if(pageSelected != ""){
	   	 	$("#pager").pagination('drawPage', pageSelected);
	   		 	   		 
		 }
   	}
	
	if(lastSelectedProject==""){
		departmentChange(1); // 更新查询区域的工程给你下拉菜单，但不选择任何选项
	}
	
	if(lastSelectedDepartment!=null && lastSelectedDepartment!=""){
		// 复原上次用户选择
		send('AuthAdmin.do?action=getProjectList&department='+department,'restoreinput');
	}

	if(lastSelectedProject!=null && lastSelectedProject!=""){
		// 复原上次用户选择
		send('AuthAdmin.do?action=getLineList&projectId='+lastSelectedProject,'restorelinelist');
	}

}

// 恢复上次用户选择工程项
function ajaxRestoreInput(){

	if(XMLHttpReq.readyState==4){ // 对象状态
		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			
			var root=XMLHttpReq.responseXML;
			var projectId=root.getElementsByTagName("projectid")[0].firstChild.data;
			var projectName=root.getElementsByTagName("projectname")[0].firstChild.data;
			
			var objSelect =  queryForm.projectId;
			
			projectIdList = trim(projectId);
			projectNameList = trim(projectName);
			if(projectIdList != null && projectIdList !="" && projectIdList != "notExist" ){
				var projectIdArr = projectIdList.split(',');
				var projectNameArr = projectNameList.split(',');
				
				// 清空工程下拉菜单
				objSelect.innerHTML = "";
				
				// 编辑工程下拉菜单HTML代码
				var newOption = new Option("", "");       
				objSelect.options.add(newOption); 
				for(i=0;i<projectIdArr.length;i++){
					
					// alert(projectNameArr[i]);
					newOption = new Option(projectNameArr[i],projectIdArr[i]);       
					objSelect.options.add(newOption);
				}
				objSelect.disabled = false;
				
				// 遍历select的option，设置上次用户选择的项为selected
				var lastSelectedProject = queryForm.projectHidden.value;
				for( i=0;i<objSelect.options.length;i++){
					var project = objSelect.options[i].value;
					if(project==lastSelectedProject){
						objSelect.options[i].selected=true
					}
				}

			}else{
				// 无工程则将下拉菜单设一个空值
				objSelect.innerHTML = "";
				var newOption = new Option("", "");   
				objSelect.disabled = true;
			}


			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常");
		}
	}
}

// 恢复上次用户选择拉别项
function ajaxRestoreLineList(){

	if(XMLHttpReq.readyState==4){ // 对象状态
		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;
			
			lineList = trim(res);
			if(lineList != null && lineList !="" && lineList != "notExist" ){
				var lineArr = lineList.split(',');
				
				var objSelect =  document.getElementById("line");
				
				// 清空工程下拉菜单
				objSelect.innerHTML = "";
				
				// 编辑工程下拉菜单HTML代码
				var newOption = new Option("", "");       
				objSelect.options.add(newOption); 
				for(i=0;i<lineArr.length;i++){
					// optionCode = optionCode + '<option value="' + lineArr[i]
					// + '">' + lineArr[i] + '</option>';
					
					newOption = new Option(lineArr[i], lineArr[i]);       
					objSelect.options.add(newOption);  
				}
				objSelect.disabled = false;

				// 遍历select的option，设置上次用户选择的项为selected
				var lastSelectedLine = queryForm.lineHidden.value;
				for( i=0;i<objSelect.options.length;i++){
					var line = objSelect.options[i].value;

					if(line==lastSelectedLine){
						objSelect.options[i].selected=true
					}
				}
			}else{
				alert("无法取得拉别下拉菜单！请联系管理员！");
				
			}

			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常");
		}
	}
}


function doMTERequestLoad(){
	// 设置录入页面“需求时间”下拉菜单
	var objSelect =  newRequestForm.reqTime;
	objSelect.innerHTML = "";
	var newOption = new Option("", "");       
	objSelect.options.add(newOption); 
	
	for(i=0;i<24;i++){
		var reqTime = ("00" + i ).slice(-2) + "00";
		newOption = new Option(reqTime, reqTime);       
		objSelect.options.add(newOption);  
	}
	
	// 设置修改页面“需求时间”下拉菜单
	objSelect =  modifyRequestForm.reqTime;
	objSelect.innerHTML = "";
	var newOption = new Option("", "");       
	objSelect.options.add(newOption); 
	for(i=0;i<24;i++){
		var reqTime = ("00" + i ).slice(-2) + "00";
		newOption = new Option(reqTime, reqTime);       
		objSelect.options.add(newOption);  
	}
	
	var itemTotal = queryForm.itemTotal.value;
	var pageSelected = queryForm.pageSelected.value;
	
	if( itemTotal != "" ){
		// 分页部分
		$("#pager").pagination({
	       	items: itemTotal,
	       	itemsOnPage: 20,
	       	prevText: '上一页', 
			nextText: '下一页', 
			strTotal: '共',
			strPage: '页',
	       	cssStyle: 'dark-theme',
	       	onPageClick: changePage
  		 });
	   		 
	   	 if(pageSelected != ""){
	   	 	$("#pager").pagination('drawPage', pageSelected);
	   		 	   		 
		 }
   	}
	
	var department = queryForm.department.value;
	var lastSelectedDepartment = queryForm.departmentHidden.value;
	var lastSelectedProject = queryForm.projectHidden.value;
	var lastSelectedLine = queryForm.lineHidden.value;
	
	if(lastSelectedProject==""){
		departmentChange(1); // 更新查询区域的工程给你下拉菜单，但不选择任何选项
	}
	
	if(lastSelectedDepartment!=null && lastSelectedDepartment!=""){
		// 复原上次用户选择
		send('AuthAdmin.do?action=getProjectList&department='+department,'restoreinput');
	}

	if(lastSelectedProject!=null && lastSelectedProject!=""){
		// 复原上次用户选择
		send('AuthAdmin.do?action=getLineList&projectId='+lastSelectedProject,'restorelinelist');
	}
}

function doMTEResponseLoad(){
	
	// 如果不是管理员，则将部门设为登录者所在部门，且下拉菜单设为不可用
	// 即发料员只能发本部门的需求信息
	var authorityType = queryForm.loginauthoritytype.value;
    if(authorityType.indexOf("管理员") < 0) {
    	queryForm.department.disabled = true;
    }else{
    	queryForm.department.disabled = false;
    }
	
	var itemTotal = queryForm.itemTotal.value;
	var pageSelected = queryForm.pageSelected.value;
	
	if( itemTotal != "" ){
		// 分页部分
		$("#pager").pagination({
	       	items: itemTotal,
	       	itemsOnPage: 20,
	       	prevText: '上一页', 
			nextText: '下一页', 
			strTotal: '共',
			strPage: '页',
	       	cssStyle: 'dark-theme',
	       	onPageClick: changePage
  		 });
	   		 
	   	 if(pageSelected != ""){
	   	 	$("#pager").pagination('drawPage', pageSelected);
	   		 	   		 
		 }
   	}
	
	setInterval(function() {
		queryRequestInfo();
    }, 60000); 
	
	var department = queryForm.department.value;
	var lastSelectedDepartment = queryForm.departmentHidden.value;
	var lastSelectedProject = queryForm.projectHidden.value;
	var lastSelectedLine = queryForm.lineHidden.value;
	
	if(lastSelectedProject==""){
		departmentChange(1); // 更新查询区域的工程给你下拉菜单，但不选择任何选项
	}
	
	if(lastSelectedDepartment!=null && lastSelectedDepartment!=""){
		// 复原上次用户选择
		send('AuthAdmin.do?action=getProjectList&department='+department,'restoreinput');
	}

	if(lastSelectedProject!=null && lastSelectedProject!=""){
		// 复原上次用户选择
		send('AuthAdmin.do?action=getLineList&projectId='+lastSelectedProject,'restorelinelist');
	}

}

function doMTERecieveLoad(){
	
	// 如果上一部有选工程，则还原选项
// var project = queryForm.project.value;
	
// if(project!=""){
// projectChange();
// }
	
	
	var itemTotal = queryForm.itemTotal.value;
	var pageSelected = queryForm.pageSelected.value;
	
	if( itemTotal != "" ){
		// 分页部分
		$("#pager").pagination({
	       	items: itemTotal,
	       	itemsOnPage: 20,
	       	prevText: '上一页', 
			nextText: '下一页', 
			strTotal: '共',
			strPage: '页',
	       	cssStyle: 'dark-theme',
	       	onPageClick: changePage
  		 });
	   		 
	   	 if(pageSelected != ""){
	   	 	$("#pager").pagination('drawPage', pageSelected);
	   		 	   		 
		 }
   	}
	
	setInterval(function() {
		queryRequestInfo();
    }, 60000); 
	
	var department = queryForm.department.value;
	var lastSelectedDepartment = queryForm.departmentHidden.value;
	var lastSelectedProject = queryForm.projectHidden.value;
	var lastSelectedLine = queryForm.lineHidden.value;
	
	if(lastSelectedProject==""){
		departmentChange(1); // 更新查询区域的工程给你下拉菜单，但不选择任何选项
	}
	
	if(lastSelectedDepartment!=null && lastSelectedDepartment!=""){
		// 复原上次用户选择
		send('AuthAdmin.do?action=getProjectList&department='+department,'restoreinput');
	}

	if(lastSelectedProject!=null && lastSelectedProject!=""){
		// 复原上次用户选择
		send('AuthAdmin.do?action=getLineList&projectId='+lastSelectedProject,'restorelinelist');
	}

}

function doListLoad(){
	
	// 未接收单选框特殊处理
	var responseFlag1 = queryForm.responseFlag1.value;
	var responseFlag2 = queryForm.responseFlag2.value;
	var recieveFlag1 = queryForm.recieveFlag1.value;
	var recieveFlag2 = queryForm.recieveFlag2.value;
	
	if(responseFlag1 != "1 "&& responseFlag2 != "1" && recieveFlag1 != "1" && recieveFlag2 == "1"){
		queryForm.resFlag1.disabled = true;
		queryForm.resFlag2.disabled = true;
	}
	
	
	var itemTotal = queryForm.itemTotal.value;
	var pageSelected = queryForm.pageSelected.value;
	
	if( itemTotal != "" ){
		// 分页部分
		$("#pager").pagination({
	       	items: itemTotal,
	       	itemsOnPage: 20,
	       	prevText: '上一页', 
			nextText: '下一页', 
			strTotal: '共',
			strPage: '页',
	       	cssStyle: 'dark-theme',
	       	onPageClick: changePage
  		 });
	   		 
	   	 if(pageSelected != ""){
	   	 	$("#pager").pagination('drawPage', pageSelected);
	   		 	   		 
		 }
   	}
	
	setInterval(function() {
		queryRequestInfo();
    }, 60000); 
	
	var department = queryForm.department.value;
	var lastSelectedDepartment = queryForm.departmentHidden.value;
	var lastSelectedProject = queryForm.projectHidden.value;
	var lastSelectedLine = queryForm.lineHidden.value;
	
	if(lastSelectedProject==""){
		departmentChange(1); // 更新查询区域的工程给你下拉菜单，但不选择任何选项
	}
	
	if(lastSelectedDepartment!=null && lastSelectedDepartment!=""){
		// 复原上次用户选择
		send('AuthAdmin.do?action=getProjectList&department='+department,'restoreinput');
	}

	if(lastSelectedProject!=null && lastSelectedProject!=""){
		// 复原上次用户选择
		send('AuthAdmin.do?action=getLineList&projectId='+lastSelectedProject,'restorelinelist');
	}

}

function isDigit(inputStr) {
	var reg = /^\d+$/;
	return reg.test(inputStr) 
}

function queryMTEInfo(){
	
	var itemCode = queryForm.itemCode.value;
	if(itemCode!=""){
		// 部品号必须为英文、'-'符和数字组合
		var reg = /^[\w-]+$/;
		if(!reg.test(itemCode)){
			alert("部品号必须为英文、'-'符和数字组合！请重新输入！");
			queryForm.itemCode.value = "";
			queryForm.itemCode.focus();
			return false
		}
	}
	
	queryForm.pageSelected.value = 1;
	queryForm.submit();
}

function queryAuthInfo(){
	
	var userId = queryForm.userId.value;
	if(userId!=""){
		// 工号必须为英文和数字组合
		var reg = /^[\w]+$/;
		if(!reg.test(userId)){
			alert("工号必须为英文和数字组合！请重新输入！");
			queryForm.userId.value = "";
			queryForm.userId.focus();
			return false
		}
	}
	
	queryForm.submit();
}

function showModifyAuthDialog(obj){
	
	var departmentArr = new Array("TH","CP","IC");
	var authorityTypeArr = new Array("管理员","需求员","发料员","接收员");
	var isAvailableArr = new Array("可用","不可用");
	
	// 将选中的工号信息填入相应文本框
	var trNode = obj.parentNode.parentNode;
	var tdNodeArr = trNode.getElementsByTagName("td");
	var linkNodeArr = trNode.getElementsByTagName("a");
	
	modifyAuthForm.userId.value = linkNodeArr[0].innerHTML;
	modifyAuthForm.userName.value = tdNodeArr[2].innerHTML;
	modifyAuthForm.line.value = tdNodeArr[3].innerHTML;
	var department = trim(tdNodeArr[6].innerHTML);
	
	for(var i=0;i<departmentArr.length;i++){

		if(departmentArr[i] == department){
			modifyAuthForm.department.options[i].selected=true;
			break;
		}
	}
	
	// ajax取得工程下拉菜单
	var projectId = trim(tdNodeArr[4].innerHTML);
	modifyAuthForm.projectSelected.value = projectId;
	send('AuthAdmin.do?action=getProjectList&department='+department,'getProjectList3');
	
	var authorityType = trim(tdNodeArr[7].innerHTML);	
	
	for(var j=0;j<authorityTypeArr.length;j++){
		if(authorityTypeArr[j] == authorityType){
			modifyAuthForm.authorityType.options[j].selected=true;
			modifyAuthForm.authorityTypeHidden.value = j+1;
			break;
		}
	}
	
	var isAvailable = trim(tdNodeArr[8].innerText);
	
	for(var i=0;i<isAvailableArr.length;i++){

		if(isAvailableArr[i] == isAvailable){
			modifyAuthForm.isAvailable.options[i].selected=true;
			break;
		}
	}
	
	var dialogDiv = document.getElementById("modifyAuth");
	var maskDiv = document.getElementById("mask");
	
	dialogDiv.style.display = "block";
	maskDiv.style.display = "block";
}


// 隐藏弹出对话框层和遮罩层
function hideModifyAuthDialog(){

	var dialogDiv = document.getElementById("modifyAuth");
	var maskDiv = document.getElementById("mask");
	
	dialogDiv.style.display = "none";
	maskDiv.style.display = "none";
}


// 提交
function submitModifyAuth() {
	
	var userId = modifyAuthForm.userId.value;
	var userName = modifyAuthForm.userName.value;
	var department = modifyAuthForm.department.value;
	var projectId = modifyAuthForm.projectId.value;
	var line = modifyAuthForm.line.value;
	var authorityTypeHidden = modifyAuthForm.authorityTypeHidden.value;
	var authorityType = modifyAuthForm.authorityType.value;
	var isAvailable = modifyAuthForm.isAvailable.value;
	
	// 类型检查
	if(userId==""){
		alert("工号不能为空！");
		modifyAuthForm.itemCode.focus();
		return false
	}
	
	// 工号必须为英文和数字组合
	var reg = /^[\w]+$/;
	if(!reg.test(userId)){
		alert("工号必须为英文和数字组合！请重新输入！");
		addAuthForm.userId.value = "";
		addAuthForm.userId.focus();
		return false
	}
	
	if(userName==""){
		alert("姓名不能为空！");
		modifyAuthForm.userName.focus();
		return false
	}
	
	if(department==""){
		alert("部门不能为空！");
		modifyAuthForm.department.focus();
		return false
	}
	
	if(projectId==""){
		alert("工程不能为空！");
		modifyAuthForm.projectId.focus();
		return false
	}
	
	if(line==""){
		alert("拉别不能为空！");
		modifyAuthForm.line.focus();
		return false
	}
	
	result = confirm("确认要修改吗？");
	if(result){
		// modifyItemForm.submit();
		send('AuthAdmin.do?action=modifyAuth&userId='+userId+'&userName='+encodeURI(userName)+'&line='+encodeURI(line)+'&projectId='+projectId+'&authorityTypeHidden='+authorityTypeHidden+'&authorityType='+authorityType+'&isAvailable='+isAvailable,"modifyAuth");
	}

	
}

// 去左空格;
function ltrim(s){
	return s.replace( /^\s*/, "");
}

// 去右空格;
function rtrim(s){
	return s.replace( /\s*$/, "");
}

// 去左右空格
function trim(s){
	return rtrim(ltrim(s));
}


var XMLHttpReq=false;
// 创建一个XMLHttpRequest对象
function createXMLHttpRequest(){
	if(window.XMLHttpRequest){ // Mozilla
		XMLHttpReq=new XMLHttpRequest();
	}
	else if(window.ActiveXObject){
		try{
			XMLHttpReq=new ActiveXObject("Msxml2.XMLHTTP");
		}catch(e){
			try{
				XMLHttpReq=new ActiveXObject("Microsoft.XMLHTTP");
			}catch(e){}
		}
	}
}
		
// 发送请求函数
function send(url,action){
	
	createXMLHttpRequest();
	XMLHttpReq.open("get",url,true);
	if(action == "addAuth"){
		XMLHttpReq.onreadystatechange=ajaxAddAuth; 			// 指定响应的函数ajaxAddAuth
	}else if(action == "modifyAuth"){
		XMLHttpReq.onreadystatechange=ajaxModifyAuth; 		// 指定响应的函数ajaxModifyAuth
	}else if(action == "delAuth"){
		XMLHttpReq.onreadystatechange=ajaxDelAuth; 			// 指定响应的函数ajaxDelAuth
	}else if(action == "getLineList"){
		XMLHttpReq.onreadystatechange=ajaxGetLineList; 		// 指定响应的函数ajaxGetLineList
	}else if(action == "getItemDescList"){
		XMLHttpReq.onreadystatechange=ajaxGetItemDescList; 	// 指定响应的函数ajaxGetItemDescList
	}else if(action == "getItemInfo"){
		XMLHttpReq.onreadystatechange=ajaxGetItemInfo; 		// 指定响应的函数ajaxGetItemInfo
	}else if(action == "newRequest"){
		XMLHttpReq.onreadystatechange=ajaxNewRequest; 		// 指定响应的函数ajaxNewRequest
	}else if(action == "modifyRequest"){
		XMLHttpReq.onreadystatechange=ajaxModifyRequest; 	// 指定响应的函数ajaxNewRequest
	}else if(action == "getRequestInfo"){
		XMLHttpReq.onreadystatechange=ajaxGetRequestInfo; 	// 指定响应的函数ajaxGetRequestInfo
	}else if(action == "newResponse"){
		XMLHttpReq.onreadystatechange=ajaxNewResponse; 		// 指定响应的函数ajaxNewResponse
	}else if(action == "doRecieve"){
		XMLHttpReq.onreadystatechange=ajaxDoRecieve; 		// 指定响应的函数ajaxDoRecieve
	}else if(action == "deleteRequest"){
		XMLHttpReq.onreadystatechange=ajaxDeleteRequest; 	// 指定响应的函数ajaxDeleteRequest
	}else if(action == "doStockCheck"){
		XMLHttpReq.onreadystatechange=ajaxDoStockCheck; 	// 指定响应的函数ajaxDoStockCheck
	}else if(action == "getRecieveInfo"){
		XMLHttpReq.onreadystatechange=ajaxGetRecieveInfo;	// 指定响应的函数ajaxGetRecieveInfo
	}else if(action == "checkRequestTime1"){
		XMLHttpReq.onreadystatechange=ajaxCheckRequestTime1; // 指定响应的函数ajaxCheckRequestTime
	}else if(action == "checkRequestTime2"){
		XMLHttpReq.onreadystatechange=ajaxCheckRequestTime2; // 指定响应的函数ajaxCheckRequestTime
	}else if(action == "checkStock"){
		XMLHttpReq.onreadystatechange=ajaxCheckStock; 		// 指定响应的函数ajaxCheckStock
	}else if(action == "checkDupRequest1"){
		XMLHttpReq.onreadystatechange=ajaxCheckDupRequest1; 	// 指定响应的函数ajaxCheckDupRequest
	}else if(action == "checkDupRequest2"){
		XMLHttpReq.onreadystatechange=ajaxCheckDupRequest2; 	// 指定响应的函数ajaxCheckDupRequest
	}else if(action == "getProjectList1"){
		XMLHttpReq.onreadystatechange=ajaxGetProjectList1;  // 权限查询
	}else if(action == "getProjectList2"){
		XMLHttpReq.onreadystatechange=ajaxGetProjectList2;  // 权限录入
	}else if(action == "getProjectList3"){
		XMLHttpReq.onreadystatechange=ajaxGetProjectList3;  // 权限修改
	}else if(action == "restoreinput"){
		XMLHttpReq.open("get",url,false);					// 设为同步，因先后调用两次ajax
		XMLHttpReq.onreadystatechange=ajaxRestoreInput; 	// 指定响应的函数ajaxRestoreInput
	}else if(action == "restorelinelist"){
		XMLHttpReq.open("get",url,false);					// 设为同步，因先后调用两次ajax
		XMLHttpReq.onreadystatechange=ajaxRestoreLineList; 	// 指定响应的函数ajaxRestoreLineList
	}else if(action == "getItemDesc1"){
		XMLHttpReq.onreadystatechange=ajaxGetItemDesc1;  	// 指定响应的函数ajaxGetItemDesc
	}else if(action == "getItemDesc2"){
		XMLHttpReq.onreadystatechange=ajaxGetItemDesc2;  	// 指定响应的函数ajaxGetItemDesc
	}else if(action == "getUserInfo"){
		XMLHttpReq.onreadystatechange=ajaxGetUserInfo;  	// 指定响应的函数ajaxGetUserInfo
	}else if(action == "showModifyRequestDialog"){
		XMLHttpReq.onreadystatechange=ajaxShowModifyRequestDialog;  	// 指定响应的函数ajaxGetUserInfo
	}else if(action == "setUnderstock"){
		XMLHttpReq.onreadystatechange=ajaxSetUnderstock;  	// 指定响应的函数ajaxSetUnderstock
	}else if(action == "unlockUnderstock"){
		XMLHttpReq.onreadystatechange=ajaxUnlockUnderstock; // 指定响应的函数ajaxUnlockUnderstock
	}else if(action == "lockRequest"){
		XMLHttpReq.onreadystatechange=ajaxLockRequest; 		// 指定响应的函数ajaxLockRequest
	}else if(action == "unlockRequest"){
		XMLHttpReq.onreadystatechange=ajaxUnlockRequest; 	// 指定响应的函数ajaxUnlockRequest
	}
	
	XMLHttpReq.send(null);  // 发送请求
}

function ajaxAddItem(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;

			// 显示结果提示信息
			alert(res);
			
			// 刷新权限管理画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function ajaxAddAuth(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;

			// 显示结果提示信息
			alert(res);
			
			// 刷新权限管理画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}


function ajaxModifyAuth(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;

			// 显示结果提示信息
			alert(res);
			
			// 刷新物料管理画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}


function ajaxDelAuth(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;

			// 显示结果提示信息
			alert(res);
			
			// 刷新权限管理画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function gotoMenu(){
	window.location.href="MTELogin.do?action=menu";
}


function submitDelAuth(){
	
	var userId = modifyAuthForm.userId.value;
	
	result = confirm("确认要删除吗？");
	if(result){
		send('AuthAdmin.do?action=delAuth&userId='+userId,"delAuth");
	}
}

function queryRequestInfo(){

	var itemCode = queryForm.itemCode.value;
	var applyDateStart = queryForm.applyDateStart.value;
	var applyDateEnd = queryForm.applyDateEnd.value;
	var reqDateStart = queryForm.reqDateStart.value;
	var reqDateEnd = queryForm.reqDateEnd.value;
	// alert(applyDateStart+applyDateEnd+reqDateStart+reqDateEnd);
	
	// 部品号检查
	if(itemCode != null && itemCode != ""){
		// 部品号必须为英文、'-'符和数字组合
		var reg = /^[\w-]+$/;
		if(!reg.test(itemCode)){
			alert("部品号必须为英文、'-'符和数字组合！请重新输入！");
			queryForm.itemCode.value = "";
			queryForm.itemCode.focus();
			return false
		}
	}

	// 检查申请日期(开始)是否合法
	if(applyDateStart!=null && applyDateStart!= ""){
		if(!checkDate(applyDateStart)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.applyDateStart.value="";
			queryForm.applyDateStart.focus();
			return false;	
		}
	}

	// 检查申请日期(结束)是否合法
	if(applyDateEnd!=null && applyDateEnd!= "" ){
		if(!checkDate(applyDateEnd)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.applyDateEnd.value="";
			queryForm.applyDateEnd.focus();
			return false;	
		}
	}
	
	// 检查结束日期是否大于开始日期
	if(applyDateStart!=null && applyDateStart != "" && applyDateEnd!=null && applyDateEnd != ""){
		if(compareDate(applyDateStart,applyDateEnd)== 1){
			alert("开始日期不能大于结束日期，请重新输入!");
			queryForm.applyDateStart.focus();
			return false;
		}
	}
	
	// 检查需求日期(开始)是否合法
	if(reqDateStart!=null && reqDateStart!= ""){
		if(!checkDate(reqDateStart)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.reqDateStart.value="";
			queryForm.reqDateStart.focus();
			return false;	
		}

	}
	
	// 检查需求日期(结束)是否合法
	if(reqDateEnd!=null && reqDateEnd!= "" ){
		if(!checkDate(reqDateEnd)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.reqDateEnd.value="";
			queryForm.reqDateEnd.focus();
			return false;
		}

	}
	
	// 检查结束日期是否大于开始日期
	if(reqDateStart!=null && reqDateStart != "" && reqDateEnd!=null && reqDateEnd != ""){
		if(compareDate(reqDateStart,reqDateEnd)== 1){
			alert("开始日期不能大于结束日期，请重新输入!");
			queryForm.reqDateStart.focus();
			return false;
		}
	}
	

	queryForm.pageSelected.value = "1";
	queryForm.submit();
}

function queryResponseInfo(){

	var itemCode = queryForm.itemCode.value;
	var applyDateStart = queryForm.applyDateStart.value;
	var applyDateEnd = queryForm.applyDateEnd.value;
	var reqDateStart = queryForm.reqDateStart.value;
	var reqDateEnd = queryForm.reqDateEnd.value;
	var resDateStart = queryForm.resDateStart.value;
	var resDateEnd = queryForm.resDateEnd.value;
	
	// 部品号检查
	if(itemCode != null && itemCode != ""){
		var reg = /^[\w-]+$/;
		if(!reg.test(itemCode)){
			alert("部品号必须为英文、'-'符和数字组合！请重新输入！");
			queryForm.itemCode.value = "";
			queryForm.itemCode.focus();
			return false
		}
	}
	
	// 检查申请日期(开始)是否合法
	if(applyDateStart!=null && applyDateStart!= ""){
		if(!checkDate(applyDateStart)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.applyDateStart.value="";
			queryForm.applyDateStart.focus();
			return false;	
		}
	}
	
	// 检查申请日期(结束)是否合法
	if(applyDateEnd!=null && applyDateEnd!= "" ){
		if(!checkDate(applyDateEnd)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.applyDateEnd.value="";
			queryForm.applyDateEnd.focus();
			return false;	
		}
	}
	
	// 检查结束日期是否大于开始日期
	if(applyDateStart!=null && applyDateStart != "" && applyDateEnd!=null && applyDateEnd != ""){
		if(compareDate(applyDateStart,applyDateEnd)== 1){
			alert("开始日期不能大于结束日期，请重新输入!");
			queryForm.applyDateStart.focus();
			return false;
		}
	}
	
	// 检查需求日期(开始)是否合法
	if(reqDateStart!=null && reqDateStart!= ""){
		if(!checkDate(reqDateStart)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.reqDateStart.value="";
			queryForm.reqDateStart.focus();
			return false;	
		}

	}
	
	// 检查需求日期(结束)是否合法
	if(reqDateEnd!=null && reqDateEnd!= "" ){
		if(!checkDate(reqDateEnd)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.reqDateEnd.value="";
			queryForm.reqDateEnd.focus();
			return false;
		}

	}
	
	// 检查结束日期是否大于开始日期
	if(reqDateStart!=null && reqDateStart != "" && reqDateEnd!=null && reqDateEnd != ""){
		if(compareDate(reqDateStart,reqDateEnd)== 1){
			alert("开始日期不能大于结束日期，请重新输入!");
			queryForm.reqDateStart.focus();
			return false;
		}
	}
	
	// 检查发料日期(开始)是否合法
	if(resDateStart!=null && resDateStart!= ""){
		if(!checkDate(resDateStart)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.resDateStart.value="";
			queryForm.resDateStart.focus();
			return false;	
		}

	}
	
	// 检查发料日期(结束)是否合法
	if(resDateEnd!=null && resDateEnd!= "" ){
		if(!checkDate(resDateEnd)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.resDateEnd.value="";
			queryForm.resDateEnd.focus();
			return false;
		}

	}
	
	// 检查发料日期是否大于开始日期
	if(resDateStart!=null && resDateStart != "" && resDateEnd!=null && resDateEnd != ""){
		if(compareDate(resDateStart,resDateEnd)== 1){
			alert("开始日期不能大于结束日期，请重新输入!");
			queryForm.resDateStart.focus();
			return false;
		}
	}
	
	queryForm.submit();
}

function queryRecieveInfo(){

	var itemCode = queryForm.itemCode.value;
	var applyDateStart = queryForm.applyDateStart.value;
	var applyDateEnd = queryForm.applyDateEnd.value;
	var reqDateStart = queryForm.reqDateStart.value;
	var reqDateEnd = queryForm.reqDateEnd.value;
	//alert(applyDateStart+applyDateEnd+reqDateStart+reqDateEnd);
	
	// 部品号检查
	if(itemCode != null && itemCode != ""){
		// 部品号必须为英文、'-'符和数字组合
		var reg = /^[\w-]+$/;
		if(!reg.test(itemCode)){
			alert("部品号必须为英文、'-'符和数字组合！请重新输入！");
			queryForm.itemCode.value = "";
			queryForm.itemCode.focus();
			return false
		}
	}

	// 检查申请日期(开始)是否合法
	if(applyDateStart!=null && applyDateStart!= ""){
		if(!checkDate(applyDateStart)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.applyDateStart.value="";
			queryForm.applyDateStart.focus();
			return false;	
		}
	}

	// 检查申请日期(结束)是否合法
	if(applyDateEnd!=null && applyDateEnd!= "" ){
		if(!checkDate(applyDateEnd)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.applyDateEnd.value="";
			queryForm.applyDateEnd.focus();
			return false;	
		}
	}
	
	// 检查结束日期是否大于开始日期
	if(applyDateStart!=null && applyDateStart != "" && applyDateEnd!=null && applyDateEnd != ""){
		if(compareDate(applyDateStart,applyDateEnd)== 1){
			alert("开始日期不能大于结束日期，请重新输入!");
			queryForm.applyDateStart.focus();
			return false;
		}
	}
	
	// 检查需求日期(开始)是否合法
	if(reqDateStart!=null && reqDateStart!= ""){
		if(!checkDate(reqDateStart)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.reqDateStart.value="";
			queryForm.reqDateStart.focus();
			return false;	
		}

	}
	
	// 检查需求日期(结束)是否合法
	if(reqDateEnd!=null && reqDateEnd!= "" ){
		if(!checkDate(reqDateEnd)){
			alert("日期输入格式不正确，请重新输入！");
			queryForm.reqDateEnd.value="";
			queryForm.reqDateEnd.focus();
			return false;
		}

	}
	
	// 检查结束日期是否大于开始日期
	if(reqDateStart!=null && reqDateStart != "" && reqDateEnd!=null && reqDateEnd != ""){
		if(compareDate(reqDateStart,reqDateEnd)== 1){
			alert("开始日期不能大于结束日期，请重新输入!");
			queryForm.reqDateStart.focus();
			return false;
		}
	}
	

	queryForm.pageSelected.value = "1";
	queryForm.submit();
}

function checkDate(date){

	// 输入日期长度不是10个字符的是非法日期
	if(date.length != 8){
		return false
	}
	
	// 输入日期不符合正则表达式的是非法日期
	if(!isDate(date)){
		return false
	}
	
	// 日期格式变换
	var dateArr = new Array(date.substring(0,4),date.substring(4,6),date.substring(6));
	var inputYear = eval(dateArr[0]);
	var inputMonth = eval(dateArr[1]);
	var inputDate = eval(dateArr[2]);
	
	// js原生Date有bug，改用moment.js取得日期中的第几天
	var date = moment(inputYear+'-'+inputMonth+'-'+inputDate, 'YYYY-MM-DD');

    return (date.date()==inputDate);

}

function isDate(inputDate) {
	var reg = /^(\d{4})(\d{2})(\d{2})$/; 
	var str = inputDate; 
	var arr = reg.exec(str); 
	
	if (!reg.test(str)&&RegExp.$2<=12&&RegExp.$3<=31){
		return false; 
	} 
	
	return true; 
} 

function compareDate(date1,date2){ 

	var dateArr1 = new Array(date1.substring(0,4),date1.substring(4,6),date1.substring(6));
	var dateArr2 = new Array(date2.substring(0,4),date2.substring(4,6),date2.substring(6));
	
    var oDate1 = new Date(dateArr1[0],dateArr1[1],dateArr1[2]); 
    var oDate2 = new Date(dateArr2[0],dateArr2[1],dateArr2[2]); 
    if(oDate1.getTime() > oDate2.getTime()){ 
        return 1;
    } else { 
        return -1;
    } 
} 

function projectChange(){
	var projectId = queryForm.projectId.value;
	
	if(projectId != null && projectId != ""){
		send('AuthAdmin.do?action=getLineList&projectId='+projectId,'getLineList');
	}else{
		// 清空project下拉菜单，并设为disabled
		var objSelect =  document.getElementById("line");
		objSelect.innerHTML = "";
		objSelect.disabled = true;
	}

}

// 更新拉别下拉菜单
function ajaxGetLineList(){

	if(XMLHttpReq.readyState==4){ // 对象状态
		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;
			var objSelect =  document.getElementById("line");
			
			lineList = trim(res);
			if(lineList != null && lineList !="" && lineList != "notExist" ){
				var lineArr = lineList.split(',');
				
				// 清空拉别下拉菜单
				objSelect.innerHTML = "";
				
				// 编辑拉别下拉菜单HTML代码
				var newOption = new Option("", "");       
				objSelect.options.add(newOption); 
				for(i=0;i<lineArr.length;i++){
					// optionCode = optionCode + '<option value="' + lineArr[i]
					// + '">' + lineArr[i] + '</option>';
					
					newOption = new Option(lineArr[i], lineArr[i]);       
					objSelect.options.add(newOption);
				}
				objSelect.disabled = false;

			}else{
				// 无拉别则将下拉菜单设一个空值
				objSelect.innerHTML = "";
				var newOption = new Option("", "");   
				objSelect.disabled = true;
			}

			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function newRequest(){
	
	var dialogDiv = document.getElementById("newRequest");
	var maskDiv = document.getElementById("mask");
	
	dialogDiv.style.display = "block";
	maskDiv.style.display = "block";
	
	newRequestForm.itemCode.focus();
}

function modifyRequest(requestSeq){
	
	// 取得所选行对应的需求数据
	if(requestSeq!=null && requestSeq!=""){
		// 单独发送数字5不成功，有bug？
		send('MTERequest.do?action=getRequestInfo&requestSeq=seq'+requestSeq,'showModifyRequestDialog');
	}
}

function ajaxShowModifyRequestDialog(){
	if(XMLHttpReq.readyState==4){ // 对象状态
		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=decodeURIComponent(root.getElementsByTagName("content")[0].firstChild.data);
						
			if(res != null && res !="" && res != "notExist" ){
				var requestInfoArr = res.split(',');
				modifyRequestForm.requestSeq.value = requestInfoArr[0];
				modifyRequestForm.projectName.value = requestInfoArr[1];
				modifyRequestForm.line.value = requestInfoArr[2];
				modifyRequestForm.itemCode.value = requestInfoArr[3];
				modifyRequestForm.itemDesc.value = requestInfoArr[4].replace(/\?\?comma/g, ",");
				modifyRequestForm.lot.value = requestInfoArr[5];
				modifyRequestForm.remarks.value = requestInfoArr[6].replace(/\?\?comma/g, ",");
				modifyRequestForm.reqQty.value = requestInfoArr[7];
				modifyRequestForm.reqDate.value = requestInfoArr[8];
				//modifyRequestForm.reqTime.value = requestInfoArr[9];
				var reqTime = requestInfoArr[9];
				var objSelect = modifyRequestForm.reqTime;
				for( i=0;i<objSelect.options.length;i++){
					var reqTimeTemp = objSelect.options[i].value;
					if(reqTimeTemp==reqTime){
						objSelect.options[i].selected=true
					}
				}
				
				modifyRequestForm.memo.value = requestInfoArr[10].replace(/\?\?comma/g, ",");
				
				var isResponsed = eval(requestInfoArr[11]);
				if(isResponsed > 0){
					modifyRequestForm.submitModifyBtn.disabled = true;
					modifyRequestForm.deleteModifyBtn.disabled = true;
				}else{
					modifyRequestForm.submitModifyBtn.disabled = false;
					modifyRequestForm.deleteModifyBtn.disabled = false;
				}
				
				
				var dialogDiv = document.getElementById("modifyRequest");
				var maskDiv = document.getElementById("mask");
				
				dialogDiv.style.display = "block";
				maskDiv.style.display = "block";
				
				
			}else{
				alert("无法取得需求信息！请联系管理员！");
			}

			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

// 隐藏弹出对话框层和遮罩层
function hideNewRequestDialog(){

	var dialogDiv = document.getElementById("newRequest");
	var maskDiv = document.getElementById("mask");
	
	dialogDiv.style.display = "none";
	maskDiv.style.display = "none";
	
	// 刷新物料需求页面
	queryForm.submit();
}

//隐藏弹出对话框层和遮罩层
function hideModifyRequestDialog(){

	var dialogDiv = document.getElementById("modifyRequest");
	var maskDiv = document.getElementById("mask");
	
	dialogDiv.style.display = "none";
	maskDiv.style.display = "none";
}

// 更新部品名称下拉菜单
function ajaxGetItemDescList(){

	if(XMLHttpReq.readyState==4){ // 对象状态
		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;
			var objSelect =  newRequestForm.itemDesc;

			optionList = trim(decodeURIComponent(res));

			if(optionList != null && optionList !="" && optionList != "notExist" ){
				var optionArr = optionList.split(',');

				// 清空拉别下拉菜单
				objSelect.innerHTML = "";
				
				// 编辑拉别下拉菜单HTML代码
				var newOption = new Option("", "");       
				objSelect.options.add(newOption); 

				
				for(i=0;i<optionArr.length;i++){
					var optionName = optionArr[i].replace(/\?\?comma/g, ",");
					newOption = new Option(optionName, optionName);       
					objSelect.options.add(newOption);  
				}
				objSelect.disabled = false;

			}else{
				// 无拉别则将下拉菜单设一个空值
				objSelect.innerHTML = "";
				var newOption = new Option("", "");   
				
			}

			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}


function itemDescChange(){
	
	var usageType = newRequestForm.usageType.value;
	var itemType = newRequestForm.itemType.value;
	var itemDesc = newRequestForm.itemDesc.value;
	
	if(itemDesc != null && itemDesc != ""){
		send('MTERequest.do?action=getItemInfo&usageType='+usageType+'&itemType='+encodeURI(itemType)+'&itemDesc='+encodeURIComponent(itemDesc).replace(/\+/g,'%2B'),'getItemInfo');
	}else{
		// 清空部品号输入框
		newRequestForm.itemCode.value = "";
		newRequestForm.itemSpec.value = "";
		newRequestForm.itemUnit.value = "";
		newRequestForm.stock.value = "";
	}
}

// 更新部品号输入框
function ajaxGetItemInfo(){

	if(XMLHttpReq.readyState==4){ // 对象状态
		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=decodeURIComponent(root.getElementsByTagName("content")[0].firstChild.data);
			
			if(res != null && res !="" && res != "notExist" ){
				var resultArr = res.split(',');
				
				newRequestForm.itemCode.value=resultArr[0];
				newRequestForm.itemSpec.value=resultArr[1].replace(/\?\?comma/g, ",");
				newRequestForm.itemUnit.value=resultArr[2];
				newRequestForm.stock.value=resultArr[3];

			}else{
				// 无拉别则将下拉菜单设一个空值
				alert("无法取得部品号信息！请联系管理员！");
				
			}

			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function submitNewRequest(){
	
	var itemCode = newRequestForm.itemCode.value;
	var itemDesc = newRequestForm.itemDesc.value;
	var lot = newRequestForm.lot.value;
	var reqQty = newRequestForm.reqQty.value;
	var reqDate = newRequestForm.reqDate.value;
	var reqTime = newRequestForm.reqTime.value;
	var memo = newRequestForm.memo.value;

	// 检查部品号
	if(itemDesc == ""){
		alert("部品号不能为空！");
		newRequestForm.itemDesc.focus();
		return false
	}
	
	// 检查部品名
	if(itemCode == ""){
		alert("部品名不能为空！");
		newRequestForm.itemCode.focus();
		return false
	}
	
	if(lot!=""){
		// LOT号必须为英文、'-'符和数字组合
		var reg = /^[\w@]+$/;
		if(!reg.test(lot)){
			alert("LOT号必须为英文、'@'符和数字组合！请重新输入！");
			newRequestForm.lot.value = "";
			newRequestForm.lot.focus();
			return false
		}
	}
	
	// 检查申请数量
	if(reqQty == ""){
		alert("申请数量不能为空！");
		newRequestForm.reqQty.focus();
		return false
	}
	
	// 检查申请数量是否为数字
	if(!isDigit(reqQty)){
		alert("申请数量必须为数字！请重新输入！");
		newRequestForm.reqQty.value = "";
		newRequestForm.reqQty.focus();
		return false
	}
	
	// 检查需求日期
	if(reqDate == ""){
		alert("需求日期不能为空！");
		newRequestForm.reqDate.focus();
		return false
	}
	
	// 检查需求日期是否合法
	if(reqDate!=null && reqDate!= "" && !checkDate(reqDate)){
		alert("需求日期输入格式不正确，请重新输入！");
		return false;
	}
	
	// 检查需求时间
	if(reqTime == ""){
		alert("需求时间不能为空！");
		newRequestForm.reqTime.focus();
		return false
	}
	
	// 检查需求时间是否大于系统时间
	send('MTERequest.do?action=checkRequestTime&reqDate='+reqDate+'&reqTime='+reqTime,'checkRequestTime1');
	
	// send('MTERequest.do?action=newRequest&itemCode='+itemCode+'&reqQty='+reqQty+'&reqDate='+reqDate+'&reqTime='+reqTime+'&memo='+encodeURI(memo),'newRequest');
}

function submitModifyRequest(){
	
	var itemCode = modifyRequestForm.itemCode.value;
	var itemDesc = modifyRequestForm.itemDesc.value;
	var lot = modifyRequestForm.lot.value;
	var reqQty = modifyRequestForm.reqQty.value;
	var reqDate = modifyRequestForm.reqDate.value;
	var reqTime = modifyRequestForm.reqTime.value;
	var memo = modifyRequestForm.memo.value;

	// 检查部品号
	if(itemDesc == ""){
		alert("部品号不能为空！");
		modifyRequestForm.itemDesc.focus();
		return false
	}
	
	// 检查部品名
	if(itemCode == ""){
		alert("部品名不能为空！");
		modifyRequestForm.itemCode.focus();
		return false
	}
	
	if(lot!=""){
		// LOT号必须为英文、'-'符和数字组合
		var reg = /^[\w@]+$/;
		if(!reg.test(lot)){
			alert("LOT号必须为英文、'@'符和数字组合！请重新输入！");
			modifyRequestForm.lot.value = "";
			modifyRequestForm.lot.focus();
			return false
		}
	}
	
	// 检查申请数量
	if(reqQty == ""){
		alert("申请数量不能为空！");
		modifyRequestForm.reqQty.focus();
		return false
	}
	
	// 检查申请数量是否为数字
	if(!isDigit(reqQty)){
		alert("申请数量必须为数字！请重新输入！");
		modifyRequestForm.reqQty.value = "";
		modifyRequestForm.reqQty.focus();
		return false
	}
	
	// 检查需求日期
	if(reqDate == ""){
		alert("需求日期不能为空！");
		modifyRequestForm.reqDate.focus();
		return false
	}
	
	// 检查需求日期是否合法
	if(reqDate!=null && reqDate!= "" && !checkDate(reqDate)){
		alert("需求日期输入格式不正确，请重新输入！");
		return false;
	}
	
	// 检查需求时间
	if(reqTime == ""){
		alert("需求时间不能为空！");
		modifyRequestForm.reqTime.focus();
		return false
	}
	
	// 检查需求时间是否大于系统时间
	send('MTERequest.do?action=checkRequestTime&reqDate='+reqDate+'&reqTime='+reqTime,'checkRequestTime2');
	
}

function ajaxNewRequest(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;

			newRequestForm.lot.value = "";
			newRequestForm.reqQty.value = "";
			
			// 显示结果提示信息
			alert(res);
			
			// 刷新物料管理画面
			// queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function ajaxModifyRequest(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;
			
			// 显示结果提示信息
			alert(res);
			
			// 刷新物料管理画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function ajaxNewResponse(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;

			// 显示结果提示信息
			alert(res);
			
			// 刷新物料发送画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function clearNewRequestInput(){
	
	result = confirm("确认要重置吗？");
	if(result){
		// 清空输入框
		newRequestForm.usageType.options[0].selected=true;
		newRequestForm.itemType.innerHTML = "";
		newRequestForm.itemType.disabled = true;
		newRequestForm.itemDesc.innerHTML = "";
		newRequestForm.itemDesc.disabled = true;
		newRequestForm.itemCode.value = "";
		newRequestForm.itemSpec.value = "";
		newRequestForm.itemUnit.value = "";
		//newRequestForm.stock.value = "";
		
		newRequestForm.reqQty.value = "";
		newRequestForm.reqDate.value = "";
		newRequestForm.reqTime.value = "";
		newRequestForm.memo.value = "";
	}
}

function doMTERequestKeyDown(){
	if (event.keyCode==13){
		queryRequestInfo();
	}
}

function responseFlag1Changed(){
	var responseFlag1 = queryForm.responseFlag1.value;
	if(responseFlag1 == null || responseFlag1 == '0'){
		queryForm.responseFlag1.value = '1';
	}else{
		queryForm.responseFlag1.value = '0';
	}
}

function responseFlag2Changed(){
	var responseFlag2 = queryForm.responseFlag2.value;
	if(responseFlag2 == null || responseFlag2 == '0'){
		queryForm.responseFlag2.value = '1';
	}else{
		queryForm.responseFlag2.value = '0';
	}
	
}

function recieveFlag1Changed(){
	var recieveFlag1 = queryForm.recieveFlag1.value;
	if(recieveFlag1 == null || recieveFlag1 == '0'){
		queryForm.recieveFlag1.value = '1';
	}else{
		queryForm.recieveFlag1.value = '0';
	}
}

function recieveFlag2Changed(){
	var recieveFlag2 = queryForm.recieveFlag2.value;
	if(recieveFlag2 == null ||recieveFlag2 == '0'){
		queryForm.responseFlag1.value = '0';
		queryForm.responseFlag2.value = '0';
		queryForm.resFlag1.disabled = true;
		queryForm.resFlag2.disabled = true;
		
		queryForm.recieveFlag2.value = '1';
	}else{
		queryForm.resFlag1.disabled = false;
		queryForm.resFlag2.disabled = false;
		
		queryForm.recieveFlag2.value = '0';
	}
}

function newResponse(requestSeq){
	
	// 读取所选行对应的需求数据，设置到隐藏对话框
	if(requestSeq!=null && requestSeq!=""){
		send('MTEResponse.do?action=getRequestInfo&requestSeq='+requestSeq,'getRequestInfo');
	}	
}

function hideNewResponseDialog(){
	var dialogDiv = document.getElementById("newResponse");
	var maskDiv = document.getElementById("mask");
	
	dialogDiv.style.display = "none";
	maskDiv.style.display = "none";
}

function clearNewResponseInput(){
	result = confirm("确认要重置吗？");
	if(result){
		// 清空输入框
		newResponseForm.resQty.value = "";

	}
}

function ajaxGetRequestInfo(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=decodeURIComponent(root.getElementsByTagName("content")[0].firstChild.data);

			if(res != null && res !="" && res != "notExist" ){
				var requestInfoArr = res.split(',');
				newResponseForm.requestSeq.value = requestInfoArr[0];
				newResponseForm.projectName.value = requestInfoArr[1];
				newResponseForm.itemCode.value = requestInfoArr[2];
				newResponseForm.itemDesc.value = requestInfoArr[3].replace(/\?\?comma/g, ",");
				newResponseForm.lot.value = requestInfoArr[4];
				newResponseForm.remarks.value = requestInfoArr[5];
				newResponseForm.reqQty.value = requestInfoArr[6];
				newResponseForm.resQtyTotal.value = requestInfoArr[7];
				
				
				var dialogDiv = document.getElementById("newResponse");
				var maskDiv = document.getElementById("mask");
				
				dialogDiv.style.display = "block";
				maskDiv.style.display = "block";
				
				newResponseForm.resQty.focus();
				
				if(eval(newResponseForm.resQtyTotal.value)>eval(newResponseForm.reqQty.value)){
					alert('已发送数量大于申请数量!');
				}
				
			}else{
				alert("无法取得需求信息！请联系管理员！");
			}
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function submitNewResponse(){

	var reqSeq = newResponseForm.requestSeq.value;
	var resQty = newResponseForm.resQty.value;
	var resMemo = newResponseForm.resMemo.value;
	
	// 检查发料数量
	if(resQty == ""){
		alert("发料数量不能为空！");
		newResponseForm.resQty.focus();
		return false
	}
	
	// 检查发料数量是否为数字
	if(!isDigit(resQty)){
		alert("发料数量必须为数字！请重新输入！");
		newResponseForm.resQty.value = "";
		newResponseForm.resQty.focus();
		return false
	}
		
	send('MTEResponse.do?action=newResponse&reqSeq='+reqSeq+'&resQty='+resQty+'&resMemo='+encodeURI(resMemo),'newResponse');

}

function ajaxCheckRequestTime1(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=trim(root.getElementsByTagName("content")[0].firstChild.data);

			// 如果需求时间小于系统当前时间，则检查是否重复提交
			if(res=="ok"){	
				var itemCode = newRequestForm.itemCode.value;
				send('MTERequest.do?action=checkDupRequest&itemCode='+itemCode,'checkDupRequest1');
			}else{
				// 显示结果
				alert("需求时间小于系统当前时间！请重新输入！");
				newRequestForm.reqDate.focus();
			}
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function ajaxCheckRequestTime2(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=trim(root.getElementsByTagName("content")[0].firstChild.data);

			// 如果需求时间小于系统当前时间，则检查是否重复提交
			if(res=="ok"){	
				var itemCode = modifyRequestForm.itemCode.value;
				send('MTERequest.do?action=checkDupRequest&itemCode='+itemCode,'checkDupRequest2');
			}else{
				// 显示结果
				alert("需求时间小于系统当前时间！请重新输入！");
				modifyRequestForm.reqDate.focus();
			}
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}


function ajaxCheckDupRequest1(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=trim(root.getElementsByTagName("content")[0].firstChild.data);

			
			var itemCode = newRequestForm.itemCode.value;
			var itemDesc = newRequestForm.itemDesc.value;
			var lot = newRequestForm.lot.value;
			var remarks = newRequestForm.remarks.value;
			var reqQty = newRequestForm.reqQty.value;
			var reqDate = newRequestForm.reqDate.value;
			var reqTime = newRequestForm.reqTime.value;
			var remarks = newRequestForm.remarks.value;
			var memo = newRequestForm.memo.value;
			
			// 如果不是同一个人同一天申请同一样物料，则正式提交
			if(res=="ok"){
				send('MTERequest.do?action=newRequest&itemCode='+itemCode+'&itemDesc='+encodeURIComponent(itemDesc).replace(/\+/g,'%2B')+'&lot='+lot+'&remarks='+encodeURI(remarks)+'&reqQty='+reqQty+'&reqDate='+reqDate+'&reqTime='+reqTime+'&memo='+encodeURI(memo),'newRequest');
			}else{
				// 提示信息
				result = confirm("此部品已申请过，是否需要再次申请？");
				if(result){
					send('MTERequest.do?action=newRequest&itemCode='+itemCode+'&itemDesc='+encodeURIComponent(itemDesc).replace(/\+/g,'%2B')+'&lot='+lot+'&remarks='+encodeURI(remarks)+'&reqQty='+reqQty+'&reqDate='+reqDate+'&reqTime='+reqTime+'&memo='+encodeURI(memo),'newRequest');
				}
			}
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function ajaxCheckDupRequest2(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=trim(root.getElementsByTagName("content")[0].firstChild.data);

			var requestSeq = modifyRequestForm.requestSeq.value;
			var itemCode = modifyRequestForm.itemCode.value;
			var itemDesc = modifyRequestForm.itemDesc.value;
			var lot = modifyRequestForm.lot.value;
			var remarks = modifyRequestForm.remarks.value;
			var reqQty = modifyRequestForm.reqQty.value;
			var reqDate = modifyRequestForm.reqDate.value;
			var reqTime = modifyRequestForm.reqTime.value;
			var remarks = modifyRequestForm.remarks.value;
			var memo = modifyRequestForm.memo.value;
			
			// 如果不是同一个人同一天申请同一样物料，则正式提交
			if(res=="ok"){
				send('MTERequest.do?action=modifyRequest&itemCode='+itemCode+'&itemDesc='+encodeURIComponent(itemDesc).replace(/\+/g,'%2B')+'&lot='+lot+'&remarks='+encodeURI(remarks)+'&reqQty='+reqQty+'&reqDate='+reqDate+'&reqTime='+reqTime+'&memo='+encodeURI(memo)+'&requestSeq='+requestSeq,'modifyRequest');
			}else{
				// 提示信息
				result = confirm("此部品已申请过，是否需要再次申请？");
				if(result){
					send('MTERequest.do?action=modifyRequest&itemCode='+itemCode+'&itemDesc='+encodeURIComponent(itemDesc).replace(/\+/g,'%2B')+'&lot='+lot+'&remarks='+encodeURI(remarks)+'&reqQty='+reqQty+'&reqDate='+reqDate+'&reqTime='+reqTime+'&memo='+encodeURI(memo)+'&requestSeq='+requestSeq,'modifyRequest');
				}
			}
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function doTest(){
	var itemTotal = queryForm.itemTotal.value;
	var pageSelected = queryForm.pageSelected.value;
	
	if( itemTotal != "" ){
		// 分页部分
		$("#pager").pagination({
	　　        items: 100,
	 　　       itemsOnPage: 10,
	　　        cssStyle: 'light-theme'
	 　　});

   	}
}

function changePage(){
	pageSelected = $("#pager").pagination('getCurrentPage');
	queryForm.pageSelected.value = pageSelected;
	queryForm.submit();
}

function genMTEAdminXls(){
	var scr_w 		= screen.availWidth;
	var scr_h 		= screen.availHeight*.94;
	var theURL		= "material_MTEAdmin_excel.jsp";
	var _winobj 	= window.open(theURL,"","height="+scr_h+",width="+scr_w+",resizable=1,status=yes,location=no");
	_winobj.moveTo(-1, -1);
	_winobj.focus();
}

function genInquiryXls(){
	
	var department = queryForm.department.value;
	var projectId = queryForm.projectId.value;
	var applyDateStart = queryForm.applyDateStart.value;
	var applyDateEnd = queryForm.applyDateEnd.value;
	var line = queryForm.line.value;
	var responseFlag1 = queryForm.responseFlag1.value;
	var responseFlag2 = queryForm.responseFlag2.value;
	var recieveFlag1 = queryForm.recieveFlag1.value;
	var recieveFlag2 = queryForm.recieveFlag2.value;
	var itemCode = queryForm.itemCode.value;
	var itemDesc = queryForm.itemDesc.value;
	var reqDateStart = queryForm.reqDateStart.value;
	var reqDateEnd = queryForm.reqDateEnd.value;
	
	var scr_w 		= screen.availWidth;
	var scr_h 		= screen.availHeight*.94;
	var theURL		= "material_list_excel.jsp?department="+department+"&projectId="+projectId+'&line='+line+'&itemCode='+itemCode+'&itemDesc='+encodeURIComponent(itemDesc).replace(/\+/g,'%2B')+'&responseFlag1='+responseFlag1+'&responseFlag2='+responseFlag2+'&recieveFlag1='+recieveFlag1+'&recieveFlag2='+recieveFlag2+'&applyDateStart='+applyDateStart+'&applyDateEnd='+applyDateEnd+'&reqDateStart='+reqDateStart+'&reqDateEnd='+reqDateEnd;
	var _winobj 	= window.open(theURL,"","height="+scr_h+",width="+scr_w+",resizable=1,status=yes,location=no");
	_winobj.moveTo(-1, -1);
	_winobj.focus();
}

function departmentChange(formType){

	var department;
	var ajaxParam;
	var objForm;
	
	// 根据参数确定要处理的具体是哪个form的部门下拉菜单
	if(formType==1){
		objForm = queryForm;
		ajaxParam='getProjectList1';
	}else if(formType==2){
		objForm = addAuthForm;
		ajaxParam='getProjectList2';
	}else if(formType==3){
		objForm = modifyAuthForm;
		ajaxParam='getProjectList3';
	}

	department = objForm.department.value;
	if(department != null && department != ""){
		send('AuthAdmin.do?action=getProjectList&department='+department,ajaxParam);

	}else{
		// 清空project下拉菜单，并设为disabled
		objForm.projectId.innerHTML = "";
		objForm.projectId.disabled = true;
		
		// 清空line下拉菜单，并设为disabled
		objForm.line.innerHTML = "";
		objForm.line.disabled = true;
	}
}

// 更新工程下拉菜单1
function ajaxGetProjectList1(){

	if(XMLHttpReq.readyState==4){ // 对象状态
		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var projectId=root.getElementsByTagName("projectid")[0].firstChild.data;
			var projectName=root.getElementsByTagName("projectname")[0].firstChild.data;
			
			var objSelect =  queryForm.projectId;
			
			projectIdList = trim(projectId);
			projectNameList = trim(projectName);
			if(projectIdList != null && projectIdList !="" && projectIdList != "notExist" ){
				var projectIdArr = projectIdList.split(',');
				var projectNameArr = projectNameList.split(',');
				
				// 清空工程下拉菜单
				objSelect.innerHTML = "";
				
				// 编辑工程下拉菜单HTML代码
				var newOption = new Option("", "");       
				objSelect.options.add(newOption); 
				for(i=0;i<projectIdArr.length;i++){
					
					// alert(projectNameArr[i]);
					newOption = new Option(projectNameArr[i],projectIdArr[i]);       
					objSelect.options.add(newOption);
				}

				objSelect.disabled = false;
			}else{
				// 无工程则将下拉菜单设一个空值
				objSelect.innerHTML = "";
				var newOption = new Option("", "");  
				
				objSelect.disabled = true;
				
			}
			
			// 清空拉别下拉菜单
			var objSelect = queryForm.line;
			objSelect.innerHTML = "";
			var newOption = new Option("", "");  
			
			objSelect.disabled = true;

			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

// 更新工程下拉菜单2
function ajaxGetProjectList2(){

	if(XMLHttpReq.readyState==4){ // 对象状态
		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var projectId=root.getElementsByTagName("projectid")[0].firstChild.data;
			var projectName=root.getElementsByTagName("projectname")[0].firstChild.data;
			
			var objSelect =  addAuthForm.projectId;
			
			projectIdList = trim(projectId);
			projectNameList = trim(projectName);
			if(projectIdList != null && projectIdList !="" && projectIdList != "notExist" ){
				var projectIdArr = projectIdList.split(',');
				var projectNameArr = projectNameList.split(',');
				
				// 清空拉别下拉菜单
				objSelect.innerHTML = "";
				
				// 编辑拉别下拉菜单HTML代码
				var newOption = new Option("", "");       
				objSelect.options.add(newOption); 
				for(i=0;i<projectIdArr.length;i++){
					
					// alert(projectNameArr[i]);
					newOption = new Option(projectNameArr[i],projectIdArr[i]);       
					objSelect.options.add(newOption);
				}
				objSelect.disabled = false;

			}else{
				// 无拉别则将下拉菜单设一个空值
				objSelect.innerHTML = "";
				var newOption = new Option("", "");   
				
			}

			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

// 更新工程下拉菜单3
function ajaxGetProjectList3(){

	if(XMLHttpReq.readyState==4){ // 对象状态
		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var projectId=root.getElementsByTagName("projectid")[0].firstChild.data;
			var projectName=root.getElementsByTagName("projectname")[0].firstChild.data;
			
			var objSelect =  modifyAuthForm.projectId;
			
			projectIdList = trim(projectId);
			projectNameList = trim(projectName);
			if(projectIdList != null && projectIdList !="" && projectIdList != "notExist" ){
				var projectIdArr = projectIdList.split(',');
				var projectNameArr = projectNameList.split(',');
				
				// 清空拉别下拉菜单
				objSelect.innerHTML = "";
				
				// 编辑拉别下拉菜单HTML代码
				var newOption = new Option("", "");       
				objSelect.options.add(newOption); 
				for(i=0;i<projectIdArr.length;i++){
					
					// alert(projectNameArr[i]);
					newOption = new Option(projectNameArr[i],projectIdArr[i]);       
					objSelect.options.add(newOption);
				}
				objSelect.disabled = false;
				
				// 遍历select的option，设置上次用户选择的项为selected
				var lastSelectedProject = modifyAuthForm.projectSelected.value;
				for( i=0;i<objSelect.options.length;i++){
					var project = objSelect.options[i].value;
					if(project==lastSelectedProject){
						objSelect.options[i].selected=true
					}
				}

			}else{
				// 无拉别则将下拉菜单设一个空值
				objSelect.innerHTML = "";
				var newOption = new Option("", "");   
				
			}

			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function doRecieve(requestSeq,responseSeq){
	
	
	// 读取所选行对应的需求数据，设置到隐藏对话框
	if(requestSeq!=null && requestSeq!=""&&responseSeq!=null && responseSeq!=""){
		//alert(requestSeq+','+responseSeq);
		send('MTERecieve.do?action=getRecieveInfo&requestSeq='+requestSeq+'&responseSeq='+responseSeq,'getRecieveInfo');
	}	
}

function ajaxGetRecieveInfo(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=decodeURIComponent(root.getElementsByTagName("content")[0].firstChild.data);

			if(res != null && res !="" && res != "notExist" ){
				var requestInfoArr = res.split(',');
				doRecieveForm.requestSeq.value = requestInfoArr[0];
				doRecieveForm.responseSeq.value = requestInfoArr[1];
				doRecieveForm.itemCode.value = requestInfoArr[2];
				doRecieveForm.lot.value = requestInfoArr[3];
				doRecieveForm.resQty.value = requestInfoArr[4];
				
				
				var dialogDiv = document.getElementById("doRecieve");
				var maskDiv = document.getElementById("mask");
				
				dialogDiv.style.display = "block";
				maskDiv.style.display = "block";
				
				
			}else{
				alert("无法取得接料信息！请联系管理员！");
			}
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function ajaxDoRecieve(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;

			// 显示结果提示信息
			alert(res);
			
			// 刷新物料接收画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function submitDoRecieve(){

	var requestSeq = doRecieveForm.requestSeq.value;
	var responseSeq = doRecieveForm.responseSeq.value;
	var recMemo = doRecieveForm.recMemo.value;

	result = confirm("确认要接料吗？");
	if(result){
		send('MTERecieve.do?action=doRecieve&requestSeq='+requestSeq+'&responseSeq='+responseSeq+'&recMemo='+encodeURI(recMemo),'doRecieve');
	}
}

//隐藏弹出对话框层和遮罩层
function hideDoRecieveDialog(){

	var dialogDiv = document.getElementById("doRecieve");
	var maskDiv = document.getElementById("mask");
	
	dialogDiv.style.display = "none";
	maskDiv.style.display = "none";
}

function doDelete(){
	
	var requestSeq = modifyRequestForm.requestSeq.value;
	
	// 删除所选行对应的需求数据
	if(requestSeq!=null && requestSeq!=""){
		result = confirm("确认要删除吗？");
		if(result){
			send('MTERequest.do?action=deleteRequest&requestSeq='+requestSeq,'deleteRequest');
		}
	}	
}

function ajaxDeleteRequest(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=root.getElementsByTagName("content")[0].firstChild.data;

			// 显示结果提示信息
			alert(res);
			
			// 刷新物料需求画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function itemCodeChange(dialogType){
	var itemCode = "";
	
	if(dialogType == 1){
	    itemCode = newRequestForm.itemCode.value;
	}else{
		itemCode = modifyRequestForm.itemCode.value;
	}

	if(itemCode != ""){
		
		if(dialogType == 1){
			send('MTERequest.do?action=getItemDesc&itemCode='+itemCode,'getItemDesc1');
		}else{
			send('MTERequest.do?action=getItemDesc&itemCode='+itemCode,'getItemDesc2');
		}

	}else{
		if(dialogType == 1){
		    newRequestForm.itemDesc.value = "";
		}else{
			modifyRequestForm.itemDesc.value = "";
		}
	}
	

}

function ajaxGetItemDesc1(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=trim(root.getElementsByTagName("content")[0].firstChild.data);
			
			if(res!= null && res != "" && res != "notExist" ){
				newRequestForm.itemDesc.value = res;
			}else{
				newRequestForm.itemDesc.value = "";
				newRequestForm.itemCode.focus();
				alert("无法获取部品名！请输入正确的部品号！");
			}
			
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function ajaxGetItemDesc2(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=trim(root.getElementsByTagName("content")[0].firstChild.data);
			
			if(res!= null && res != "" && res != "notExist" ){
				modifyRequestForm.itemDesc.value = res;
			}else{
				modifyRequestForm.itemDesc.value = "";
				modifyRequestForm.itemCode.focus();
				alert("无法获取部品名！请输入正确的部品号！");
			}
			
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function userIdChange(){
	var userId = addAuthForm.userId.value;
	if(userId != ""){
		send('AuthAdmin.do?action=getUserInfo&userId='+userId,'getUserInfo');
	}else{
		addAuthForm.userName.value = "";
		addAuthForm.department.value = "";     
		addAuthForm.department.options[0].selected=true;
		addAuthForm.projectId.options.length = 0;
		addAuthForm.line.value = "";
		addAuthForm.authorityType.options[0].selected=true;
		
		addAuthForm.userName.disabled = false;
		addAuthForm.department.disabled = false;
		addAuthForm.projectId.disabled = false;
		addAuthForm.line.disabled = false;
	}
}

function ajaxGetUserInfo(){

	if(XMLHttpReq.readyState==4){ // 对象状态
		
		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=decodeURIComponent(trim(root.getElementsByTagName("content")[0].firstChild.data));
			
			if(res!= null && res != "" && res != "notExist" ){
				alert("该用户已存在！本页面无法修改用户基本信息，但可追加“管理员类型”！");
				
				var userInfoArr = res.split(',');
				addAuthForm.userName.value = userInfoArr[0];
				addAuthForm.department.value = userInfoArr[1];
				
				var projectId =  userInfoArr[2];
				var projectName =  userInfoArr[3];
				var newOption = new Option(projectName, projectId);       
				addAuthForm.projectId.options.add(newOption); 

				addAuthForm.line.value = userInfoArr[4];
				
				addAuthForm.userName.disabled = true;
				addAuthForm.department.disabled = true;
				addAuthForm.projectId.disabled = true;
				addAuthForm.line.disabled = true;
				
			}else{
				addAuthForm.userName.value = "";
				addAuthForm.department.value = "";     
				addAuthForm.department.options[0].selected=true;
				addAuthForm.projectId.options.length = 0;
				addAuthForm.line.value = "";
				addAuthForm.authorityType.options[0].selected=true;
				
				addAuthForm.userName.disabled = false;
				addAuthForm.department.disabled = false;
				addAuthForm.projectId.disabled = false;
				addAuthForm.line.disabled = false;
			}
			
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function setUnderstock(itemCode){
	result = confirm('确认要将该部品(itemCode:'+ itemCode +')设为短缺吗？');
	if(result){
		send('MTEResponse.do?action=setUnderstock&itemCode='+itemCode,'setUnderstock');
	}
}

function unlockUnderstock(itemCode){
	result = confirm('确认要将该部品(itemCode:'+ itemCode +')的短缺状态解除吗？');
	if(result){
		send('MTEResponse.do?action=unlockUnderstock&itemCode='+itemCode,'unlockUnderstock');
	}
}

function lockRequest(requestSeq){
	result = confirm('确认要将该需求关闭吗？');
	if(result){
		send('MTEResponse.do?action=lockRequest&requestSeq='+requestSeq,'lockRequest');
	}
}

function unlockRequest(requestSeq){
	result = confirm('确认要将该需求的关闭状态解除吗？');
	if(result){
		send('MTEResponse.do?action=unlockRequest&requestSeq='+requestSeq,'unlockRequest');
	}
}

function ajaxSetUnderstock(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=decodeURIComponent(trim(root.getElementsByTagName("content")[0].firstChild.data));

			// 显示结果提示信息
			alert(res);
			
			// 刷新权限管理画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function ajaxUnlockUnderstock(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=decodeURIComponent(trim(root.getElementsByTagName("content")[0].firstChild.data));

			// 显示结果提示信息
			alert(res);
			
			// 刷新权限管理画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function ajaxLockRequest(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=decodeURIComponent(trim(root.getElementsByTagName("content")[0].firstChild.data));

			// 显示结果提示信息
			alert(res);
			
			// 刷新权限管理画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function ajaxUnlockRequest(){
	if(XMLHttpReq.readyState==4){ // 对象状态

		if(XMLHttpReq.status==200){// 信息已成功返回，开始处理信息
			<!--测试读取xml开始-->
			var root=XMLHttpReq.responseXML;
			var res=decodeURIComponent(trim(root.getElementsByTagName("content")[0].firstChild.data));

			// 显示结果提示信息
			alert(res);
			
			// 刷新权限管理画面
			queryForm.submit();
			
			<!--测试读取xml结束-->   
		}else{
			alert("所请求的页面有异常！");
		}
	}
}

function gotoLogin() {

	window.location.href = "/";

}
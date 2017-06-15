// 改变样式
function setStyle( obj,json ){
	for( var attr in json ){
		if ( attr == 'opacity' ) {
			obj.style.filter = 'alpha(opacity:' + json[attr] * 100 + ')';
			obj.style.opacity = json[attr];
		}else {
			obj.style[attr] = json[attr];
		}
	}
}

// 选择器
function $_( obj ){
	var oDOMname = obj.split( ' ' );

	if ( oDOMname.length == 1 ) {
		return getone();
	}else {
		
		if ( oDOMname[1].charAt(0) == '.' ) {
			var arrClass = [];
			for (var i = 0; i < document.getElementById( oDOMname[0].substring(1) ).getElementsByTagName('*').length; i++) {
				if ( document.getElementById( oDOMname[0].substring(1) ).getElementsByTagName('*')[i].className ) {
					var aClass = document.getElementById( oDOMname[0].substring(1) ).getElementsByTagName('*')[i].className.split(' ');
					for (var j = 0; j < aClass.length; j++) {
						if ( aClass[j] == oDOMname[1].substring(1) ) {
							arrClass.push( document.getElementById( oDOMname[0].substring(1) ).getElementsByTagName('*')[i] )
						}
					}
				}
			}
			return arrClass
		}else {
			return document.getElementById( oDOMname[0].substring(1) ).getElementsByTagName( oDOMname[1] )
		}
	}

	function getone(){
		if ( obj.charAt(0) == '#' ) {
			return document.getElementById( obj.substring(1) )
		}else {
			if ( obj.charAt(0) == '.' ) {
				var arrClass = [];
				for (var i = 0; i < document.getElementsByTagName('*').length; i++) {
					if ( document.getElementsByTagName('*')[i].className ) {
						var aClass = document.getElementsByTagName('*')[i].className.split(' ');
						for (var j = 0; j < aClass.length; j++) {
							if ( aClass[j] == obj.substring(1) ) {
								arrClass.push( document.getElementsByTagName('*')[i] )
							}
						}
					}
				}
				return arrClass
			}else {
				return document.getElementsByTagName(obj);
			}
		}
	}
}

// 删除或添加类名
function setClass( obj,oClassName ){

	if ( obj.className ) {
		var aClass = obj.className.split( ' ' );
	}else {
		obj.className = oClassName;
		return;
	}
	
	for (var i = 0; i < aClass.length; i++) {
		if ( aClass[i] == oClassName ) {
			aClass.splice( i,1 );
			obj.className = aClass.join(' ');
			return;
		}
	}

	obj.className = obj.className + " " + oClassName;
	
}

// 绑定事件
function addFunc( obj,eventShijian,func ){
	if ( obj.addEventListener ) {
		obj.addEventListener( eventShijian,func,false )
	}else {
		obj.attachEvent( 'on' + eventShijian,function(){
			func.call( obj )
		} )
	}
}

// 设置字体大小
function docFont(){
	function setFontSize(){
		var oWidth = document.documentElement.clientWidth;
		if ( oWidth <= 768 ) {
			document.body.style.fontSize = document.documentElement.style.fontSize = Math.round( oWidth / 7.5 ) + 'px';
		}
	}
	setFontSize();
	addFunc( window,'resize',setFontSize )
}

// 移动端事件
var touchFunc = function(obj,type,func) {
	//滑动范围在5x5内则做点击处理，s是开始，e是结束
	var init = {x:5,y:5,sx:0,sy:0,ex:0,ey:0};
	var sTime = 0, eTime = 0;
	type = type.toLowerCase();
	
	obj.addEventListener("touchstart",function(){
	sTime = new Date().getTime();
		init.sx = event.targetTouches[0].pageX;
		init.sy = event.targetTouches[0].pageY;
		init.ex = init.sx;
		init.ey = init.sy;
		if(type.indexOf("start") != -1) func();
	}, false);

	obj.addEventListener("touchmove",function() {
		event.preventDefault();//阻止触摸时浏览器的缩放、滚动条滚动
		init.ex = event.targetTouches[0].pageX;
		init.ey = event.targetTouches[0].pageY;
		if(type.indexOf("move")!=-1) func();
	}, false);

	obj.addEventListener("touchend",function() {
		var changeX = init.sx - init.ex;
		var changeY = init.sy - init.ey;
		if(Math.abs(changeX)>Math.abs(changeY)&&Math.abs(changeY)>init.y) {
		//左右事件
			if(changeX > 0) {
				if(type.indexOf("left")!=-1) func();
			}
			else{
				if(type.indexOf("right")!=-1) func();
			}
		}
		else if(Math.abs(changeY)>Math.abs(changeX)&&Math.abs(changeX)>init.x){
			//上下事件
			if(changeY > 0) {
				if(type.indexOf("top")!=-1) func();
			}else{
				if(type.indexOf("down")!=-1) func();
			}
		}
		else if(Math.abs(changeX)<init.x && Math.abs(changeY)<init.y){
			eTime = new Date().getTime();
			//点击事件，此处根据时间差细分下
			if((eTime - sTime) > 300) {
				if(type.indexOf("long")!=-1) func(); //长按
			}
			else {
				if(type.indexOf("click")!=-1) func(); //当点击处理
			}
		}
		if(type.indexOf("end")!=-1) func();
	}, false);
};

// getScrollTop
function getScrollTop(itarget,sp){
	var getScrollTopTimer = null;
	var onOff = true;
	clearInterval( getScrollTopTimer );
	if ( window.addEventListener ) {
		window.addEventListener('scroll',fnGetScrollTop,false)
	}else {
		window.attachEvent('onscroll',fnGetScrollTop)
	}
	function fnGetScrollTop(){
		if ( !onOff ) {
			clearInterval( getScrollTopTimer )
		}
		onOff = false;
	}
	getScrollTopTimer = setInterval(function(){
		onOff = true;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var ispeed = (itarget-scrollTop)/sp;
		ispeed = ispeed > 0 ? Math.ceil(ispeed) : Math.floor(ispeed);
		if ( ispeed == 0 && scrollTop == itarget ) {
			clearInterval( getScrollTopTimer )
		}else {
			document.documentElement.scrollTop = document.body.scrollTop = scrollTop + ispeed;
		}
	},30)
}

// getStyle
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj,false)[attr] 
}

// 缓冲运动(改变样式)
function getMove( obj,json,time,fnn ){
	clearInterval(obj.timer);
	obj.timer = setInterval( function(){
		var bStop = true; // 停止开关
		var iAttr = null; // 当前属性值
		for( var attr in json ){
			if ( attr == 'opacity' ) {
				iAttr = parseInt( parseFloat(getStyle( obj,attr ))*100 );
			}else {
				iAttr = parseInt( getStyle( obj,attr ) );
			};
			var ispeed = ( json[attr] - iAttr ) / 8;
			ispeed = ispeed < 0 ? Math.floor( ispeed ) : Math.ceil( ispeed );
			if ( iAttr != json[attr] ) bStop = false;
			if ( attr == 'opacity' ) {
				obj.style.filter = 'alpha(opacity:' + (iAttr + ispeed) + ')';
				obj.style.opacity = (iAttr + ispeed)/100;
			}else {
				obj.style[attr] = iAttr + ispeed + 'px';
			}
		}
		if ( bStop ) {
			clearInterval(obj.timer);
			if( fnn ){
				fnn()
			}
		}
	},time)
}

// 匀速运动(改变样式)
function getUniformMove( obj,json,time,fnn ){
	clearInterval( obj.timer );
	obj.timer = setInterval(function(){
		var bStop = true;
		for( var attr in json ){
			if ( attr == 'opacity' ) {
				var iAttr = parseInt( parseFloat(getStyle( obj,attr ))*100 )
			}else {
				var iAttr = parseInt( getStyle( obj,attr ) )
			}
			var sp = json[attr] - iAttr > 0 ? time : -time;
			var ispeed = iAttr + sp;
			if ( iAttr != json[attr] ) bStop = false;
			if ( attr == 'opacity' ) ispeed = iAttr + sp;
			if ( ispeed > json[attr] && sp > 0 || ispeed < json[attr] && sp < 0 ) {
				if ( attr == 'opacity' ) {
					obj.style.filter = 'alpha(opacity:' + json[attr] + ')';
					obj.style.opacity = json[attr]/100;
				}else {
					obj.style[attr] = json[attr] + 'px';
				}			
			}else {
				if ( attr == 'opacity' ) {
					obj.style.filter = 'alpha(opacity:' + ispeed + ')';
					obj.style.opacity = ispeed/100;
				}else {
					obj.style[attr] = ispeed + 'px';
				}
			}
		}
		if ( bStop ) {
			clearInterval( obj.timer );
			if (fnn) {
				fnn()
			}
		}
	},20)
}

// ajax
function getAjax(GnP,url,fnn,fnn1){
	var oAjax = null;
	if ( window.XMLHttpRequest ){
		oAjax = new XMLHttpRequest();
	}else {
		oAjax = new ActiveXObject('Microsoft.XMLHTTP');
	};
	oAjax.open(GnP,url,true);
	oAjax.send();
	oAjax.onreadystatechange = function(){
		if ( oAjax.readyState == 4 ) {
			if ( oAjax.status == 200 ) {
				fnn( oAjax.responseText );
			}else {
				if ( fnn1 ) {
					fnn1( oAjax.status )
				}
			}
		}
	}
}

// 跳转page
var getPage = (function(){
	var ii = 0;
	return function fnn( page,aInput,attr,oOffset ){
		var iii = ii;
		page[ii].style.display = 'none';
		aInput[ii].className = '';
		switch (attr) {
			case 'right':
				ii++;
				if ( ii > page.length - 1 ) ii = page.length - 1;
				break;
			case 'left':
				ii--;
				if ( ii < 0 ) ii = 0;
				break;
			case 'first':
				ii = 0;
				break;
			case 'last':
				ii = page.length - 1;
				break;
			case 'onClick':
				ii = this.num;
				break;
			default:
				break;
		}
		page[ii].style.display = 'block';
		aInput[ii].className = 'active';
		if ( iii == ii ) return;
		if ( oOffset ) {
			document.body.scrollTop = document.documentElement.scrollTop = oOffset;
		};
		
		/* if ( aInp[0].className == 'active' ) {
			oFir.style.display = oBef.style.display = 'none'
		}else {
			oFir.style.display = oBef.style.display = 'inline-block'
		};
		if ( aInp[ aInp.length-1 ].className == 'active' ) {
			oLas.style.display = oNex.style.display = 'none'
		}else {
			oLas.style.display = oNex.style.display = 'inline-block'
		}; */                                                           //显示或隐藏按钮
	}
})()

// 弹性运动

function getElastic(obj,jAttr,spL,spT,fnn){
	var ispeed = 0;
	var oLT = 0;
	for( var attr in jAttr ){
		if ( attr == 'left' ) {
			oLT = obj.offsetLeft;
		}else {
			oLT = obj.offsetTop;
		}
		clearInterval(obj.timer1);
		obj.timer1 = setInterval(function(){
			switch (attr) {
				case 'left':
					ispeed += ( jAttr[attr] - obj.offsetLeft )/spL;
					break;
				case 'top':
					ispeed += ( jAttr[attr] - obj.offsetTop )/spL;
					break;
				default:
					break;
			}
			ispeed *= spT;
			oLT += ispeed;
			if ( Math.abs(ispeed) < 1 && Math.abs( oLT - jAttr[attr] ) < 1 ) {
				clearInterval(obj.timer1);
				obj.style[attr] = jAttr[attr] + 'px';
				if ( fnn ) {
					fnn()
				}
			}else {
				obj.style[attr] = oLT + 'px'
			}
		},30)
	}
}
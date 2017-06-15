//banner
var mySwiper = new Swiper ('.swiper-container', {
	direction: 'horizontal',
	// 往回跑
	loop: false,
	// 轮播时间及开关
	autoplay: false,
	// 滑动时间
	speed:500,
	// 显示个数
	slidesPerView: 1,
	// 没滑动一次滚动的单位（个数）
	slidesPerGroup: 0,
	// 滑动一次之后再次自动播放
	autoplayDisableOnInteraction : false,
	// 显示小圈
	pagination: '.swiper-pagination',
	// 添加样式
	paginationElement : 'li',
	onSlideChangeEnd:function(swiper){
		provinceIndex = swiper.activeIndex;
		if(provinceIndex == 6){
			provinceIndex = 1;
		}
		var title = $(".swiper-wrapper a").eq(provinceIndex).children("img").attr("title");
		//$(".swiper-describe").html(title)
	}
})	
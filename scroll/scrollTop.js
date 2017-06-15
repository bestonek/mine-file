$(".scroll").load( "scrollTop.html",function(){
	var timer = null;
	$(window).on("scroll",function(){
		$(".scrollTop").show();
		clearTimeout(timer);
		timer = setTimeout( function(){
			$(".scrollTop").fadeOut(400)
		},800 )
	})

	$(".scrollTop").on("tap",function(){
		getScrollTop( 0,10 );
	})
} )

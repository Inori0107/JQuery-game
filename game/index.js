$(".btn").each((index, btn) => {
	$(btn).hover(function () {
		$(".container").each((containerIndex, icon) => {
			$(icon).css({ background: "black" });
		});
	});
});
// 事件監聽 ?

$(".card").animate({});

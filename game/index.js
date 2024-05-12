// $(".btn").each((index, btn) => {
// 	$(btn)
// 		.eq(index)
// 		.click(function () {
// 			$(".container").each((containerIndex, icon) => {
// 				$(icon).eq(containerIndex).css({ background: "black" });
// 			});
// 		});
// });

// 物件點擊跟隨滑鼠（滑鼠拖曳）

$("#btn_yes").click(function () {
	$(".card").animate({
		left: "-=250px",
		opacity: "0"
	});
});
$("#btn_no").click(function () {
	$(".card").animate({
		left: "+=250px",
		opacity: "0"
	});
});

// game start
Swal.fire({
	title: "人生終極二選一",
	text: "Game Start!",
	icon: "success"
});

// 選項動畫
let canNext = true;
$("#btn_left").click(function () {
	if (canNext) {
		canNext = false;
		addProgress();
		$("#btn_left").animate(
			{
				left: "-=250px"
			},
			1000,
			"linear",
			reset
		);
		$(".game").animate(
			{
				opacity: "0"
			},
			1000,
			"linear",
			changeLeft
		);
	}
});
$("#btn_right").click(function () {
	if (canNext) {
		canNext = false;
		addProgress();
		$("#btn_right").animate(
			{
				left: "+=250px"
			},
			1000,
			"linear",
			reset
		);
		$(".game").animate(
			{
				opacity: "0"
			},
			2000,
			"linear",
			changeRight
		);
	}
});

// 進度條動畫
let progress = 0;
function addProgress() {
	if (progress < 100) {
		progress += 10;
		$(".progress span").animate({
			width: progress + "%"
		});
		$(".tag").animate({
			left: progress + "%"
		});
		$(".tag").text(progress + "%");
	} else {
		finish();
	}
}

// 下一題
function reset() {
	$(".game").animate(
		{
			opacity: "1"
		},
		1000,
		"linear",
		() => {
			canNext = true;
		}
	);
}
let index = 1;
function changeLeft() {
	$("#btn_left").css("left", "25%");
	index++;
	// console.log(index);
	$("#btn_left img").attr("src", `./questions/Q${index}-L.jpg`);
	$("#btn_right img").attr("src", `./questions/Q${index}-R.jpg`);
}
function changeRight() {
	$("#btn_right").css("left", "75%");
	index++;
	// console.log(index);
	$("#btn_left img").attr("src", `./questions/Q${index}-L.jpg`);
	$("#btn_right img").attr("src", `./questions/Q${index}-R.jpg`);
}

// 結語
function finish() {
	Swal.fire({
		title: "遊戲結束",
		text: "您已完成所有題目！",
		icon: "success"
	});
}

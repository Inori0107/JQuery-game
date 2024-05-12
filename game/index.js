let canNext = true;
$("#btn_yes").click(function () {
	if (canNext) {
		canNext = false;
		addProgress();
		$(".card").animate(
			{
				left: "-=250px",
				opacity: "0"
			},
			1000,
			"linear",
			resetCard
		);
	}
});
$("#btn_no").click(function () {
	if (canNext) {
		canNext = false;
		addProgress();
		$(".card").animate(
			{
				left: "+=250px",
				opacity: "0"
			},
			1000,
			"linear",
			resetCard
		);
	}
});
function resetCard() {
	$(".card").css("left", "50%");
	$(".card").animate(
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
	}
}

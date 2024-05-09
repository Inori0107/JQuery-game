const canvas = document.querySelector("canvas");

const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary {
	// static 給予數值 可導入
	static width = 40;
	static height = 40;
	constructor({ position, image }) {
		this.position = position;
		this.width = 40;
		this.height = 40;
		this.image = image;
	}

	draw() {
		// c.fillStyle = "blue";
		// c.fillRect(this.position.x, this.position.y, this.width, this.height);
		c.drawImage(this.image, this.position.x, this.position.y);
	}
}

class Player {
	constructor({ position, velocity }) {
		this.position = position;
		this.velocity = velocity;
		this.radius = 15;
	}
	draw() {
		c.beginPath();
		c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
		c.fillStyle = "yellow";
		c.fill();
		c.closePath();
	}
	update() {
		this.draw();
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}

const keys = {
	w: {
		pressed: false
	},
	a: {
		pressed: false
	},
	s: {
		pressed: false
	},
	d: {
		pressed: false
	}
};
let lastKey = "";

const map = [
	["-", "-", "-", "-", "-", "-", "-"],
	["-", "_", "_", "_", "_", "_", "-"],
	["-", "_", "-", "_", "-", "_", "-"],
	["-", "_", "_", "_", "_", "_", "-"],
	["-", "_", "-", "_", "-", "_", "-"],
	["-", "_", "_", "_", "_", "_", "-"],
	["-", "-", "-", "-", "-", "-", "-"]
];

const image = new Image();
image.src = "./asset/pipeHorizontal.png";

const boundaries = [
	new Boundary({
		position: {
			x: 0,
			y: 0
		}
	}),
	new Boundary({
		position: {
			x: 41,
			y: 0
		}
	})
];

map.forEach((row, i) => {
	row.forEach((symbol, j) => {
		switch (symbol) {
			case "-":
				boundaries.push(
					new Boundary({
						position: {
							x: Boundary.width * j,
							y: Boundary.height * i
						},
						image: image
					})
				);
				break;
		}
	});
});

const player = new Player({
	position: {
		x: Boundary.width + Boundary.width / 2,
		y: Boundary.height + Boundary.height / 2
	},
	velocity: {
		x: 0,
		y: 0
	}
});

function circleCollidesWithRectangle({ circle, rectangle }) {
	return (
		circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width && //左
		circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x && // 右
		circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height && // 上
		circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y // 下)
	);
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, canvas.width, canvas.height);

	if (keys.w.pressed && lastKey === "w") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				circleCollidesWithRectangle({
					circle: {
						...player,
						velocity: {
							x: 0,
							y: -5
						}
					},
					rectangle: boundary
				})
			) {
				player.velocity.y = 0;
			} else {
				player.velocity.y = -5;
			}
		}
		player.velocity.y = -5;
	} else if (keys.a.pressed && lastKey === "a") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				circleCollidesWithRectangle({
					circle: {
						...player,
						velocity: {
							x: -5,
							y: 0
						}
					},
					rectangle: boundary
				})
			) {
				player.velocity.x = 0;
			} else {
				player.velocity.x = -5;
			}
		}
	} else if (keys.s.pressed && lastKey === "s") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				circleCollidesWithRectangle({
					circle: {
						...player,
						velocity: {
							x: 0,
							y: 5
						}
					},
					rectangle: boundary
				})
			) {
				player.velocity.y = 0;
			} else {
				player.velocity.y = 5;
			}
		}
	} else if (keys.d.pressed && lastKey === "d") {
		for (let i = 0; i < boundaries.length; i++) {
			const boundary = boundaries[i];
			if (
				circleCollidesWithRectangle({
					circle: {
						...player,
						velocity: {
							x: 5,
							y: 0
						}
					},
					rectangle: boundary
				})
			) {
				player.velocity.x = 0;
			} else {
				player.velocity.x = 5;
			}
		}
	}

	boundaries.forEach((boundary) => {
		boundary.draw();

		if (
			circleCollidesWithRectangle({
				// 重新命名
				circle: player,
				rectangle: boundary
			})
		) {
			// console.log("太靠近惹 -////-");
			player.velocity.x = 0;
			player.velocity.y = 0;
		}
	});
	player.update();
	player.velocity.x = 0;
	player.velocity.y = 0;
}
animate();

addEventListener("keydown", ({ key }) => {
	// console.log(key);
	switch (key) {
		case "w":
			keys.w.pressed = true;
			lastKey = "w";
			player.velocity.y = -5;
			break;
		case "a":
			keys.a.pressed = true;
			lastKey = "a";
			player.velocity.x = -5;
			break;
		case "s":
			keys.s.pressed = true;
			lastKey = "s";
			player.velocity.y = 5;
			break;
		case "d":
			keys.d.pressed = true;
			lastKey = "d";
			player.velocity.x = 5;
			break;
	}
	// console.log(player.velocity);
});
// 按壓時 才前進
addEventListener("keyup", ({ key }) => {
	// console.log(key);
	switch (key) {
		case "w":
			keys.w.pressed = false;
			player.velocity.y = 0;
			break;
		case "a":
			keys.a.pressed = false;
			player.velocity.x = 0;
			break;
		case "s":
			keys.s.pressed = false;
			player.velocity.y = 0;
			break;
		case "d":
			keys.d.pressed = false;
			player.velocity.x = 0;
			break;
	}
	// console.log(player.velocity);
});

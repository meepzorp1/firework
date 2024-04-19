const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let animate;
let ground = 550;
let fireworks = [];
let gravity = .05;
let shrink = .01;

class Firework {
    constructor({position, direction}, size) {
        this.position = position;
        this.direction = direction;
        this.size = size;
        this.exploded = false;
        this.explodeAt = Math.floor(Math.random() * 80) + (Math.floor(Math.random() * 20) + 60);
        this.tick = 0;
        this.style = Math.floor(Math.random() * 2);
        this.sparks = [];
        this.color = Math.floor(Math.random() * 357) * 10;
    }
    draw() {
        
        c.fillStyle = 'hsl(' + this.color + ', 100%, 50%)';
        this.tick++;
        if (this.exploded) {
            if (this.size > .1) this.size -= shrink;
            switch (this.style) {
                case 0:
                    for (let i = 0; i < this.sparks.length; i++) {
                        if (this.sparks[i].direction.y <= 2) this.sparks[i].direction.y += gravity;
                        this.sparks[i].direction.x -= this.sparks[i].direction.x * (gravity / 2);
                        this.sparks[i].position.x += this.sparks[i].direction.x;
                        this.sparks[i].position.y += this.sparks[i].direction.y;
                        c.beginPath();
                        c.arc(this.sparks[i].position.x, this.sparks[i].position.y, this.size, 0, Math.PI * 2);
                        c.fill();
                    }
                    break;
                case 1:
                    for (let i = 0; i < this.sparks.length; i++) {
                        if (this.sparks[i].direction.y <= 2) this.sparks[i].direction.y += gravity;
                        this.sparks[i].direction.x -= this.sparks[i].direction.x * (gravity / 2);
                        this.sparks[i].position.x += this.sparks[i].direction.x;
                        this.sparks[i].position.y += this.sparks[i].direction.y;

                        c.beginPath();
                        c.arc(this.sparks[i].position.x, this.sparks[i].position.y, this.size, 0, Math.PI * 2);
                        c.fill();
                    }
            }
        }
        else {
            if (this.size > .1) this.size -= shrink;
            this.direction.y += gravity;

            this.position.x += this.direction.x;
            this.position.y += this.direction.y;

            c.beginPath();
            c.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2);
            c.fill();
        }
        if (this.tick == this.explodeAt) {
            switch (this.style) {
                case 0:
                    this.sparks[0] = {position: { x: this.position.x, y: this.position.y }, direction: { x: -3, y: 2 }};
                    this.sparks[1] = {position: { x: this.position.x, y: this.position.y }, direction: { x: -3, y: -2 }};
                    this.sparks[2] = {position: { x: this.position.x, y: this.position.y }, direction: { x: -2, y: -3 }};
                    this.sparks[3] = {position: { x: this.position.x, y: this.position.y }, direction: { x: 2, y: -3 }};
                    this.sparks[4] = {position: { x: this.position.x, y: this.position.y }, direction: { x: 3, y: -2 }};
                    this.sparks[5] = {position: { x: this.position.x, y: this.position.y }, direction: { x: 3, y: 2 }};
                    this.sparks[6] = {position: { x: this.position.x, y: this.position.y }, direction: { x: -2, y: 3 }};
                    this.sparks[7] = {position: { x: this.position.x, y: this.position.y }, direction: { x: 2, y: 3 }};
                    break;
                case 1:
                    this.sparks[0] = {position: { x: this.position.x, y: this.position.y }, direction: { x: Math.random() * 2 - 1, y: Math.random() * 8 - 6 }};
                    this.sparks[1] = {position: { x: this.position.x, y: this.position.y }, direction: { x: this.sparks[0].direction.x * .001, y: this.sparks[0].direction.y }};

                    break;
            }
            this.size += 2;
            this.exploded = true;
        }
    }
}

const animation = () => {
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < fireworks.length; i++) {
        fireworks[i].draw();
    }

    animate = window.requestAnimationFrame(animation);
}

animation();

window.addEventListener('click', function(e) {
    fireworks.push(new Firework(
        { position: { x: Math.random() * (canvas.width - 400) + 200, y: ground }, direction: { x: Math.random() * 4 - 2, y: Math.random() * 2 - 7 }}, 1
        ));
});


//     console.log('working')
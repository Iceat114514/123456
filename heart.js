document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(x, y, vx, vy, color, size) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.color = color;
            this.size = size;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) {
                this.vx = -this.vx;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.vy = -this.vy;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    class HeartParticle extends Particle {
        constructor(x, y, vx, vy, color, size) {
            super(x, y, vx, vy, color, size);
        }

        isInHeart() {
            const x = this.x - canvas.width / 2;
            const y = this.y - canvas.height / 2;
            const a = x * x + y * y - 1;
            return Math.pow(a, 3) - x * x * y * y * y <= 0;
        }
    }

    const particles = [];
    for (let i = 0; i < 200; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const vx = (Math.random() - 0.5) * 2;
        const vy = (Math.random() - 0.5) * 2;
        const color = `rgba(${Math.random() * 255}, 0, 0, ${Math.random()})`;
        const size = Math.random() * 5 + 1;
        particles.push(new HeartParticle(x, y, vx, vy, color, size));
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas

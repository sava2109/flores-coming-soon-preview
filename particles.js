// ===== VERSION 2: PARA/DIM + ZLATNE ISKRE =====

const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
let smokeParticlesArray = [];

// ===== SMOKE/PARA PARTICLES =====
class SmokeParticle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 60 + 30;
        this.speedY = -Math.random() * 0.5 - 0.3;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.fade = Math.random() * 0.002 + 0.001;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.opacity -= this.fade;
        this.size += 0.2;

        if (this.opacity <= 0 || this.y < -100) {
            this.y = canvas.height + 50;
            this.x = Math.random() * canvas.width;
            this.opacity = Math.random() * 0.3 + 0.1;
            this.size = Math.random() * 60 + 30;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(200, 220, 255, ${this.opacity})`;
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ===== GOLDEN SPARKS/ISKRE =====
class Spark {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * -1 - 0.5;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.color = this.randomGoldColor();
        this.life = Math.random() * 100 + 50;
        this.decay = Math.random() * 0.02 + 0.01;
    }

    randomGoldColor() {
        const colors = [
            'rgba(255, 215, 0,',
            'rgba(255, 193, 7,',
            'rgba(255, 152, 0,'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.opacity = this.life / 100;

        if (this.life <= 0) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.life = Math.random() * 100 + 50;
            this.opacity = 1;
        }
    }

    draw() {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color + '0.5)';
    }
}

function initParticles() {
    particlesArray = [];
    smokeParticlesArray = [];
    
    // Smoke particles
    for (let i = 0; i < 15; i++) {
        smokeParticlesArray.push(new SmokeParticle());
    }
    
    // Spark particles
    for (let i = 0; i < 40; i++) {
        particlesArray.push(new Spark());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw smoke first (background)
    for (let smoke of smokeParticlesArray) {
        smoke.update();
        smoke.draw();
    }
    
    ctx.shadowBlur = 0;
    
    // Draw sparks on top
    for (let spark of particlesArray) {
        spark.update();
        spark.draw();
    }
    
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animateParticles();

// Obtén una referencia al lienzo
const lienzo = document.getElementById('lienzo');
const ctx = lienzo.getContext('2d');

// Establece el tamaño del lienzo
lienzo.width = window.innerWidth;
lienzo.height = window.innerHeight;

// Define una clase para representar una partícula
class Particle {
  constructor(x, y, radius, color, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 3);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.draw();
  }
}

// Crea un array para almacenar las partículas
const particles = [];

// Genera las partículas iniciales
function generarParticulas() {
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * lienzo.width;
    const y = Math.random() * lienzo.height;
    const radius = Math.random() * 5 + 1;
    const color = 'rgba(255, 255, 255, 0.5)';
    const speedX = Math.random() * 3 - 1.5;
    const speedY = Math.random() * 3 - 1.5;

    particles.push(new Particle(x, y, radius, color, speedX, speedY));
  }
}

// Animar las partículas
function animarParticulas() {
  ctx.clearRect(0, 0, lienzo.width, lienzo.height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();

    // Eliminar las partículas que estén fuera del lienzo
    if (
      particles[i].x < -particles[i].radius ||
      particles[i].x > lienzo.width + particles[i].radius ||
      particles[i].y < -particles[i].radius ||
      particles[i].y > lienzo.height + particles[i].radius
    ) {
      particles.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animarParticulas);
}

// Generar las partículas iniciales y comenzar la animación
generarParticulas();
animarParticulas();

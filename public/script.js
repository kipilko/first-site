console.log('script: initializing');

// Theme initialization
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.classList.add(savedTheme);
} else {
  document.body.classList.add('light');
}

// Utility: safe query
const $ = (sel, ctx = document) => ctx.querySelector(sel);

// Fun button behaviour (creates decorative circles)
const funButton = $('#fun-button');
function createFloatingCircle() {
  const circle = document.createElement('div');
  circle.className = 'floating-circle';
  const hue = Math.floor(Math.random() * 360);
  circle.style.background = `hsl(${hue} 70% 50%)`;
  circle.style.left = `${Math.random() * window.innerWidth}px`;
  circle.style.top = `${Math.random() * window.innerHeight}px`;
  document.body.appendChild(circle);

  // animate to a new position then fade
  requestAnimationFrame(() => {
    circle.style.left = `${Math.random() * window.innerWidth}px`;
    circle.style.top = `${Math.random() * window.innerHeight}px`;
    circle.style.opacity = '0';
  });
  setTimeout(() => circle.remove(), 1800);
}

if (funButton) {
  funButton.addEventListener('click', () => {
    funButton.textContent = 'I want candys!!!';
    for (let i = 0; i < 16; i++) createFloatingCircle();
  });
}

// Theme toggle
const toggleButton = $('#theme-toggle');
if (toggleButton) {
  const applyTheme = (theme) => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    toggleButton.textContent = theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', theme);
  };

  // set initial state from body
  if (document.body.classList.contains('dark')) toggleButton.textContent = '🌙';
  else toggleButton.textContent = '☀️';

  toggleButton.addEventListener('click', () => {
    const next = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
  });
}

// Hide loader after short delay
const loader = $('#loader');
if (loader) setTimeout(() => loader.style.display = 'none', 1200);

// Highlight current nav link
const links = document.querySelectorAll('nav a');
const current = window.location.pathname.split('/').pop() || 'index.html';
links.forEach(link => {
  const href = link.getAttribute('href');
  if (href === current) link.classList.add('active');
});

// Page-specific initializers
const page = document.body.dataset.page;
if (page === 'home') homePage();
if (page === 'about') aboutPage();
if (page === 'goals') goalsPage();

function homePage() {
  console.log('home page');
}

function aboutPage() {
  const p = $('p');
  if (!p) return;
  p.addEventListener('mouseenter', () => p.classList.add('hover-accent'));
  p.addEventListener('mouseleave', () => p.classList.remove('hover-accent'));
}

function goalsPage() {
  const items = document.querySelectorAll('li');
  items.forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('done');
    });
  });
}

//snowfall effect
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.textContent = '❄';
  snowflake.style.left = Math.random() * window.innerWidth + 'px';
  snowflake.style.fontSize = (Math.random() * 20 + 10) + 'px';
  snowflake.style.opacity = Math.random();
  snowflake.style.animationDuration = (Math.random() * 5 + 5) + 's';
  
  document.body.appendChild(snowflake);

  // Delete snowflake after animation
  setTimeout(() => {
    snowflake.remove();
  }, parseFloat(snowflake.style.animationDuration) * 1000);
}

// Create snowflakes at intervals 200ms
setInterval(createSnowflake, 200);

// Countdown timer to New Year
function updateCountdown() {
  const now = new Date();
  const newYear = new Date(now.getFullYear() + 1, 0, 1);
  const diff = newYear - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById('timer').textContent = 
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Burger menu toggle

const burger = document.getElementById('burger');
const nav = document.querySelector('header nav');

if(burger && nav) {  //check if elements exist
  burger.addEventListener('click', () => {
    nav.classList.toggle('active'); // swap menu visibility
  });
}




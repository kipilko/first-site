console.log("JS is alive");
const button = document.querySelector("button");
button.addEventListener("click", () => {
    button.textContent = "Fck ur boobies";
    document.body.style.background = `hsl(${Math.random()*360}, 70%, 30%)`;
    for(let i = 0; i < 20; i++) {
    const circle = document.createElement("div");
    circle.style.position = "absolute";
    circle.style.width = "50px";
    circle.style.height = "50px";
    circle.style.borderRadius = "50%";
    circle.style.background = `hsl(${Math.random()*360}, 70%, 50%)`;
    circle.style.left = `${Math.random()*window.innerWidth}px`;
    circle.style.top = `${Math.random()*window.innerHeight}px`;
    circle.style.pointerEvents = "none";
    circle.style.transition = "all 4s ease";

    document.body.appendChild(circle);
    setTimeout(() => {
      circle.style.left = `${Math.random()*window.innerWidth}px`;
      circle.style.top = `${Math.random()*window.innerHeight}px`;
      circle.style.opacity = 0;
    }, 50);
     setTimeout(() => {
      circle.remove();
    }, 1800);
  }
});
const toggleButton = document.getElementById("theme-toggle");
let isDay = true;
toggleButton.addEventListener("click", () => {
  if(isDay) {
    document.body.style.background = "#111";
    document.body.style.color = "#f46";
    toggleButton.textContent = "🌙";
  } else {
     document.body.style.background = "#fff";
    document.body.style.color = "#333";
    toggleButton.textContent = "☀️";
  }
  isDay = !isDay;
});

const elzaButton = document.getElementById("elza");
let elsaOn = false;

elzaButton.addEventListener("click", () => {
    if(!elsaOn){
        document.body.classList.add("elza-bg");  
        elzaButton.classList.add("elza-active"); 
    } else {
        document.body.classList.remove("elza-bg");
        elzaButton.classList.remove("elza-active");
    }
    elsaOn = !elsaOn;
});

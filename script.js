
gsap.registerPlugin(ScrollTrigger);


// ✅ NAVIGATION ANIMATION
function navGsap() {
  var tl = gsap.timeline();
  tl.from("#nav h1", {
    opacity: 0,
    y: -10,
    duration: 0.5,
    delay: 0.5,
  });

  tl.from("#nav-part2 a", {
    opacity: 0,
    y: -10,
    duration: 0.2,
    stagger: 0.2,
  });

  tl.from("#nav-part2 button", {
    opacity: 0,
    y: -10,
    duration: 0.1,
  });
  gsap.from("#right img", {
    opacity: 0, 
    duration: 1.5, 
    scale: 0.8, 
    delay: 0.5, 
    y: 50, 
    ease: "power2.out", 
  });

  
  gsap.from("#name", {
    y: 50,
    opacity: 0,
    duration: 0.5,
    delay: 0.3,
  });
}
navGsap();

// ✅ SPLIT TEXT ANIMATION
function splitedText() {
  var h1 = document.querySelector(".h1");
  if (!h1) return; // Prevents error if `.h1` is missing

  var textH1 = h1.textContent;
  var splitH1 = textH1.split("");
  var clutter = "";

  splitH1.forEach((elem) => {
    clutter += `<span>${elem}</span>`;
  });

  h1.innerHTML = clutter;
}
splitedText();

gsap.from(".h1 span", {
  y: 50,
  opacity: 0,
  duration: 0.5,
  delay: 0.3,
  stagger: 0.15,
});


// Fix: Ensure the `#right img` exists before adding event listeners
var img = document.querySelector("#right");
var crsr = document.querySelector("#cursor");

if (img) {
  img.addEventListener("mouseenter", () => {
    crsr.innerHTML = "View More";
    gsap.to(crsr, {
      scale: 4,
    });
  });

  img.addEventListener("mouseleave", () => {
    crsr.innerHTML = "";
    gsap.to(crsr, {
      scale: 1,
    });
  });
}
function cursorMove() {
  var crsr = document.querySelector("#cursor");
  var main = document.querySelector("#main");
  
  main.addEventListener("mousemove", (e) => {
    gsap.to(crsr, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,  // Controls smoothness
      ease: "power2.out", // Easing effect
    });
  });
  
}

cursorMove();








// ✅ Initialize Lenis for smooth scrolling
const lenis = new Lenis();
lenis.start(); // Ensures Lenis starts

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// ✅ CERTIFICATION MODAL FUNCTIONALITY
const certCards = document.querySelectorAll(".certCard");
const certPreview = document.getElementById("certPreview");
const certImage = document.getElementById("certImage");

certCards.forEach((card) => {
  card.addEventListener("click", () => {
    const certSrc = card.getAttribute("data-cert");
    certImage.src = certSrc;
    certPreview.style.display = "flex";
  });
});

certPreview.addEventListener("click", () => {
  certPreview.style.display = "none";
});

// ✅ GSAP Animation for Certifications Section
gsap.from("#certContainer .certCard", {
  scrollTrigger: {
    trigger: "#certifications",
    start: "top 80%",
  },
  opacity: 0,
  y: 50,
  duration: 0.6,
  stagger: 0.2,
  ease: "power2.out",
}); 
// ✅ Handle contact form submission with AJAX
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const response = await fetch("/send_message", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();
  alert(result.message);

  if (result.status === "success") {
    e.target.reset();
  }
});


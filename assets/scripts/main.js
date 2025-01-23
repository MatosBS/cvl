import { templates } from './templates.js';



document.addEventListener('DOMContentLoaded', function () {
  // Inicializar AOS (Animate On Scroll)
  AOS.init({
    duration: 1000,
    once: true
  });

  // Menú móvil
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');

  menuBtn.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  });

  // Smooth scroll para los enlaces de navegación
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({
        behavior: 'smooth'
      });

      // Cerrar menú móvil si está abierto
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
      }
    });
  });

  // Horarios
  // fetch("./../assets/data/horarios.json")
  fetch("./assets/horarios.json")
    .then(response => response.json())
    .then(json => {
      json.forEach(horario => {
        const horarioContainer = document.createElement('tr')
        // horarioContainer.className = 'products__items';
        // horarioContainer.id = product.id
        horarioContainer.innerHTML = templates.horarioItem(horario);
        document.getElementById("schedule-body").append(horarioContainer)
      });
    });

  // Formulario de contacto
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
      contactForm.reset();
    });
  }

  // Cambiar estilo del header al hacer scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = 'none';
    }
  });

  // Testimonials Slider
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  const indicatorsContainer = document.querySelector('.testimonial-indicators');
  let currentTestimonial = 0;

  // Create indicators
  testimonialCards.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => showTestimonial(index));
    indicatorsContainer.appendChild(indicator);
  });

  function showTestimonial(index) {
    testimonialCards.forEach(card => {
      card.classList.remove('active');
    });

    document.querySelectorAll('.indicator').forEach(ind => {
      ind.classList.remove('active');
    });

    testimonialCards[index].classList.add('active');
    indicatorsContainer.children[index].classList.add('active');
    currentTestimonial = index;
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  }

  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
    showTestimonial(currentTestimonial);
  }

  prevBtn.addEventListener('click', prevTestimonial);
  nextBtn.addEventListener('click', nextTestimonial);

  // Auto advance testimonials
  setInterval(nextTestimonial, 5000);

  // Notification Bar
  const notificationBar = document.querySelector('.notification-bar');
  const closeNotification = document.querySelector('.close-notification');

  if (closeNotification) {
    closeNotification.addEventListener('click', () => {
      notificationBar.style.display = 'none';
      // Adjust hero section padding
      document.querySelector('.hero').style.paddingTop = '0';
    });
  }
});
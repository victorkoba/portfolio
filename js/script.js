document.querySelectorAll('[data-scroll]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const navH = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
    closeMobileMenu();
  });
});

const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateNav() {
  const scrollY = window.scrollY;

  navbar.classList.toggle('scrolled', scrollY > 20);

  const navH = navbar.offsetHeight;
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - navH - 80;
    if (scrollY >= top) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      'active',
      link.getAttribute('href') === `#${current}`
    );
  });
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function closeMobileMenu() {
  hamburger.classList.remove('open');
  mobileMenu.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
});

document.addEventListener('click', e => {
  if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
    closeMobileMenu();
  }
});

const fadeEls = document.querySelectorAll(
  '.section-header, .about-text, .exp-col, .proj-card, .skill-group, .contact-left, .contact-form, .hero-text, .hero-photo-wrap'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const siblings = [...entry.target.parentElement.children].filter(
          c => c.classList.contains('fade-in')
        );
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
fadeEls.forEach(el => observer.observe(el));

async function sendMsg(e) {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const subject = document.getElementById('f-subject').value.trim();
  const msg = document.getElementById('f-msg').value.trim();
  const toast = document.getElementById('toast');
  const btn = e.submitter || document.querySelector('button[type="submit"]');
  const originalText = btn.textContent;

  const showToast = (text, type) => {
    toast.textContent = text;
    toast.className = `toast show ${type}`;
    setTimeout(() => { toast.className = 'toast'; }, 4500);
  };

  if (!name || !email || !subject || !msg) {
    showToast('Por favor, preencha todos os campos.', 'error');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast('Informe um e-mail válido.', 'error');
    return;
  }

  const data = { name, email, subject, msg };

  try {
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    btn.style.opacity = '0.5';

    const response = await fetch('https://portfoliovictorkoba.onrender.com/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      showToast('Mensagem enviada com sucesso!', 'success');
      e.target.reset();
    } else {
      showToast('Erro ao enviar mensagem. Tente novamente.', 'error');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    showToast('Erro de conexão com o servidor.', 'error');
  }
  finally {
    btn.disabled = false;
    btn.textContent = originalText;
    btn.style.opacity = '1';
  }
}

window.sendMsg = sendMsg;

function downloadCV() {
  const a = document.createElement('a');
  a.href = './assets/VictorKobaCV.pdf';
  a.download = 'Victor_Koba_CV.pdf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
window.downloadCV = downloadCV;

document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateX(4px)';
    item.style.transition = 'transform 0.2s ease, background 0.18s';
  });
  item.addEventListener('mouseleave', () => {
    item.style.transform = '';
  });
});

const mybutton = document.getElementById("backToTop");

window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    mybutton.style.setProperty("display", "flex", "important");
  } else {
    mybutton.style.setProperty("display", "none", "important");
  }
}

mybutton.onclick = function() {
  window.scrollTo({
    top: 0,
  });
};

document.getElementById('copyEmail').addEventListener('click', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('emailText').innerText;
  const tooltip = this.querySelector('.copy-tooltip');
  const card = this;

  navigator.clipboard.writeText(email).then(() => {
    tooltip.innerText = "Copiado!";
    card.classList.add('copied');

    setTimeout(() => {
      tooltip.innerText = "Copiar e-mail";
      card.classList.remove('copied');
    }, 1000);
  }).catch(err => {
    console.error('Erro ao copiar: ', err);
  });
});
document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obter valores dos campos
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const assunto = document.getElementById('assunto').value;
    const mensagem = document.getElementById('mensagem').value;

    // Validar campos obrigatórios
    if (!nome || !telefone || !email || !assunto || !mensagem) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    // Formatar mensagem para WhatsApp
    const texto = `Olá, meu nome é ${nome}.%0A%0A*Assunto:* ${assunto}%0A*Mensagem:* ${mensagem}%0A%0A*Contatos:*%0A- Telefone: ${telefone}%0A- Email: ${email}`;
    
    // Criar URL do WhatsApp (substitua pelo seu número)
    const whatsappUrl = `https://wa.me/5538999894056?text=${encodeURIComponent(texto)}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Limpar formulário
    this.reset();
    
    // Mostrar mensagem de sucesso (opcional)
    const alert = document.createElement('div');
    alert.className = 'form-alert success';
    alert.innerHTML = '<i class="fas fa-check-circle"></i><span>Mensagem enviada com sucesso!</span>';
    this.appendChild(alert);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
        alert.remove();
    }, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
    // Efeito do cursor personalizado
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Adiciona classe active quando o mouse está sobre elementos clicáveis
    const clickableElements = document.querySelectorAll('a, button, .project-card, .menu-toggle, input, textarea');
    
    clickableElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.classList.add('active');
            cursorFollower.classList.add('active');
        });
        
        el.addEventListener('mouseout', () => {
            cursor.classList.remove('active');
            cursorFollower.classList.remove('active');
        });
    });
    
    // Menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
    
    // Fecha o menu quando um link é clicado
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Efeito de scroll para o header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Animação de revelação ao scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.title-word, .hero-subtitle, .cta-button');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                setTimeout(() => {
                    element.classList.add('active');
                }, index * 200);
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez ao carregar
    
    // Animação das palavras do título
    const titleWords = document.querySelectorAll('.title-word');
    
    titleWords.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('active');
        }, index * 300);
    });
    
    // Filtro de projetos
    const categoryBtns = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove a classe active de todos os botões
            categoryBtns.forEach(btn => btn.classList.remove('active'));
            
            // Adiciona a classe active ao botão clicado
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            projectCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Animação das barras de habilidades
    const skillBars = document.querySelectorAll('.skill-level');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    };
    
    // Observador de interseção para animar as barras quando visíveis
    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
    
    // Efeito de digitação no footer
    const footerLogo = document.querySelector('.footer-logo h2');
    
    if (footerLogo) {
        const text = footerLogo.textContent;
        footerLogo.textContent = '';
        
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < text.length) {
                footerLogo.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 100);
    }
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Efeito parallax no hero
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            hero.style.backgroundPositionY = scrollValue * 0.5 + 'px';
        });
    }
    
    // Efeito de hover nos cards de projeto
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - card.getBoundingClientRect().left;
            const y = e.clientY - card.getBoundingClientRect().top;
            
            const centerX = card.offsetWidth / 2;
            const centerY = card.offsetHeight / 2;
            
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});
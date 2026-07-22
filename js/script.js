// ============================================================
//  DEY CUERVOSÍA — script.js
//  Efectos: Typing poético, fade-in, parallaxe, y más
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    //  1. EFECTO DE ESCRITURA (TYPING) PARA EL VERSO PRINCIPAL
    // ============================================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Guardamos el HTML original con el span
        const originalHTML = heroTitle.innerHTML;
        
        // Extraemos las partes: texto plano y el span
        const textParts = [];
        heroTitle.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                textParts.push(node.textContent);
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
                textParts.push(`<span>${node.textContent}</span>`);
            }
        });

        const fullText = textParts.join('');
        
        // Limpiamos y añadimos el cursor
        heroTitle.innerHTML = '<span class="cursor">|</span>';
        
        let charIndex = 0;
        let isTyping = true;
        const typingSpeed = 55; // ms por carácter

        function typeNextChar() {
            if (!isTyping) return;

            const currentText = heroTitle.innerHTML.replace('<span class="cursor">|</span>', '');
            let nextChar = fullText[charIndex];
            let nextHTML = '';

            // Si encontramos una etiqueta HTML, la escribimos completa
            if (nextChar === '<') {
                const endTag = fullText.indexOf('>', charIndex);
                if (endTag !== -1) {
                    const tag = fullText.substring(charIndex, endTag + 1);
                    nextHTML = tag;
                    charIndex = endTag + 1;
                } else {
                    nextHTML = nextChar;
                    charIndex++;
                }
            } else {
                nextHTML = nextChar;
                charIndex++;
            }

            heroTitle.innerHTML = currentText + nextHTML + '<span class="cursor">|</span>';

            if (charIndex < fullText.length) {
                let delay = typingSpeed;
                // Pausas para dar ritmo poético
                if (fullText[charIndex - 1] === '.' || fullText[charIndex - 1] === ',') {
                    delay = 350;
                } else if (fullText[charIndex - 1] === ' ') {
                    delay = 40;
                } else if (fullText[charIndex - 1] === '¡' || fullText[charIndex - 1] === '!') {
                    delay = 400;
                }
                setTimeout(typeNextChar, delay);
            } else {
                // Terminamos: eliminamos el cursor
                setTimeout(() => {
                    heroTitle.innerHTML = heroTitle.innerHTML.replace('<span class="cursor">|</span>', '');
                    heroTitle.classList.add('typing-done');
                    
                    // Disparamos el fade-in de los demás elementos
                    showElements();
                }, 900);
            }
        }

        // Iniciamos después de 600ms
        setTimeout(typeNextChar, 600);
    } else {
        // Si no hay hero-title, mostramos los elementos igual
        setTimeout(showElements, 500);
    }

    // ============================================================
    //  2. FADE-IN DE ELEMENTOS
    // ============================================================
    function showElements() {
        const elements = [
            '.hero-subtitle',
            '.hero-description',
            '.btn-hero',
            '.musica',
            '.bio',
            'footer'
        ];

        elements.forEach((selector, index) => {
            const el = document.querySelector(selector);
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(25px)';
                el.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100 + index * 150);
            }
        });
    }

    // ============================================================
    //  3. PARALLAXE SUTIL EN EL HERO
    // ============================================================
    const hero = document.querySelector('.hero');
    if (hero) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    // Movimiento más lento que el scroll
                    hero.style.backgroundPositionY = `${scrollY * 0.35}px`;
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ============================================================
    //  4. EFECTO DE GLITCH EN EL TÍTULO (solo en escritorio)
    // ============================================================
    if (window.innerWidth > 768) {
        const title = document.querySelector('.hero-title');
        if (title) {
            let glitchInterval;
            
            function startGlitch() {
                const originalText = title.innerHTML;
                const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/';
                
                glitchInterval = setInterval(() => {
                    if (Math.random() < 0.08) { // 8% de probabilidad
                        const text = title.textContent;
                        const chars = text.split('');
                        const randomIndex = Math.floor(Math.random() * chars.length);
                        
                        // Reemplazamos un carácter por uno de glitch
                        if (randomIndex < chars.length) {
                            const glitchChar = glitchChars[Math.floor(Math.random() * glitchChars.length)];
                            chars[randomIndex] = glitchChar;
                            title.textContent = chars.join('');
                            
                            // Restauramos después de 100ms
                            setTimeout(() => {
                                title.innerHTML = originalText;
                            }, 100);
                        }
                    }
                }, 3000);
            }
            
            // Iniciamos después de que termine el typing
            setTimeout(startGlitch, 5000);
            
            // Limpiamos el intervalo si el usuario interactúa
            document.addEventListener('click', () => {
                clearInterval(glitchInterval);
            });
        }
    }

    // ============================================================
    //  5. SCROLL SUAVE PARA ENLACES INTERNOS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================================
    //  6. EFECTO DE CARGA PARA EL REPRODUCTOR DE YOUTUBE
    // ============================================================
    const videoWrapper = document.querySelector('.video-wrapper');
    if (videoWrapper) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoWrapper.style.opacity = '1';
                    videoWrapper.style.transform = 'scale(1)';
                }
            });
        }, {
            threshold: 0.3
        });
        
        videoWrapper.style.opacity = '0.5';
        videoWrapper.style.transform = 'scale(0.95)';
        videoWrapper.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(videoWrapper);
    }

    // ============================================================
    //  7. ESTILOS DINÁMICOS PARA EL CURSOR Y ANIMACIONES
    // ============================================================
    const style = document.createElement('style');
    style.textContent = `
        /* Cursor parpadeante */
        .cursor {
            display: inline-block;
            background-color: #d4c9b8;
            width: 3px;
            height: 1.2em;
            margin-left: 4px;
            vertical-align: text-bottom;
            animation: blink 0.7s step-end infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        .typing-done .cursor {
            display: none;
        }

        /* Elementos que aparecen con fade */
        .hero-subtitle,
        .hero-description,
        .btn-hero,
        .musica,
        .bio,
        footer {
            opacity: 0;
            transform: translateY(25px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        /* Efecto de brillo en el botón del hero */
        .btn-hero {
            position: relative;
            overflow: hidden;
        }

        .btn-hero::after {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            opacity: 0;
            transition: opacity 0.6s ease;
            pointer-events: none;
        }

        .btn-hero:hover::after {
            opacity: 1;
        }

        /* Efecto de aparición para el video */
        .video-wrapper {
            opacity: 0.5;
            transform: scale(0.95);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .video-wrapper.visible {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);

    // ============================================================
    //  8. CONSOLA POÉTICA (detalle especial)
    // ============================================================
    console.log('%c ✦ D E Y   C U E R V O S Í A ✦ ', 'font-size: 28px; font-weight: bold; color: #d4c9b8; background: #0a0807; padding: 12px 20px; border-radius: 6px; border: 1px solid #2a2520;');
    console.log('%c "De aire está hecho mi cuerpo" ', 'font-size: 18px; font-style: italic; color: #b8aa96; padding: 4px 0;');
    console.log('%c 🎵 Desde Desamparados, Costa Rica 🎵 ', 'font-size: 14px; color: #7a6e60; padding: 4px 0;');
    console.log('%c ✦ Escucha el sencillo: https://youtu.be/f60tTWKh01c ✦ ', 'font-size: 13px; color: #5a4f42; padding: 4px 0;');
    console.log('%c 🌿 Gracias por volar con Dey Cuervosía 🌿 ', 'font-size: 14px; color: #9a8b7a; padding: 8px 0; border-top: 1px solid #1a1714;');

    // ============================================================
    //  9. DETECTOR DE NAVEGADOR (para compatibilidad)
    // ============================================================
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
        // Pequeño ajuste para Safari
        document.querySelectorAll('.hero-title span').forEach(el => {
            el.style.webkitTextFillColor = 'initial';
            el.style.color = '#d4c9b8';
        });
    }

    // ============================================================
    //  10. EFECTO DE PARTÍCULAS SUTILES (opcional)
    // ============================================================
    // Desactivado para mantener rendimiento, pero se puede activar
    // si se desea un efecto más poético en el hero

    console.log('%c 🌬️ "De aire está hecho mi cuerpo" 🌬️ ', 'font-size: 16px; color: #5a4f42; font-style: italic;');
});

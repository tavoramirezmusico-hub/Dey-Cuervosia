// ============================================================
//  DEY CUERVOSÍA — script.js
//  Efectos: typing para el verso + fade-in al cargar
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------- 1. EFECTO DE ESCRITURA (TYPER) ----------
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Guardamos el HTML original (con el <span>)
        const originalHTML = heroTitle.innerHTML;
        // Extraemos solo el texto visible (sin etiquetas) para la animación
        const textParts = [];
        // Recorremos los nodos hijos: texto plano y el span
        heroTitle.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                // Texto plano: "De aire está " (con el espacio)
                textParts.push(node.textContent);
            } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'SPAN') {
                // El span: "hecho mi cuerpo"
                textParts.push(`<span>${node.textContent}</span>`);
            }
        });

        // Juntamos todo en un solo string con el marcador <CURSOR>
        const fullText = textParts.join('');

        // Limpiamos el contenido y lo reemplazamos por un cursor parpadeante
        heroTitle.innerHTML = '<span class="cursor">|</span>';

        let charIndex = 0;
        let isTyping = true;
        let typingSpeed = 60; // ms por carácter

        // Función para escribir carácter por carácter
        function typeNextChar() {
            if (!isTyping) return;

            // Tomamos el texto actual sin el cursor
            const currentText = heroTitle.innerHTML.replace('<span class="cursor">|</span>', '');

            // Avanzamos al siguiente carácter (respetando las etiquetas HTML)
            let nextChar = fullText[charIndex];
            let nextHTML = '';

            // Si el siguiente carácter es '<', hay que leer toda la etiqueta
            if (nextChar === '<') {
                // Encontramos el cierre de la etiqueta
                const endTag = fullText.indexOf('>', charIndex);
                if (endTag !== -1) {
                    // Extraemos la etiqueta completa (ej: "<span>")
                    const tag = fullText.substring(charIndex, endTag + 1);
                    nextHTML = tag;
                    charIndex = endTag + 1; // saltamos la etiqueta
                } else {
                    // Si no hay cierre, escribimos el carácter literal
                    nextHTML = nextChar;
                    charIndex++;
                }
            } else {
                // Carácter normal
                nextHTML = nextChar;
                charIndex++;
            }

            // Reconstruimos el HTML con el cursor al final
            heroTitle.innerHTML = currentText + nextHTML + '<span class="cursor">|</span>';

            // Si aún no hemos terminado, seguimos escribiendo
            if (charIndex < fullText.length) {
                // Velocidad variable: pausa en los puntos y espacios
                let delay = typingSpeed;
                if (fullText[charIndex - 1] === '.' || fullText[charIndex - 1] === ',') {
                    delay = 300;
                } else if (fullText[charIndex - 1] === ' ') {
                    delay = 40;
                }
                setTimeout(typeNextChar, delay);
            } else {
                // Terminamos: eliminamos el cursor después de un momento
                setTimeout(() => {
                    heroTitle.innerHTML = heroTitle.innerHTML.replace('<span class="cursor">|</span>', '');
                    // Añadimos una clase para indicar que terminó
                    heroTitle.classList.add('typing-done');
                }, 800);
            }
        }

        // Iniciamos el efecto de escritura después de un breve retraso
        setTimeout(typeNextChar, 500);
    }

    // ---------- 2. EFECTO FADE-IN PARA EL RESTO DE ELEMENTOS ----------
    const elementsToFade = [
        '.hero-subtitle',
        '.intro',
        'footer'
    ];

    elementsToFade.forEach(selector => {
        const el = document.querySelector(selector);
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
        }
    });

    // Mostramos los elementos después de que el typing termine (o a los 4s)
    setTimeout(() => {
        elementsToFade.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }, 4500); // Tiempo estimado para que termine el typing (ajustable)

    // ---------- 3. EFECTO DE PARALLAXE SUTIL EN EL HERO ----------
    let hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Movemos el fondo ligeramente más lento que el scroll
            hero.style.backgroundPositionY = `${scrollY * 0.4}px`;
        });
    }

    // ---------- 4. AÑADIR ESTILOS DINÁMICOS PARA EL CURSOR ----------
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
            animation: blink 0.8s step-end infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        /* Cuando el typing termina, ocultamos el cursor */
        .typing-done .cursor {
            display: none;
        }

        /* Animación de aparición para el subtítulo y el intro */
        .hero-subtitle,
        .intro,
        footer {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 1.2s ease, transform 1.2s ease;
        }
    `;
    document.head.appendChild(style);

    // ---------- 5. CONSOLA POÉTICA (detalle extra) ----------
    console.log('%c Dey Cuervosía ', 'font-size: 24px; font-weight: bold; color: #d4c9b8; background: #0a0a0a; padding: 10px; border-radius: 4px;');
    console.log('%c "De aire está hecho mi cuerpo" ', 'font-size: 16px; font-style: italic; color: #b8aa96;');
    console.log('%c ✦ Bienvenida al vuelo ✦ ', 'font-size: 14px; color: #5a4f42;');

});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header Scroll Effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Scroll Animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.hero-content, .service-card, .feature, .team-member, .portfolio-item, .testimonial, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

// Initial check for elements in view
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Portfolio Filter Animation
const portfolioItems = document.querySelectorAll('.portfolio-item');
const filterButtons = document.querySelectorAll('.filter-btn');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter items with animation
        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                }, 300);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Form Validation
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const message = document.querySelector('#message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to your server
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Image hover effects
const images = document.querySelectorAll('.service-image img, .portfolio-image img, .team-member img');
images.forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// Home Page Scroll Effects
const homePageEffects = () => {
    const heroContent = document.querySelector('.hero-content');
    const servicesPreview = document.querySelector('.services-preview');
    const whyChooseUs = document.querySelector('.why-choose-us');
    
    if (heroContent) {
        // Initial animation
        setTimeout(() => {
            heroContent.classList.add('animate');
        }, 500);

        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Hero section parallax effect
            if (heroContent) {
                const opacity = Math.max(0, 1 - (scrollPosition / (windowHeight * 0.8)));
                heroContent.style.opacity = opacity;
                
                // Update text based on scroll position
                const textElements = heroContent.querySelectorAll('h1, p');
                textElements.forEach((element, index) => {
                    const delay = index * 0.2;
                    const elementOpacity = Math.max(0, 1 - ((scrollPosition - (windowHeight * delay)) / (windowHeight * 0.4)));
                    element.style.opacity = elementOpacity;
                    element.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                });
            }
            
            // Services preview section animation
            if (servicesPreview) {
                const servicesTop = servicesPreview.getBoundingClientRect().top;
                if (servicesTop < windowHeight * 0.8) {
                    servicesPreview.classList.add('animate');
                    const serviceCards = servicesPreview.querySelectorAll('.service-card');
                    serviceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }
            }
            
            // Why Choose Us section animation
            if (whyChooseUs) {
                const whyChooseUsTop = whyChooseUs.getBoundingClientRect().top;
                if (whyChooseUsTop < windowHeight * 0.8) {
                    whyChooseUs.classList.add('animate');
                    const features = whyChooseUs.querySelectorAll('.feature');
                    features.forEach((feature, index) => {
                        setTimeout(() => {
                            feature.classList.add('animate');
                        }, index * 200);
                    });
                }
            }
        });
    }
};

// Initialize home page effects
document.addEventListener('DOMContentLoaded', () => {
    homePageEffects();
    
    // Add floating elements to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.width = `${Math.random() * 100 + 50}px`;
            element.style.height = element.style.width;
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 5}s`;
            hero.appendChild(element);
        }
    }
    
    // Add mouse move effect to hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            heroSection.style.setProperty('--mouse-x', `${x}%`);
            heroSection.style.setProperty('--mouse-y', `${y}%`);
        });
    }

    // Animate hero text
    const heroTitle = document.getElementById('animated-hero-title');
    const heroSubtitle = document.getElementById('animated-hero-subtitle');
    if (heroTitle && heroSubtitle) {
        typeWriter(heroTitle, 'Transform Your Digital Presence', 40, () => {
            setTimeout(() => {
                typeWriter(heroSubtitle, 'We help businesses grow through innovative digital marketing solutions.', 18);
            }, 400);
        });
    }
});

// Custom Cursor
const cursor = document.createElement('div');
const cursorDot = document.createElement('div');
cursor.className = 'custom-cursor';
cursorDot.className = 'cursor-dot';
document.body.appendChild(cursor);
document.body.appendChild(cursorDot);

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
});

// Interactive Elements
const interactiveElements = document.querySelectorAll('a, button, .hover-effect');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
});

// Page Transitions
const pageTransition = document.createElement('div');
pageTransition.className = 'page-transition';
document.body.appendChild(pageTransition);

document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.getAttribute('href').startsWith('#')) return;
        e.preventDefault();
        pageTransition.classList.add('active');
        setTimeout(() => {
            window.location = link.href;
        }, 600);
    });
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Text Reveal Animation
document.querySelectorAll('.text-reveal').forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    const span = document.createElement('span');
    span.textContent = text;
    element.appendChild(span);
    observer.observe(element);
});

// Parallax Effect
document.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.setProperty('--parallax-offset', `${yPos}px`);
    });
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loading-animation');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated Hero Text (Typewriter Effect)
function typeWriter(element, text, speed = 40, callback) {
    let i = 0;
    function typing() {
        if (i <= text.length) {
            element.innerHTML = text.substring(0, i) + '<span style="opacity:0.3;">|</span>';
            i++;
            setTimeout(typing, speed);
        } else {
            element.innerHTML = text; // Remove cursor
            if (callback) callback();
        }
    }
    typing();
}

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
});

// Custom Cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Interactive Elements
document.querySelectorAll('.interactive-element').forEach(element => {
    element.addEventListener('mouseenter', () => cursor.classList.add('active'));
    element.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

// Hero Section Text Transitions
const heroTexts = [
    {
        title: "Transform Your Digital Presence",
        subtitle: "We help businesses grow through innovative digital marketing solutions"
    },
    {
        title: "Creative Digital Solutions",
        subtitle: "Crafting unique strategies for your brand's success"
    },
    {
        title: "Data-Driven Marketing",
        subtitle: "Making informed decisions with advanced analytics"
    },
    {
        title: "Social Media Excellence",
        subtitle: "Building meaningful connections with your audience"
    }
];

let currentTextIndex = 0;
const heroSection = document.querySelector('.hero');
const heroTextContainer = document.querySelector('.hero-text-container');

// Create floating elements
const createFloatingElements = () => {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    // Remove any existing floating elements
    const existingElements = heroSection.querySelector('.floating-elements');
    if (existingElements) {
        existingElements.remove();
    }

    const container = document.createElement('div');
    container.className = 'floating-elements';
    
    for (let i = 0; i < 5; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.width = `${Math.random() * 100 + 50}px`;
        element.style.height = element.style.width;
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        element.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(element);
    }
    
    heroSection.appendChild(container);
};

// Update hero text
const updateHeroText = () => {
    const heroTextContainer = document.querySelector('.hero-text-container');
    if (!heroTextContainer) return;

    const text = heroTexts[currentTextIndex];
    const textElement = document.createElement('div');
    textElement.className = 'hero-text';
    textElement.innerHTML = `
        <h1>${text.title}</h1>
        <p>${text.subtitle}</p>
        <a href="contact.html" class="cta-button">Get Started</a>
    `;
    
    // Remove any existing text elements
    const existingTexts = heroTextContainer.querySelectorAll('.hero-text');
    existingTexts.forEach(text => text.remove());
    
    heroTextContainer.appendChild(textElement);
    // Force a reflow
    textElement.offsetHeight;
    textElement.classList.add('active');
    
    currentTextIndex = (currentTextIndex + 1) % heroTexts.length;
};

// Scroll Progress
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrolled / maxHeight;
    scrollProgress.style.transform = `scaleX(${progress})`;
    
    // Update hero background based on scroll
    const opacity = Math.min(1, scrolled / 500);
    heroSection.style.background = `linear-gradient(
        ${opacity * 45}deg,
        var(--gradient-start),
        var(--gradient-end)
    )`;
});

// Mouse move effect on hero
document.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    heroSection.style.setProperty('--mouse-x', `${x}%`);
    heroSection.style.setProperty('--mouse-y', `${y}%`);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        createFloatingElements();
        updateHeroText();
        
        // Add mouse move effect to hero section
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            heroSection.style.setProperty('--mouse-x', `${x}%`);
            heroSection.style.setProperty('--mouse-y', `${y}%`);
        });

        // Change text every 5 seconds
        setInterval(() => {
            const currentText = document.querySelector('.hero-text.active');
            if (currentText) {
                currentText.classList.remove('active');
                setTimeout(() => {
                    currentText.remove();
                    updateHeroText();
                }, 500);
            }
        }, 5000);
    }
});

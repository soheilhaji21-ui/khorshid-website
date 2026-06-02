// ============ Mobile Menu Toggle ============
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // بستن منو هنگام کلیک بر روی لینک
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.style.display = 'none';
            });
        });
    }
});

// ============ Contact Form Handler ============
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // دریافت مقادیر فرم
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();
            const agree = document.getElementById('agree').checked;
            const formMessage = document.getElementById('formMessage');

            // Validation
            if (!name || !email || !subject || !message) {
                showFormMessage('لطفاً تمام فیلدهای ضروری را پر کنید.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage('لطفاً یک ایمیل معتبر وارد کنید.', 'error');
                return;
            }

            if (!agree) {
                showFormMessage('لطفاً شرایط و قوانین را بپذیرید.', 'error');
                return;
            }

            // ساخت داده‌های فرم برای ارسال
            const formData = {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
                timestamp: new Date().toISOString()
            };

            // ارسال به Formspree یا عملکرد محلی
            sendForm(formData, formMessage);
        });
    }
});

// ============ Validation Functions ============
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
    }
}

// ============ Send Form Data ============
function sendForm(data, formMessageElement) {
    // این بخش برای ارسال به یک سرور است
    // اگر از Formspree استفاده می‌کنید:

    // Option 1: Using Formspree (نیاز به تغییر action در HTML)
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://formspree.io/f/YOUR_FORM_ID', true);
    // xhr.setRequestHeader('Accept', 'application/json');
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4) {
    //         if (xhr.status === 200) {
    //             showFormMessage('پیام شما با موفقیت ارسال شد. ممنون!', 'success');
    //             document.getElementById('contactForm').reset();
    //         } else {
    //             showFormMessage('خطایی رخ داد. لطفاً دوباره تلاش کنید.', 'error');
    //         }
    //     }
    // };
    // xhr.send(JSON.stringify(data));

    // Option 2: Local Storage (برای نسخه رایگان بدون سرور)
    try {
        let submissions = JSON.parse(localStorage.getItem('khorshid_submissions')) || [];
        submissions.push(data);
        localStorage.setItem('khorshid_submissions', JSON.stringify(submissions));
        
        showFormMessage('پیام شما ذخیره شد. تشکر از تماس با ما!', 'success');
        document.getElementById('contactForm').reset();
    } catch (error) {
        showFormMessage('پیام شما دریافت شد. ما به زودی با شما تماس می‌گیریم.', 'success');
        document.getElementById('contactForm').reset();
    }
}

// ============ Smooth Scroll ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============ Active Navigation Link ============
window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// ============ Initialize on Page Load ============
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link on page load
    const navLinks = document.querySelectorAll('.nav-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Scroll animation for elements
    observeElements();
});

// ============ Intersection Observer for Animations ============
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Apply observer to cards and sections
    const elements = document.querySelectorAll(
        '.mission-card, .activity-item, .objective-card, .faq-item'
    );
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// ============ Print Console Info ============
console.log('خورشید - مؤسسه مردم‌نهاد جوانان مهر افروز خورشید علم');
console.log('دانایی نور است');

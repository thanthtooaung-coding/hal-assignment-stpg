// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const profileBtn = document.getElementById('profile-btn');
    const dropdownContent = document.getElementById('dropdown-content');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    if (profileBtn && dropdownContent) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });

        document.addEventListener('click', function() {
            dropdownContent.classList.remove('show');
        });
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                alert('Login successful!');
                window.location.href = 'profile.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const terms = document.getElementById('terms').checked;
            
            if (firstName && lastName && email && password && terms) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', firstName + ' ' + lastName);
                alert('Account created successfully!');
                window.location.href = 'profile.html';
            } else {
                alert('Please fill in all fields and accept the terms.');
            }
        });
    }

    const customPackageForm = document.getElementById('custom-package-form');
    if (customPackageForm) {
        const itemCheckboxes = document.querySelectorAll('input[name="items"]');
        const staffNumberInput = document.getElementById('staffNumber');
        const totalCostSpan = document.getElementById('totalCost');
        
        const itemPrices = {
            'Item One': 50,
            'Item Two': 75,
            'Item Three': 100,
            'Item Four': 125
        };
        
        const staffPrice = 25;
        
        function calculateTotal() {
            let total = 0;
            
            itemCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    total += itemPrices[checkbox.value] || 0;
                }
            });
            
            const staffCount = parseInt(staffNumberInput.value) || 0;
            total += staffCount * staffPrice;
            
            totalCostSpan.textContent = total;
        }
        
        itemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', calculateTotal);
        });
        
        if (staffNumberInput) {
            staffNumberInput.addEventListener('input', calculateTotal);
        }
        
        customPackageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(customPackageForm);
            const selectedItems = [];
            
            itemCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedItems.push(checkbox.value);
                }
            });
            
            if (selectedItems.length === 0) {
                alert('Please select at least one item for your package.');
                return;
            }
            
            alert('Order placed successfully! You will receive a confirmation email shortly.');
            customPackageForm.reset();
            calculateTotal();
        });
        
        calculateTotal();
    }

    const logoutLinks = document.querySelectorAll('#logout, .logout-item');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            alert('You have been logged out.');
            window.location.href = 'index.html';
        });
    });

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    
    if (isLoggedIn && window.location.pathname.includes('profile.html')) {

        const nicknameElements = document.querySelectorAll('h1, .profile-btn');
        nicknameElements.forEach(element => {
            if (element.textContent.includes('Nickname')) {
                element.textContent = element.textContent.replace('Nickname', userName || 'User');
            }
        });
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Processing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.service-card, .package-card, .service-category, .package-card-main');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            formatCardNumber(this);
        });
    }
});
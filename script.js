// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const profileBtn = document.getElementById('profile-btn');
    const dropdownContent = document.getElementById('dropdown-content');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Profile dropdown toggle
    if (profileBtn && dropdownContent) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            dropdownContent.classList.remove('show');
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                // Simulate login
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                alert('Login successful!');
                window.location.href = 'profile.html';
            } else {
                alert('Please fill in all fields.');
            }
        });
    }

    // Signup form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const terms = document.getElementById('terms').checked;
            
            // Simple validation
            if (firstName && lastName && email && password && terms) {
                // Simulate signup
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

    // Custom package form
    const customPackageForm = document.getElementById('custom-package-form');
    if (customPackageForm) {
        const itemCheckboxes = document.querySelectorAll('input[name="items"]');
        const staffNumberInput = document.getElementById('staffNumber');
        const totalCostSpan = document.getElementById('totalCost');
        
        // Item prices
        const itemPrices = {
            'Item One': 50,
            'Item Two': 75,
            'Item Three': 100,
            'Item Four': 125
        };
        
        const staffPrice = 25; // per staff member
        
        function calculateTotal() {
            let total = 0;
            
            // Add selected items
            itemCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    total += itemPrices[checkbox.value] || 0;
                }
            });
            
            // Add staff cost
            const staffCount = parseInt(staffNumberInput.value) || 0;
            total += staffCount * staffPrice;
            
            totalCostSpan.textContent = total;
        }
        
        // Add event listeners for real-time calculation
        itemCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', calculateTotal);
        });
        
        if (staffNumberInput) {
            staffNumberInput.addEventListener('input', calculateTotal);
        }
        
        // Form submission
        customPackageForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(customPackageForm);
            const selectedItems = [];
            
            itemCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedItems.push(checkbox.value);
                }
            });
            
            // if (selectedItems.length === 0) {
            //     alert('Please select at least one item for your package.');
            //     return;
            // }
            
            // Simulate order processing
            alert('Order placed successfully! You will receive a confirmation email shortly.');
            customPackageForm.reset();
            calculateTotal();
        });
        
        // Initial calculation
        calculateTotal();
    }

    // Logout functionality
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

    // Check login status and update UI
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    
    if (isLoggedIn && window.location.pathname.includes('profile.html')) {
        // Update profile page with user info
        const nicknameElements = document.querySelectorAll('h1, .profile-btn');
        nicknameElements.forEach(element => {
            if (element.textContent.includes('Nickname')) {
                element.textContent = element.textContent.replace('Nickname', userName || 'User');
            }
        });
    }

    // Smooth scrolling for anchor links
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

    // Add loading animation for forms
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

    // Add fade-in animation for cards
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

    // Observe cards for animation
    const cards = document.querySelectorAll('.service-card, .package-card, .service-category, .package-card-main');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Package Selection Page Functionality
    const selectionForm = document.getElementById('selection-form');
    if (selectionForm) {
        const itemCards = document.querySelectorAll('.item-card');
        const selectBtns = document.querySelectorAll('.select-btn');
        const selectedCountSpan = document.getElementById('selected-count');
        const selectedList = document.getElementById('selected-list');
        const totalAmountSpan = document.getElementById('total-amount');
        const continueBtn = document.getElementById('continue-btn');
        
        let selectedItems = [];
        let totalAmount = 0;
        
        // Handle item selection
        selectBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                const card = itemCards[index];
                const itemName = card.querySelector('h3').textContent;
                const itemPrice = parseInt(card.dataset.price);
                const itemId = card.dataset.item;
                const isSelected = btn.dataset.selected === 'true';
                
                if (!isSelected) {
                    // Select item
                    btn.dataset.selected = 'true';
                    btn.classList.add('selected');
                    btn.innerHTML = '<i class="fas fa-check"></i> Selected';
                    card.classList.add('selected');
                    
                    // Add to selected items
                    selectedItems.push({
                        id: itemId,
                        name: itemName,
                        price: itemPrice
                    });
                    
                    totalAmount += itemPrice;
                } else {
                    // Deselect item
                    btn.dataset.selected = 'false';
                    btn.classList.remove('selected');
                    btn.innerHTML = '<i class="fas fa-plus"></i> Click';
                    card.classList.remove('selected');
                    
                    // Remove from selected items
                    selectedItems = selectedItems.filter(item => item.id !== itemId);
                    totalAmount -= itemPrice;
                }
                
                updateSelectionSummary();
            });
        });
        
        function updateSelectionSummary() {
            // Update count
            selectedCountSpan.textContent = selectedItems.length;
            
            // Update selected items list
            selectedList.innerHTML = '';
            selectedItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'selected-item';
                itemElement.innerHTML = `
                    ${item.name} ($${item.price})
                    <button class="remove-item" data-item-id="${item.id}">×</button>
                `;
                selectedList.appendChild(itemElement);
            });
            
            // Update total
            totalAmountSpan.textContent = totalAmount;
            
            // Enable/disable continue button
            continueBtn.disabled = selectedItems.length === 0;
            
            // Add event listeners to remove buttons
            const removeButtons = selectedList.querySelectorAll('.remove-item');
            removeButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const itemId = this.dataset.itemId;
                    // Find and click the corresponding select button to deselect
                    const cardToDeselect = document.querySelector(`[data-item="${itemId}"]`);
                    const btnToDeselect = cardToDeselect.querySelector('.select-btn');
                    btnToDeselect.click();
                });
            });
        }
        
        // Handle continue to checkout
        continueBtn.addEventListener('click', function() {
            if (selectedItems.length > 0) {
                // Store selected items in localStorage for the checkout page
                localStorage.setItem('selectedPackageItems', JSON.stringify(selectedItems));
                localStorage.setItem('packageTotal', totalAmount.toString());
                
                // Redirect to checkout
                window.location.href = 'custom-package.html';
            }
        });
    }
});

// Utility function to format card numbers
function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formattedValue;
}

// Add card number formatting if card input exists
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function() {
            formatCardNumber(this);
        });
    }
});
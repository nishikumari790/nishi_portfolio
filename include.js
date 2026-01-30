// Function to include HTML files
async function includeHTML(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html; 
        
        // Set active navigation after including header
        if (elementId === 'header') {
            setActiveNavigation();
            // Add a small delay to ensure DOM is fully updated
            setTimeout(() => {
                initializeMobileNavigation();
            }, 100);
        }
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

// Function to set active navigation based on current page
function setActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    console.log('Setting active navigation for page:', currentPage);
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        console.log('Checking link:', href, 'against current page:', currentPage);
        if (href === currentPage) {
            link.classList.add('active');
            console.log('Set active for:', href);
        }
    });
}

// Function to initialize mobile navigation
function initializeMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navItems = document.querySelectorAll('.nav-item');
    
    console.log('Initializing mobile navigation...');
    console.log('Hamburger found:', !!hamburger);
    console.log('Nav menu found:', !!navMenu);
    console.log('Number of nav items:', navItems.length);
    
    // Log all navigation items
    navItems.forEach((item, index) => {
        const link = item.querySelector('.nav-link');
        console.log(`Nav item ${index + 1}:`, link ? link.textContent : 'No link found');
    });
    
    if (hamburger && navMenu) {
        // Mobile Navigation Toggle
        hamburger.addEventListener('click', () => {
            console.log('Hamburger clicked!');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            console.log('Menu active:', navMenu.classList.contains('active'));
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
            console.log('Nav link clicked:', n.textContent);
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }));
    } else {
        console.error('Hamburger or navMenu not found!');
    }
}

// Include header and footer when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Include header
    if (document.getElementById('header')) {
        includeHTML('header', 'header.html');
    }
    
    // Include footer
    if (document.getElementById('footer')) {
        includeHTML('footer', 'footer.html');
    }
}); 

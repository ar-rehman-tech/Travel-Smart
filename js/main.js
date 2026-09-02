/**
 * Travel Smart - High Performance Vanilla JavaScript
 * Zero external dependencies (no GSAP/ScrollTrigger runtime overhead)
 * Uses native IntersectionObserver, requestAnimationFrame, and passive event listeners.
 */

(function () {
    'use strict';

    // =========================================================================
    // Destination Data Repository
    // =========================================================================
    const destinations = {
        bali: {
            name: "Bali, Indonesia",
            price: "$899",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>',
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM3-_9dEXDBwQSNGP38rnAqXT3hX0QWMhFhQ&s",
            description: "Bali is a magical destination known for its lush landscapes, vibrant culture, and stunning beaches. Often referred to as the Island of Gods, Bali offers a perfect blend of spiritual serenity and adventurous activities. From the iconic rice terraces of Tegallalang to the sacred temples like Uluwatu and Tanah Lot, every corner of Bali tells a story.",
            highlights: [
                "Visit ancient temples and experience spiritual ceremonies",
                "Relax on pristine beaches with crystal clear waters",
                "Explore lush rice terraces and volcanic landscapes",
                "Enjoy world-class surfing and diving opportunities",
                "Indulge in authentic Balinese cuisine and spa treatments"
            ]
        },
        santorini: {
            name: "Santorini, Greece",
            price: "$1,199",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
            description: "Santorini is a breathtaking Greek island renowned for its whitewashed buildings, blue-domed churches, and spectacular sunsets. Perched on the edge of a volcanic caldera, the island offers stunning views of the Aegean Sea. With its unique architecture, delicious cuisine, and rich history, Santorini is a dream destination for travelers seeking romance and beauty.",
            highlights: [
                "Witness unforgettable sunsets in Oia village",
                "Explore ancient ruins at Akrotiri archaeological site",
                "Swim in the unique red and black sand beaches",
                "Taste exceptional local wines from volcanic soil vineyards",
                "Wander through picturesque villages with blue-domed churches"
            ]
        },
        kyoto: {
            name: "Kyoto, Japan",
            price: "$1,499",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
            image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=1200&q=80",
            description: "Kyoto, Japan's ancient capital, is a city where traditional culture meets modern life. With over 2,000 temples and shrines, beautiful gardens, and preserved historic districts, Kyoto offers a glimpse into Japan's rich cultural heritage. From the iconic Fushimi Inari Shrine with its thousands of torii gates to the serene Arashiyama Bamboo Grove, Kyoto is a city of timeless beauty.",
            highlights: [
                "Visit historic temples and shrines including Kinkaku-ji (Golden Pavilion)",
                "Experience traditional tea ceremonies and geisha culture in Gion",
                "Stroll through the mesmerizing Arashiyama Bamboo Grove",
                "Explore beautifully preserved historic districts",
                "Enjoy seasonal beauty with cherry blossoms in spring and colorful foliage in autumn"
            ]
        },
        paris: {
            name: "Paris, France",
            price: "$1,299",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>',
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTStGsjz-Q4oykEZC5pUuarkFmGThAHnrwvZw&s",
            description: "Paris, the City of Light, is renowned for its art, fashion, gastronomy, and culture. The city's picturesque boulevards, the Seine River, and iconic landmarks like the Eiffel Tower and Notre-Dame Cathedral make it one of the world's most visited destinations. From world-class museums like the Louvre to charming sidewalk cafés, Paris offers an unforgettable experience.",
            highlights: [
                "Visit the iconic Eiffel Tower and enjoy panoramic views of the city",
                "Explore the Louvre Museum and see the Mona Lisa",
                "Stroll along the Champs-Élysées and enjoy luxury shopping",
                "Take a romantic cruise along the Seine River",
                "Indulge in authentic French pastries and cuisine"
            ]
        },
        maldives: {
            name: "Maldives",
            price: "$2,199",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
            image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80",
            description: "The Maldives is a tropical paradise comprised of 26 atolls in the Indian Ocean. Known for its stunning blue waters, white sandy beaches, and incredible marine life, it's the perfect destination for relaxation and water activities. The overwater bungalows and luxury resorts provide an unparalleled experience of tranquility and luxury.",
            highlights: [
                "Stay in luxurious overwater bungalows with direct ocean access",
                "Snorkel or dive among vibrant coral reefs and diverse marine life",
                "Enjoy romantic sunset cruises on traditional dhoni boats",
                "Relax with spa treatments overlooking the ocean",
                "Experience Maldivian culture with visits to local islands"
            ]
        },
        rome: {
            name: "Rome, Italy",
            price: "$1,099",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>',
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHhwdNLG4zEL3YJ69Rem1uww--1V54IyfRUw&s",
            description: "Rome, the Eternal City, is a living museum of history, art, and culture. From ancient ruins like the Colosseum and Roman Forum to Renaissance masterpieces and Baroque fountains, Rome offers an incredible journey through time. The city's vibrant piazzas, delicious cuisine, and passionate spirit make it an unforgettable destination.",
            highlights: [
                "Explore the ancient Colosseum and Roman Forum",
                "Visit Vatican City including St. Peter's Basilica and the Sistine Chapel",
                "Toss a coin into the Trevi Fountain to ensure your return to Rome",
                "Enjoy authentic Italian pasta, pizza, and gelato",
                "Wander through charming neighborhoods like Trastevere"
            ]
        },
        barcelona: {
            name: "Barcelona, Spain",
            price: "$1,099",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
            image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
            description: "Barcelona is a vibrant city known for its unique architecture, lively culture, and Mediterranean beaches. The works of Antoni Gaudí, including the Sagrada Família and Park Güell, define the city's skyline. From the bustling Las Ramblas to the charming Gothic Quarter, Barcelona offers a perfect blend of history, culture, and modern energy.",
            highlights: [
                "Marvel at Gaudí's masterpieces including the Sagrada Família",
                "Stroll along Las Ramblas and visit La Boqueria market",
                "Relax on Barceloneta Beach and enjoy waterfront dining",
                "Explore the historic Gothic Quarter with its medieval streets",
                "Experience vibrant nightlife and tapas culture"
            ]
        },
        dubai: {
            name: "Dubai, UAE",
            price: "$1,799",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>',
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
            description: "Dubai is a city of superlatives, known for its ultramodern architecture, luxury shopping, and vibrant nightlife. From the world's tallest building, the Burj Khalifa, to artificial islands and opulent shopping malls, Dubai constantly pushes the boundaries of innovation. The city also offers desert adventures and rich cultural experiences.",
            highlights: [
                "Visit the Burj Khalifa for panoramic views from the world's tallest building",
                "Experience desert safari with dune bashing and camel riding",
                "Shop at the Dubai Mall and see the spectacular Dubai Fountain",
                "Explore traditional markets in the historic Al Fahidi neighborhood",
                "Enjoy luxury experiences at palm-shaped artificial islands"
            ]
        },
        newyork: {
            name: "New York, USA",
            price: "$1,499",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>',
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
            description: "New York City, the Big Apple, is a bustling metropolis known for its iconic skyline, cultural diversity, and endless energy. From Times Square and Broadway to Central Park and world-class museums, the city offers something for everyone. The five boroughs each have their own unique character, making NYC a destination of endless discovery.",
            highlights: [
                "See iconic landmarks like the Statue of Liberty and Empire State Building",
                "Catch a Broadway show in the Theater District",
                "Explore diverse neighborhoods from Chinatown to Greenwich Village",
                "Visit world-class museums like the MET and MoMA",
                "Enjoy panoramic views from Top of the Rock or One World Observatory"
            ]
        },
        cairo: {
            name: "Cairo, Egypt",
            price: "$1,099",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i>',
            image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=1200&q=80",
            description: "Cairo, the capital of Egypt, is a vibrant city that seamlessly blends ancient history with modern life. Home to the Great Pyramids of Giza and the Sphinx, it offers a journey back in time to the era of pharaohs. The city's bustling markets, Islamic architecture, and Nile River views create an unforgettable cultural experience.",
            highlights: [
                "Explore the Great Pyramids of Giza and the Sphinx",
                "Discover ancient artifacts at the Egyptian Museum",
                "Cruise along the Nile River and enjoy traditional entertainment",
                "Wander through Khan el-Khalili bazaar for unique souvenirs",
                "Visit historic Islamic Cairo with its mosques and madrasas"
            ]
        },
        sydney: {
            name: "Sydney, Australia",
            price: "$2,299",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>',
            image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
            description: "Sydney is Australia's vibrant harbor city known for its stunning beaches, iconic architecture, and laid-back lifestyle. The Sydney Opera House and Harbour Bridge define its world-famous skyline. With beautiful coastal walks, excellent dining, and a thriving arts scene, Sydney offers a perfect blend of urban sophistication and natural beauty.",
            highlights: [
                "Visit the iconic Sydney Opera House and take a guided tour",
                "Climb the Sydney Harbour Bridge for breathtaking views",
                "Relax on famous beaches like Bondi and Manly",
                "Explore the Royal Botanic Garden and enjoy harbor views",
                "Take a ferry to Taronga Zoo for wildlife encounters"
            ]
        },
        bangkok: {
            name: "Bangkok, Thailand",
            price: "$899",
            rating: '<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star-half-alt"></i>',
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgiOx1CgmJMDCVy68WDB3m4pkdI0r1cqv3g&s",
            description: "Bangkok is a bustling metropolis known for its ornate temples, vibrant street life, and world-renowned cuisine. The city contrasts ancient traditions with modern luxury, offering everything from majestic palaces to bustling markets and sleek skyscrapers. Bangkok's energy, friendly locals, and affordable luxury make it a favorite among travelers.",
            highlights: [
                "Visit the Grand Palace and Wat Phra Kaew (Temple of the Emerald Buddha)",
                "Explore floating markets and experience traditional Thai commerce",
                "Enjoy world-class street food and night markets",
                "Experience vibrant nightlife on Khao San Road and Sukhumvit",
                "Relax with traditional Thai massage and spa treatments"
            ]
        }
    };

    // =========================================================================
    // DOM Initialization on DOMContentLoaded
    // =========================================================================
    document.addEventListener('DOMContentLoaded', () => {
        initNavigation();
        initScrollEffects();
        initRevealOnScroll();
        initDestinationDetail();
        initSearchFilter();
        initStatsCounter();
        initFAQAccordion();
        initContactForm();
    });

    // =========================================================================
    // 1. Navigation & Mobile Menu
    // =========================================================================
    function initNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const mainLogo = document.getElementById('main-logo');

        if (hamburger && navLinks) {
            function closeMobileNav() {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            }

            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = navLinks.classList.toggle('active');
                hamburger.classList.toggle('open', isOpen);
                hamburger.setAttribute('aria-expanded', isOpen);
                document.body.classList.toggle('nav-open', isOpen);
            });

            // Close menu on navigation link click
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    closeMobileNav();
                });
            });

            // Close menu on click outside
            document.addEventListener('click', (e) => {
                if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                    closeMobileNav();
                }
            });

            // Close menu on Escape key
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                    closeMobileNav();
                }
            });
        }

        // Logo click handler
        if (mainLogo) {
            mainLogo.addEventListener('click', (e) => {
                if (document.body.classList.contains('detail-visible')) {
                    hideDestinationDetail();
                } else if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }

    // =========================================================================
    // 2. Throttled Scroll Effects (Header & Back-to-Top)
    // =========================================================================
    function initScrollEffects() {
        const header = document.querySelector('header');
        const backToTop = document.querySelector('.back-to-top');

        if (!header && !backToTop) return;

        let ticking = false;
        let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

        function updateScrollState() {
            const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

            if (header) {
                if (currentScrollY > 40) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }

            if (backToTop) {
                if (currentScrollY > 450) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }

            lastScrollY = currentScrollY;
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollState);
                ticking = true;
            }
        }, { passive: true });

        // Initial check
        updateScrollState();

        // Back to top button smooth scroll
        if (backToTop) {
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // =========================================================================
    // 3. High-Performance IntersectionObserver for Scroll Reveals
    // =========================================================================
    function initRevealOnScroll() {
        // Elements to reveal
        const targetElements = document.querySelectorAll(
            '.section-title, .destination-card, .feature-card, .testimonial, ' +
            '.our-story, .mv-card, .value-card, .team-member, .stat-item, ' +
            '.contact-info, .contact-form, .map-container, .faq-item'
        );

        if (!targetElements.length) return;

        // Check for reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            targetElements.forEach(el => {
                el.classList.add('reveal', 'reveal-visible');
            });
            return;
        }

        // Add reveal class and stagger delays
        targetElements.forEach((el, index) => {
            el.classList.add('reveal');
            const delayMod = (index % 4) + 1;
            el.classList.add(`reveal-delay-${delayMod}`);
        });

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    // Unobserve after revealing to free up CPU / memory completely
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        });

        targetElements.forEach(el => revealObserver.observe(el));
    }

    // =========================================================================
    // 4. Destination Detail Modal
    // =========================================================================
    let savedScrollPosition = 0;

    function initDestinationDetail() {
        const destinationDetail = document.getElementById('destination-detail');
        const backButton = document.getElementById('back-button');

        if (!destinationDetail) return;

        // Open modal on card or explore button click
        document.addEventListener('click', (e) => {
            const exploreBtn = e.target.closest('.explore-button');
            const card = e.target.closest('.destination-card');

            if (exploreBtn) {
                e.preventDefault();
                e.stopPropagation();
                const destId = exploreBtn.getAttribute('data-destination');
                if (destId) showDestinationDetail(destId);
                return;
            }

            if (card && !e.target.closest('button')) {
                const destId = card.getAttribute('data-destination');
                if (destId) showDestinationDetail(destId);
            }
        });

        if (backButton) {
            backButton.addEventListener('click', hideDestinationDetail);
        }

        // Close on Escape key
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.body.classList.contains('detail-visible')) {
                hideDestinationDetail();
            }
        });
    }

    function showDestinationDetail(destinationId) {
        const destination = destinations[destinationId];
        if (!destination) return;

        const detailName = document.getElementById('detail-name');
        const detailPrice = document.getElementById('detail-price');
        const detailRating = document.getElementById('detail-rating');
        const detailImage = document.getElementById('detail-image');
        const detailDescription = document.getElementById('detail-description');
        const highlightsList = document.getElementById('detail-highlights');
        const destinationDetail = document.getElementById('destination-detail');

        if (detailName) detailName.textContent = destination.name;
        if (detailPrice) detailPrice.textContent = destination.price;
        if (detailRating) detailRating.innerHTML = destination.rating;
        if (detailImage) {
            detailImage.src = destination.image;
            detailImage.alt = destination.name;
        }
        if (detailDescription) detailDescription.textContent = destination.description;

        if (highlightsList) {
            highlightsList.innerHTML = '';
            const fragment = document.createDocumentFragment();
            destination.highlights.forEach(highlight => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-check-circle"></i> <span>${highlight}</span>`;
                fragment.appendChild(li);
            });
            highlightsList.appendChild(fragment);
        }

        savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        document.body.classList.add('detail-visible', 'modal-open');

        if (destinationDetail) {
            destinationDetail.scrollTop = 0;
        }
    }

    function hideDestinationDetail() {
        document.body.classList.remove('detail-visible', 'modal-open');
        window.scrollTo({
            top: savedScrollPosition,
            behavior: 'auto'
        });
    }

    // =========================================================================
    // 5. Live Search / Filter for Destinations
    // =========================================================================
    function initSearchFilter() {
        const searchInput = document.querySelector('.search-box input');
        const searchButton = document.querySelector('.search-box button');

        if (!searchInput) return;

        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            const cards = document.querySelectorAll('.destination-card');

            if (!cards.length) {
                // If on another page, redirect to destination.html with query
                if (!window.location.pathname.endsWith('destination.html') && !window.location.pathname.endsWith('index.html')) {
                    window.location.href = `destination.html?search=${encodeURIComponent(query)}`;
                    return;
                }
            }

            cards.forEach(card => {
                const title = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
                const desc = (card.querySelector('p') ? card.querySelector('p').textContent : '').toLowerCase();
                const matches = title.includes(query) || desc.includes(query);

                card.style.display = matches ? 'flex' : 'none';
            });

            // Scroll to destinations section smoothly
            const destSection = document.getElementById('destinations');
            if (destSection && query) {
                destSection.scrollIntoView({ behavior: 'smooth' });
            }
        }

        searchInput.addEventListener('input', () => {
            const cards = document.querySelectorAll('.destination-card');
            if (cards.length) {
                const query = searchInput.value.trim().toLowerCase();
                cards.forEach(card => {
                    const title = (card.querySelector('h3') ? card.querySelector('h3').textContent : '').toLowerCase();
                    const desc = (card.querySelector('p') ? card.querySelector('p').textContent : '').toLowerCase();
                    card.style.display = (title.includes(query) || desc.includes(query)) ? 'flex' : 'none';
                });
            }
        });

        if (searchButton) {
            searchButton.addEventListener('click', (e) => {
                e.preventDefault();
                performSearch();
            });
        }

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        // Check for URL search param
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            searchInput.value = searchParam;
            setTimeout(performSearch, 100);
        }
    }

    // =========================================================================
    // 6. Smooth Stats Counter Animation (Single requestAnimationFrame loop)
    // =========================================================================
    function initStatsCounter() {
        const statsSection = document.querySelector('.stats-section');
        const counters = document.querySelectorAll('.stat-number');

        if (!statsSection || !counters.length) return;

        let hasAnimated = false;

        function easeOutQuad(t) {
            return t * (2 - t);
        }

        function runCounterAnimation() {
            if (hasAnimated) return;
            hasAnimated = true;

            const duration = 1800; // ms
            const startTime = performance.now();

            const items = Array.from(counters).map(counter => ({
                el: counter,
                target: parseInt(counter.getAttribute('data-count'), 10) || 0
            }));

            function step(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = easeOutQuad(progress);

                items.forEach(item => {
                    const currentVal = Math.floor(easedProgress * item.target);
                    // Format with commas for large numbers (e.g. 50,000) or raw
                    item.el.textContent = item.target >= 1000 ? currentVal.toLocaleString() : currentVal;
                });

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    items.forEach(item => {
                        item.el.textContent = item.target >= 1000 ? item.target.toLocaleString() : item.target;
                    });
                }
            }

            requestAnimationFrame(step);
        }

        if ('IntersectionObserver' in window) {
            const statsObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        runCounterAnimation();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            statsObserver.observe(statsSection);
        } else {
            runCounterAnimation();
        }
    }

    // =========================================================================
    // 7. FAQ Accordion (Smooth & Accessible)
    // =========================================================================
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (!question) return;

            function toggleFaqItem() {
                const isCurrentlyActive = item.classList.contains('active');

                // Close other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                });

                // Toggle current item
                item.classList.toggle('active', !isCurrentlyActive);
                question.setAttribute('aria-expanded', String(!isCurrentlyActive));
            }

            question.addEventListener('click', toggleFaqItem);

            // Support keyboard activation (Enter / Space) since faq-question
            // is a focusable role="button" element
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                    e.preventDefault();
                    toggleFaqItem();
                }
            });
        });
    }

    // =========================================================================
    // 8. Contact Form Handler
    // =========================================================================
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = (document.getElementById('name') || {}).value || '';
            const email = (document.getElementById('email') || {}).value || '';
            const subject = (document.getElementById('subject') || {}).value || '';
            const message = (document.getElementById('message') || {}).value || '';

            if (name.trim() && email.trim() && subject.trim() && message.trim()) {
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn ? submitBtn.innerHTML : '';

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    submitBtn.style.backgroundColor = 'var(--success)';
                }

                setTimeout(() => {
                    alert(`Thank you, ${name}! Your message has been sent successfully. Our team will contact you at ${email} shortly.`);
                    contactForm.reset();
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.backgroundColor = '';
                    }
                }, 400);
            } else {
                alert('Please fill out all required fields.');
            }
        });
    }

})();

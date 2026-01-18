lang="en"
// Dark mode toggle
const darkModeToggle = document.querySelector('#dark-mode-toggle');
if (darkModeToggle) {
    // Check for saved preference
    const savedMode = localStorage.getItem('dark-mode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    });
}

//NAV
// add classes for mobile navigation toggling
var CSbody = document.querySelector("body");
const CSnavbarMenu = document.querySelector("#cs-navigation");
const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

CShamburgerMenu.addEventListener('click', function() {
    CShamburgerMenu.classList.toggle("cs-active");
    CSnavbarMenu.classList.toggle("cs-active");
    CSbody.classList.toggle("cs-open");
    // run the function to check the aria-expanded value
    ariaExpanded();
});

// checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
function ariaExpanded() {
    const csUL = document.querySelector('#cs-expanded');
    const csExpanded = csUL.getAttribute('aria-expanded');

    if (csExpanded === 'false') {
        csUL.setAttribute('aria-expanded', 'true');
    } else {
        csUL.setAttribute('aria-expanded', 'false');
    }
}

// This script adds a class to the body after scrolling 100px
// and we used these body.scroll styles to create some on scroll 
// animations with the navbar

document.addEventListener('scroll', (e) => { 
    const scroll = document.documentElement.scrollTop;
    if(scroll >= 100){
document.querySelector('body').classList.add('scroll')
    } else {
    document.querySelector('body').classList.remove('scroll')
    }
});

// mobile nav toggle code
const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
    for (const item of dropDowns) {
        const onClick = () => {
        item.classList.toggle('cs-active')
    }
    item.addEventListener('click', onClick)
    }
                            
                
    


//HERO                     
class GalleryFilter {
        filtersSelector = ".cs-button";
        imagesSelector = ".cs-listing";
        activeClass = "cs-active";
        hiddenClass = "cs-hidden";

        constructor() {
            const $filters = document.querySelectorAll(this.filtersSelector);
            this.$activeFilter = $filters[0];
            this.$images = document.querySelectorAll(this.imagesSelector);

            this.$activeFilter.classList.add(this.activeClass);

            for (const $filter of $filters) {
                $filter.addEventListener("click", () => this.onClick($filter));
            }
        }

        onClick($filter) {
            this.filter($filter.dataset.filter);

            const { activeClass } = this;

            this.$activeFilter.classList.remove(activeClass);
            $filter.classList.add(activeClass);

            this.$activeFilter = $filter;
        }

        filter(filter) {
            const showAll = filter == "all";
            const { hiddenClass } = this;

            for (const $image of this.$images) {
                const show = showAll || $image.dataset.category == filter;
                $image.classList.toggle(hiddenClass, !show);
            }
        }
    }

    new GalleryFilter();

// Category carousel - shows 4 items at a time with fade animation
const collectionSection = document.querySelector('#collection-1577');
if (collectionSection) {
    const leftBtn = collectionSection.querySelector('.left-btn');
    const rightBtn = collectionSection.querySelector('.right-btn');
    const cards = Array.from(collectionSection.querySelectorAll('.cs-card-group .cs-item'));

    const itemsPerPage = 4;
    let currentPage = 0;
    const totalPages = Math.ceil(cards.length / itemsPerPage);
    let isAnimating = false;

    // Get visible cards for current page
    function getVisibleCards(page) {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return cards.filter((_, index) => index >= startIndex && index < endIndex);
    }

    // Show page without animation (for initial load)
    function showPage(page) {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        cards.forEach((card, index) => {
            card.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
            if (index >= startIndex && index < endIndex) {
                card.classList.remove('cs-hidden');
            } else {
                card.classList.add('cs-hidden');
            }
        });
    }

    // Animate to new page
    function animateToPage(newPage, direction) {
        if (isAnimating) return;
        isAnimating = true;

        const currentCards = getVisibleCards(currentPage);
        const slideOutClass = direction === 'left' ? 'slide-out-left' : 'slide-out-right';
        const slideInClass = direction === 'left' ? 'slide-in-right' : 'slide-in-left';

        // Slide out current cards
        currentCards.forEach(card => {
            card.classList.add(slideOutClass);
        });

        // After slide out, show new cards with slide in
        setTimeout(() => {
            // Hide old cards
            currentCards.forEach(card => {
                card.classList.add('cs-hidden');
                card.classList.remove(slideOutClass);
            });

            // Show and animate new cards
            const newCards = getVisibleCards(newPage);
            newCards.forEach(card => {
                card.classList.remove('cs-hidden');
                card.classList.add(slideInClass);
            });

            currentPage = newPage;

            // Clean up animation classes
            setTimeout(() => {
                newCards.forEach(card => {
                    card.classList.remove(slideInClass);
                });
                isAnimating = false;
            }, 400);
        }, 400);
    }

    // Initialize - show first page
    showPage(currentPage);

    // Previous button - swipe right (content comes from left)
    leftBtn.addEventListener('click', () => {
        if (isAnimating) return;
        let newPage = currentPage - 1;
        if (newPage < 0) {
            newPage = totalPages - 1;
        }
        animateToPage(newPage, 'right');
    });

    // Next button - swipe left (content comes from right)
    rightBtn.addEventListener('click', () => {
        if (isAnimating) return;
        let newPage = currentPage + 1;
        if (newPage >= totalPages) {
            newPage = 0;
        }
        animateToPage(newPage, 'left');
    });
}
                                
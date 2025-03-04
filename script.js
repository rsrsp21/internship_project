window.onload = function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');
    //const sound = new Audio('load_sound.wav');

    setTimeout(() => {
        //sound.play();
        loadingScreen.style.animation = 'zoomIn 2s ease-out forwards';

        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.style.display = 'block';
        }, 2000);
    }, 0);
};


const movies = [
    {
        title: "Inception",
        description: "A thief plants an idea in a target's mind through dream manipulation.",
        image: "inception.png"
    },
    {
        title: "Breaking Bad",
        description: "A high school chemistry teacher turned methamphetamine drug lord.",
        image: "breaking_bad.jpg"
    },
    {
        title: "Stranger Things",
        description: "Kids face supernatural threats in the 1980s after a friend vanishes.",
        image: "stranger_things.jpg"
    }
];

let currentMovieIndex = 0;
let startX = 0;
let endX = 0; 

function createHeroSections() {
    const heroContainer = document.querySelector('.hero-container');
    movies.forEach((movie, index) => {
        const heroSection = document.createElement('div');
        heroSection.classList.add('hero', 'hero-section');
        heroSection.dataset.index = index;
        heroSection.style.backgroundImage = `url('${movie.image}')`;

        const heroContent = document.createElement('div');
        heroContent.classList.add('hero-content');

        const title = document.createElement('h1');
        title.textContent = movie.title;

        const description = document.createElement('p');
        description.textContent = movie.description;

        const playNowButton = document.createElement('button');
        playNowButton.textContent = 'Play Now';
        playNowButton.addEventListener('click', () => {
            alert('Play Now button clicked for ' + movie.title);
        });

        heroContent.appendChild(title);
        heroContent.appendChild(description);
        heroContent.appendChild(playNowButton);
        heroSection.appendChild(heroContent);
        heroContainer.appendChild(heroSection);

        if (index === 0) {
            heroSection.classList.add('active');
        }
    });

    heroContainer.addEventListener('touchstart', handleTouchStart);
    heroContainer.addEventListener('touchend', handleTouchEnd);
}

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    endX = e.changedTouches[0].clientX;
    const difference = startX - endX;

    if (difference > 50) {
        nextMovie();
    } else if (difference < -50) {
        prevMovie();
    }
}

function updateHeroContent(index) {
    const heroSections = document.querySelectorAll('.hero-section');
    heroSections.forEach((section, i) => {
        const offset = 100 * (i - index);
        section.style.transition = 'transform 0.5s ease';
        section.style.transform = `translateX(${offset}%)`;
        section.classList.toggle('active', i === index);
    });
}

function nextMovie() {
    currentMovieIndex = (currentMovieIndex + 1) % movies.length;
    updateHeroContent(currentMovieIndex);
}

function prevMovie() {
    currentMovieIndex = (currentMovieIndex - 1 + movies.length) % movies.length;
    updateHeroContent(currentMovieIndex);
}

createHeroSections();
updateHeroContent(currentMovieIndex);

document.getElementById('prev-btn').addEventListener('click', prevMovie);
document.getElementById('next-btn').addEventListener('click', nextMovie);

setInterval(nextMovie, 5000);
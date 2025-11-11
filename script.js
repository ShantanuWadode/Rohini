document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.story-section');
    const nextBtn = document.getElementById('next-btn');
    const backBtn = document.getElementById('back-btn');
    const replayBtn = document.getElementById('replay-btn');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    const music = document.getElementById('background-music');
    const navControls = document.getElementById('navigation-controls');

    let currentStep = 0;
    const totalSteps = sections.length - 1;

    // --- Core Functions ---

    function updateSection(newStep) {
        if (newStep < 0 || newStep > totalSteps) return;

        // 1. Deactivate current section
        sections[currentStep].classList.remove('active');

        // 2. Update step
        currentStep = newStep;

        // 3. Activate new section
        sections[currentStep].classList.add('active');
        
        // 4. Update Controls
        updateControls();
    }

    function updateControls() {
        // Back Button Logic
        backBtn.disabled = currentStep === 0;

        // Next Button/Final Screen Logic
        if (currentStep === totalSteps) {
            navControls.style.display = 'none';
        } else {
            navControls.style.display = 'flex';
        }
    }

    // --- Event Listeners ---

    // Next Button
    nextBtn.addEventListener('click', () => {
        updateSection(currentStep + 1);
    });

    // Back Button
    backBtn.addEventListener('click', () => {
        updateSection(currentStep - 1);
    });

    // Replay Button (on the final section)
    replayBtn.addEventListener('click', () => {
        // Fade out and restart (matches the CSS transition speed of 1.2s)
        const finalSection = sections[totalSteps];
        finalSection.style.opacity = '0';
        setTimeout(() => {
            finalSection.style.opacity = '1';
            updateSection(0);
        }, 1200); 
    });

    // Music Toggle 
    let isPlaying = false;
    musicToggle.addEventListener('click', () => {
        if (music.paused || !isPlaying) {
            if (music.currentSrc) {
                music.play().then(() => {
                    musicIcon.textContent = '🔇';
                    isPlaying = true;
                    musicToggle.title = 'Mute Music';
                }).catch(error => {
                    console.error("Audio playback failed:", error);
                    alert("Music requires a valid audio source.");
                });
            } else {
                alert("Please add an audio file (e.g., soft_instrumental.mp3) to enable music.");
            }
        } else {
            music.pause();
            musicIcon.textContent = '🎵';
            isPlaying = false;
            musicToggle.title = 'Play Music';
        }
    });

    // Initialize the website view
    updateControls();
});

document.addEventListener('DOMContentLoaded', function () {
    var tripCarousel = document.getElementById('carouselExampleAutoplaying');
    
    // Stop all videos when the carousel starts sliding away from a video
    tripCarousel.addEventListener('slide.bs.carousel', function (event) {
        var activeItem = event.target.querySelector('.carousel-item.active');
        var activeVideo = activeItem ? activeItem.querySelector('video') : null;
        if (activeVideo) {
            // Pause the video currently leaving the screen and reset it to the beginning
            activeVideo.pause();
            activeVideo.currentTime = 0; 
        }
    });

    // Play the video when the carousel has finished transitioning to the new slide
    tripCarousel.addEventListener('slid.bs.carousel', function (event) {
        var currentItem = event.target.querySelector('.carousel-item.active');
        var currentVideo = currentItem ? currentItem.querySelector('video') : null;
        if (currentVideo) {
            // Play the video that has just entered the screen
            currentVideo.play().catch(error => {
                // This catches potential 'NotAllowedError' if browser restrictions are strict
                console.log("Autoplay failed (usually due to browser policy). User may need to manually click play.");
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    // 1. Get the elements
    const musicToggle = document.getElementById('music-toggle');
    const backgroundMusic = document.getElementById('music'); // Note: ID in HTML was 'music', not 'background-music'
    const musicIcon = document.getElementById('music-icon');

    // 2. Add the click event listener
    musicToggle.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            // If the music is paused, play it
            backgroundMusic.play()
                .then(() => {
                    // Update icon to indicate music is playing (e.g., a sound wave)
                    musicIcon.textContent = '🔊'; 
                    // Optional: You can change the button appearance here
                })
                .catch(error => {
                    // This handles situations where autoplay is blocked by the browser
                    console.log("Music play blocked by browser policy:", error);
                    alert("Please click the play button to start the music!");
                });
        } else {
            // If the music is playing, pause it
            backgroundMusic.pause();
            // Update icon to indicate music is paused (e.g., a musical note)
            musicIcon.textContent = '🎵'; 
        }
    });
});
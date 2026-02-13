// Basic JavaScript boilerplate
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready — script.js loaded");
  const screens = document.querySelectorAll('.screen');
    let currentIndex = 0;

    function transitionScreens() {
        if (currentIndex < screens.length - 1) {
            screens[currentIndex].classList.remove('active');
            currentIndex++;
            screens[currentIndex].classList.add('active');
            
            setTimeout(transitionScreens, 5000);
        }
    }

    setTimeout(transitionScreens, 5000);

  const h1 = document.querySelector("h1");
  if (h1) {
    h1.addEventListener("click", () => h1.classList.toggle("is-active"));
  }

  // Add event listeners to buttons
  document.getElementById('openPopup1').addEventListener('click', () => {
        document.getElementById('popup1').classList.remove('hidden');
    });

    document.getElementById('openPopup2').addEventListener('click', () => {
        document.getElementById('popup1').classList.add('hidden');
        document.getElementById('popup2').classList.remove('hidden');
    });

    document.getElementById('openPopup3').addEventListener('click', () => {
        document.getElementById('popup2').classList.add('hidden');
        document.getElementById('popup3').classList.remove('hidden');
    });

    document.getElementById('openPopup4').addEventListener('click', () => {
        document.getElementById('popup3').classList.add('hidden');
        document.getElementById('popup4').classList.remove('hidden');

        
        const audio = document.getElementById('backgroundAudio');
        if (audio) {
            audio.play().catch(error => console.log("Audio playback failed:", error));
        }
    });
    
    document.getElementById('openPopup5').addEventListener('click', () => {
        document.getElementById('popup5').classList.remove('hidden');

        
        const audio = document.getElementById('backgroundAudio');
        if (audio) {
            audio.play().catch(error => console.log("Audio playback failed:", error));
        }
    });



    document.querySelectorAll('.close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const targetId = e.target.getAttribute('data-target');
            document.getElementById(targetId).classList.add('hidden');
        });
    });

    document.querySelector('.close-all-btn').addEventListener('click', () => {
        document.querySelectorAll('.popup-overlay').forEach(popup => {
            popup.classList.add('hidden');
        }); 
    });

    setTimeout(() => {
        document.getElementById('popupText').classList.add('visible');
    }, 2000);

    const audio = document.getElementById('bgAudio');
    
    audio.play().catch(() => {
        document.body.addEventListener('click', () => {
            audio.play();
        }, { once: true });
    });
});

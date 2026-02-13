// Basic JavaScript boilerplate
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready — script.js loaded");

  const h1 = document.querySelector("h1");
  if (h1) {
    h1.addEventListener("click", () => h1.classList.toggle("is-active"));
  }

  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  const btns = document.querySelector(".btns");

  if (yes) {
    yes.addEventListener("click", () => {
      alert("You clicked YES!");
    });
  }

  if (no && btns) {
    no.style.position = "absolute";

    let initialLeft = 0;
    let initialTop = 0;

    function placeNoInitial() {
      const btnRect = btns.getBoundingClientRect();
      // center of btns
      const centerX = btnRect.width / 2;
      const centerY = btnRect.height / 2;
      // offset to the right of center
      const offsetX = Math.min(140, btnRect.width * 0.28);
      const left = Math.round(centerX + offsetX - no.offsetWidth / 2);
      const top = Math.round(centerY - no.offsetHeight / 2);

      // clamp
      const maxLeft = Math.max(8, btnRect.width - no.offsetWidth - 8);
      const maxTop = Math.max(8, btnRect.height - no.offsetHeight - 8);
      initialLeft = Math.max(8, Math.min(left, maxLeft));
      initialTop = Math.max(8, Math.min(top, maxTop));

      no.style.left = initialLeft + "px";
      no.style.top = initialTop + "px";
    }

    requestAnimationFrame(placeNoInitial);

    btns.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const btnRect = btns.getBoundingClientRect();
      const noRect = no.getBoundingClientRect();

      const centerX = btnRect.left + no.offsetLeft + noRect.width / 2;
      const centerY = btnRect.top + no.offsetTop + noRect.height / 2;

      const dist = Math.hypot(mouseX - centerX, mouseY - centerY);
      const threshold = 120;

      if (dist < threshold) {
        const dx = centerX - mouseX;
        const dy = centerY - mouseY;
        const mag = Math.max(1, Math.hypot(dx, dy));
        const moveX = (dx / mag) * (threshold - dist) * 1.6;
        const moveY = (dy / mag) * (threshold - dist) * 1.6;

        let newLeft = no.offsetLeft + moveX;
        let newTop = no.offsetTop + moveY;

        // clamp inside btns
        const maxLeft = btnRect.width - noRect.width - 8;
        const maxTop = btnRect.height - noRect.height - 8;
        newLeft = Math.max(8, Math.min(newLeft, maxLeft));
        newTop = Math.max(8, Math.min(newTop, maxTop));

        no.style.left = Math.round(newLeft) + "px";
        no.style.top = Math.round(newTop) + "px";
      }
    });

    // return to initial position when mouse leaves the area
    btns.addEventListener("mouseleave", () => {
      no.style.left = initialLeft + "px";
      no.style.top = initialTop + "px";
    });

    window.addEventListener("resize", () => requestAnimationFrame(placeNoInitial));
  }
});

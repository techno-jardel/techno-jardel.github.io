let slideIndex = 0;
    showSlides();

    function changeSlide(n) {
        slideIndex += n;
        showSlides();
    }

    function currentSlide(n) {
        slideIndex = n;
        showSlides();
    }

    function showSlides() {
        let slides = document.getElementsByClassName("slides");
        let dots = document.getElementsByClassName("dot");
        if (slideIndex >= slides.length) { slideIndex = 0; }
        if (slideIndex < 0) { slideIndex = slides.length - 1; }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            dots[i].className = dots[i].className.replace(" active-dot", "");
        }
        slides[slideIndex].style.display = "block";
        dots[slideIndex].className += " active-dot";
    }
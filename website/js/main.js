document.addEventListener("DOMContentLoaded", function () {
    // Mobile nav toggle
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");

    if (toggle && links) {
        toggle.addEventListener("click", function () {
            links.classList.toggle("active");
        });
        links.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                links.classList.remove("active");
            });
        });
    }

    // Fade-in on scroll
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    document.querySelectorAll(".fade-in").forEach(function (el) {
        observer.observe(el);
    });

    // HMI live data simulation
    var reg1 = document.querySelector(".hmi-reg1");
    var reg2 = document.querySelector(".hmi-reg2");
    var reg3 = document.querySelector(".hmi-reg3");
    var reg4 = document.querySelector(".hmi-reg4");
    var val1 = document.querySelector(".hmi-val1");
    var val2 = document.querySelector(".hmi-val2");

    function jitter(base, range, decimals) {
        return (base + (Math.random() - 0.5) * range).toFixed(decimals);
    }

    if (reg1) {
        setInterval(function () {
            reg1.textContent = jitter(387.2, 4, 1) + "V";
            reg2.textContent = jitter(12.4, 1.2, 1) + "A";
            var pwr = jitter(4.80, 0.3, 2);
            reg3.textContent = pwr + "kW";
            reg4.textContent = jitter(60.01, 0.04, 2) + "Hz";
            if (val1) val1.textContent = jitter(74, 6, 0) + "%";
            if (val2) val2.textContent = jitter(56, 8, 0) + "%";
        }, 1800);
    }

    // Contact form with spam protection
    var form = document.querySelector(".contact-form");
    var formLoadTime = Date.now();

    if (form) {
        form.addEventListener("submit", function (e) {
            // Block if honeypot is filled (bot)
            var honeypot = form.querySelector("#website");
            if (honeypot && honeypot.value) {
                e.preventDefault();
                return;
            }

            // Block if submitted in under 3 seconds (bot)
            if (Date.now() - formLoadTime < 3000) {
                e.preventDefault();
                return;
            }

            // Form has Formspree configured — let it submit normally
        });
    }
});

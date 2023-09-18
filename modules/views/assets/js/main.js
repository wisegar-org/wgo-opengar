/**
 * Template Name: Mentor
 * Updated: Jul 27 2023 with Bootstrap v5.3.1
 * Template URL: https://bootstrapmade.com/mentor-free-education-bootstrap-theme/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Hero carousel indicators
   */
  let heroCarouselIndicators = select("#hero-carousel-indicators");
  let heroCarouselItems = select("#heroCarousel .carousel-item", true);

  heroCarouselItems.forEach((item, index) => {
    index === 0
      ? (heroCarouselIndicators.innerHTML +=
          "<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
          index +
          "' class='active'></li>")
      : (heroCarouselIndicators.innerHTML +=
          "<li data-bs-target='#heroCarousel' data-bs-slide-to='" +
          index +
          "'></li>");
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  on(
    "submit",
    "#comitatoForm",
    function (e) {
      e.preventDefault();
      var nome = select("#nameFComitato").value;
      var cognome = select("#lastNameFComitato").value;
      var email = select("#emailFComitato").value;
      var phone = select("#phoneFComitato").value;
      var message = select("#messageFComitato").value;

      var thisForm = select("#comitatoForm");

      var data = { nome, cognome, email, phone, message };
      var myHeaders = new Headers();
      var body = JSON.stringify(data);
      myHeaders.append("Content-Type", "application/json");
      fetch("/hb/comitato/sendMessage", {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body,
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              if (data.isSuccess) {
                thisForm
                  .querySelector(".sent-message")
                  .classList.add("d-block");
                thisForm.reset();
              } else throw data.error;
            });
          } else {
            thisForm.querySelector(".loading").classList.remove("d-block");
            thisForm.querySelector(".error-message").innerHTML = "Error";
            thisForm.querySelector(".error-message").classList.add("d-block");
          }
        })
        .catch((error) => {
          thisForm.querySelector(".loading").classList.remove("d-block");
          thisForm.querySelector(".error-message").innerHTML = error;
          thisForm.querySelector(".error-message").classList.add("d-block");
        });
    },
    true
  );

  on(
    "submit",
    "#contattoForm",
    function (e) {
      e.preventDefault();
      var nome = select("#nameFContatto").value;
      var cognome = select("#lastNameFContatto").value;
      var email = select("#emailFContatto").value;
      var phone = select("#phoneFContatto").value;
      var message = select("#messageFContatto").value;

      var thisForm = select("#contattoForm");

      var data = { nome, cognome, email, phone, message };
      var myHeaders = new Headers();
      var body = JSON.stringify(data);
      myHeaders.append("Content-Type", "application/json");
      fetch("/hb/contatto/sendMessage", {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body,
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              if (data.isSuccess) {
                thisForm
                  .querySelector(".sent-message")
                  .classList.add("d-block");
                thisForm.reset();
              } else throw data.error;
            });
          } else {
            thisForm.querySelector(".loading").classList.remove("d-block");
            thisForm.querySelector(".error-message").innerHTML = "Error";
            thisForm.querySelector(".error-message").classList.add("d-block");
          }
        })
        .catch((error) => {
          thisForm.querySelector(".loading").classList.remove("d-block");
          thisForm.querySelector(".error-message").innerHTML = error;
          thisForm.querySelector(".error-message").classList.add("d-block");
        });
    },
    true
  );

  on(
    "submit",
    "#detailsForm",
    function (e) {
      e.preventDefault();
      var nome = select("#nameFDetails").value;
      var cognome = select("#lastNameFDetails").value;
      var email = select("#emailFDetails").value;
      var phone = select("#phoneFDetails").value;
      var message = select("#messageFDetails").value;
      var classV = select("#classFDetails").value;

      var thisForm = select("#detailsForm");
      var action = thisForm.getAttribute("action");
      var data = {
        nome,
        cognome,
        email,
        phone,
        message,
        class: classV,
        url: window.location.href,
      };
      var myHeaders = new Headers();
      var body = JSON.stringify(data);
      myHeaders.append("Content-Type", "application/json");
      fetch(action, {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
        body,
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              if (!data.error) {
                thisForm
                  .querySelector(".sent-message")
                  .classList.add("d-block");
                thisForm.reset();
              } else throw data.error;
            });
          } else {
            thisForm.querySelector(".loading").classList.remove("d-block");
            thisForm.querySelector(".error-message").innerHTML = "Error";
            thisForm.querySelector(".error-message").classList.add("d-block");
          }
        })
        .catch((error) => {
          thisForm.querySelector(".loading").classList.remove("d-block");
          thisForm.querySelector(".error-message").innerHTML = error;
          thisForm.querySelector(".error-message").classList.add("d-block");
        });
    },
    true
  );
})();

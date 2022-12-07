import Swiper from "../lib/swiper-bundle.esm.browser.min.js";

// simpleBar
new SimpleBar(document.querySelector(".country__list"), {
  classNames: {
    // переназначаем классы , даттые плагином и  уже их в цсс подправляем стили как надо
    // это сам скроллбар и ползунок на нем
    scrollbar: "country__scrollbar",
    track: "country__track",
  },
});

// swiper

new Swiper(".goods__block", {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },

    1024: {
      slidesPerView: 2,
      spaceBetween: 24,
    },

    1440: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
  navigation: {
    nextEl: ".goods__arrow_next",
    prevEl: ".goods__arrow_prev",
  },
  // отключаем переключение кнопки в свайпе. Она при нажатии перемещает  элемент в главный( он по умолчанию первый)
  preventClicks: true,
  a11y: false,
});

// modal window

const productMore = document.querySelectorAll(".product__more");
const modal = document.querySelector(".modal");

const closeModal = (event) => {
  if (
    (event.type === "keyup" && event.key === "Escape") ||
    (event.type === "click" && event.target === modal)
  ) {
    modal.classList.remove("modal_open");
    window.removeEventListener("keyup", closeModal);
  }
};

productMore.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.add("modal_open");
    window.addEventListener("keyup", closeModal);
  });
});

modal.addEventListener("click", closeModal);

const formPlaceholder = document.querySelectorAll(".form__placeholder");
const formInput = document.querySelectorAll(".form__input");

formInput.forEach((input, i) => {
  input.addEventListener("focus", () => {
    formPlaceholder[i].classList.add("form__placeholder_active");
  });
  input.addEventListener("blur", () => {
    if (input.value === "") {
      formPlaceholder[i].classList.remove("form__placeholder_active");
    }
  });
});

// currency

const dataCurrency = {};

const formatCurrency = (value, currency) => {
  return new Intl.NumberFormat("EUR", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  }).format(value);
};

const showPrice = (currency = "USD") => {
  const priceElems = document.querySelectorAll("[data-price]");

  priceElems.forEach((elem) => {
    elem.textContent = formatCurrency(
      elem.dataset.price * dataCurrency[currency],
      currency
    );
  });
};

const myHeaders = new Headers();
myHeaders.append("apikey", "Uv3TZn0wKYFXv3ibxSruV54zNf4LcwNd");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

fetch("https://api.apilayer.com/fixer/latest?&base=USD", requestOptions)
  .then((response) => response.json())
  .then((result) => {
    Object.assign(dataCurrency, result.rates);
    showPrice();
  })
  .catch((error) => console.log("error", error));

// choices

const countryBtn = document.querySelector(".country__btn");
const countryWrapper = document.querySelector(".country__wrapper");
countryBtn.addEventListener("click", () => {
  countryWrapper.classList.toggle("country__wrapper_open");
});

countryWrapper.addEventListener("click", ({ target }) => {
  if (target.classList.contains("country__choice")) {
    countryWrapper.classList.remove("country__wrapper_open");
    showPrice(target.dataset.currency);
  }
});



// это функция склонения
const declOfNum = (n, titles) =>
  titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
      ? 1
      : 2
  ];

const timer = (deadline) => {
  const unitDay = document.querySelector(".timer__unit_day");
  const unitHour = document.querySelector(".timer__unit_hour");
  const unitMin = document.querySelector(".timer__unit_min");

  const descriptionDay = document.querySelector(".timer__unit-description_day");
  const descriptionHour = document.querySelector(
    ".timer__unit-description_hour"
  );
  const descriptionMin = document.querySelector(".timer__unit-description_min");

  const getTimeRemaining = () => {
    // getTime() преобразует дату в милиссекунды с 1970года. делаею для расчета
    const dateStop = new Date(deadline).getTime();
    const dateNow = Date.now();

    const timeRemaining = dateStop - dateNow;

    const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
    const hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 24);
    const days = Math.floor(timeRemaining / 1000 / 60 / 60 / 24);

    return { timeRemaining, minutes, hours, days };
  };

  const start = () => {
    const timer = getTimeRemaining();
    console.log("timer: ", timer);
    unitDay.textContent = timer.days;
    unitHour.textContent = timer.hours;
    unitMin.textContent = timer.minutes;

    descriptionDay.textContent = declOfNum(timer.days, ["день", "дня", "дней"]);
    descriptionHour.textContent = declOfNum(timer.hours, [
      "час",
      "часа",
      "часов",
    ]);
    descriptionMin.textContent = declOfNum(timer.minutes, [
      "минута",
      "минуты",
      "минут",
    ]);

    // вызываем функцию раз в минуту. так как в таймере у нас минимальное время обновления это минута
    const timerId = setTimeout(start, 60000);

    if (timer.timeRemaining < 0) {
      clearTimeout(timerId);
      unitDay.textContent = "0";
      unitHour.textContent = "0";
      unitMin.textContent = "0";
    }
  };

  start();
};

timer("2023/01/01 00:00");

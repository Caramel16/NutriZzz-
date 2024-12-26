function setActive(element) {
  const items = document.querySelectorAll(".f-content");
  const indicator = document.querySelector(".indicator");
  const grayBox = document.querySelector(".gray-box");

  items.forEach((item) => item.classList.remove("active"));

  element.classList.add("active");

  const index = Array.from(items).indexOf(element); // Get the index of the active element
  const heightPerItem = grayBox.clientHeight / items.length;

  indicator.style.transition = "top 0.3s ease";
  indicator.style.top = `${index * heightPerItem}px`;
}

function initializeIndicator() {
  const activeElement = document.querySelector(".f-content.active");
  if (activeElement) {
    setActive(activeElement); // Set the indicator's position to the active element
  }
}

// Add click event listeners to all items
function addClickListeners() {
  const items = document.querySelectorAll(".f-content");
  items.forEach((item) => {
    item.addEventListener("click", () => setActive(item));
  });
}
document.addEventListener("DOMContentLoaded", () => {
  addClickListeners();
  initializeIndicator();
});

const menubar = document.querySelector(".fa-bars");
const closeMenu = document.querySelector(".fa-xmark");
const mobileNav = document.querySelector(".mobile-overlay");
const hamburgerMenu = document.querySelector(".hamburger-menu");
hamburgerMenu.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  if (mobileNav.classList.contains("active")) {
    menubar.style.display = "none";
    closeMenu.style.display = "block";
  } else {
    menubar.style.display = "block";
    closeMenu.style.display = "none";
  }
});

const ctx = document.getElementById("myChart").getContext("2d");

let activeChart;

// Function to destroy existing chart before creating a new one

function destroyActiveChart() {
  if (activeChart) {
    activeChart.destroy();
  }
}

// Meal Chart (Bar Chart)

function renderMealChart() {
  destroyActiveChart(); //destroy previous ones
  setActiveButton(document.querySelector(".meal"));

  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],

    datasets: [
      {
        label: "Breakfast",

        data: [140, 550, 480, 510, 280, 330, 350],

        backgroundColor: "rgba(255, 205, 86, 0.6)",
      },

      {
        label: "Lunch",

        data: [500, 320, 290, 310, 610, 640, 300],

        backgroundColor: "#9E77ED",
      },

      {
        label: "Dinner",

        data: [600, 430, 620, 590, 470, 530, 540],

        backgroundColor: "#D6BBFB",
      },
    ],
  };

  activeChart = new Chart(ctx, {
    type: "bar",

    data: data,

    options: {
      responsive: true,

      maintainAspectRatio: false,

      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}

// Sleep Chart (Pie Chart)

function renderSleepChart() {
  destroyActiveChart();
  setActiveButton(document.querySelector(".sleep"));

  const data = {
    labels: ["Deep Sleep", "Light Sleep", "REM Sleep", "Awake"],

    datasets: [
      {
        label: "Sleep Distribution",

        data: [40, 30, 20, 10], // Example data in percentages

        backgroundColor: [
          "#9E77ED",

          "rgba(255, 205, 86, 0.6)",

          "rgba(201, 203, 207, 0.6)",

          "rgba(255, 99, 132, 0.6)",
        ],
      },
    ],
  };

  activeChart = new Chart(ctx, {
    type: "pie",

    data: data,

    options: {
      responsive: true,

      maintainAspectRatio: false,

      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${tooltipItem.label}: ${tooltipItem.raw}%`;
            },
          },
        },
      },
    },
  });
}

// Combination Chart (Line Chart)

function renderCombinationChart() {
  destroyActiveChart();
  setActiveButton(document.querySelector(".combination"));
  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],

    datasets: [
      {
        type: "line",

        label: "Calories Consumed",

        data: [1450, 1700, 1650, 1550, 400, 750, 1200],

        borderColor: "#9E77ED",
        // backgroundColor: "rgba(54, 162, 235, 0.2)",
        // fill: true,
        tension: 0.4,
        yAxisID: "y",
      },

      {
        type: "line",

        label: "Sleep Hours",

        data: [4, 6.5, 7.5, 5, 8, 7, 7.2],

        borderColor: "rgba(255, 205, 86, 0.6)",

        // backgroundColor: "rgba(255, 99, 132, 0.2)",

        // fill: true,

        tension: 0.4,
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Calories Consumed",
        },
      },
      y1: {
        beginAtZero: true,
        position: "right",
        title: {
          display: true,
          text: "Sleep Hours",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  activeChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: options,
  });
}

function setActiveButton(element) {
  // Remove the active class from all tags
  const buttons = document.querySelectorAll(".features-tag");
  buttons.forEach((button) => {
    button.classList.remove("active-tag");
  });

  // Add the active class to the current element
  element.classList.add("active-tag");
}

renderMealChart(); //this is for the first chart to show - the function was called so it can run.


document.addEventListener("DOMContentLoaded", () => {
  const heroElements = document.querySelectorAll(".features-container img");

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
  };

  const handleScroll = () => {
    heroElements.forEach((el) => {
      if (isInViewport(el)) {
        el.classList.add("active");
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
});

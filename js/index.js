const ctx = document.getElementById("myChart")
const data = {
  labels: ["Channel pages", "Direct or unknow", "Search", "External"],
  datasets: [
    {
      label: "Traffic Sources",
      data: [37.5, 33.6, 11.0, 6.0],
      backgroundColor: ["#6792FF", "#4473EA", "#1A52E1", "#96B3FF"],
      hoverOffset: 10,
      spacing: 10,
    },
  ],
}
const config = {
  type: "doughnut",
  data: data,
  options: {
    animation: {
      animateRotate: true,
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: "80%",
  },
}

new Chart(ctx, config)

const $dataContainer = document.querySelector(".data")
const lineSize = 500
if ($dataContainer) {
  let html = ""
  data.labels.forEach((label, index) => {
    html += `
    <p class="data-row">
    <span class="name">${label}</span
    ><span
      ><span class="line" style="width: ${
        (lineSize * data.datasets[0].data[index]) / 100
      }px; background: ${
      data.datasets[0].backgroundColor[index]
    }"></span><span class="value">${data.datasets[0].data[index]}%</span></span
    >
  </p>
  `
  })
  html += `<div style="text-align: right;"><a href="https://portfolio-larry.netlify.app/" target="_blank" class="seemore">See more</a></div>`
  $dataContainer.innerHTML = html
}

function animateValue(obj, start, end, duration) {
  let startTimestamp = null
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    const value = (progress * (end - start) + start).toFixed(1)
    obj.innerHTML = value + "%"
    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

const $value = document.querySelectorAll(".value")
$value.forEach((el, index) => {
  animateValue(el, 0, data.datasets[0].data[index], 2000)
})

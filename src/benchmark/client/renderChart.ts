import { Chart, ChartConfiguration } from "chart.js";

interface Input {
    datasets:ChartConfiguration['data']['datasets'],
    canvas: HTMLCanvasElement,
    labels: string[]
    text: string
}

function renderChart({canvas, datasets, labels, text}:Input) {
    const ctx = canvas.getContext('2d');

    if(!ctx) {
        console.log('Context is not defined')
        return
    } 

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text
              }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#333',
                font: { size: 12 }
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.raw}`;
                }
              }
            }
          }
        }
      });
}

export default renderChart
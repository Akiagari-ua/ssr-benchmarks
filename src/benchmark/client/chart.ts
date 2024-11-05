import 'chartist/dist/index.css';
import  { BarChart, Interpolation, LineChart, Svg } from 'chartist';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, BarController } from 'chart.js';

document.addEventListener("DOMContentLoaded", () => {
  const runButton = document.getElementById('runBenchmark')

if(runButton) {
  runButton.addEventListener('click', async () => {
    const result = await fetch('/api/run');
   
    const data = await parseStream(result)
    const labels = ['Min', 'Max', 'Mean', 'P50', 'P90', 'P97', 'P99'];
    const benchmarks = [data, data]
    const datasets = benchmarks.map((benchmark, index) => {
      const latencyValues = [
        benchmark.latency.min/ 1000,
        benchmark.latency.max/ 1000,
        benchmark.latency.mean/ 1000,
        benchmark.latency.p50/ 1000,
        benchmark.latency.p90/ 1000,
        benchmark.latency.p97/ 1000,
        benchmark.latency.p99/ 1000
      ];
      return {
        label: benchmark.url,
        data: latencyValues ,
        backgroundColor: `hsl(${index * 100}, 70%, 50%)`,
        borderColor: `hsl(${index * 100}, 80%, 40%)`,
        borderWidth: 1
      };
    });

    const canvas = document.getElementById('chart'); 

    if(canvas) {
      //@ts-ignore
      const ctx = canvas.getContext('2d');
      Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

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
                text: 'Latency (ms)'
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
                  return `${context.dataset.label}: ${context.raw} ms`;
                }
              }
            }
          }
        }
      });
    }

  })
}
});

async function parseStream(response:any) {
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let result = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Декодируем и добавляем текущий чанк к результату
    result += decoder.decode(value, { stream: true });
  }

  return JSON.parse(result); // Возвращает полный текстовый ответ
}


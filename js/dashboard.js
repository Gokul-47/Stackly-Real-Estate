/**
 * Dashboard - 3 charts using Chart.js
 */
(function () {
  'use strict';

  const colorBg = '#F7EFE8';
  const colorDark = '#2d2a26';
  const colorAccent = '#8b7355';
  const colorWhite = '#ffffff';

  function createTypeChart() {
    const ctx = document.getElementById('chart-type');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['House', 'Apartment', 'Villa', 'Condo'],
        datasets: [{
          data: [35, 30, 20, 15],
          backgroundColor: [colorAccent, '#a89078', '#c4ad95', '#e0d5c9'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'bottom' }
        }
      }
    });
  }

  function createSalesChart() {
    const ctx = document.getElementById('chart-sales');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Sales',
          data: [42, 55, 48, 62, 58, 71, 65, 78, 82, 75, 88, 95],
          borderColor: colorAccent,
          backgroundColor: colorAccent + '20',
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  function createPriceChart() {
    const ctx = document.getElementById('chart-price');
    if (!ctx) return;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Under $500K', '$500K–$1M', '$1M–$2M', '$2M+'],
        datasets: [{
          label: 'Listings',
          data: [120, 85, 45, 22],
          backgroundColor: colorAccent,
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  function init() {
    createTypeChart();
    createSalesChart();
    createPriceChart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// VarnaAI Dashboard - Chart Configuration
// Reference: comprehensive-compliance-reporting-gdpr-pci-dss-iso.png

// Color Palette (matches styles.css)
const colors = {
  blue: '#3b82f6',
  cyan: '#06b6d4',
  gold: '#c9a227',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  textSecondary: '#94a3b8',
  bgCard: '#0f2340',
};

// Chart.js Global Defaults
Chart.defaults.color = colors.textSecondary;
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.1)';
Chart.defaults.font.family = "'Inter', sans-serif";

// GDPR Compliance Bar Chart
const gdprCtx = document.getElementById('gdprChart');
if (gdprCtx) {
  new Chart(gdprCtx, {
    type: 'bar',
    data: {
      labels: ['Data Processing', 'Consent', 'Rights', 'Security', 'Breach'],
      datasets: [{
        label: 'Compliance %',
        data: [85, 92, 78, 95, 88],
        backgroundColor: [
          colors.blue,
          colors.blue,
          colors.cyan,
          colors.blue,
          colors.cyan,
        ],
        borderRadius: 4,
        barThickness: 24,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: colors.bgCard,
          titleColor: '#fff',
          bodyColor: colors.textSecondary,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 10,
            }
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
          },
          ticks: {
            callback: (value) => value + '%',
            font: {
              size: 10,
            }
          }
        }
      }
    }
  });
}

// Audit Trail Activity Line Chart
const activityCtx = document.getElementById('activityChart');
if (activityCtx) {
  new Chart(activityCtx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Activity',
        data: [12, 19, 15, 25, 22, 18, 28],
        borderColor: colors.cyan,
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: colors.cyan,
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 2,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: colors.bgCard,
          titleColor: '#fff',
          bodyColor: colors.textSecondary,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 8,
        }
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 10,
            }
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.05)',
          },
          ticks: {
            font: {
              size: 10,
            }
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index',
      }
    }
  });
}

// Tab Navigation
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

// Animate score on load
window.addEventListener('load', () => {
  const scoreCircle = document.querySelector('.score-fill');
  if (scoreCircle) {
    // 92% = 283 * 0.08 = ~23 offset (283 is circumference)
    scoreCircle.style.strokeDashoffset = '23';
  }
});

console.log('VarnaAI Dashboard loaded');

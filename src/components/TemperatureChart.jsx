import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TemperatureChart = ({ avgData, minData, maxData }) => {
  let labels = ""
  if(avgData && avgData.length>0){
    labels = avgData.map(data => data.date.split("T")[0]);
  }
  else if(minData && minData.length>0){
    labels = minData.map(data => data.date.split("T")[0]);
  }
  else{
    labels = maxData.map(data => data.date.split("T")[0]);
  }

  
  const avgDataset = avgData && {
    label: 'Average Temperature',
    data: avgData.map(data => data.value),
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
  };

  const minDataset = minData && {
    label: 'Minimum Temperature',
    data: minData.map(data => data.value),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
  };

  const maxDataset = maxData && {
    label: 'Maximum Temperature',
    data: maxData.map(data => data.value),
    borderColor: 'rgb(54, 162, 235)',
    backgroundColor: 'rgba(54, 162, 235, 0.2)',
  };

  const data = {
    labels,
    datasets: [avgDataset, minDataset, maxDataset].filter(Boolean),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    scales: {
      x: {
        ticks: {
          color: 'white', 
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', 
        },
      },
      y: {
        ticks: {
          color: 'white', 
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', 
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white', 
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "550px", marginTop: "20px", paddingBottom: "10px" }}>
      <h2 style={{ color: 'rgb(16, 238, 16)', marginBottom: "25px", textAlign: "center", fontSize: "28px" }}>Temperature Data</h2>
      <div style={{ position: "relative", width: "95%", height: "85%",margin:"auto" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default TemperatureChart;

import React from "react";
import { Bar } from "react-chartjs-2";

type SensorBarChartType = {
  sensor: {
    id: string;
    min: number;
    max: number;
    avg: number;
  };
};

const SensorBarChart: React.FC<SensorBarChartType> = ({ sensor }) => {
  const { id, min, max, avg } = sensor;
  // Data for the chart
  const data = {
    labels: ["Min", "Max", "Avg"], // X-axis labels for the bars
    datasets: [
      {
        label: id,
        data: [min, max, avg], // Corresponding values for min, max, avg
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)", // Color for Min (light teal)
          "rgba(255, 99, 132, 0.5)", // Color for Max (light red)
          "rgba(54, 162, 235, 0.5)", // Color for Avg (light blue)
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)", // Border color for Min
          "rgba(255, 99, 132, 1)", // Border color for Max
          "rgba(54, 162, 235, 1)", // Border color for Avg
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options for customization
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const, // Legend position
      },
      title: {
        display: true,
        text: `${id} Temperature Data`, // Title of the chart
      },
    },
    scales: {
      y: {
        beginAtZero: true, // Start Y-axis from 0
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SensorBarChart;

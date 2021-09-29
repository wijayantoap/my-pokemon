import React from "react";
import { Radar } from "react-chartjs-2";

const options = {
  scale: {
    ticks: { beginAtZero: true },
  },
};

const RadarChart = ({ data }) => {
  const dataConfig = {
    labels: ["HP", "Att", "Def", "S.Att", "S.Def", "Spd"],
    datasets: [
      {
        label: "Status",
        data,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  if (!data || data.length === 0) return null;

  return <Radar data={dataConfig} options={options} />;
};

export default RadarChart;

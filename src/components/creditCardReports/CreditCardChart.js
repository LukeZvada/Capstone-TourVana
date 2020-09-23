import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "./creditCardReport.css"

export const CreditCardChart = () => {
  const [chartData, setChartData] = useState({});


  const chart = () => {

        setChartData({
            labels: [
                'Travel',
                'Groceries',
                'Entertainment'
            ],
            datasets: [{
                data: [300, 50, 100],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
            }]
        });
      };
  

  useEffect(() => {
    chart();
  }, []);

  return (
    <div className="CCChart">
      <h1 className="chartTitle">Expense Breakdown</h1>
      <div>
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            title: { text: "Breakdown", display: false },

          }}
        />
      </div>
    </div>
  );
};


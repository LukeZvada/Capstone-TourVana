import React, { useState, useEffect, useContext } from "react";
import { CreditCardReportContext } from './CreditCardProvider'
import { Doughnut } from "react-chartjs-2";
import "./creditCardReport.css"

export const CreditCardChart = () => {
    const [chartData, setChartData] = useState({});
    const { getUserPurchases, userPurchases } = useContext(CreditCardReportContext)
    const currentUserId = parseInt(localStorage.getItem("tourVana_username"))


    useEffect(() => {
        getUserPurchases(currentUserId)
    }, [])
    
    useEffect(() => {
        chart();
    }, [userPurchases])
    

    const chart = () => {
        console.log(userPurchases)
        let totalTravel = 0
        let totalGroceries = 0
        let totalEntertainment = 0
        // loop through purchases and add up the prices into the correct category
        userPurchases.map((purchase) => {
            if (purchase.category == "travel") {
                totalTravel += parseFloat(purchase.price)
            } else if (purchase.category == "groceries") {
                totalGroceries += parseFloat(purchase.price)
            } else if (purchase.category == "entertainment") {
                totalEntertainment += parseFloat(purchase.price)
            }
        })



        setChartData({
            labels: [
                'Travel',
                'Groceries',
                'Entertainment'
            ],
            datasets: [{
                data: [totalTravel.toFixed(2), totalGroceries.toFixed(2), totalEntertainment.toFixed(2)],
                backgroundColor: [
                '#EB5757',
                '#36A2EB',
                '#FFCE56'
                ],
                hoverBackgroundColor: [
                '#EB5757',
                '#36A2EB',
                '#FFCE56'
                ],
            }]
        });
    };

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


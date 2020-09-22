import React, { useContext, useEffect, useState } from "react"
import { doughnut } from "react-chartjs-2";


export const ExpenseChart = (props) => { 

    let expenseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["groceries", "travel", "dining"],
            datasets: [
                {
                    label: "Points",
                    backgroundColor: ["#f1c40f", "#e67e22", "#16a085"],
                    data: [10, 20, 30]
                }
            ]
        }
    });
}
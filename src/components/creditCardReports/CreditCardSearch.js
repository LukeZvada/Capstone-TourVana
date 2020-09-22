import React, { useContext } from "react"
import { CreditCardReportContext } from './CreditCardProvider'

export const ExpenseSearch = () => {
    const { setExpenseTerms } = useContext(CreditCardReportContext)

    return (
        <>
            <input type="text" className="expenseSearch"
                onChange={
                    (changeEvent) => {
                        setExpenseTerms(changeEvent.target.value)
                    }
                }
                placeholder="Search" />
        </>
    )
}
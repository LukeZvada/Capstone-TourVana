import React, { useContext } from "react"
import { CreditCardReportContext } from './CreditCardProvider'

export const ExpenseSearch = () => {
    const { setExpenseTerms } = useContext(CreditCardReportContext)

    return (
        <>
            <article className="expenseSearch">
                <input type="text"
                    onChange={
                        (changeEvent) => {
                            setExpenseTerms(changeEvent.target.value)
                        }
                    }
                    placeholder="Search" />
            </article>
        </>
    )
}
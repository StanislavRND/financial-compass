import { skipToken } from '@reduxjs/toolkit/query'
import { useGetExpensesQuery } from '../../../shared/api/expenses'
import { useGetIncomeQuery } from '../../../shared/api/income'

type Params = {
  type: 'expense' | 'income'
  userId: number
  familyId: number | null
  filter: string
  date: string
}

export function useTransactionsQuery(args: Params | typeof skipToken) {
  const queryArgs = args === skipToken ? skipToken : args

  const expensesQuery = useGetExpensesQuery(
    args !== skipToken && args.type === 'expense' ? queryArgs : skipToken,
  )
  const incomesQuery = useGetIncomeQuery(
    args !== skipToken && args.type === 'income' ? queryArgs : skipToken,
  )

  return {
    data:
      args !== skipToken
        ? args.type === 'expense'
          ? expensesQuery.data
          : incomesQuery.data
        : undefined,
    isLoading:
      args !== skipToken
        ? args.type === 'expense'
          ? expensesQuery.isLoading
          : incomesQuery.isLoading
        : false,
  }
}

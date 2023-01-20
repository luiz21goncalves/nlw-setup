import { useQuery } from '@tanstack/react-query'

import { api } from '../lib/axios'

type Day = {
  id: string
  date: string
  completed: number
  amount: number
}

type Summary = Day[]

const getSummary = async () => {
  const response = await api.get<{ summary: Summary }>('/summary')
  return response.data.summary
}

export const useSummaryQuery = () => {
  return useQuery({ queryFn: getSummary, queryKey: ['summary'] })
}

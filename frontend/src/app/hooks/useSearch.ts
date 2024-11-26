"use client"
import { useQuery } from '@tanstack/react-query'
import axios from '../axios-instance'
import { Movie } from './useMovies'


export const useSearch = ({ query, filters }) => {
    return useQuery<Movie[]>({
        queryKey: ['search', query, filters],
        queryFn: async () => {
            const { data } = await axios.get(`/search?query=${query}&year=${filters.year}&yearComparison=${filters.yearComparison}&runtime=${filters.runtime}&runtimeComparison=${filters.runtimeComparison}&type=${filters.type}`)
            return data
        }
    })
}
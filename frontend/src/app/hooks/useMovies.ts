"use client"
import { useQuery } from '@tanstack/react-query'
import axios from '../axios-instance'

export interface Movie {
    id: number
    title: string
    overview: string;
    popularity: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    status: string;
    type: string;
    vote_average: string
    genres: string[]
    production_companies: string[]
}

export const useMovies = () => {
    return useQuery<Movie[]>({
        queryKey: ['movies'],
        queryFn: async () => {
            const { data } = await axios.get('/movies')
            return data
        }
    })
}
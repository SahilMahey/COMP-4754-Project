import { useMutation, useQuery } from "@tanstack/react-query";
import axios from '../axios-instance';

interface BookmarkData {
    userId: number;
    movieId: number;
}

export function useCreateBookmark() {
    return useMutation<any, Error, BookmarkData>({
        mutationFn: async (data) => await axios.post('/bookmarks/add', data),
        onError: (error) => {
            console.error('Bookmark failed:', error);
        },
    });
}

export function useBookmarks(userId) {
    return useQuery({
        queryKey: ['bookmarks'],
        queryFn: async () => {
            const response = await axios.get(`/bookmarks/${userId}/records`);
            return response.data.data;
        },
    });
}
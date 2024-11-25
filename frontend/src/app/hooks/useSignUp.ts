"use client"
import { useMutation } from '@tanstack/react-query';
import axios from '../axios-instance';

interface SignUpData {
    name: string;
    email: string;
    password: string;
}

interface User {
    id: string;
    email: string;
}

export function useSignUp() {
    return useMutation<User, Error, SignUpData>({
        mutationFn: async (data) => await axios.post('/users/signup', data),
        onSuccess: (data) => {
            console.log('User signed up:', data);
        },
        onError: (error) => {
            console.error('Signup failed:', error);
        },
    });
}
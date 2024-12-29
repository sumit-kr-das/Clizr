import { apiSlice } from '@/app/api/apiSlice';

export const registerApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        userRegister: builder.mutation({
            query: credentials => ({
                url: '/v1/auth/register',
                method: 'POST',
                body: { ...credentials },
            }),
        }),
    }),
});

export const { useUserRegisterMutation } = registerApiSlice;

import { logout, setCredentials } from '@/features/authentication/authSlice';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

interface RefreshResponse {
    access_token: string;
    refresh_token: string;
}

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.access_token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithReauth = async (args: any, api: any, extraOptions: any) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        // Get the refresh token from the state
        const refreshToken = (api.getState() as RootState).auth.refresh_token;

        if (!refreshToken) {
            api.dispatch(logout());
            return result;
        }

        // Send refresh token to get a new access token
        const refreshResult = await baseQuery(
            {
                url: '/v1/auth/refresh',
                method: 'POST',
                body: { refresh_token: refreshToken },
            },
            api,
            extraOptions
        );

        if (refreshResult?.data) {
            const { access_token, refresh_token } =
                refreshResult.data as RefreshResponse;

            const user = api.getState().auth;
            // Store the new tokens in Redux
            api.dispatch(
                setCredentials({ ...user, access_token, refresh_token })
            );

            // Retry the original query with the new access token
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logout());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    tagTypes: [],
    endpoints: () => ({}),
});

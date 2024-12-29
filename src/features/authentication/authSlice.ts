import { RootState } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const storedAuth = localStorage.getItem('auth');
const isExist = storedAuth ? JSON.parse(storedAuth) : null;

type TInitialState = {
    email_verified: boolean | null;
    phone_verified: boolean | null;
    role: string | null;
    access_token: string | null;
    refresh_token: string | null;
};

const initialState: TInitialState = {
    email_verified: isExist ? isExist.email_verified : null,
    phone_verified: isExist ? isExist.phone_verified : null,
    role: isExist ? isExist.role : null,
    access_token: isExist ? isExist.access_token : null,
    refresh_token: isExist ? isExist.refresh_token : null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state: TInitialState,
            action: PayloadAction<TInitialState>
        ) => {
            const {
                email_verified,
                phone_verified,
                role,
                access_token,
                refresh_token,
            } = action.payload;
            state.email_verified = email_verified;
            state.phone_verified = phone_verified;
            state.role = role;
            state.access_token = access_token;
            state.refresh_token = refresh_token;

            localStorage.setItem(
                'auth',
                JSON.stringify({
                    email_verified,
                    phone_verified,
                    role,
                    access_token,
                    refresh_token,
                })
            );
        },
        updateCredentials: (
            state: TInitialState,
            action: PayloadAction<Partial<TInitialState>>
        ) => {
            const updatedState = {
                ...state,
                ...action.payload,
            };

            state.email_verified = updatedState.email_verified;
            state.phone_verified = updatedState.phone_verified;
            state.role = updatedState.role;
            state.access_token = updatedState.access_token;
            state.refresh_token = updatedState.refresh_token;

            localStorage.setItem('auth', JSON.stringify(updatedState));
        },
        logout: (state: TInitialState) => {
            state.email_verified = null;
            state.phone_verified = null;
            state.role = null;
            state.access_token = null;
            state.refresh_token = null;

            localStorage.removeItem('auth');
        },
    },
});

export const { setCredentials, updateCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuthData = (state: RootState) => state.auth;

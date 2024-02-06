import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',  //'checking' //not-authenticated //authenticated
        user: {},
        errorMessage: undefined,
        roles: [],
        leaders: []
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },

        onLogin: (state, { payload }) => {
            state.status = 'authenticated',
                state.user = payload,
                state.errorMessage = undefined
        },

        onLogout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = undefined
        },
        onLoadLeaders: (state, { payload = [] }) => {
            payload.forEach(leader => {
                const exist = state.leaders.some(dbLeader => dbLeader.id === leader.id);
                if (!exist) {
                    state.leaders.push(leader)
                }
            });
        },
        onLoadRoles: (state, { payload = [] }) => {
            payload.forEach(role => {
                const exist = state.roles.some(dbRoles => dbRoles.id === role.id);
                if (!exist) {
                    state.roles.push(role)
                }
            });
        }

    },
})

export const { onChecking, onLogin, onLogout, clearErrorMessage, onLoadLeaders, onLoadRoles } = authSlice.actions

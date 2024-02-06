import { configureStore } from '@reduxjs/toolkit'
import { authSlice, timeSlice, uiSlice, leaderSlice, kudosSlice, projectSlice } from './'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        time: timeSlice.reducer,
        leader: leaderSlice.reducer,
        kudos: kudosSlice.reducer,
        project: projectSlice.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
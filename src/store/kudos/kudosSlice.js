
import { createSlice } from '@reduxjs/toolkit';

export const kudosSlice = createSlice({
    name: 'kudos',
    initialState: {
        kudos: [],
        kudosByEmail: [],
    },
    reducers: {
        onGetKudoByEmail: (state, { payload = [] }) => {
            payload.forEach(kudoRegister => {
                const exist = state.kudosByEmail.some(dbKudoRegister => dbKudoRegister.id === kudoRegister.id);
                if (!exist) {
                    state.kudosByEmail.push(kudoRegister)
                }
            });
        },
        onAddNewKudo: (state, { payload }) => {
            state.kudos.push(payload);
        },
    }
});


// Action creators are generated for each case reducer function
export const { onGetKudoByEmail, onAddNewKudo } = kudosSlice.actions;

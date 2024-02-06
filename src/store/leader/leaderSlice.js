
import { createSlice } from '@reduxjs/toolkit';

export const leaderSlice = createSlice({
    name: 'leader',
    initialState: {
        employes: [],
        timeEmployes: [],
        totalOvertimeHours: 0,
        totalNormalHours: 0
    },
    reducers: {
        onLoadEmployes: (state, { payload = [] }) => {
            payload.forEach(employe => {
                const exist = state.employes.some(dbEmploye => dbEmploye.id === employe.id);
                if (!exist) {
                    state.employes.push(employe)
                }
            });
        },
        onLoadTimesEmployes: (state, { payload = [] }) => {
            payload.forEach(timeEmploye => {
                const exist = state.timeEmployes.some(dbTimeRegister => dbTimeRegister.id === timeEmploye.id);
                if (!exist) {
                    state.timeEmployes.push(timeEmploye)
                }
            });
        },
        onCalculateTotalOvertimeHours: (state) => {
            state.totalOvertimeHours = state.timeEmployes.reduce((accumulator, currentValue) => {
                if (currentValue.isOvertime && currentValue.stateId === 2) {
                    return accumulator + parseInt(currentValue.hoursDiary, 10);
                }
                return accumulator;
            }, 0)
        },
        onCalculateTotalNormalHours: (state) => {
            state.totalNormalHours = state.timeEmployes.reduce((accumulator, currentValue) => {
                if (!currentValue.isOvertime && currentValue.stateId === 2) {
                    return accumulator + parseInt(currentValue.hoursDiary, 10);
                }
                return accumulator;
            }, 0)
        },
        onClearTimesEmployes: (state) => {
            state.timeEmployes = []
        }

    }
});


// Action creators are generated for each case reducer function
export const { onLoadEmployes, onLoadTimesEmployes, onCalculateTotalOvertimeHours, onCalculateTotalNormalHours, onClearTimesEmployes } = leaderSlice.actions;

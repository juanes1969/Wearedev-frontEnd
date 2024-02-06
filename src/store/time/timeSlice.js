
import { createSlice } from '@reduxjs/toolkit';

export const timeSlice = createSlice({
    name: 'time',
    initialState: {
        isLoadingEvents: true,
        activeEvent: null,
        events: [
            // myEventsList
        ],
        projects: [

        ],
        clients: [

        ]
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload
        },

        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
        },
        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload;
                }

                return event;
            });
            state.activeEvent = null;
        },        
        onLoadEvents: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event)
                }
            })
        },
        onLoadClients: (state, { payload = [] }) => {
            state.isLoadingEvents = false,
                payload.forEach(client => {
                    const exist = state.clients.some(dbClient => dbClient.id === client.id);
                    if (!exist) {
                        state.clients.push(client)
                    }
                });
        },
        onLoadProjects: (state, { payload = [] }) => {
            state.isLoadingEvents = false,

                payload.forEach(project => {
                    const exist = state.projects.some(dbProject => dbProject.proyectId === project.proyectId);

                    if (!exist) {
                        state.projects.push(project);
                    }
                });
        },
        onCleanRegisters: (state) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null
            state.clients = []
            state.projects = []
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onLoadEvents, onLoadClients, onLoadProjects, onCleanRegisters } = timeSlice.actions;

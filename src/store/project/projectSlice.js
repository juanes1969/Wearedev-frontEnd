import { createSlice } from '@reduxjs/toolkit'

export const projectSlice = createSlice({
    name: 'project',
    initialState: {
        projectsAvalible: [

        ],
        allProjecstAssined: [

        ],
        projectAssignedByUser: [

        ],
        projects: [

        ]
    },
    reducers: {
        onAddNewProject: (state, { payload }) => {
            state.projects.push(payload);
        },
        onLoadProjectsAvalible: (state, { payload = [] }) => {
            payload.forEach(project => {
                const exist = state.projectsAvalible.some(dbProject => dbProject.proyectId === project.proyectId);
                if (!exist) {
                    state.projectsAvalible.push(project)
                }
            });
        },
        onLoadAllProjecstAssined: (state, { payload = [] }) => {
            payload.forEach(project => {
                const exist = state.allProjecstAssined.some(dbProject => dbProject.id === project.id);
                if (!exist) {
                    state.allProjecstAssined.push(project)
                }
            });
        },
        onLoadProjecstAssinedByUser: (state, { payload = [] }) => {
            payload.forEach(project => {
                const exist = state.projectAssignedByUser.some(dbProject => dbProject.proyectId === project.proyectId);
                if (!exist) {
                    state.projectAssignedByUser.push(project)
                }
            });
        },
    },
})

export const { onAddNewProject, onLoadProjectsAvalible, onLoadAllProjecstAssined, onLoadProjecstAssinedByUser } = projectSlice.actions

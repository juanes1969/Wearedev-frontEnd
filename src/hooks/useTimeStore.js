import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import configApi from '../api/configApi';
import { onAddNewEvent, onLoadClients, onLoadEvents, onLoadProjects, onSetActiveEvent, onUpdateEvent } from '../store/time/timeSlice';

export const useTimeStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.time);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSaving = async (userId, calendarEvent) => {

        try {

            if (Array.isArray(calendarEvent) && calendarEvent.length > 0) {
                for (const eventCalendar of calendarEvent) {
                    await configApi.post('/time/register', {
                        userId: userId,
                        clientId: eventCalendar.clientId,
                        proyectId: eventCalendar.proyectId,
                        data: eventCalendar.data,
                        stateId: eventCalendar.stateId
                    });

                    dispatch(onAddNewEvent({ ...eventCalendar, userId: user.id }));

                    Swal.fire('Tiempo registrado correctamente', 'Su tiempo ha sido registrado correctamente, queda en estado pendiente de aprobación', 'success')
                        .then(x => x.isDismissed(
                            window.location.reload()
                        ));
                }

            }
        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.message, 'error');
        }

    }


    const startEditing = async (userId, calendarEvent) => {

        try {

            if (Array.isArray(calendarEvent) && calendarEvent.length > 0) {
                for (const eventCalendar of calendarEvent) {
                    await configApi.put('/time/update', {
                        userId: userId,
                        clientId: eventCalendar.clientId,
                        proyectId: eventCalendar.proyectId,
                        data: eventCalendar.data,
                        stateId: eventCalendar.stateId
                    });

                    dispatch(onUpdateEvent({ ...eventCalendar, userId: user.id }));

                    Swal.fire('Tiempos actualizados correctamente', 'Sus tiempos han sido actualizados correctamente, queda en estado pendiente de aprobación', 'success')
                        .then(x => x.isDismissed(
                            window.location.reload()
                        ));
                }

            }
        } catch (error) {

            Swal.fire('Error al Actualizar', error.response.data.message, 'error');
        }

    }

    const startDeletingEvent = async () => {

        try {
            await configApi.delete(`/time/delete/${activeEvent.id}`)
            dispatch(onDeleteEvent());
            Swal.fire('Tiempo eliminado de manera exitosa', 'Su tiempo ah sido eliminado correctamente', 'success').then(x =>
                x.isDismissed(
                    window.location.reload()
                )
            )
            return;
        } catch (error) {
            console.log(error)
            Swal.fire('Error al Eliminar', error.response.data.message, 'error');
        }
    }

    const startLoadingsEvents = async () => {
        try {
            const { data } = await configApi.get(`/time/getId/${user.id}`);

            // const events = convertEventsToDate(data.data)
            dispatch(onLoadEvents(data.data));

        } catch (error) {
            Swal.fire('No hay tiempos registrados', 'Aun no hay tiempos registrados', 'info');
        }
    }

    const startLoadingProjects = async () => {
        try {
            const { data } = await configApi.get('/project/listProject');
            const projects = data.data;
            dispatch(onLoadProjects(projects));
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingClients = async () => {
        try {
            const { data } = await configApi.get('/client/listClient');
            const clients = data.data.rows;
            dispatch(onLoadClients(clients));
        } catch (error) {
            console.log(error);
        }
    }


    return {

        //* Propiedades 
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        //* Metodos
        setActiveEvent,
        startSaving,
        startEditing,
        startLoadingsEvents,
        startDeletingEvent,
        startLoadingProjects,
        startLoadingClients
    }
}

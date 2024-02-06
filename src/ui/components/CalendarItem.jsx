import { useEffect, useState } from 'react';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../helpers';
import { getMessagesES } from '../../helpers/getMessages';
import { useLeaderStore, useModal, useTimeStore, useUiStore } from '../../hooks';
import { CalendarEvent } from './CalendarEvent';
import { addHours } from 'date-fns';
import moment from 'moment';
import { ModalViewTimesRegisters } from '../../home/components/ModalViewTimesRegisters';

export const CalendarItem = ({ onChangeApprovalTimeByid, ids }) => {


    const { timeEmployes } = useLeaderStore();
    const { setActiveEvent, activeEvent } = useTimeStore();

    // const propiedadesArray = timeEmployes.map((obj) => obj.time_registers);
    const [isOpenModalTimes, openModalTimes, closeModalTimes] = useModal();

    // const { openDateModal, closeDateModal} = useUiStore();

    const dataTransformed = timeEmployes.map((e) => ({
        id: e.id,
        title: e.description,
        start: new Date(e.date),
        end: new Date(moment(e.date).add(e.hoursDiary, 'hours')),
        hoursDiary: e.hoursDiary,
        clientId: e.clientId,
        proyectId: e.proyectId,
        isOvertime: e.isOvertime,
        stateId: e.stateId,
        userId: e.userId
    }))

    const eventStartGetter = (event, start, end, isSelected) => {

        const statusCreated = (event.stateId === 1);
        const statusAprobed = (event.stateId === 2);
        const statusReject = (event.stateId === 3);

        const style = {
            backgroundColor: statusCreated ? '#347CF7' : statusAprobed ? 'limegreen' : statusReject ? '#ff0000' : '#347CF7',
            borderRadius: '0px',
            opacity: '0.8',
            color: 'white'
        }

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        console.log('estoy funcionando', event);
        openModalTimes();
    }

    const onSelected = (event) => {
        setActiveEvent(event);
    }


    return (
        <>
            <Calendar
                culture='es'
                localizer={localizer}
                events={dataTransformed}
                startAccessor="start"
                endAccessor="end"
                views={['month']}
                style={{ height: 600, width: 700 }}
                messages={getMessagesES()}
                eventPropGetter={eventStartGetter}
                components={{
                    event: (preps) => <CalendarEvent {...preps} onChangeApprovalTimeByid={onChangeApprovalTimeByid} ids={ids} />
                    // event: CalendarEvent
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelected}
            />

            <ModalViewTimesRegisters
                isOpenModalTimes={isOpenModalTimes}
                closeModalTimes={closeModalTimes}
                activeEvent={activeEvent}
                setActiveEvent={setActiveEvent}
            />
        </>
    )
}

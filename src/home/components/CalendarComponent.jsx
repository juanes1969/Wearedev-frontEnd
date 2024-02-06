import moment from 'moment';
import 'moment/locale/es';
import React, { useEffect, useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTimeStore } from '../../hooks';
import './styles/AppCalendar.css';
import { useSelector } from 'react-redux';
import { AccordionComponent } from './AccordionComponent';

export const CalendarComponent = () => {


    const { startLoadingClients, startLoadingProjects, startLoadingsEvents, startSaving } = useTimeStore();

    const { user } = useSelector(state => state.auth);
    const { projects, clients, events } = useSelector(state => state.time);


    moment.updateLocale('es', {
        weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    });

    moment.locale('es');

    const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    const [currentWeek, setCurrentWeek] = useState(0);

    const [weeksData, setWeeksData] = useState([
        {
            rows: [
                {
                    clientId: '',
                    proyectId: '',
                    data: Array.from({ length: daysOfWeek.length }, (_, dayIndex) => ({
                        date: '',
                        hoursDiary: 0,
                        isOvertime: false,
                        description: '' // Descripción para cada día
                    })),
                    total: 0,
                    stateId: ''
                }
                // Agregar más filas si es necesario
            ]
        }
    ]);

    const currentWeekData = weeksData[currentWeek];

    const [clickedSave, setClickedSave] = useState(false);

    const [statusToSend, setStatusToSend] = useState(0);

    const data = {

        clientes: clients,
        proyectos: projects,
        // clientes: [
        //     { id: 1, nombre: 'Cliente A' },
        //     { id: 2, nombre: 'Cliente B' },
        //     { id: 3, nombre: 'Cliente C' }
        // ],
        // proyectos: [
        //     { id: 1, nombre: 'Proyecto 1', cliente_id: 1 },
        //     { id: 2, nombre: 'Proyecto 2', cliente_id: 2 },
        //     { id: 3, nombre: 'Proyecto 3', cliente_id: 1 },
        //     { id: 4, nombre: 'Proyecto 4', cliente_id: 3 }
        // ],
        rows: [
            {
                clientId: '',
                proyectId: '',
                data: Array.from({ length: daysOfWeek.length }, (_, dayIndex) => ({
                    date: '',
                    hoursDiary: 0,
                    isOvertime: false,
                    description: '' // Descripción para cada día
                })),
                total: 0,
                stateId: ''
            }
            // Agregar más filas si es necesario
        ]
    };

    const [selectedProjects, setSelectedProjects] = useState(Array.from({ length: daysOfWeek.length }, () => ''));
    const [selectedClients, setSelectedClients] = useState(Array.from({ length: daysOfWeek.length }, () => ''));

    const [hasPendingChanges, setHasPendingChanges] = useState(false);

    const handleProyectoChange = (proyectoId, rowIndex) => {
        const proyecto = data.proyectos.find(proyecto => proyecto.proyectId === parseInt(proyectoId));
        const cliente = data.clientes.find(cliente => cliente.id === proyecto.clientId);

        setWeeksData(prevWeeksData => {
            const newRows = [...currentWeekData.rows];
            newRows[rowIndex] = {
                ...newRows[rowIndex],
                clientId: cliente.id,  // Guarda el ID del cliente
                proyectId: proyecto.proyectId, // Guarda el ID del proyecto
            };

            const newWeeksData = [...prevWeeksData];
            newWeeksData[currentWeek].rows = newRows;

            return newWeeksData;
        });

        setSelectedProjects(prevSelectedProjects => {
            const newSelectedProjects = [...prevSelectedProjects];
            newSelectedProjects[rowIndex] = proyecto.id; // Guarda el ID del proyecto
            return newSelectedProjects;
        });

        setSelectedClients(prevSelectedClients => {
            const newSelectedClients = [...prevSelectedClients];
            newSelectedClients[rowIndex] = cliente.id; // Guarda el ID del cliente
            return newSelectedClients;
        });
    };

    const handleAddRow = () => {
        setSelectedProjects(prevSelectedProjects => [...prevSelectedProjects, '']);
        setSelectedClients(prevSelectedClients => [...prevSelectedClients, '']);

        setWeeksData(prevWeeksData => {
            const lastWeekData = prevWeeksData[currentWeek];
            const newRow = {
                clientId: '',
                proyectId: '',
                data: Array.from({ length: daysOfWeek.length }, (_, dayIndex) => ({
                    date: '',
                    hoursDiary: 0,
                    isOvertime: false,
                    description: '' // Descripción para cada día
                })),
                total: 0,
                stateId: ''
            };

            const newRows = [...lastWeekData.rows, newRow];

            const newWeeksData = [
                ...prevWeeksData.slice(0, currentWeek),
                {
                    ...lastWeekData,
                    rows: newRows
                },
                ...prevWeeksData.slice(currentWeek + 1)
            ];

            setClickedSave(false);

            return newWeeksData;
        });
    };

    const checkRowCompletion = (rowIndex) => {
        const row = currentWeekData.rows[rowIndex];
        const isRowComplete = row.data.some(day => day.hoursDiary > 0);

        if (isRowComplete) {
            row.stateId = statusToSend === 1 ? 1 : 'Pendiente de Aprobación';
        } else {
            row.stateId = '';
        }
    }

    const handleHourChange = (rowIndex, dayIndex, value) => {
        setWeeksData(prevWeeksData => {
            const newRows = [...currentWeekData.rows];
            newRows[rowIndex].data[dayIndex].hoursDiary = parseInt(value);
            newRows[rowIndex].data[dayIndex].date = weekDates[dayIndex].date.toISOString(); // Almacena la fecha correspondiente
            newRows[rowIndex].total = newRows[rowIndex].data.reduce((total, day) => total + day.hoursDiary, 0);


            // Verificar si la fila tiene horas registradas para mostrar el estado
            const shouldShowState = newRows[rowIndex].data.some(day => day.hoursDiary > 0);

            const updatedData = prevWeeksData.map((week, index) => {
                if (index === currentWeek) {
                    return {
                        ...week,
                        rows: newRows,
                    };
                }
                return week;
            });

            updatedData[currentWeek].rows[rowIndex].stateId = shouldShowState ? 'Pendiente de Aprobación' : '';

            const hasChanges = updatedData[currentWeek].rows.some(row => row.stateId === 'Pendiente de Aprobación');

            // Verificar si hay cambios pendientes
            setHasPendingChanges(hasChanges);
            setStatusToSend(hasChanges ? 1 : 0);

            return updatedData;
        });
    };

    const handleDescriptionChange = (rowIndex, value) => {
        setWeeksData((prevWeeksData) => {
            const newRows = [...prevWeeksData[currentWeek].rows];

            newRows[rowIndex].data = newRows[rowIndex].data.map((day) => {
                // Verificar si day es válido antes de modificarlo
                if (day && day.hoursDiary > 0) {
                    return {
                        ...day,
                        description: value,
                    };
                }
                return day;
            });

            const updatedData = prevWeeksData.map((week, index) => {
                if (index === currentWeek) {
                    return {
                        ...week,
                        rows: newRows,
                    };
                }
                return week;
            });

            return updatedData;
        });
    };


    const handleisOvertimeChange = (rowIndex, checked) => {

        setWeeksData((prevWeeksData) => {
            const newRows = [...prevWeeksData[currentWeek].rows];
            newRows[rowIndex].data.forEach((day) => {
                if (day.hoursDiary > 0) {
                    day.isOvertime = !checked;
                }
            });

            return prevWeeksData.map((week, index) => {
                if (index === currentWeek) {
                    return {
                        ...week,
                        rows: newRows,
                    };
                }
                return week;
            });
        });
    };


    const getColumnTotal = columnIndex => {
        return currentWeekData.rows.reduce((total, row) => {
            // Sumar solo si la fila tiene horas registradas para el día específico
            if (row.data[columnIndex].hoursDiary > 0) {
                return total + row.data[columnIndex].hoursDiary;
            }
            return total;
        }, 0);
    };

    const getRowTotal = rowIndex => {
        return currentWeekData.rows[rowIndex].data.reduce((total, day) => {
            // Sumar solo si el día tiene horas registradas
            return total + (day.hoursDiary > 0 ? day.hoursDiary : 0);
        }, 0);
    };

    const getWeeklyTotal = () => {
        return currentWeekData.rows.reduce((total, row) => {
            // Sumar las horas semanales de cada fila
            return total + row.total;
        }, 0);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setClickedSave(true);

        const hasPendingChanges = currentWeekData.rows.some((row) =>
            row.data.some((day) => day.hoursDiary > 0)
        );
        // console.log({ hasPendingChanges })

        // Actualizar el estado de statusToSend
        if (hasPendingChanges) {
            setStatusToSend(1);
        }

        const submittedData = {
            weeksData: weeksData.map((week) => ({
                ...week,
                rows: week.rows
                    .filter((row) => row.data.some((day) => day.hoursDiary > 0))
                    .map((row) => ({
                        ...row,
                        data: row.data.filter((day) => day.hoursDiary > 0),  // Filtrar solo los días con horas registradas
                        stateId: row.data.some((day) => day.hoursDiary > 0) ? statusToSend : 0,
                    })),
            })),


            // statusToSend: statusToSend,
            // showSave: false,
            // showState: true,
            // hasPendingChanges: false,
        };


        const { rows } = submittedData.weeksData[0];

        startSaving(user.id, rows);

        console.log(rows);

    };

    const handlePrevWeek = () => {
        const prevWeek = currentWeek - 1;
        if (prevWeek >= 0) {
            setCurrentWeek(prevWeek);

            // Verificar si hay datos para la semana anterior en weeksData
            if (!weeksData[prevWeek]) {
                // Si no hay datos, inicializarlos para la semana anterior
                const initialData = {
                    rows: [
                        {
                            clientId: '',
                            proyectId: '',
                            data: Array.from({ length: daysOfWeek.length }, (_, dayIndex) => ({
                                date: '',
                                hoursDiary: 0,
                                isOvertime: false,
                                description: '' // Descripción para cada día
                            })),
                            total: 0,
                            stateId: ''
                        }
                        // Agregar más filas si es necesario
                    ]
                };

                // Actualizar weeksData con los datos iniciales para la semana anterior
                setWeeksData(prevWeeksData => {
                    const newWeeksData = [...prevWeeksData];
                    newWeeksData[prevWeek] = initialData;
                    return newWeeksData;
                });
            }
        }
    };

    const handleNextWeek = () => {
        const nextWeek = currentWeek + 1;
        if (nextWeek < daysOfWeek.length) {
            setCurrentWeek(nextWeek);

            // Verificar si hay datos para la próxima semana en weeksData
            if (!weeksData[nextWeek]) {
                // Si no hay datos, inicializarlos para la próxima semana
                const initialData = {
                    rows: [
                        {
                            clientId: '',
                            proyectId: '',
                            data: Array.from({ length: daysOfWeek.length }, (_, dayIndex) => ({
                                date: '',
                                hoursDiary: 0,
                                isOvertime: false,
                                description: '' // Descripción para cada día
                            })),
                            total: 0,
                            stateId: ''
                        }
                        // Agregar más filas si es necesario
                    ]
                };

                // Actualizar weeksData con los datos iniciales para la próxima semana
                setWeeksData(prevWeeksData => {
                    const newWeeksData = [...prevWeeksData];
                    newWeeksData[nextWeek] = initialData;
                    return newWeeksData;
                });
            }
        }
    };


    useEffect(() => {
        if (clickedSave) {
            currentWeekData.rows.forEach((_, rowIndex) => {
                checkRowCompletion(rowIndex);
            });
        }
    }, [clickedSave]);

    useEffect(() => {
        // Check if data for the current week exists, if not, initialize it
        if (!weeksData[currentWeek]) {
            const newWeeksData = [...weeksData];
            newWeeksData[currentWeek] = {
                clientId: '',
                proyectId: '',
                data: Array.from({ length: daysOfWeek.length }, (_, dayIndex) => ({
                    date: '',
                    hoursDiary: 0,
                    isOvertime: false,
                    description: '' // Descripción para cada día
                })),
                total: 0,
                stateId: ''
            };
            setWeeksData(newWeeksData);
        }
    }, [currentWeek, weeksData, daysOfWeek.length]);

    useEffect(() => {
        startLoadingClients();
        startLoadingProjects();
        startLoadingsEvents();
    }, [])


    const startDate = moment().startOf('isoWeek').add(currentWeek, 'weeks');
    const weekDates = Array.from({ length: 7 }, (_, dayIndex) => ({
        date: startDate.clone().add(dayIndex, 'days'),
        day: startDate.clone().add(dayIndex, 'days').format('dddd'),
        number: startDate.clone().add(dayIndex, 'days').format('DD'),
        month: startDate.clone().add(dayIndex, 'days').format('MMMM')
    }));


    // const groupedEvents = {};

    // events.forEach(event => {
    //     const key = `${event.clientId}-${event.proyectId}`;
    //     if (!groupedEvents[key]) {
    //         groupedEvents[key] = [event];
    //     } else {
    //         groupedEvents[key].push(event);
    //     }
    // });

    return (
        <>
            <div className="excel-table">
                <button className='btn btn-outline-success' onClick={handleAddRow}>Agregar nueva fila</button>

                {hasPendingChanges && (
                    <button className='btn btn-outline-primary' onClick={handleSubmit}>Guardar registros</button>
                )}
                <br />
                <br />
                <table className='text-aling-center'>
                    <thead>
                        <tr>
                            <th><button className='btn btn-primary' onClick={handlePrevWeek}>⇤</button></th>
                            <th>Cliente</th>
                            <th>Proyecto</th>
                            {weekDates.map((weekDay, dayIndex) => (
                                <React.Fragment key={dayIndex}>
                                    <th>
                                        <span><b>{weekDay.month}</b></span>
                                        <br />
                                        {`${weekDay.day} ${weekDay.number}`}
                                    </th>
                                </React.Fragment>
                            ))}
                            <th>
                                <span>Horas</span>
                                <br />
                                extras
                            </th>
                            <th>Descripción</th>
                            <th>
                                <span>Horas</span>
                                <br />
                                semanales
                            </th>
                            <th>Estado</th>
                            <th><button className='btn btn-primary' onClick={handleNextWeek}>⇥</button></th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentWeekData.rows.map((row, rowIndex) => (
                            <tr key={rowIndex} /*className={row.data.isOvertime && row.data.hoursDiary > 0 ? 'extra-hoursDiary-row' : ''}*/>
                                <td />
                                {/* <td>
                                <select className='form-control' value={selectedClients[rowIndex]} disabled>
                                    <option value="">Seleccione un proyecto</option>
                                    {data.clientes[0].map(cliente => (
                                        <option key={cliente.id} value={cliente.id}>
                                            {cliente.description}
                                        </option>
                                    ))}
                                </select>
                            </td> */}
                                <td>
                                    <select className='form-control' value={selectedClients[rowIndex]} disabled>
                                        <option value="">Seleccione un cliente</option>
                                        {data.clientes.map(cliente => (
                                            <option key={cliente.id} value={cliente.id}>
                                                {cliente.description}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                {/* <td>
                                <select className='form-control' value={selectedProjects[rowIndex]} onChange={(e) => handleProyectoChange(e.target.value, rowIndex)}>
                                    <option value="">Seleccione un proyecto</option>
                                    {data.clientes.map(cliente => (
                                        <optgroup label={cliente.description} key={cliente.id}>
                                            {data.proyectos[0]
                                                .filter(proyecto => proyecto.clientId === cliente.id)
                                                .map(proyecto => (
                                                    <option value={proyecto.id} key={proyecto.id}>
                                                        {proyecto.description}
                                                    </option>
                                                ))}
                                        </optgroup>
                                    ))}
                                </select>
                            </td> */}
                                <td>
                                    <select className='form-control' value={selectedProjects[rowIndex]} onChange={(e) => handleProyectoChange(e.target.value, rowIndex)}>
                                        <option value="">Seleccione un proyecto</option>
                                        {data.clientes.map(cliente => (
                                            <optgroup label={cliente.description} key={cliente.id}>
                                                {data.proyectos
                                                    .filter(proyecto => proyecto.clientId === cliente.id)
                                                    .map(proyecto => (
                                                        <option value={proyecto.proyectId} key={proyecto.proyectId}>
                                                            {proyecto.projectName}
                                                        </option>
                                                    ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                </td>
                                {row.data.map((day, dayIndex) => (
                                    <React.Fragment key={dayIndex}>
                                        <td key={dayIndex}>
                                            <input
                                                className={`form-control ${day.isOvertime && day.hoursDiary > 0 ? 'extra-hoursDiary' : ''}`}
                                                type="number"
                                                value={day.hoursDiary.toString()}
                                                min={0}
                                                onChange={e => handleHourChange(rowIndex, dayIndex, e.target.value)}
                                                inputMode="numeric"
                                            />
                                        </td>

                                    </React.Fragment>
                                ))}
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={row.data[rowIndex].isOvertime}
                                        onChange={(e) => handleisOvertimeChange(rowIndex)}
                                    />
                                </td>
                                <td>
                                    <textarea
                                        className='form-control'
                                        value={row.data[rowIndex].description}
                                        onChange={(e) => handleDescriptionChange(rowIndex, e.target.value)}
                                    // disabled={!row.data[rowIndex].isOvertime}  // Asegúrate de que el campo no esté deshabilitado si no es tiempo extra
                                    />
                                </td>
                                <td>{getRowTotal(rowIndex)}</td>
                                <td>{statusToSend === 1 ? 'Pendiente de aprobacion' : (clickedSave && row.status)}</td>
                                <td></td>
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan="2" />
                            <td>Total</td>
                            {weekDates.map((_, dayIndex) => (
                                <td key={dayIndex}>{getColumnTotal(dayIndex)}</td>
                            ))}
                            <td colSpan="2" />
                            <td>{getWeeklyTotal()}</td>
                            <td colSpan="2"></td>
                        </tr>
                    </tfoot>
                </table>

                <br />
            </div>

            {events.length > 0 ? (<AccordionComponent />) : (null)}

        </>
    );
}

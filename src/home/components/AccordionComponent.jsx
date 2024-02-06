import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaArrowUp } from "react-icons/fa";
import { useTimeStore } from "../../hooks";


export const AccordionComponent = () => {

    const { user } = useSelector(state => state.auth);
    const { events, projects, clients } = useSelector(state => state.time);

    moment.updateLocale('es', {
        weekdays: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    });

    moment.locale('es');

    const { startEditing } = useTimeStore();


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
                    stateId: 1
                }
                // Agregar más filas si es necesario
            ]
        }
    ]);

    const data = {
        clientes: clients,
        proyectos: projects,
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


    const [selectedProjects, setSelectedProjects] = useState([]);
    const [selectedClients, setSelectedClients] = useState([]);

    const currentWeekData = weeksData[currentWeek];
    const [editedHours, setEditedHours] = useState(Array.from({ length: weeksData.length }, () => ({})));
    const [newInitialSums, setNewInitialSums] = useState(0);

    // useEffect(() => {
    //     // Check if data for the current week exists, if not, initialize it
    //     if (!weeksData[currentWeek]) {
    //         const newWeeksData = [...weeksData];
    //         newWeeksData[currentWeek] = {
    //             clientId: '',
    //             proyectId: '',
    //             data: Array.from({ length: daysOfWeek.length }, (_, dayIndex) => ({
    //                 date: '',
    //                 hoursDiary: 0,
    //                 isOvertime: false,
    //                 description: '' // Descripción para cada día
    //             })),
    //             total: 0,
    //             stateId: ''
    //         };
    //         setWeeksData(newWeeksData);
    //     }


    // }, [currentWeek, weeksData, daysOfWeek.length]);

    // useEffect(() => {
    //     // Calcular la sumatoria inicial de horas de los eventos
    //     const totalHours = events.reduce((total, event) => {
    //         // Convertir hoursDiary a número antes de sumar
    //         const hours = Number(event.hoursDiary) || 0;
    //         return total + hours;
    //     }, 0);

    //     // Inicializar el estado
    //     setNewInitialSums(totalHours);
    // }, [events]);


    const startDate = moment().startOf('isoWeek').add(currentWeek, 'weeks');
    const weekDates = Array.from({ length: 7 }, (_, dayIndex) => ({
        date: startDate.clone().add(dayIndex, 'days'),
        day: startDate.clone().add(dayIndex, 'days').format('dddd'),
        number: startDate.clone().add(dayIndex, 'days').format('DD'),
        month: startDate.clone().add(dayIndex, 'days').format('MMMM')
    }));

    const [temporaryHours, setTemporaryHours] = useState({});
    const [checkedOvertime, setCheckedOvertime] = useState(Array.from({ length: daysOfWeek.length }, () => false));
    const [temporaryDescriptions, setTemporaryDescriptions] = useState({});
    const [inputHourValues, setInputHourValues] = useState(Array.from({ length: weeksData.length }, () => ({})));

    // console.log(newInitialSums)

    const groupedEvents = {};


    events.forEach(event => {
        const key = `${event.clientId}-${event.proyectId}`;
        if (!groupedEvents[key]) {
            groupedEvents[key] = [event];
        } else {
            groupedEvents[key].push(event);
        }
    });

    const handleHourChange = (index, dayIndex, newHours) => {
        // Verificar si el nuevo valor es 0
        if (parseFloat(newHours) === 0) {
            return;
        }

        setWeeksData((prevWeeksData) => {
            return prevWeeksData.map((weekData, weekIndex) => {
                if (weekIndex === currentWeek) {
                    const updatedRows = [...weekData.rows];

                    // Asegurarse de que la fila esté presente antes de realizar cambios
                    while (updatedRows.length <= index) {
                        updatedRows.push({
                            // Inicializar la nueva fila con los valores predeterminados
                            clientId: '',
                            proyectId: '',
                            data: Array.from({ length: daysOfWeek.length }, (_, dIndex) => ({
                                date: '',
                                hoursDiary: 0,
                                isOvertime: false,
                                description: ''
                            })),
                            total: 0,
                            stateId: ''
                        });
                    }

                    // Actualizar las horas para la fila especificada por rowIndex
                    updatedRows[index] = {
                        ...updatedRows[index],
                        data: updatedRows[index].data.map((day, dIndex) => {
                            if (dIndex === dayIndex) {
                                const currentDate = weekDates[dayIndex].date.toISOString();

                                // Marcar la hora como editada
                                setEditedHours((prevEditedHours) => ({
                                    ...prevEditedHours,
                                    [currentDate]: true,
                                }));

                                // Actualizar las horas temporales si es necesario
                                setTemporaryHours((prevTemporaryHours) => ({
                                    ...prevTemporaryHours,
                                    [currentDate]: newHours,
                                }));

                                // Actualizar las horas de entrada
                                setInputHourValues((prevInputHourValues) => ({
                                    ...prevInputHourValues,
                                    [`${index}-${dayIndex}`]: newHours,
                                }));

                                return { ...day, hoursDiary: newHours, date: currentDate };
                            }
                            return day;
                        }),
                    };

                    return {
                        ...weekData,
                        rows: updatedRows,
                    };
                }
                return weekData;
            });
        });
    };

    const [editing, setEditing] = useState(false);

    const handleProyectoChange = (proyectoId, rowIndex) => {

        // console.log(proyectoId)
        // console.log(rowIndex)
        const proyecto = projects.find((proyect) => proyect && proyect.proyectId === parseInt(proyectoId));
        const cliente = clients.find((client) => client && client.id === proyecto.clientId);

        setWeeksData((prevWeeksData) => {
            const newWeeksData = [...prevWeeksData];

            // Asegurarse de que rows esté inicializado
            if (!newWeeksData[currentWeek].rows) {
                newWeeksData[currentWeek].rows = [];
            }

            // Asegurarse de que la fila actual esté inicializada
            if (!newWeeksData[currentWeek].rows[rowIndex]) {
                newWeeksData[currentWeek].rows[rowIndex] = {
                    clientId: cliente.id,
                    proyectId: proyecto.proyectId,
                    data: Array.from({ length: daysOfWeek.length }, (_, dayIndex) => ({
                        date: '',
                        hoursDiary: 0,
                        isOvertime: false,
                        description: '',
                    })),
                    total: 0,
                    stateId: '',
                };
            } else {
                // Si no hay modificaciones, establecer clientId y proyectId como los valores seleccionados
                newWeeksData[currentWeek].rows[rowIndex] = {
                    ...newWeeksData[currentWeek].rows[rowIndex],
                    clientId: cliente.id,
                    proyectId: proyecto.proyectId,
                };
            }

            // Actualizar la fila actual
            newWeeksData[currentWeek].rows[rowIndex] = {
                ...newWeeksData[currentWeek].rows[rowIndex],
                data: newWeeksData[currentWeek].rows[rowIndex].data.map((day) => ({ ...day, date: '' })),
            };

            return newWeeksData;
        });

        // Actualizar los estados asociados con la fila
        setSelectedProjects((prevSelectedProjects) => {
            const newSelectedProjects = [...prevSelectedProjects];
            newSelectedProjects[rowIndex] = proyecto.proyectId;
            return newSelectedProjects;
        });

        setSelectedClients((prevSelectedClients) => {
            const newSelectedClients = [...prevSelectedClients];
            newSelectedClients[rowIndex] = cliente.id;
            return newSelectedClients;
        });

        // Marcar la edición
        setEditing(true);
    };




    const handleOvertimeChange = (rowIndex, isChecked) => {
        setCheckedOvertime((prevCheckedOvertime) => ({
            ...prevCheckedOvertime,
            [rowIndex]: isChecked,
        }));

        setWeeksData((prevWeeksData) => {
            return prevWeeksData.map((weekData, index) => {
                if (index === currentWeek) {
                    return {
                        ...weekData,
                        rows: weekData.rows.map((row, rIndex) => {
                            if (rIndex === rowIndex) {
                                // Invertir el valor de isOvertime para todas las horas editadas de la fila
                                const updatedData = row.data.map((day) => {
                                    const editedHour = editedHours[day.date];
                                    if (editedHour) {
                                        return {
                                            ...day,
                                            isOvertime: !day.isOvertime,
                                        };
                                    }
                                    return day;
                                });

                                return {
                                    ...row,
                                    data: updatedData,
                                };
                            }
                            return row;
                        }),
                    };
                }
                return weekData;
            });
        });
    };



    const handleDescriptionChange = (rowIndex, newDescription) => {
        setTemporaryDescriptions((prevTemporaryDescriptions) => ({
            ...prevTemporaryDescriptions,
            [rowIndex]: newDescription,
        }));

        setWeeksData((prevWeeksData) => {
            return prevWeeksData.map((weekData, index) => {
                if (index === currentWeek) {
                    return {
                        ...weekData,
                        rows: weekData.rows.map((row, rIndex) => {
                            if (rIndex === rowIndex) {
                                // Actualizar la descripción solo para las horas editadas
                                const updatedData = row.data.map((day) => ({
                                    ...day,
                                    description: editedHours[day.date] ? newDescription : day.description,
                                }));

                                return {
                                    ...row,
                                    data: updatedData,
                                };
                            }
                            return row;
                        }),
                    };
                }
                return weekData;
            });
        });
    };


    const getRowTotal = (rowIndex) => {
        return currentWeekData.rows[rowIndex].data.reduce((total, day) => {
            const editedHoursRow = editedHours[rowIndex];
            const hoursDiary = day.hoursDiary || (editedHoursRow && editedHoursRow[day.date]);

            const eventsHours = events.find((event) => event.date === day.date)?.hoursDiary;
            const eventsHoursNumber = Number(eventsHours) || 0;
            const initialSumsValue = newInitialSums[rowIndex] || 0;

            return total + Number(hoursDiary > 0 ? hoursDiary : eventsHoursNumber || initialSumsValue);
        }, 0);
    };






    const getWeeklyTotal = () => {
        return currentWeekData.rows.reduce((total, row) => {
            return total + row.data.reduce((rowTotal, day) => {
                // Sumar solo si el día tiene horas registradas
                return rowTotal + ((editedHours[day.date] ? temporaryHours[day.date] : null ?? day.hoursDiary) || 0);
            }, 0);
        }, 0);
    };


    const checkStateIdForArrays = (data) => {
        const results = {};

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const array = data[key];
                const hasStateId1 = array.some(item => item.stateId === 1);
                const allHaveStateId2 = array.every(item => item.stateId === 2);
                const allHaveStateId3 = array.every(item => item.stateId === 3);

                if (allHaveStateId3) {
                    results[key] = 'Rechazado';
                } else if (!hasStateId1 && allHaveStateId2) {
                    results[key] = 'Aprobado';
                } else {
                    results[key] = 'Pendiente de aprobación';
                }
            }
        }

        return results;
    }



    // console.log(groupedEvents);

    const handleUpdate = (e) => {
        e.preventDefault();

        const submittedData = {
            weeksData: weeksData.map((week) => ({
                ...week,
                rows: week.rows
                    .filter((row) => row.data.some((day) => day.hoursDiary > 0))
                    .map((row) => ({
                        ...row,
                        data: row.data.filter((day) => day.hoursDiary > 0),  // Filtrar solo los días con horas registradas
                    })),
            })),
        };

        const { rows } = submittedData.weeksData[0];


        console.log(rows);
        startEditing(user.id, rows);
    };

    useEffect(() => {
        // Lógica para ejecutar handleProyectoChange solo una vez al montar el componente

        Object.values(groupedEvents).forEach((projectEvents, index) => {
            const firstEvent = projectEvents[0];
            if (firstEvent) {
                const proyecto = projects.find(proyecto => proyecto && proyecto.proyectId === firstEvent.proyectId);
                if (proyecto) {
                    console.log(proyecto.proyectId);
                    handleProyectoChange(proyecto.proyectId, index);
                }
            }
        });
    }, []);


    return (
        <div className="container">
            <div className="accordion accordion-flush col-12 text-aling-center" id="accordionFlushExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                            Tiempos registrados
                        </button>
                    </h2>
                    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                            <div className="excel-table">
                                <button className="btn btn-outline-info" onClick={handleUpdate}> Actualizar tiempos</button>
                                <br />
                                <table className='text-aling-center'>
                                    <thead>
                                        <tr>
                                            <th><button className='btn btn-primary' >⇤</button></th>
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
                                            <th><button className='btn btn-primary' >⇥</button></th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {Object.values(groupedEvents).map((projectEvents, index) => {

                                            const firstEvent = projectEvents[0];

                                            // const isRowApproved = rowApprovalStatus[index];
                                            // const status = allApproved ? 'Pendiente de aprobacion' : 'Aprobado';

                                            // handleProyectoChange(proyecto.proyectId, index);


                                            const isApproved = checkStateIdForArrays(groupedEvents);


                                            return (
                                                <tr key={`${firstEvent.clientId}-${firstEvent.proyectId}-${index}`}>
                                                    <td />
                                                    <td>
                                                        <select className='form-control' value={editing ? selectedClients[index] : firstEvent.clientId}
                                                            disabled>
                                                            <option value="">{firstEvent.clientId ? '' : 'Seleccione un cliente'}</option>
                                                            {data.clientes.map((cliente) => (
                                                                <option key={cliente.id} value={cliente.id}>
                                                                    {cliente.description}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    <td>
                                                        <select
                                                            className='form-control'
                                                            value={selectedProjects[index] || (firstEvent.proyectId || '')}
                                                            disabled
                                                        // onChange={(e) => handleProyectoChange(e.target.value, index)}
                                                        >
                                                            <option value="">{firstEvent.proyectId ? '' : 'Seleccione un proyecto'}</option>
                                                            {data.clientes.map((cliente) => (
                                                                <optgroup label={cliente.description} key={cliente.id}>
                                                                    {data.proyectos
                                                                        .filter((proyecto) => proyecto.clientId === cliente.id)
                                                                        .map((proyecto) => (
                                                                            <option value={proyecto.proyectId} key={proyecto.proyectId}>
                                                                                {proyecto.projectName}
                                                                            </option>
                                                                        ))}
                                                                </optgroup>
                                                            ))}
                                                        </select>
                                                    </td>
                                                    {weekDates.map((weekDay, dayIndex) => {

                                                        const event = projectEvents.find(ev => moment(ev.date).isSame(weekDay.date, 'day')) || {};
                                                        const isEdited = editedHours[event.date] || false;


                                                        return (
                                                            <td key={dayIndex}>
                                                                <input
                                                                    className={`form-control ${firstEvent && firstEvent.isOvertime && parseInt(firstEvent.hoursDiary, 10) > 0 ? 'extra-hours' : ''}`}
                                                                    type="number"
                                                                    value={editedHours[weekDates[dayIndex].date.toISOString()] ? inputHourValues[`${index}-${dayIndex}`] : event.hoursDiary}
                                                                    min={0}
                                                                    onChange={(e) => handleHourChange(index, dayIndex, e.target.value)}
                                                                    inputMode="numeric"
                                                                />
                                                            </td>
                                                        );
                                                    })}
                                                    {/* {weekDates.map((weekDay, dayIndex) => (
                                                        
                                                        
                                                        // <td key={dayIndex}>
                                                            <input
                                                                className={`form-control ${firstEvent && firstEvent.isOvertime && parseInt(firstEvent.hoursDiary, 10) > 0 ? 'extra-hours' : ''}`}
                                                                type="number"
                                                                value={inputHourValues[`${index}-${dayIndex}`] || firstEvent.}
                                                                min={0}
                                                                onChange={(e) => handleHourChange(index, dayIndex, e.target.value)}
                                                                inputMode="numeric"
                                                            />
                                                        // </td>
                                                    ))} */}
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            checked={checkedOvertime[index] || (projectEvents[index] && projectEvents[index].isOvertime) || false}
                                                            onChange={(e) => handleOvertimeChange(index, e.target.checked)}
                                                        />
                                                    </td>
                                                    <td>
                                                        <textarea
                                                            className='form-control'
                                                            value={editedHours[weekDates[index].date.toISOString()]
                                                                ? temporaryDescriptions[index] !== undefined
                                                                    ? temporaryDescriptions[index]
                                                                    : projectEvents[index] && projectEvents[index].description
                                                                : projectEvents[index] && projectEvents[index].description || ''}
                                                            onChange={(e) => handleDescriptionChange(index, e.target.value)}
                                                        />
                                                    </td>
                                                    <td></td>
                                                    {/* <td>{getRowTotal(index)}</td> */}

                                                    <td>
                                                        {isApproved[`${firstEvent.clientId}-${firstEvent.proyectId}`] === 'Aprobado' ? 'Aprobado' :
                                                            isApproved[`${firstEvent.clientId}-${firstEvent.proyectId}`] === 'Pendiente de aprobación' ? 'Pendiente de aprobación' :
                                                                isApproved[`${firstEvent.clientId}-${firstEvent.proyectId}`] === 'Rechazado' ? 'Rechazado' :
                                                                    'Pendiente de aprobacion'}
                                                    </td>

                                                    {/* <td>{isApproved ? 'Pendiente de aprobacion' : 'Aprobado'}</td> */}
                                                    {/* <td>{isRowApproved(groupedEvents) ? 'Aprobado' : 'Pendiente de aprobación'}</td> */}
                                                    <td></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>


                                    <tfoot>
                                        <tr>
                                            {/* <td colSpan="2" />
                                            <td>Total</td>
                                            {weekDates.map((_, dayIndex) => (
                                                <td key={dayIndex}>{getColumnTotal(dayIndex)}</td>
                                            ))}
                                            <td colSpan="2" />
                                            <td>{getWeeklyTotal()}</td>
                                            <td colSpan="2"></td> */}
                                        </tr>
                                    </tfoot>
                                </table>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

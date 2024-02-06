import { addHours, differenceInSeconds } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect, useMemo, useState } from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BiSave } from 'react-icons/bi';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useTimeStore, useUiStore } from '../../hooks';
import './styles/CalendarModal.css';
import Swal from 'sweetalert2';

registerLocale('es', es)

export const CalendarModal = () => {

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { setActiveEvent } = useTimeStore();



    const { clients, projects } = useSelector(state => state.time);

    const [isChecked, setIsChecked] = useState(false);

    const { activeEvent, startSaving } = useTimeStore();


    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        start: new Date(),
        end: addHours(new Date(), 1),
        hoursDiary: '',
        isOvertime: false,
        userId: '',
        clientId: '',
        proyectId: '',
        stateId: 1
    })


    const titleClass = useMemo(() => {
        if (!formSubmitted) return '';

        return (formValues.title.length > 0)
            ? ''
            : 'is-invalid';

    }, [formValues.title, formSubmitted])

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent })
        }
    }, [activeEvent])


    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onCheckedChange = ({ target }) => {
        setIsChecked(!isChecked)
        setFormValues({
            ...formValues,
            [target.name]: isChecked
        })
    }

    const onDateChanged = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted(true);


        const difference = differenceInSeconds(formValues.end, formValues.start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
            return;
        }

        if (formValues.title.length <= 0) return;

        console.log(formValues);


        await startSaving(formValues);
        closeDateModal();
        setFormSubmitted(false);
    }

    const onCloseModal = () => {
        closeDateModal();
        setActiveEvent(null);
    }

    return (
        <Modal
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >

            <h1> Gestionar tiempos. </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        className="form-control"
                        onChange={(event) => onDateChanged(event, 'start')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />

                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        className="form-control"
                        onChange={(event) => onDateChanged(event, 'end')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />

                </div>

                <div className="form-group mb-2">
                    <label>Horas laboradas</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Horas laboradas"
                        name="hoursDiary"
                        autoComplete="off"
                        value={formValues.hoursDiary}
                        disabled
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="labelTitle" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Detalle"
                        rows="4"
                        name="description"
                        value={formValues.description}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="labelDescription" className="form-text text-muted">Información adicional</small>
                </div>
                <hr />
                <div className="form-group mb-2">

                    <input className="form-check-input" type="checkbox" value={formValues.isOvertime} checked={formValues.isOvertime} name="isOvertime" id="defaultCheck1" onChange={onCheckedChange} />
                    <small id="labelOvertime" className="form-text text-muted"> ¿Son horas Extras?</small>
                </div>
                <hr />
                <div className="form-group mb-2">

                    <label>Cliente y proyecto</label>

                    <select className="form-select" name="clientId" value={formValues.clientId} aria-label="Default select example" onChange={onInputChange}>
                        <option value="0">Selecciona un cliente</option>
                        {clients.map((client) => (
                            <option
                                key={client.id}
                                value={client.id}
                            >
                                {client.description}
                            </option>
                        ))}
                    </select>
                    <small id="labelClient" className="form-text text-muted"> Selecciona al cliente que perteneces</small>
                </div>

                <hr />

                <div className="form-group mb-2">
                    <select className="form-select" name="proyectId" value={formValues.proyectId} aria-label="Default select example" onChange={onInputChange}>

                        <option value="0">Selecciona un proyecto</option>
                        {projects.map((project) => (
                            <option
                                key={project.id}
                                value={project.id}
                            >
                                {project.description}
                            </option>
                        ))}
                    </select>
                    <small id="labelProyect" className="form-text text-muted"> Selecciona el proyecto al que perteneces</small>
                </div>

                <hr />
                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <BiSave />
                    <span> Guardar</span>
                </button>
                <br />
                <br />
            </form>

        </Modal>
    )
}

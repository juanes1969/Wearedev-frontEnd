import { useEffect, useState } from "react";
import "../components/styles/ModalClientStyle.css";
import { useForm, useLeaderStore } from "../../hooks";
import { useSelector } from "react-redux";

export const ModalViewTimesRegisters = ({ isOpenModalTimes, closeModalTimes, activeEvent, setActiveEvent }) => {

    // const { user } = useSelector(state => state.auth);

    const { aprovalTimesById, rejectTimesById, updateStateByLeader } = useLeaderStore();

    const handleModalDialogClick = (e) => {
        e.stopPropagation();
    };

    const { formState, stateId, onInputChange } = useForm({
        stateId: 0,
    });

    const [formValues, setFormValues] = useState({});

    const handleCancelButton = () => {
        // setActiveEvent(null);
        closeModalTimes();

        // console.log(formValues.isOvertime);
    }

    useEffect(() => {
        if (activeEvent !== null) {
            setFormValues({ ...activeEvent });
        }
    }, [activeEvent])

    const handleAprovalTime = async () => {
        await aprovalTimesById(formValues.userId, [formValues.id]).then(
            closeModalTimes()
        )
    }

    const handleRejectTime = async () => {
        await rejectTimesById(formValues.userId, [formValues.id]).then(
            closeModalTimes()
        )
    }

    const handleChangeState = () => {
        const idTime = formValues.id;
        const userId = formValues.userId;

        updateStateByLeader(idTime, userId, stateId).then(
            closeModalTimes()
        );
    }

    return (
        <div
            className={`modalInicial ${isOpenModalTimes && "modal-abierta"}`}
            onClick={handleCancelButton}
        >
            <div className="modal-dialog">
                <div
                    className="modal-content modal-conduct contenido__modal"
                    onClick={handleModalDialogClick}
                >
                    <div className="modal-header">
                        <h3 className="modal-title" id="exampleModalLabel">
                            Revisa los tiempos
                        </h3>

                    </div>
                    <hr />
                    <div className="modal-body">
                        <div className="container">
                            <form className="form-register">
                                <div className="form-floating">
                                    <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" defaultValue={formValues.title} style={{ height: 100 }} readOnly></textarea>
                                    <label htmlFor="floatingTextarea2">Descripcion de actividades</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input className="form-control" type="number" defaultValue={formValues.hoursDiary} placeholder="Leave a comment here" id="floatingHours" readOnly />
                                    <label htmlFor="floatingHours">Horas registradas</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input className="form-control" type="text" defaultValue={formValues.clientId} placeholder="Leave a comment here" id="floatingClient" readOnly />
                                    <label htmlFor="floatingClient">Cliente registrado</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input className="form-control" type="text" defaultValue={formValues.proyectId} placeholder="Leave a comment here" id="floatingProject" readOnly />
                                    <label htmlFor="floatingProject">Proyecto registrado</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input className="form-control" type="text" value={formValues.isOvertime ?
                                        "Si" : "No"} placeholder="Leave a comment here" id="overtimeTime" readOnly />
                                    <label htmlFor="overtimeTime">Hora extra</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    {/* <input className="form-control" type="text" value={formValues.stateId === 2 ? "Aprobado" : formValues.stateId === 3 ? "Rechazado": "Pendiente de aprobación"} placeholder="Leave a comment here" id="stateIinput" readOnly /> */}
                                    <select className="form-control" name="stateId" value={formState.stateId || formValues.stateId}
                                        onChange={onInputChange}>
                                        <option value="1">Pendiente de aprobacion</option>
                                        <option value="2">Aprobado</option>
                                        <option value="3">Rechazado</option>
                                    </select>
                                    <label htmlFor="stateIinput">Estado</label>
                                </div>
                            </form>
                        </div>
                    </div>
                    <hr />
                    <div className="modal-footer modal-btn gap-4">
                        <button type="submit" className="btn btn-outline-primary"
                            onClick={formValues.stateId > 1 ? handleChangeState : handleAprovalTime}
                        >
                            {formValues.stateId > 1 ? 'Actualizar Estado' : 'Aprobar Tiempo'}
                        </button>
                        <button type="submit" className="btn btn-outline-info" onClick={handleRejectTime} disabled={formValues.stateId === 2 || formValues.stateId === 3}>
                            Rechazar tiempo
                        </button>
                        <button
                            type="reset"
                            className="btn btn-outline-danger"
                            onClick={handleCancelButton}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

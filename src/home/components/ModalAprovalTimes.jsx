import { useState } from "react";
import { IconContext } from "react-icons";
import { BsCalendarCheck } from "react-icons/bs";
import { MdFreeCancellation, MdPending } from "react-icons/md";
import Modal from 'react-modal';
import { useSelector } from "react-redux";
import { useLeaderStore, useUiStore } from "../../hooks";
import './styles/ModalAprovalTimes.css';
import { AiOutlineSelect } from "react-icons/ai";

export const ModalAprovalTimes = () => {

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

    Modal.setAppElement('#root');

    const { isDateModalOpen, closeDateModal } = useUiStore();

    const { aprovalTimesById, approvalTimesAll, setClearTimesEmployes, rejectTimesById, rejectlTimesAll } = useLeaderStore();

    const { timeEmployes } = useSelector(state => state.leader);

    const [ids, setIds] = useState([]);

    const onCloseModal = () => {
        setClearTimesEmployes();
        closeDateModal();
        setIds([]);
    }

    const onChangeApprovalAll = (e) => {
        console.log('Monto todos los ids en check');
    }

    const onChangeApprovalTimeByid = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setIds([...ids, parseInt(value)]);
        } else {
            setIds(ids.filter(item => item !== value));
            setIds([]);
        }
    }

    const onClickApprovalTimes = (e) => {
        e.preventDefault();
        const idUser = timeEmployes[0].userId;
        if (ids.length > 0) {
            aprovalTimesById(idUser, ids);
            setClearTimesEmployes();
            closeDateModal();
        } else {
            approvalTimesAll(idUser);
            setClearTimesEmployes();
            closeDateModal();
        }
    }

    const onClickRejectTimes = (e) => {
        e.preventDefault();
        const idUser = timeEmployes[0].userId;
        if (ids.length > 0) {
            rejectTimesById(idUser, ids);
            setClearTimesEmployes();
            closeDateModal();
        } else {
            rejectlTimesAll(idUser);
            setClearTimesEmployes();
            closeDateModal();
        }
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

            {(timeEmployes.length > 0) ?
                (<form>
                    <table className="table table-hover table-bordered">
                        <thead>
                            <IconContext.Provider value={{ size: 25 }}>
                                <tr>
                                    <th colSpan="1" /*onClick={onChangeApprovalTimeFull}*/ ><AiOutlineSelect onClick={onChangeApprovalAll} /></th>
                                    <th scope="col">Clientes</th>
                                    <th scope="col">Proyectos</th>
                                    <th scope='col'>Hora de incio</th>
                                    <th scope='col'>Hora fin</th>
                                    <th scope="col">Horas trabajadas</th>
                                    <th scope="col">¿Son horas extras?</th>
                                    {/* <th scope='col' style={{ width: 130 }}>Acciones</th> */}
                                </tr>
                            </IconContext.Provider>
                        </thead>
                        <tbody>

                            {timeEmployes.map((time) => (
                                <tr key={time.id}>
                                    <th>{<input type='checkbox' className='form-check-input' value={time.id} onChange={onChangeApprovalTimeByid} />}</th>
                                    <td>{time.clientId}</td>
                                    <td>{time.proyectId} </td>
                                    <td> {time.start}</td>
                                    <td>{time.end}</td>
                                    <td>{time.hoursDiary}</td>
                                    <td>{time.isOvertime ? 'Si' : 'No'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        type="submit"
                        className="btn btn-outline-success btn-block"
                        onClick={onClickApprovalTimes}
                    >
                        <BsCalendarCheck />
                        <span> Aprobar {ids.length > 0 ? 'Seleccionados' : 'Todo'}</span>
                    </button>
                    <button
                        type="submit"
                        className="btn btn-outline-danger btn-block"
                        onClick={onClickRejectTimes}
                    >
                        <MdFreeCancellation />
                        <span> Rechazar {ids.length > 0 ? 'Seleccionados' : 'Todo'}</span>
                    </button>
                </form>) :
                (<div className='text-center'>
                    <IconContext.Provider value={{ size: 30 }}>
                        <h5>Este empleados no tiene tiempos pendientes de aprobacion</h5>
                        <MdPending />
                    </IconContext.Provider>
                </div>)
            }

        </Modal>
    )
}

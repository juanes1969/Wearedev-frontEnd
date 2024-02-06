
import { useEffect, useState } from 'react'
import { FcSearch } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { useLeaderStore, useModal, useProjectStore } from '../../hooks'
import { usePage } from '../../hooks/usePage'
import { CalendarItem } from '../../ui/components/CalendarItem'
import { Navbar } from '../components/Navbar'
import './styles/ManageTimesStyles.css'
import { onCalculateTotalNormalHours, onCalculateTotalOvertimeHours } from '../../store/leader/leaderSlice'
import { FaRegFilePdf, FaRegFileExcel } from "react-icons/fa";



export const ManageTimes = () => {

    const { startLoadingEmployes, startLoadingTimesEmployes, aprovalTimesById, rejectTimesById } = useLeaderStore();
    const { downloadInExcel: excelDownload, downloadInPdf: pdfDownload } = useProjectStore();

    const { employes, timeEmployes, totalNormalHours, totalOvertimeHours } = useSelector(state => state.leader);

    const [ids, setIds] = useState([]);

    const [searchFiltered, setSearchFiltered] = useState(null);

    const [search, setSearch] = useState('');

    const { filterEmployes } = usePage(employes, search);

    const [isOpenModalTimes, openModalTimes, closeModalTimes] = useModal();

    const dispatch = useDispatch();

    useEffect(() => {
        startLoadingEmployes();
    }, []);

    const onSearchChange = ({ target }) => {
        setSearch(target.value)
    }

    const handleKeyDown = async (event) => {
        // Verificar si se presionó la tecla "Enter"
        if (event.key === 'Enter') {
            const filtered = filterEmployes().map((e) => {
                return e.id;
            })
            if (filtered.length > 0) {

                const idObtained = filtered[0];
                const id = idObtained ? idObtained : [];
                await startLoadingTimesEmployes(id);
                dispatch(onCalculateTotalNormalHours());
                dispatch(onCalculateTotalOvertimeHours());
                // const hoursOvertime = calculateOvertimeHours();
                // console.log(hoursOvertime)                

                return setSearchFiltered(true);

            } else {
                return setSearchFiltered(false);
            }
        }
    };

    const onChangeApprovalTimeByid = (e) => {
        const { value, checked } = e.target;
        const intValue = parseInt(value);

        if (checked) {
            setIds([...ids, intValue]);
        } else {
            setIds(ids.filter(item => item !== intValue));
        }
    };

    const onHandleAllAprovalTimes = (e) => {
        e.preventDefault();
        if (ids.length > 0) {
            const userId = timeEmployes[0].userId
            aprovalTimesById(userId, ids).then(
                closeModalTimes()
            )
        } else {
            Swal.fire('Error de aprobacion', 'Debes de seleccionar que tiempos deseas aprobar', 'info')
        }
    }

    const onHandleAllARejectTimes = (e) => {
        e.preventDefault();
        if (ids.length > 0) {
            const userId = timeEmployes[0].userId
            rejectTimesById(userId, ids).then(
                closeModalTimes()
            )
        } else {
            Swal.fire('Error de aprobacion', 'Debes de seleccionar que tiempos deseas rechazar', 'info')
        }
    }

    const downloadInExcel = (e) => {
        e.preventDefault();

        excelDownload(timeEmployes);
    }

    const downloadInPdf = (e) => {
        e.preventDefault();

        pdfDownload(timeEmployes);
    }

    return (
        <>
            <Navbar />
            <div className="container text-center">
                <div className="row align-items-center home-textm">
                    <div className="col">

                        <div className="col-12">
                            <h2>Aqui podras gestionar los tiempos</h2>
                        </div>
                        <hr />
                        <div className='container_search'>
                            <form className="d-flex formAction" role="search">
                                <input className="form-control" type="search" placeholder="Buscar" aria-label="Search" onChange={onSearchChange} onKeyDown={handleKeyDown} />

                                <button className="btn btn-outline-success" type="submit" id='btn-search' disabled><FcSearch /></button>
                            </form>
                            <br />
                        </div>
                        {/* {searchFiltered ?
                            (<small className="form-text text-muted">Esta consulta trajo resultados</small>) :
                            (<small className="form-text text-muted">Esta consulta no trajo resultados</small>)
                        } */}

                        <br />

                        <div className="color-input-container">
                            <div className="status-set aprobado">
                                <input type="color" className="form-check-input" disabled />
                                <span className="status-text">Aprobado</span>
                            </div>
                            <div className="status-set rechazado">
                                <input type="color" className="form-check-input" disabled />
                                <span className="status-text">Rechazado</span>
                            </div>
                            <div className="status-set pendiente">
                                <input type="color" className="form-check-input" disabled />
                                <span className="status-text">Pendiente de aprobación</span>
                            </div>
                        </div>
                        <br />


                        <div className="container text-center">
                            <div className="row align-items-start">
                                <div className="col-2">
                                    <button className='btn btn-outline-success' onClick={downloadInExcel}><FaRegFileExcel /></button>
                                    &nbsp;
                                    <button className='btn btn-outline-danger' onClick={downloadInPdf}><FaRegFilePdf /></button>
                                </div>
                            </div>
                        </div>



                        <hr />
                        <CalendarItem
                            onChangeApprovalTimeByid={onChangeApprovalTimeByid}
                            ids={ids}
                        />
                    </div>

                    <div className="col">
                        <form className='form-consolidate'>
                            <fieldset disabled>
                                <legend>Consolidado de tiempos</legend>
                                <div className="mb-3">
                                    <label htmlFor="disabledTextInput" className="form-label">Total de horas laboradas:</label>
                                    <input type="text" id="disabledTextInput" className="form-control" value={totalNormalHours} readOnly />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="disabledTextInput2" className="form-label">Total de horas extras:</label>
                                    <input type="text" id="disabledTextInput2" className="form-control" value={totalOvertimeHours} readOnly />
                                </div>
                            </fieldset>
                            <button type="button" className="btn btn-outline-primary" onClick={onHandleAllAprovalTimes}>Aprobar todo</button>
                            &nbsp;
                            <button type="button" className="btn btn-outline-danger" onClick={onHandleAllARejectTimes}>Rechazar todo</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

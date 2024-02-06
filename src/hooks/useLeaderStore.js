import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import configApi from "../api/configApi";
import { onClearTimesEmployes, onLoadEmployes, onLoadTimesEmployes, onCalculateTotalOvertimeHours, onCalculateTotalNormalHours } from "../store/leader/leaderSlice";

export const useLeaderStore = () => {

    const { user } = useSelector(state => state.auth);
    const { employes, timeEmployes, totalOvertimeHours, totalNormalHours } = useSelector(state => state.leader);

    const dispatch = useDispatch();

    const setClearTimesEmployes = () => {
        dispatch(onClearTimesEmployes());
    }

    const startLoadingEmployes = async () => {
        try {
            const { data } = await configApi.get(`/user/listEmployed/${user.id}`);
            const employes = data.data.user;
            dispatch(onLoadEmployes(employes));

        } catch (error) {
            console.log(error);
            Swal.fire('No tienes empleados acargo', 'An no tienes empleado a cargo', 'info')
        }
    }

    const startLoadingTimesEmployes = async (id) => {
        try {
            const { data } = await configApi.get(`/time/getIdByAproval/${id}`);
            const timesEmploye = data.data;
            dispatch(onLoadTimesEmployes(timesEmploye));

        } catch (error) {
            console.log(error);
            await Swal.fire('Tiempos aprobados', 'Este empleado no tiene tiempos pendientes de aprobacion', 'info').then(x =>
                x.isConfirmed(
                    dispatch(onClearTimesEmployes())
                ))
        }
    }

    const aprovalTimesById = async (idUser, idTimes = []) => {

        try {
            await configApi.put(`/time/updateAprovalById/${idUser}`,
                { ids: idTimes });
            Swal.fire('Tiempos aprobados con exito', 'Felicidades los tiempos fueron aprobados exitosamente', 'success').then(x => x.isDismissed(
                window.location.reload()
            ))
        } catch (error) {
            console.log(error)
            Swal.fire('No se pudieron aprobar los tiempos', 'Perdon los tiempos de este usuario no pudieron ser aprobados', 'error')
        }
    }

    // const aprovalTimesByIdNumber = async (idUser, idTimes) => {

    //     try {
    //         await configApi.put(`/time/updateAprovalByIdNumber/${idUser}`,
    //             { ids: idTimes });
    //         Swal.fire('Tiempos aprobados con exito', 'Felicidades los tiempos fueron aprobados exitosamente', 'success');
    //     } catch (error) {
    //         console.log(error)
    //         Swal.fire('No se pudieron aprobar los tiempos', 'Perdon los tiempos de este usuario no pudieron ser aprobados', 'error')
    //     }
    // }

    // const approvalTimesAll = async (idUser) => {
    //     try {
    //         await configApi.put(`/time/updateAproval/${idUser}`);
    //         Swal.fire('Tiempos aprobados con exito', 'Felicidades los tiempos fueron aprobados exitosamente', 'success');
    //     } catch (error) {
    //         console.log(error)
    //         Swal.fire('No se pudieron aprobar los tiempos', 'Perdon los tiempos de este usuario no pudieron ser aprobados', 'error')
    //     }
    // }

    const rejectTimesById = async (idUser, idTimes = []) => {
        try {
            await configApi.put(`/time/updateReject/${idUser}`, { ids: idTimes });
            Swal.fire('Tiempos rechazados con exito', 'Felicidades los tiempos fueron rechazados exitosamente', 'success').then(x => x.isDismissed(
                window.location.reload()
            ))
        } catch (error) {
            console.log(error)
            Swal.fire('No se pudieron rechazar los tiempos', 'Perdon los tiempos de este usuario no pudieron ser rechazados', 'error')
        }
    }

    const updateStateByLeader = async (idTime, userId, stateId) => {
        try {
            await configApi.put(`/time/updateState/${idTime}`, { userId: userId, stateId: stateId });
            Swal.fire('El estado fue actualizado', 'El estado de tu tiempo fue actualizado con exito', 'success').then(x => x.isDismissed(
                window.location.reload()
            ))
        } catch (error) {
            console.log(error);
        }
    }

    // const rejectlTimesAll = async (idUser) => {
    //     try {
    //         await configApi.put(`time/updateReject/${idUser}`);
    //         Swal.fire('Tiempos rechazados con exito', 'Felicidades los tiempos fueron rechazados exitosamente', 'success');
    //     } catch (error) {
    //         console.log(error)
    //         Swal.fire('No se pudieron rechazar los tiempos', 'Perdon los tiempos de este usuario no pudieron ser rechazados', 'error')
    //     }
    // }

    // const calculateOvertimeHours = () => {
    //     try {
    //         dispatch(onCalculateTotalOvertimeHours());
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const calculateNormalHours = async () => {
    //     try {
    //         dispatch(onCalculateTotalNormalHours())
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return {

        //Propiedades
        employes,
        timeEmployes,
        totalNormalHours,
        totalOvertimeHours,

        //Metodos
        startLoadingEmployes,
        startLoadingTimesEmployes,
        aprovalTimesById,
        // aprovalTimesByIdNumber,
        // approvalTimesAll,
        setClearTimesEmployes,
        rejectTimesById,
        updateStateByLeader
        // calculateOvertimeHours,
        // calculateNormalHours
        // rejectlTimesAll
        // hoursCurrentTotal,
        // hoursExtraTotal

    }
}

import { saveAs } from 'file-saver';
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import configApi from "../api/configApi";
import { onLoadEmployes } from "../store/leader/leaderSlice";
import { onAddNewProject, onLoadAllProjecstAssined, onLoadProjectsAvalible } from "../store/project/projectSlice";

export const useProjectStore = () => {

    const { user } = useSelector(state => state.auth);

    const dispatch = useDispatch();


    const startLoadingEmployes = async () => {

        try {
            const dataResp = await configApi.get(`/user/listAllUsers`);

            const { rows } = dataResp.data.data;

            dispatch(onLoadEmployes(rows));

        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingProjectsAvalible = async () => {

        try {
            const dataResp = await configApi.get(`/project/listProject`);

            const { data } = dataResp.data;

            dispatch(onLoadProjectsAvalible(data));

        } catch (error) {
            console.log(error);
        }

    }

    const startAllLoadingProjectAssined = async () => {

        try {

            const dataResp = await configApi.get(`/project/listProyectAndClientAssigned`);

            const { data } = dataResp.data;

            dispatch(onLoadAllProjecstAssined(data));

        } catch (error) {
            console.log(error);
        }
    }

    // const startLoadingProjectByUser = async () => {

    //     try {

    //         const dataResp = await configApi.get(`/project/listProyectAndClientAssigned`);

    //         const { data } = dataResp.data;

    //         dispatch(onLoadAllProjecstAssined(data));

    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    const startSavingAssingProject = async ({ userId, proyectId }) => {

        try {
            const data = await configApi.post('/project/assingProyect', { userId, proyectId });

            const newAssingProject = data.data;

            dispatch(onAddNewProject(newAssingProject));

            Swal.fire('!Felicidades¡', `La asignacion fue realizada de manera correcta`, 'success')
                .then(x => x.isDismissed(
                    window.location.reload()
                ));
        } catch (error) {
            console.log(error);
        }
    }

    const startUpdateProjectAssignement = async (proyectId) => {

        try {
            Swal.fire({
                title: "Desactivar projecto",
                text: "¿Quieres Inactivar este proyecto?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar",
                cancelButtonText: "Aun no deseo desactivarlo"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await configApi.put(`/project/updateStateAssignement/${proyectId}`);
                    Swal.fire({
                        title: "Felicidades!!",
                        text: "Projecto desactivado con exito.",
                        icon: "success"
                    }).then(x => x.isDismissed(
                        window.location.reload()
                    ))
                } else if (result.isDenied) {
                    window.location.href = '/assingProyect'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const downloadInExcel = async (data) => {
        try {
            const response = await configApi.post('/time/downloadExcel', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                responseType: 'blob'
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));

            const a = document.createElement('a');
            a.href = url;
            a.download = 'ejemplo.xlsx';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error(error);
        }

    }

    const downloadInPdf = async (data) => {
        try {
            const response = await configApi.post('/time/downloadPDF', data, {
                responseType: 'blob',
            });
    
            const blob = new Blob([response.data], { type: 'application/pdf' });
    
            saveAs(blob, 'archivo.pdf');
        } catch (error) {
            console.error('Error al descargar el archivo PDF:', error);
            // Aquí podrías mostrar un mensaje al usuario
        }
    };
    

    return {
        startLoadingEmployes,
        startLoadingProjectsAvalible,
        startSavingAssingProject,
        startAllLoadingProjectAssined,
        startUpdateProjectAssignement,
        downloadInExcel,
        downloadInPdf
    }
}

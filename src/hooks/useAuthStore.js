import { useDispatch, useSelector } from 'react-redux'
import Swal from "sweetalert2"
import configApi from "../api/configApi"
import { clearErrorMessage, onChecking, onLoadLeaders, onLoadRoles, onLogin, onLogout } from '../store/auth/authSlice'
import { onCleanRegisters } from '../store/time/timeSlice'

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking());

        try {
            const { data } = await configApi.post('/auth/login', { email, password });
            const { bearer } = data.data.token;
            const { user } = data.data;

            localStorage.setItem('token', bearer);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin(user))
            Swal.fire('Inicio de sesión exitoso', 'Usted ha iniciado sesión de manera correcta', 'success')

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas.'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async (formState) => {
        try {
            await configApi.post('/user/created', formState);
            Swal.fire('Registro de usuario de manera exitosa', 'la creación de el usuario fue exitosa', 'success').then(x => x.isDismissed(
                Swal.fire({
                    title: '¿Deseas añadir un nuevo usuario?',
                    text: "Puedes añadir un nuevo usuario o regresar a la página principal.",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    cancelButtonText: 'No, regresar a la página principal.',
                    confirmButtonText: 'Sí, añadir un nuevo usuario.'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    } else if (result.dismiss) {
                        window.location.href = '/';
                    }
                })
            ))
        } catch (error) {
            Swal.fire('Registro de usuario no exitosa', 'informacion incorrecta', 'error')
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }


    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await configApi.get('/auth/renew');
            const { bearer } = data.data.token;
            const { user } = data.data;

            localStorage.setItem('token', bearer);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch(onLogin(user))

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
            Swal.fire('Token expirado', 'Su token expiro. Inicie sesion nuevamente', 'info');
        }
    }

    const startLoadingLeaders = async () => {
        try {
            const { data } = await configApi.get('/user/list');
            const leaders = data.data.rows;
            dispatch(onLoadLeaders(leaders));
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingRoles = async () => {
        try {
            const { data } = await configApi.get('/roles/listRoles');
            const roles = data.data.rows;
            dispatch(onLoadRoles(roles));
        } catch (error) {
            console.log(error);
        }
    }


    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
        dispatch(onCleanRegisters());
    }

    return {
        //Propiedades
        status,
        user,
        errorMessage,
        //Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLoadingLeaders,
        startLoadingRoles,
        startLogout
    }

}

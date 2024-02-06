
import { CalendarComponent } from '../components/CalendarComponent';
import { Navbar } from '../components/Navbar';

export const CalendarTest = () => {
    return (
        <>
            <Navbar />
            <section className='home-text-calendarp'>
                <h1>Aqui podras registrar tus tiempos.</h1>
                <h5>Lleva un control de tus tiempos empleados.</h5>

                <div className="App">
                    <CalendarComponent />
                </div>
            </section>

        </>
    );
};


import { Navbar } from "../components/Navbar";
import './styles/HomeStyles.css';

import img3 from '../../assets/IMG3.jpeg';
import img5 from '../../assets/IMG5.jpg';

export const HomePage = () => {

    return (
        <>
            <Navbar />
            <section className="home-text">
                <span>
                    <h1>Bienvenido a WeAreDev crece</h1>
                    <br />
                    <h2 >El sistema donde podras registrar tus tiempos de una manera mucho mas comoda.</h2>
                </span>

                <div className="container">
                    <div className="col-11 cont1">
                        <div id="carouselExampleIndicators" className="carousel slide w-100 p-3">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src={img3} className="d-block w-100" alt="..." />
                                </div>
                                <div className="carousel-item">
                                    <img src={img5} className="d-block w-100" alt="..." />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}

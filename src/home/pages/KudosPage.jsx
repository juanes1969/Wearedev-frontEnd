import { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaCheck, FaFortAwesomeAlt, FaHeart, FaStar } from 'react-icons/fa';
import { MdAutoAwesome } from 'react-icons/md';
import { SiAwesomelists } from 'react-icons/si';
import { ColoredIcon } from '../components/ColoredIcon';
import { Navbar } from '../components/Navbar';
import './styles/KudosStyles.css';
import { useSelector } from 'react-redux';
import { kudoStore, useForm } from '../../hooks';



export const KudosPage = () => {

    const [showKudos, setShowKudos] = useState(false);
    const [showVisualize, setShowVisualize] = useState(false);

    const [selectedIcon, setSelectedIcon] = useState('star');
    const [selectedColor, setSelectedColor] = useState('#FFFFFF');
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const availableColors = ['#1F2B51', '#2854A0', '#00B5DB', '#F49853', '#FFFFFF'];

    const { user } = useSelector(state => state.auth);
    const { kudosByEmail } = useSelector(state => state.kudos);

    const { startSavingKudo, getKudoByEmail } = kudoStore();

    const { description, userReceiveEmail, onInputChange } = useForm({
        description: '',
        userReceiveEmail: ''
    });

    // console.log('Icono', selectedIcon);
    // console.log('Color icono', selectedColor)
    // console.log('Color card', availableColors[selectedColorIndex]);

    const icons = {
        star: <FaStar />,
        heart: <FaHeart />,
        check: <FaCheck />,
        real: <MdAutoAwesome />,
        castle: <FaFortAwesomeAlt />,
        glasses: <SiAwesomelists />
    };

    const showKudosClick = () => {
        setShowKudos(!showKudos);
        setShowVisualize(false);

        const emailUser = user.email;

        getKudoByEmail({ emailUser });
    }


    const showVisualizeClick = () => {
        setShowVisualize(!showVisualize)
        setShowKudos(false);
    }

    const handleIconChange = (direction) => {
        const iconKeys = Object.keys(icons);
        const currentIndex = iconKeys.indexOf(selectedIcon);
        let newIndex = currentIndex + direction;

        if (newIndex < 0) {
            newIndex = iconKeys.length - 1;
        } else if (newIndex >= iconKeys.length) {
            newIndex = 0;
        }

        setSelectedIcon(iconKeys[newIndex]);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleBarClick = (direction) => {
        let newIndex = selectedColorIndex + direction;

        if (newIndex < 0) {
            newIndex = availableColors.length - 1;
        } else if (newIndex >= availableColors.length) {
            newIndex = 0;
        }

        setSelectedColorIndex(newIndex);
    };

    const sendKudo = (e) => {
        e.preventDefault();
        // console.log({ description })
        // console.log({ userReceive })
        const userSendId = user.id;
        const colorCard = availableColors[selectedColorIndex]
        const icon = selectedIcon;
        const colorIcon = selectedColor;
        const templateId = 1;


        startSavingKudo({ description, userSendId, userReceiveEmail, icon, colorIcon, colorCard, templateId });
    }

    return (
        <>
            <Navbar />

            <section className='home-text-kudos'>
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <h1>Cultura WeAre Dev</h1>
                        </div>

                        <div className="container_buttons">
                            <div className="col-lg-4">
                                <button className="btn btn-warning" type="submit" id='btn-recognize' onClick={showVisualizeClick}>Reconocer</button>
                                <button className={`btn btn-secondary ${showKudos && 'activeKudos' || 'btn-visualize'}`} type="submit" onClick={showKudosClick}>Ver mis kudos</button>
                            </div>
                            <hr />
                        </div>
                        {(showKudos || showVisualize) ? null :
                            (
                                <div className="row">
                                    <div className="container_items">
                                        <p className="h3">Comparte tus kudos con tus compañeros de trabajo.</p>
                                    </div>
                                </div>
                            )}

                        {(showVisualize) ?
                            (
                                <div className="container text-center">
                                    <div className="row justify-content-md-center">
                                        <div className="col-md-auto content-nav">
                                            <button
                                                className="btn btn-primary-outline"
                                                onClick={() => handleBarClick(-1)}
                                            >
                                                <BsChevronLeft />
                                            </button>
                                        </div>
                                        <div className="col-md-auto">

                                            <div className={`card mb-4 mt-5`} id="cardKudo" style={{ width: 600, position: 'relative', backgroundColor: availableColors[selectedColorIndex] }}>
                                                <div className="row g-0">
                                                    <div className="col-md-6">
                                                        <div className="container" id="photoURLItem">

                                                            <button className="btn btn-light" onClick={() => handleIconChange(-1)}>

                                                                <BsChevronLeft />
                                                            </button>

                                                            <ColoredIcon icon={icons[selectedIcon]} color={selectedColor} />

                                                            <button className="btn btn-light " onClick={() => handleIconChange(1)}>
                                                                <BsChevronRight />
                                                            </button>
                                                        </div>
                                                        <div className="color-selection">
                                                            <input
                                                                type="color"
                                                                className='form-control form-control-color select-color'
                                                                value={selectedColor}
                                                                onChange={(e) => handleColorChange(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <form className='form-kudo'>

                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text">De:</span>
                                                                <div className="form-control">
                                                                    <input type='email' className="form-control" id="floatingInputGroup2" name='emailTo' /* value={formState.userSendEmail}*/ placeholder={user.email} autoComplete='off' readOnly />
                                                                </div>
                                                            </div>
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text">Para:</span>
                                                                <div className="form-control">
                                                                    <input type='email' className="form-control" id="floatingInputGroup3" /*value={formState.userReceive}*/ name='userReceiveEmail' placeholder="¿Quien recibe?" autoComplete='off' onChange={onInputChange} required />
                                                                </div>
                                                            </div>
                                                            <div className="input-group mb-3">
                                                                <span className="input-group-text">:</span>
                                                                <div className="form-floating">
                                                                    <textarea className="form-control" placeholder="Leave a comment here" /* value={formState.description}*/ name='description' id="floatingTextarea2Disabled" style={{ height: 100 }} onChange={onInputChange}></textarea>
                                                                    <label>Mensaje</label>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>

                                                <div className="d-grid gap-2">
                                                    <button type="submit" className="btn btn-outline-success btn-block mb-2" id="btnSend" style={{ backgroundColor: '#FFFFFF', color: '#171716', borderColor: '#171716' }} onClick={sendKudo}>Enviar</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto content-nav">
                                            <button
                                                className="btn btn-primary-outline"
                                                onClick={() => handleBarClick(1)}
                                            >
                                                <BsChevronRight />
                                            </button>
                                        </div>
                                    </div>
                                </div>) : (null)}

                        {(showKudos) ?
                            (

                                <div className="container">
                                    <div className="row">
                                        {kudosByEmail.map((e) => (
                                            <div className="col-sm-auto" key={e.id}>
                                                <div className={`card mb-4 mt-5`} id="cardKudo" style={{ width: 500, height: 280, position: 'relative', backgroundColor: `${e.colorCard}` }}>
                                                    <div className="row g-0">
                                                        <div className="col-sm-6">
                                                            <div className="container" id="photoURLItemSelected">
                                                                <div className='iconSelected' style={{ color: `${e.colorIcon}` }}>
                                                                    {icons[e.icon]}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <div className="card-body">
                                                                <h3 className="card-title">Felicidades te han enviado un kudo</h3>
                                                                <p className="card-text">{e.description}</p>
                                                                <div className="d-grid gap-2">
                                                                    <button type="submit" className="btn btn-outline-success btn-block mb-2" style={{ backgroundColor: '#FFFFFF', color: '#171716', borderColor: '#171716' }}>Visualizar kudo</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        ))}

                                    </div>
                                </div>

                            ) : null}
                    </div>
                </div>
            </section>

        </>


    )
}
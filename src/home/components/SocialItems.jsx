import { AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';
import { BiLogoFacebook } from 'react-icons/bi';
import { FiTwitter } from 'react-icons/fi';
import './styles/NavbarStyle.css';

export const SocialItems = () => {
    return (
        <div className='socials'>
            {/* <div className="iconS facebook">
                <div className='tooltip'>Facebook</div>
                <span><BiLogoFacebook /></span>
            </div> */}
            {/* <div className="iconS twitter">
                <div className='tooltip'>Twitter</div>
                <span><FiTwitter /></span>
            </div> */}
            <div className="iconS instagram">
                <div className='tooltip'>Instagram</div>
                <span> <AiOutlineInstagram /></span>
            </div>
            <div className="iconS linkedin">
                <div className='tooltip'>Linkedin</div>
                <span><AiOutlineLinkedin /></span>
            </div>
        </div>
    )
}

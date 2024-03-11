import 'src/components/header/Header.css';
import { Link as RouterLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from 'src/1.png'


function Header() {
    return(
        <header>
            <nav id='header-nav' className='navbar navbar-default'>
                <div className='container-fluid'>
                    <div className='navbar-header'>
                        <div className='navbar-brand'>
                            <div className='heading'>
                                <img src={logo} alt='Logo' width='100' height='100'/>
                                <span> DonationPal</span>
                            </div>
                            <nav className='navlink'>
                                <RouterLink to='/' className='Header-Link'>
                                    Home
                                </RouterLink>
                                <RouterLink to='/Login' className='Header-Link'>
                                    Login
                                </RouterLink>
                            </nav>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
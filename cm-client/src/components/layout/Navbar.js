import React from 'react'
import { Link } from 'react-router-dom'
import symbol from '../../assets/EnsoThumb.png'

const Navbar = () => {
    return (
        <header className="masthead">
            
            <div className="inner">
                <img src={symbol} alt='logo'  style={{opacity: '0.85', float: 'left'}}/>
                <h1 className="masthead-brand pl-2">Checkmates</h1>
                <nav className="nav nav-masthead justify-content-center">
                
                    <Link className="nav-link active" to='/'>Dashboard</Link>
                    <Link className="nav-link" to='/checkins'>Checkins</Link>
                    <Link className="nav-link" to='/register'>Register</Link>
                    <Link className="nav-link" to='/login'>Login</Link>
                </nav>
            </div>
        </header>
        
    )
}

export default Navbar;
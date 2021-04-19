import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className="masthead">
            <div className="inner">
                <h1 className="masthead-brand">Checkmates</h1>
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
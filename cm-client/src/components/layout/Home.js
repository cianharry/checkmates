import { Link } from 'react-router-dom'
import React from 'react'

const Home = () => {
    return (
        <div class="text-center">
            <div class="cover-container d-flex h-100 p-3 mx-auto flex-column">
            <main role="main" class="inner cover">
                <h1 class="cover-heading">Checkmates</h1>
                <p class="lead">Join us today and see how regularly logging your experiences in your digital journal has an positive impact on your feelinsg and the productivity in your life</p>
                <p class="lead">
                <Link className="btn btn-lg btn-secondary" to='/register'>Sign Up</Link>
                <br/>
                <Link className="btn btn-sm btn-outline-light mt-2" to='/login'>Login</Link>
                </p>
            </main>

            <footer class="mastfoot mt-auto">
                <div class="inner">
                <p>Cover template for <a href="https://getbootstrap.com/">Bootstrap</a>, by <a href="https://twitter.com/mdo">@mdo</a>.</p>
                </div>
            </footer>
            </div>
        </div>
    )
}

export default Home
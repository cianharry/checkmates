// helper function that recieves the token if present and adds it to the request headers
import axios from 'axios';

const setAuthToken = token => {
    // if there is a token in local storage, add it to global headers as the x-auth-token value
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    }
    else {
        // otherwise remove the x-auth-token from the global headers
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;
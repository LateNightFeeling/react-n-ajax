import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.headers.common["Authorisation"] = "Auth Yes";
axios.defaults.headers.post['Content-type'] = "application/json";

axios.interceptors.request.use(request => {
    console.log(request);
    return request;
},
    error => {
        console.log("Interceptors error : " + error);
        return Promise.reject(error);
    });

axios.interceptors.response.use(response => {
    console.log(response);
    return response;
}, error => {
    console.log("Interceptors Error [response] : " + error);
    return Promise.reject(error);
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

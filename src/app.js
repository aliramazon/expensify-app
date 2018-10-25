import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter, { history } from './Routers/AppRouters';
import { Provider } from 'react-redux';
import { store } from './store/configStore';
import { startSetExpenses } from './actions/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';
const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if(!hasRendered){
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(startSetExpenses()).then(() => {
           renderApp();
           if(history.location.pathname === '/'){
               history.push('/dashboard');
           }
        });
    } else {
        renderApp();
        history.push('/');
    }
});

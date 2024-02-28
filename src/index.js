import {React, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import './i18n'
import Loading from "./components/Loading/Loading";
import {Provider} from "react-redux";
import store from "./redux/store";
import Preloader from "./components/Preloader/Preloader";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Suspense fallback={<Preloader/>}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Suspense>
    </BrowserRouter>
);


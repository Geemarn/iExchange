import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Detector } from 'react-detect-offline';
import OfflineView from './_shared/components/OfflineView';
import App from './App';
import store, { history, persistor } from './redux/store';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

const main = (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </PersistGate>
    </Provider>
);
// render the main component
ReactDOM.render(
    <Detector render={({ online }) => (online ? main : <OfflineView />)} />,
    container
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
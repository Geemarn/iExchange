import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ui from './ui';

const appReducers = history =>
    combineReducers({
        router: connectRouter(history),
        ui,
    });

export default appReducers;

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import ui from './ui';

const appReducers = (history: any) =>
    combineReducers({
        router: connectRouter(history),
        ui,
    });

export default appReducers;

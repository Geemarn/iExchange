import {
    UI_ERROR,
    UI_LOADING,
    UI_RESET,
    // UI_SET_PAGINATION,
    UI_UPDATE_STATE,
    UI_DISPLAY_MODAL,
    UI_INITIALIZE,
} from '../actions/index';

const defaultState = {
    userAccount: null,
    errors: {},
    loading: {},
    pagination: {},
    initializer: {},
    showModal: null,
};


const uiReducer = (state = defaultState, action) => {
    switch (action.type) {
        case UI_UPDATE_STATE:
            return { ...state, layout: { ...state.layout, ...action.payload } };
        case UI_RESET: {
            return Object.assign({}, state, {
                module,
                initialize: {
                    navigation: { items: [] },
                    routes: [],
                },
            });
        }
        case UI_LOADING.START:
            return getNewLoadingState(state, action, true);
        case UI_LOADING.END:
            return getNewLoadingState(state, action, false);
        case UI_ERROR:
            return Object.assign({}, state, {
                errors: { ...state.errors, [action.key]: action.value },
            });
        case UI_DISPLAY_MODAL.START:
            return {
                ...state,
                showModal: action.key,
            };
        // case UI_SET_PAGINATION.START:
        //     const { key, payload } = action.meta;
        //     return {
        //         ...state,
        //         pagination: {
        //             ...state.pagination,
        //             [key]: payload,
        //         },
        //     };
        // case UI_INITIALIZE:
        //     const { module, app, eventName } = action.payload;
        //     return Object.assign({}, state, {
        //         module,
        //         initializer: initializeModule(module, app, eventName),
        //     });
        default:
            return state;
    }
};

export default uiReducer;

export const getLoading = ({ ui }, key) => {
    return ui.loading[key];
};

function getNewLoadingState(currentState = {}, action, value) {
    const { key } = action;
    return Object.assign({}, currentState, {
        loading: { ...currentState.loading, [key]: value },
    });
}
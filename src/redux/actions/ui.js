import { createActionString, createActionType } from '../../utils/functions';

export const UI_UPDATE_STATE = createActionString("UPDATE_UI_STATE", "App");
export const UI_INITIALIZE = createActionString("UI_INITIALIZE", "APP");
export const UI_RESET = createActionString("UI_RESET", "APP");
export const UI_LOADING = createActionType("UI_LOADING", "APP");
export const UI_ERROR = createActionString("UI_ERROR", "APP");
export const UI_NAVIGATE = createActionString("UI_NAVIGATE", "APP");
export const SET_NEXT_URL = createActionType("SET_NEXT_URL", "Location");
export const UI_DISPLAY_MODAL = createActionType("UI_DISPLAY_MODAL", "APP");

export const initialize = (module, app, eventName) => ({
  type: UI_INITIALIZE,
  payload: { module, app, eventName },
});

export const resetUI = () => ({
  type: UI_RESET,
});

export const startUILoading = (key) => ({
  type: UI_LOADING.START,
  key,
});

export const stopUILoading = (key) => ({
  type: UI_LOADING.END,
  key,
});

export const displayModal = (key) => ({
  type: UI_DISPLAY_MODAL.START,
  key,
});

export const updateUIError = (key, value) => ({
  type: UI_ERROR,
  key,
  value,
});

export const navigateTo = (path) => ({
  type: UI_NAVIGATE,
  payload: path,
});

export const updateUIState = (payload) => ({
  type: UI_UPDATE_STATE,
  payload,
});

export const setNextUrl = (payload) => ({ type: SET_NEXT_URL.START, payload });

import { createActionString, createActionType } from "../../utils/functions";

export const UI_UPDATE_STATE = createActionString("UPDATE_UI_STATE", "App");
export const UI_INITIALIZE = createActionString("UI_INITIALIZE", "APP");
export const UI_RESET = createActionString("UI_RESET", "APP");
export const UI_LOADING = createActionType("UI_LOADING", "APP");
export const UI_ERROR = createActionString("UI_ERROR", "APP");
export const UI_NAVIGATE = createActionString("UI_NAVIGATE", "APP");
export const SET_NEXT_URL = createActionType("SET_NEXT_URL", "Location");
export const UI_DISPLAY_MODAL = createActionType("UI_DISPLAY_MODAL", "APP");

export const initialize = (module: any, app: any) => ({
  type: UI_INITIALIZE,
  payload: { module, app },
});

export const resetUI = () => ({
  type: UI_RESET,
});

export const startUILoading = (key: String) => ({
  type: UI_LOADING.START,
  key,
});

export const stopUILoading = (key: String) => ({
  type: UI_LOADING.END,
  key,
});

export const displayModal = (key: String) => ({
  type: UI_DISPLAY_MODAL.START,
  key,
});

export const updateUIError = (
  key: String,
  value: String | null | React.ReactNode
) => ({
  type: UI_ERROR,
  key,
  value,
});

export const navigateTo = (path: String) => ({
  type: UI_NAVIGATE,
  payload: path,
});

export const updateUIState = (payload: String) => ({
  type: UI_UPDATE_STATE,
  payload,
});

export const setNextUrl = (payload: String) => ({
  type: SET_NEXT_URL.START,
  payload,
});

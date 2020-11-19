import { createActionType, createActionString } from "../../utils/functions";
export const API_REQUEST = createActionType("API_REQUEST", "API Request");
export const UPDATE_SESSION_TOKEN = createActionString(
  "UPDATE_SESSION_TOKEN",
  "auth"
);
export const RESET_APP_STATE = createActionString("RESET_APP_STATE", "APP");

export const apiRequest = (meta: any) => ({
  type: API_REQUEST.START,
  meta,
});

export const updateSessionToken = (token: string) => ({
  type: UPDATE_SESSION_TOKEN,
  payload: token,
});

export const resetAppState = () => ({
  type: RESET_APP_STATE,
});

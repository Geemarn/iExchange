/* eslint-disable import/no-anonymous-default-export */
import { isEmpty } from "lodash";
import { message } from "antd";
import { push } from "connected-react-router";
import { formatMessagesFromError } from "../../utils/functions";
import {
  API_REQUEST,
  startUILoading,
  stopUILoading,
  UI_NAVIGATE,
  // uiSetPagination,
  updateUIError,
  updateSessionToken,
} from "../actions";
import { createAPIRequest } from "../../utils/services/axios";
import { Dispatch } from "redux";

const apiRequest = ({ dispatch }: { dispatch: Dispatch }) => (
  next: Function
) => (action: { type: String; meta?: any }) => {
  if (action.type === API_REQUEST.START) {
    const {
      method,
      url,
      key,
      payload,
      onError,
      successMessage,
      params,
      onSuccess,
      nextRoute,
      errorMessage,
      noSuccessToast,
      noErrorToast,
    } = action.meta;

    message.config({
      top: 50,
      duration: 2,
      maxCount: 3,
    });

    const config: any = { method, url };

    if (payload && (!isEmpty(payload) || payload instanceof FormData)) {
      config.data = payload;
    }

    if (params && !isEmpty(params)) {
      config.params = params;
    }

    dispatch(updateUIError(key, null));
    dispatch(startUILoading(key));
    createAPIRequest(config)
      .then((response: any) => {
        const { data, meta } = response;
        // if (meta && meta.pagination) {
        //   dispatch(uiSetPagination(key, meta.pagination));
        // }
        if (meta && meta.token) {
          dispatch(updateSessionToken(meta.token));
        }
        if (onSuccess) {
          if (typeof onSuccess === "function") {
            onSuccess(data);
          } else {
            dispatch({ type: onSuccess, payload: data });
          }
        }
        if (nextRoute) {
          dispatch(push(nextRoute));
        }
        dispatch(stopUILoading(key));
        const toastMessage = successMessage || (meta && meta.message);
        if (!noSuccessToast && toastMessage) {
          message.success(toastMessage);
        }
      })
      .catch((e) => {
        const showErrorMessage = (msg: any) => {
          if (!noErrorToast && method.toLowerCase() !== "get" && msg) {
            message.error(msg);
          }
        };
        if (onError) {
          if (typeof onError === "function") {
            onError(e);
          } else {
            const errorMsg = formatMessagesFromError(e);
            dispatch(updateUIError(key, errorMsg));
            showErrorMessage(errorMsg);
          }
        } else {
          const error =
            (e && e.data && e.data.meta && e.data.meta.error) ||
            (e && e.error) ||
            e;
          const message = errorMessage || formatMessagesFromError(error);
          dispatch(updateUIError(key, error.message));
          showErrorMessage(message);
        }
        dispatch(stopUILoading(key));
      });
  }
  return next(action);
};

export const navigateTo = ({ dispatch }: { dispatch: Dispatch }) => (
  next: Function
) => (action: { type: String; meta?: any; payload?: any }) => {
  next(action);
  if (action.type === UI_NAVIGATE) {
    dispatch(push(action.payload));
  }
};

export default [apiRequest, navigateTo];

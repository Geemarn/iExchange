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

const apiRequest = ({ dispatch }) => next => action => {
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

    const config = { method, url };

    if (payload && (!isEmpty(payload) || payload instanceof FormData)) {
      config.data = payload;
    }

    if (params && !isEmpty(params)) {
      config.params = params;
    }

    dispatch(updateUIError(key, null));
    dispatch(startUILoading(key));
    createAPIRequest(config)
        .then(response => {
          const { data, meta } = response;
          // if (meta && meta.pagination) {
          //   dispatch(uiSetPagination(key, meta.pagination));
          // }
          if (meta && meta.token) {
            dispatch(updateSessionToken(meta.token));
          }
          if (onSuccess) {
            if (typeof onSuccess === 'function') {
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
        .catch(e => {
          const showErrorMessage = message => {
            if (!noErrorToast && method.toLowerCase() !== 'get' && message) {
              if (typeof message === 'string') message.error(message);
            }
          };
          if (onError) {
            if (typeof onError === 'function') {
              onError(e);
            } else {
              const message = formatMessagesFromError(e);
              dispatch(updateUIError(key, message));
              showErrorMessage(message);
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

export const navigateTo = ({ dispatch }) => next => action => {
  next(action);
  if (action.type === UI_NAVIGATE) {
    dispatch(push(action.payload));
  }
};

export default [ apiRequest, navigateTo];
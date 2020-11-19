import React from "react";
import { isString } from "lodash";

export const createActionType = (type: String, entity: String = "App") => ({
  START: `@@[${entity}] ${type}`,
  SUCCESS: `@@[${entity}] ${type}_SUCCESS`,
  ERROR: `@@[${entity}] ${type}_ERROR`,
  END: `@@[${entity}] ${type}_END`,
});
export const createActionString = (type: String, entity: String = "App") =>
  `@@[${entity}] ${type}`;

export const formatMessagesFromError = (error: any): React.ReactNode => {
  let message = (
    <>
      <span>
        <i className="fas fa-exclamation-triangle" /> {error && error.message}
      </span>
    </>
  );
  if (error && error.messages) {
    message = (
      <>
        {message}
        {isString(error.messages) && (
          <ul>
            <li> {error.messages} </li>
          </ul>
        )}
      </>
    );
  }
  return (
    <>
      {message}
      {!!error && error.messages && (
        <ul className="pl-1">
          {Object.keys(error.messages).map((item) => {
            return (
              Array.isArray(error.messages[item]) &&
              error.messages[item].map((item2: any, i: number) => <li key={i}>{item2}</li>)
            );
          })}
        </ul>
      )}
    </>
  );
};

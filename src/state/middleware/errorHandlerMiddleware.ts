import { Middleware, isRejectedWithValue } from "@reduxjs/toolkit";
import { clearToken } from "../reducers/token";
import { ResponseStatus } from "../../system/constants";

interface ServerErrorResponse {
  status: number;
  message?: string;
  data?: any;
}

const errorHandlerMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejectedWithValue(action)) {
      const { status } = action.payload as ServerErrorResponse;
      if (status === ResponseStatus.UNAUTHORIZED) {
        dispatch(clearToken());
      }
    }

    return next(action);
  };

export default errorHandlerMiddleware;

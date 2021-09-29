import {
  FILE_CREATE_FAIL,
  FILE_CREATE_REQUEST,
  FILE_CREATE_SUCCESS,
  FILE_DOWNLOAD_FAIL,
  FILE_DOWNLOAD_REQUEST,
  FILE_DOWNLOAD_SUCCESS,
} from "../actions/types";

export const downloadListReducer = (state = { downloads: [] }, action) => {
  switch (action.type) {
    case FILE_DOWNLOAD_REQUEST:
      return { loading: true, downloads: [] };
    case FILE_DOWNLOAD_SUCCESS:
      return { loading: false, downloads: action.payload };
    case FILE_DOWNLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const downloadCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case FILE_CREATE_REQUEST:
      return { loading: true };
    case FILE_CREATE_SUCCESS:
      return { loading: false, success: true, download: action.payload };
    case FILE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

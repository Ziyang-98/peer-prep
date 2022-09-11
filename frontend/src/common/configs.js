const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000";

const PREFIX_USER_SVC = "/api/user";
const PREFIX_LOGIN = "/login";
const PREFIX_DELETE = "/delete-user";
const PREFIX_CHANGE_PASSWORD = "/change-password";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_LOGIN = URL_USER_SVC + PREFIX_LOGIN;
export const URL_DELETE_USER = URL_USER_SVC + PREFIX_DELETE;
export const URL_CHANGE_PASSWORD = URL_USER_SVC + PREFIX_CHANGE_PASSWORD;

export const URI_MATCHING_SVC =
  process.env.URI_MATCHING_SVC || "http://localhost:8001";

const PREFIX_MATCH_SVC = "/match";

export const URL_MATCHING_SVC = URI_MATCHING_SVC + PREFIX_MATCH_SVC;

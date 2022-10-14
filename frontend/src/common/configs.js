const URI_USER_SVC = process.env.URI_USER_SVC;

const PREFIX_USER_SVC = "/api/user";
const PREFIX_LOGIN = "/login";
const PREFIX_DELETE = "/delete-user";
const PREFIX_CHANGE_PASSWORD = "/change-password";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_LOGIN = URL_USER_SVC + PREFIX_LOGIN;
export const URL_DELETE_USER = URL_USER_SVC + PREFIX_DELETE;
export const URL_CHANGE_PASSWORD = URL_USER_SVC + PREFIX_CHANGE_PASSWORD;

export const URI_MATCHING_SVC =
  process.env.URI_MATCHING_SVC;

const PREFIX_MATCH_SVC = "/api/matchService/match";

export const URL_MATCHING_SVC = URI_MATCHING_SVC + PREFIX_MATCH_SVC;

export const URI_COLLAB_SVC =
  process.env.URI_COLLAB_SVC || "http://localhost:8002";
export const TOKEN_AGE = process.env.TOKEN_AGE || 3600;

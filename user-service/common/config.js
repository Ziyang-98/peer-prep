export const URI_FRONTEND = "https://frontend-rob2padjya-de.a.run.app";
export const URI_USER_SVC = "https://user-service-rob2padjya-de.a.run.app" || "http://localhost:8000";

export const PREFIX_USER_SVC = "/api/user";
export const PREFIX_LOGIN = "/login";
export const PREFIX_DELETE = "/delete-user";
export const PREFIX_CHANGE_PASSWORD = "/change-password";

export const API_LOGIN = PREFIX_USER_SVC + PREFIX_LOGIN;
export const API_DELETE_USER = PREFIX_USER_SVC + PREFIX_DELETE;
export const API_CHANGE_PASSWORD = PREFIX_USER_SVC + PREFIX_CHANGE_PASSWORD;

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;

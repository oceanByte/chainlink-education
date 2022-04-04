const AUTH_STORAGE_KEY = 'reduxPersist:auth';

export const getAuthData = () =>
  JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');

export const hasAuthData = () => !!getAuthData().user;

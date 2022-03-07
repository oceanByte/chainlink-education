const AUTH_STORAGE_KEY = 'reduxPersist:auth';

export const getAuthData = () =>
  JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}');

console.log(!!getAuthData().user);

export const hasAuthData = () => !!getAuthData().user;

// export const saveAuthData = ({ userId, accessToken, refreshToken, username }) =>
//   localStorage.setItem(
//     AUTH_STORAGE_KEY,
//     JSON.stringify({ userId, accessToken, refreshToken, username })
//   );

// export const clearAuthData = () => localStorage.removeItem(AUTH_STORAGE_KEY);

// /**
//  * Get data saved in token (userId, role..)
//  * @returns {object|null}
//  */
// export const getTokenData = () => {
//   const { accessToken } = getAuthData();

//   if (!accessToken || !ACCESS_TOKEN_DATA_REGEXP.test(accessToken)) {
//     return null;
//   }

//   const accessTokenData = accessToken.replace(ACCESS_TOKEN_DATA_REGEXP, '$1');
//   return JSON.parse(atob(accessTokenData));
// };

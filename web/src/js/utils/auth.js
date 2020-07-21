import Cookies from 'js-cookie';

const accessToken = 'vue_admin_template_token';
const expiresIn = 'vue_admin_template_expires_in';
const refreshToken = 'vue_admin_template_refresh_token';
const refreshExpiresIn = 'vue_admin_template_refresh_expires_in';
const loginDate = 'vue_admin_template_login_date';
const loadAccessTokenDate = 'vue_admin_template_load_access_token_date';
const location = 'vue_admin_template_load_location';
const userLocation = 'vue_admin_template_load_user_location';
const userInfo = 'vue_admin_template_load_user_info';
const userName = 'vue_admin_template_load_user_name';
const lastUserName = 'vue_admin_template_load_last_user_name';
const url = 'url';

export function removeUrl() {
  return Cookies.remove(url);
}
// accessToken
export function getAccessToken() {
  return Cookies.get(accessToken);
}

export function setAccessToken(token) {
  return Cookies.set(accessToken, token);
}

export function removeAccessToken() {
  return Cookies.remove(accessToken);
}

// expiresIn
export function getExpiresIn() {
  return Cookies.get(expiresIn);
}

export function setExpiresIn(token) {
  return Cookies.set(expiresIn, token);
}

export function removeExpiresIn() {
  return Cookies.remove(expiresIn);
}

// refreshExpiresIn
export function getRefreshExpiresIn() {
  return Cookies.get(refreshExpiresIn);
}

export function setRefreshExpiresIn(token) {
  return Cookies.set(refreshExpiresIn, token);
}

export function removeRefreshExpiresIn() {
  return Cookies.remove(refreshExpiresIn);
}

// refreshToken
export function getRefreshToken() {
  return Cookies.get(refreshToken);
}

export function setRefreshToken(token) {
  return Cookies.set(refreshToken, token);
}

export function removeRefreshToken() {
  return Cookies.remove(refreshToken);
}

// loginDate
export function getLoginDate() {
  return Cookies.get(loginDate);
}

export function setLoginDate(date) {
  return Cookies.set(loginDate, date);
}

export function removeLoginDate() {
  return Cookies.remove(loginDate);
}

// loadAccessTokenDate
export function getLoadAccessTokenDate() {
  return Cookies.get(loadAccessTokenDate);
}

export function setLoadAccessTokenDate(date) {
  return Cookies.set(loadAccessTokenDate, date);
}

export function removeLoadAccessTokenDate() {
  return Cookies.remove(loadAccessTokenDate);
}

// location
export function getLocation() {
  return Cookies.get(location);
}

export function setLocation(date) {
  return Cookies.set(location, date);
}

export function removeLocation() {
  return Cookies.remove(location);
}

// userLocation
export function getUserLocation() {
  return Cookies.get(userLocation);
}

export function setUserLocation(date) {
  return Cookies.set(userLocation, date);
}

export function removeUserLocation() {
  return Cookies.remove(userLocation);
}

// userInfo
export function getUserInfo() {
  return Cookies.get(userInfo);
}

export function setUserInfo(data) {
  return Cookies.set(userInfo, data);
}

export function removeUserInfo() {
  return Cookies.remove(userInfo);
}
// userName
export function getUserName() {
  return Cookies.get(userName);
}

export function setUserName(data) {
  return Cookies.set(userName, data);
}

export function removeUserName() {
  return Cookies.remove(userName);
}
// lastUserName
export function getLastUserName() {
  return Cookies.get(lastUserName);
}

export function setLastUserName(data) {
  return Cookies.set(lastUserName, data);
}

export function removeLastUserName() {
  return Cookies.remove(lastUserName);
}

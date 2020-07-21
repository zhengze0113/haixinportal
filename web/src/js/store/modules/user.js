import {
  login,
  logout,
  getInfo,
  loginApi,
  refresh
} from '@/api/login';
import {
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  setExpiresIn,
  getRefreshToken,
  removeExpiresIn,
  setRefreshExpiresIn,
  removeRefreshExpiresIn,
  setRefreshToken,
  removeRefreshToken,
  setLoginDate,
  removeLoginDate,
  setLoadAccessTokenDate,
  removeLoadAccessTokenDate,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  getUserName,
  setUserName,
  removeUserName,
  setLastUserName,
  setLocation,
  setUserLocation,
  removeUserLocation,
  removeLastUserName,
  removeLocation,
  removeUrl
} from '@/utils/auth';

const user = {
  state: {
    token: getAccessToken(),
    name: getUserName(),
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {

    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginApi(username, userInfo.password).then(response => {
          const data = response.content;
          const loginData = new Date().getTime() / 1000;
          setAccessToken(data.tokenInfo.access_token);
          setExpiresIn(data.tokenInfo.expires_in);
          setRefreshToken(data.tokenInfo.refresh_token);
          setRefreshExpiresIn(data.tokenInfo.refresh_expires_in);
          setLoginDate(loginData);
          setLoadAccessTokenDate(loginData);
          setUserInfo(data.userTokenInfo);
          setUserName(data.preferred_username);
          commit('SET_TOKEN', data.tokenInfo.access_token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 刷新token
    refreshToken({ commit }) {
      return new Promise((resolve, reject) => {
        refresh(getRefreshToken()).then(response => {
          const data = response.content;
          const loginData = new Date().getTime() / 1000;
          setAccessToken(data.tokenInfo.access_token);
          setExpiresIn(data.tokenInfo.expires_in);
          setRefreshToken(data.tokenInfo.refresh_token);
          setRefreshExpiresIn(data.tokenInfo.refresh_expires_in);
          setLoadAccessTokenDate(loginData);
          setUserInfo(data.userTokenInfo);
          commit('SET_TOKEN', data.tokenInfo.access_token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          // const data = response.data;
          console.log(response);
          // if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
          //   commit('SET_ROLES', data.roles);
          // } else {
          //   reject('getInfo: roles must be a non-null array !');
          // }
          // commit('SET_NAME', data.name);
          // commit('SET_AVATAR', data.avatar);
          resolve(response);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          removeAccessToken();
          removeExpiresIn();
          removeRefreshExpiresIn();
          removeRefreshToken();
          removeLoginDate();
          removeLoadAccessTokenDate();
          removeUserInfo();
          removeUserName();
          removeLocation();
          removeUrl();
          setUserLocation(location.origin + '/#/userCentre/userShoppingCart');
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        removeAccessToken();
        removeExpiresIn();
        removeRefreshExpiresIn();
        removeRefreshToken();
        removeLoginDate();
        removeLoadAccessTokenDate();
        removeUserInfo();
        resolve();
      });
    }
  }
};

export default user;

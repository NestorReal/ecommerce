import { isEmpty } from 'lodash';

const TOKEN_KEY = 'tk';
const USER_INFO = 'sm_user';
const COMPANY_INFO = 'company_info';
const SHOP_INFO = 'shop_info';
const COUPONS = 'coupons';
const SHIPPING = 'shipping';
const PARTNERS_INFO = 'partners_info';

const { parse } = JSON;
const { stringify } = JSON;

const auth = {
  /**
   * Remove an item from the used storage
   * @param  {String} key [description]
   */
  clear(key) {
    if (localStorage && localStorage.getItem(key)) {
      return localStorage.removeItem(key);
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return sessionStorage.removeItem(key);
    }

    return null;
  },

  /**
   * Clear all app storage
   */
  clearAppStorage() {
    if (localStorage) {
      localStorage.clear();
    }

    if (sessionStorage) {
      sessionStorage.clear();
    }
  },

  logout() {
    this.clearAppStorage();
    window.location.href = '/auth';
  },

  clearToken(tokenKey = TOKEN_KEY) {
    return auth.clear(tokenKey);
  },

  clearUserInfo(userInfo = USER_INFO) {
    return auth.clear(userInfo);
  },

  clearCompanyInfo(companyInfo = COMPANY_INFO) {
    return auth.clear(companyInfo);
  },

  clearShopInfo(shopInfo = SHOP_INFO) {
    return auth.clear(shopInfo);
  },

  clearCouponsShippingInfo(couponsShippingInfo = COUPONS) {
    return auth.clear(couponsShippingInfo);
  },

  clearShippingInfo(shippingInfo = SHIPPING) {
    return auth.clear(shippingInfo);
  },

  clearPartnersInfo(partnersInfo = PARTNERS_INFO) {
    return auth.clear(partnersInfo);
  },

  /**
   * Returns data from storage
   * @param  {String} key Item to get from the storage
   * @return {String|Object}     Data from the storage
   */
  get(key) {
    if (localStorage && localStorage.getItem(key)) {
      return parse(localStorage.getItem(key)) || null;
    }

    if (sessionStorage && sessionStorage.getItem(key)) {
      return parse(sessionStorage.getItem(key)) || null;
    }

    return null;
  },

  getToken(tokenKey = TOKEN_KEY) {
    return auth.get(tokenKey);
  },

  getUserInfo(userInfo = USER_INFO) {
    return auth.get(userInfo);
  },

  getCompanyInfo(companyInfo = COMPANY_INFO) {
    return auth.get(companyInfo);
  },

  getShopInfo(shopInfo = SHOP_INFO) {
    return auth.get(shopInfo);
  },

  getCouponsShippingInfo(couponsShippingInfo = COUPONS) {
    return auth.get(couponsShippingInfo);
  },

  getShippingInfo(shippingInfo = SHIPPING) {
    return auth.get(shippingInfo);
  },

  getPartnersInfo(partnersInfo = PARTNERS_INFO) {
    return auth.get(partnersInfo);
  },

  /**
   * Set data in storage
   * @param {String|Object}  value    The data to store
   * @param {String}  key
   * @param {Boolean} isLocalStorage  Defines if we need to store in localStorage or sessionStorage
   */
  set(value, key, isLocalStorage) {
    if (isEmpty(value)) {
      return null;
    }

    if (isLocalStorage && localStorage) {
      return localStorage.setItem(key, stringify(value));
    }

    if (sessionStorage) {
      return sessionStorage.setItem(key, stringify(value));
    }

    return null;
  },

  setToken(value = '', isLocalStorage = false, tokenKey = TOKEN_KEY) {
    return auth.set(value, tokenKey, isLocalStorage);
  },

  setUserInfo(value = '', isLocalStorage = false, userInfo = USER_INFO) {
    return auth.set(value, userInfo, isLocalStorage);
  },

  setCompanyInfo(
    value = '',
    isLocalStorage = false,
    companyInfo = COMPANY_INFO,
  ) {
    return auth.set(value, companyInfo, isLocalStorage);
  },

  setShopInfo(value = '', isLocalStorage = false, shopInfo = SHOP_INFO) {
    return auth.set(value, shopInfo, isLocalStorage);
  },

  setCouponsShippingInfo(
    value = '',
    isLocalStorage = false,
    couponsShippingInfo = COUPONS,
  ) {
    return auth.set(value, couponsShippingInfo, isLocalStorage);
  },

  setShippingInfo(value = '', isLocalStorage = false, shippingInfo = SHIPPING) {
    return auth.set(value, shippingInfo, isLocalStorage);
  },

  setPartnersInfo(
    value = '',
    isLocalStorage = false,
    partnersInfo = PARTNERS_INFO,
  ) {
    return auth.set(value, partnersInfo, isLocalStorage);
  },
};

export default auth;

import Taro from "@tarojs/taro";

export const getFriendList = async () => {
  return Taro.request({
    url: "http://localhost:9999/api/user/list",
    method: "GET",
    header: {
      "content-type": "application/json",
    },
  });
};

export const getSearchInfo = async () => {
  return Taro.request({
    url: "http://localhost:9999/api/user/searchList",
    method: "GET",
    header: {
      "content-type": "application/json",
    },
  });
};

export const getUserDetail = async () => {
  return Taro.request({
    url: "http://localhost:9999/api/user/userDetail",
    method: "GET",
    header: {
      "content-type": "application/json",
    },
  });
};

export const getRequestList = async () => {
  return Taro.request({
    url: "http://localhost:9999/api/user/requestList",
    method: "GET",
    header: {
      "content-type": "application/json",
    },
  });
};

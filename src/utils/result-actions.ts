import ResultState from '../config/result-State';

export const success = (data = null, msg = '请求成功') => {
  return {
    code: ResultState.SUCCESS,
    msg,
    data,
  };
};

export const error = (data = null, msg = '服务器异常') => {
  return {
    code: ResultState.ERROR,
    msg,
    data,
  };
};

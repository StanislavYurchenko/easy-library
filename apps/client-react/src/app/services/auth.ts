import { AxiosResponse } from 'axios';
import { AccessToken, ApiRes, Login } from '@libs/api-interface';
import { instance } from './api';

export const userToken = {
  set(token: string) {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    instance.defaults.headers.common.Authorization = '';
  },
};

// export const registration = ({ name, email, password }) => {
//   return axios.post('/auth/register', { name, email, password }).then(data => data);
// };

export const login = (credentials: Login): Promise<ApiRes<AccessToken>> => {
  return instance
    .post<ApiRes<AccessToken>, AxiosResponse<ApiRes<AccessToken>>, Login>('/auth/login', credentials)
    .then(({ data }) => data);
};

// export const logout = () => {
//   return instance.post('auth/logout').then(data => data);
// };

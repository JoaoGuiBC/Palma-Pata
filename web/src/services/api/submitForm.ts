import { AxiosResponse } from 'axios';
import { api } from '.';

interface ISubmitForm {
  data: any,
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete',
}

export async function submitForm({ data, url, method }: ISubmitForm) {
  try {
    let response: AxiosResponse<any, any> = {} as AxiosResponse<any, any>;

    if (method === 'post') {
      response = await api.post(url, data);
    } else if (method === 'put') {
      response = await api.put(url, data);
    }

    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
}

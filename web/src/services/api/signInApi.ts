import { api } from '.';

export async function signInApi(data: any) {
  try {
    const response = await api.post('/sessions', data);
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
}

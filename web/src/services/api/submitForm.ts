import { api } from '.';

export async function submitForm(data: any, url: string) {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error: any) {
    throw error.response.data.message;
  }
}

import { api } from '.';
import { MakeRequestInputs } from '../../utils/yupSchemas/makeRequestFormSchema';

interface ISubmitForm {
  data: MakeRequestInputs,
  token: string,
}

interface IUser {
  id: string,
  username: string,
  email: string,
  phone_number: string,
  street: string,
  street_number: number,
  district: string,
  city: string,
  adm: boolean,
  master: boolean
}

export async function makeNewRequest({ data, token }: ISubmitForm) {
  try {
    const userInfo = {
      username: data.username,
      phone_number: data.phone_number,
      street: data.street,
      street_number: data.street_number,
      district: data.district,
      city: data.city,
    };

    await api.post(
      '/requests',
      { quantity: data.quantity },
      { headers: { authorization: token } },
    );
    const updatedUser: IUser = await api.put(
      '/users',
      userInfo,
      { headers: { authorization: token } },
    );

    return updatedUser;
  } catch (error: any) {
    throw error.response.data.message;
  }
}

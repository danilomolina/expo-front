import { api } from "src/configs/api";
import configValues from "src/configs/configValues";
import { ResponseAPI, ResponseLoginDefault } from "src/models/api";
import { UserCreate, UserGet, UserLogin, UserUpdate } from "src/models/user";

const { API: { EXPOAPI } } = configValues;

export const signin = async (email: string, password: string): Promise<ResponseAPI<ResponseLoginDefault>> => {
  try {
    let userLogin: UserLogin = { email: email, password: password };

    const { data }: { data: ResponseAPI<ResponseLoginDefault> } = await api.post(`${EXPOAPI.url}/signin`, userLogin);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<ResponseLoginDefault>;

  }
  catch (error: any) {
    console.log(error);
    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<ResponseLoginDefault>
  }
}

export const signup = async (email: string, password: string): Promise<ResponseAPI<ResponseLoginDefault>> => {
  try {
    let userCreate: UserCreate = { email: email, password: password, planId: 0, username: email };

    const { data }: { data: ResponseLoginDefault } = await api.post(`${EXPOAPI.url}/signup`, userCreate);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<ResponseLoginDefault>;
  }
  catch (error: any) {
    console.log(error);
    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<ResponseLoginDefault>
  }
}

export const updateUSerPlan = async (idUser: number, planId: number): Promise<ResponseAPI<ResponseLoginDefault>> => {
  try {
    let userUpdate: UserUpdate = { planId: planId };

    const { data }: { data: ResponseLoginDefault } = await api.patch(`${EXPOAPI.url}/users/${idUser}`, userUpdate);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<ResponseLoginDefault>;

  }
  catch (error: any) {
    console.log(error);
    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<ResponseLoginDefault>
  }
}

export const getUserById = async (idUser: number): Promise<UserGet[]> => {
  try {

    const { data }: { data: UserGet[] } = await api.get(`${EXPOAPI.url}/users`, {
      params: {
        filter: JSON.stringify({
          offset: 0,
          limit: 100,
          skip: 0,
          where: {
            additionalProp1: {
              id: 2,
            },
          },
        }),
      },
    },
    )

    return data
  }
  catch (error: any) {
    console.log(error);
    return error
  }
}

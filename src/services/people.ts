import { api } from "src/configs/api";
import { ResponseAPI, ResponseLoginDefault } from "src/models/api";
import configValues from "src/configs/configValues";
import { UserDataType } from "src/context/types";

const { API: { EXPOAPI } } = configValues;

export const savePeople = async (people: UserDataType): Promise<ResponseAPI<ResponseLoginDefault>> => {
  try {

    const { data }: { data: ResponseAPI<ResponseLoginDefault> } = await api.post(`${EXPOAPI.url}/people`, people);

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

export const updatePeople = async (user: UserDataType): Promise<ResponseAPI<UserDataType>> => {
  try {

    const { data }: { data: UserDataType } = await api.put(`${EXPOAPI.url}/people/${user.id}`, user);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<UserDataType>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<UserDataType>
  }
}

export const getPeople = async (offset: number, limit: number, skip: number, id?: string): Promise<ResponseAPI<UserDataType[] | []>> => {
  try {

    const filter: any = {};

    if (id) {
      filter.where = {
        or: [
          id ? { id: id } : {}
        ],
      };
    }

    const { data }: { data: UserDataType[] } = await api.get(`${EXPOAPI.url}/people`, {
      params: {
        offset: offset,
        limit: limit,
        skip: skip,
        filter: filter
      }
    });

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<UserDataType[] | []>;
  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<UserDataType[] | []>
  }
}

import { api } from "src/configs/api";
import { ResponseAPI, ResponseLoginDefault } from "src/models/api";
import configValues from "src/configs/configValues";
import { PeopleCount, UserDataType } from "src/context/types";

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

export const getPeople = async (offset: number, limit: number, skip: number, id?: string, name?: string, company?: string, idPlan?: string): Promise<ResponseAPI<UserDataType[] | []>> => {
  try {

    const filter: any = {};

    if (id || name || company || idPlan) {
      filter.where = {
        or: [
          id ? { id: id } : {},
          name ? { name: name } : {},
          company ? { company: company } : {},
          idPlan ? { planId: idPlan } : {}
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

export const getPeopleCount = async (planId?: string): Promise<ResponseAPI<PeopleCount>> => {
  try {
    let filter = ''

    if (planId !== undefined)
     filter = `?where=%7B%0A%20%20%22planId%22%3A%22${planId}%22%0A%7D`

    const { data }: { data: PeopleCount } = await api.get(`${EXPOAPI.url}/people/count${filter}`);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<PeopleCount>;
  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<PeopleCount>
  }
}

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
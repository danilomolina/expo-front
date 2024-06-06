import { api } from "src/configs/api";
import configValues from "src/configs/configValues";
import { ResponseAPI } from "src/models/api";
import { CityModel } from "src/models/city";

const { API: { CITYS } } = configValues;


export const getCitys = async (uf: string): Promise<ResponseAPI<CityModel[] | []>> => {
  try {

    const { data }: { data: CityModel[] } = await api.get(`${CITYS.url}/localidades/estados/${uf}/distritos`)

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<CityModel[] | []>;
  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CityModel[] | []>
  }
}

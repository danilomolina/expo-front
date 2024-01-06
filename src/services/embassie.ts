import { api } from "src/configs/api";
import { ResponseAPI } from "src/models/api";
import configValues from "src/configs/configValues";
import { EmbassieModel } from "src/models/embassie";

const { API: { EXPOAPI } } = configValues;

export const saveEmbassie = async (event: EmbassieModel): Promise<ResponseAPI<EmbassieModel>> => {
  try {

    const { data }: { data: EmbassieModel } = await api.post(`${EXPOAPI.url}/embassies`, event);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<EmbassieModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<EmbassieModel>
  }
}

export const getEmbassie = async (offset: number, limit: number, skip: number, title?: string, orderBy?: string): Promise<ResponseAPI<EmbassieModel[] | []>> => {
  try {

    const filter: any = {};

    if (title) {
      filter.where = {
        or: [
          title ? { title: { like: `${title}` } } : {}
        ],
      };
    }

    if (orderBy) {
      filter.order = orderBy;
    }

    const { data }: { data: EmbassieModel[] } = await api.get(`${EXPOAPI.url}/embassies`, {
      params: {
        offset: offset,
        limit: limit,
        skip: skip,
        filter: filter,
      }
    });

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<EmbassieModel[] | []>;
  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<EmbassieModel[] | []>
  }
}

export const deleteEmbassie = async (id: string): Promise<ResponseAPI<EmbassieModel>> => {
  try {

    const { data }: { data: EmbassieModel } = await api.delete(`${EXPOAPI.url}/embassies/${id}`);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<EmbassieModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<EmbassieModel>
  }
}

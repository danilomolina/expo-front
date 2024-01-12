import { api } from "src/configs/api";
import { ResponseAPI } from "src/models/api";
import configValues from "src/configs/configValues";
import { MentoringModel } from "src/models/mentoring";

const { API: { EXPOAPI } } = configValues;

export const saveMentoring = async (event: MentoringModel): Promise<ResponseAPI<MentoringModel>> => {
  try {

    const { data }: { data: MentoringModel } = await api.post(`${EXPOAPI.url}/mentorings`, event);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<MentoringModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<MentoringModel>
  }
}

export const getMentoring = async (offset: number, limit: number, skip: number, id?: string): Promise<ResponseAPI<MentoringModel[] | []>> => {
  try {

    const filter: any = {};

    if (id) {
      filter.where = {
        or: [
          id ? { id: id } : {},
        ],
      };
    }

    const { data }: { data: MentoringModel[] } = await api.get(`${EXPOAPI.url}/mentorings`, {
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
    } as ResponseAPI<MentoringModel[] | []>;
  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<MentoringModel[] | []>
  }
}

export const deleteMentoring = async (id: string): Promise<ResponseAPI<MentoringModel>> => {
  try {

    const { data }: { data: MentoringModel } = await api.delete(`${EXPOAPI.url}/mentorings/${id}`);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<MentoringModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<MentoringModel>
  }
}

export const updateMentoring = async (event: MentoringModel): Promise<ResponseAPI<MentoringModel>> => {
  try {

    const { data }: { data: MentoringModel } = await api.put(`${EXPOAPI.url}/mentorings/${event.id}`, event);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<MentoringModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<MentoringModel>
  }
}

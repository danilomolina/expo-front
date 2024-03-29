import { api } from "src/configs/api";
import { ResponseAPI } from "src/models/api";
import configValues from "src/configs/configValues";
import { CourseModel } from "src/models/course";

const { API: { EXPOAPI } } = configValues;

export const saveCourse = async (event: CourseModel): Promise<ResponseAPI<CourseModel>> => {
  try {

    const { data }: { data: CourseModel } = await api.post(`${EXPOAPI.url}/courses`, event);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<CourseModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CourseModel>
  }
}

export const getCouser = async (offset: number, limit: number, skip: number,  category?: string, title?: string, orderBy?: string): Promise<ResponseAPI<CourseModel[] | []>> => {
  try {

    const filter: any = {};

    if (category || title) {
      filter.where = {
        or: [
          category ? { category: category } : {},
          title ? { title: { like: `${title}` } } : {}
        ],
      };
    }

    if (orderBy) {
      filter.order = orderBy;
    }

    const { data }: { data: CourseModel[] } = await api.get(`${EXPOAPI.url}/courses`, {
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
    } as ResponseAPI<CourseModel[] | []>;
  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CourseModel[] | []>
  }
}

export const deleteCousers = async (id: string): Promise<ResponseAPI<CourseModel>> => {
  try {

    const { data }: { data: CourseModel } = await api.delete(`${EXPOAPI.url}/courses/${id}`);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<CourseModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CourseModel>
  }
}

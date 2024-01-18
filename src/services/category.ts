import { api } from "src/configs/api";
import { ResponseAPI } from "src/models/api";
import configValues from "src/configs/configValues";
import { CategoryModel } from "src/models/category";

const { API: { EXPOAPI } } = configValues;

export const saveCategory = async (event: CategoryModel): Promise<ResponseAPI<CategoryModel>> => {
  try {

    const { data }: { data: CategoryModel } = await api.post(`${EXPOAPI.url}/categories`, event);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<CategoryModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CategoryModel>
  }
}

export const getCategory = async (offset: number, limit: number, skip: number, id?: string, active?: boolean, group? : string): Promise<ResponseAPI<CategoryModel[] | []>> => {
  try {

    const filter: any = {};

    if (id || active || group) {
      filter.where = {
        or: [
          id ? { id: id } : {},
          active ? { active: active } : {},
          group ? { group: group } : {},
        ],
      };
    }

    const { data }: { data: CategoryModel[] } = await api.get(`${EXPOAPI.url}/categories`, {
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
    } as ResponseAPI<CategoryModel[] | []>;
  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CategoryModel[] | []>
  }
}

export const getCategoryByGroup = async (offset: number, limit: number, skip: number, group? : string): Promise<ResponseAPI<CategoryModel[] | []>> => {
  try {

    const filter: any = {};

    if (group) {
      filter.where = {
        or: [
          group ? { group: group } : {},
        ],
      };
    }

    const { data }: { data: CategoryModel[] } = await api.get(`${EXPOAPI.url}/categories`, {
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
    } as ResponseAPI<CategoryModel[] | []>;
  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CategoryModel[] | []>
  }
}

export const deleteCategory = async (id: string): Promise<ResponseAPI<CategoryModel>> => {
  try {

    const { data }: { data: CategoryModel } = await api.delete(`${EXPOAPI.url}/categories/${id}`);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<CategoryModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CategoryModel>
  }
}

export const updateCategory = async (event: CategoryModel): Promise<ResponseAPI<CategoryModel>> => {
  try {

    const { data }: { data: CategoryModel } = await api.put(`${EXPOAPI.url}/categories/${event.id}`, event);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<CategoryModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CategoryModel>
  }
}

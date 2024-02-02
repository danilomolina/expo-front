import { api } from "src/configs/api";
import { ResponseAPI } from "src/models/api";
import configValues from "src/configs/configValues";
import { EventModel } from "src/models/event";

const { API: { EXPOAPI } } = configValues;

export const saveEvent = async (event: EventModel): Promise<ResponseAPI<EventModel>> => {
  try {

    const { data }: { data: EventModel } = await api.post(`${EXPOAPI.url}/events`, event);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<EventModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<EventModel>
  }
}

export const getEvents = async (offset: number, limit: number, skip: number, category?: string, title?: string, orderBy?: string, id?: string): Promise<ResponseAPI<EventModel[] | []>> => {
  try {
    const filter: any = {};

    if (category || title || id) {
      filter.where = {
        or: [
          category ? { category: category } : {},
          title ? { title: { like: `${title}` } } : {},
          id ? { id: id } : {},
        ],
      };
    }

    if (orderBy) {
      filter.order = orderBy;
    } else {
      filter.order = 'date'
    }

    const { data }: { data: EventModel[] } = await api.get(`${EXPOAPI.url}/events`, {
      params: {
        offset: offset,
        limit: limit,
        skip: skip,
        filter: filter,
      },
    });

    return {
      data: data,
      isSuccess: true,
    } as ResponseAPI<EventModel[] | []>;
  } catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message,
    } as ResponseAPI<EventModel[] | []>;
  }
};


export const deleteEvent = async (id: string): Promise<ResponseAPI<EventModel>> => {
  try {

    const { data }: { data: EventModel } = await api.delete(`${EXPOAPI.url}/events/${id}`);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<EventModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<EventModel>
  }
}

export const updateEvent = async (event: EventModel): Promise<ResponseAPI<EventModel>> => {
  try {

    const { data }: { data: EventModel } = await api.put(`${EXPOAPI.url}/events/${event.id}`, event);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<EventModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<EventModel>
  }
}

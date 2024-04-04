import { api } from "src/configs/api";
import { ResponseAPI } from "src/models/api";
import configValues from "src/configs/configValues";
import { SocialActionModel } from "src/models/socialAction";

const { API: { EXPOAPI } } = configValues;

export const saveSocialAction = async (event: SocialActionModel): Promise<ResponseAPI<SocialActionModel>> => {
    try {

        const { data }: { data: SocialActionModel } = await api.post(`${EXPOAPI.url}/social-actions`, event);

        return {
            data: data,
            isSuccess: true
        } as ResponseAPI<SocialActionModel>;

    }
    catch (error: any) {
        console.log(error);

        return {
            isSuccess: false,
            message: error.message
        } as ResponseAPI<SocialActionModel>
    }
}

export const getSocialAction = async (offset: number, limit: number, skip: number, title?: string, orderBy?: string, id?: string): Promise<ResponseAPI<SocialActionModel[] | []>> => {
    try {
        const filter: any = {};

        if (title || id) {
            filter.where = {
                or: [
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

        const { data }: { data: SocialActionModel[] } = await api.get(`${EXPOAPI.url}/social-actions`, {
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
        } as ResponseAPI<SocialActionModel[] | []>;
    } catch (error: any) {
        console.log(error);

        return {
            isSuccess: false,
            message: error.message,
        } as ResponseAPI<SocialActionModel[] | []>;
    }
};


export const deleteSocialAction = async (id: string): Promise<ResponseAPI<SocialActionModel>> => {
    try {

        const { data }: { data: SocialActionModel } = await api.delete(`${EXPOAPI.url}/social-actions/${id}`);

        return {
            data: data,
            isSuccess: true
        } as ResponseAPI<SocialActionModel>;

    }
    catch (error: any) {
        console.log(error);

        return {
            isSuccess: false,
            message: error.message
        } as ResponseAPI<SocialActionModel>
    }
}

export const updateSocialAction = async (event: SocialActionModel): Promise<ResponseAPI<SocialActionModel>> => {
    try {

        const { data }: { data: SocialActionModel } = await api.put(`${EXPOAPI.url}/social-actions/${event.id}`, event);

        return {
            data: data,
            isSuccess: true
        } as ResponseAPI<SocialActionModel>;

    }
    catch (error: any) {
        console.log(error);

        return {
            isSuccess: false,
            message: error.message
        } as ResponseAPI<SocialActionModel>
    }
}

import { api } from "src/configs/api";
import { ResponseAPI } from "src/models/api";
import configValues from "src/configs/configValues";
import { CouponModel } from "src/models/coupon";

const { API: { EXPOAPI } } = configValues;

export const saveCoupon = async (event: CouponModel): Promise<ResponseAPI<CouponModel>> => {
  try {

    const { data }: { data: CouponModel } = await api.post(`${EXPOAPI.url}/coupons`, event);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<CouponModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CouponModel>
  }
}

export const getCoupon = async (offset: number, limit: number, skip: number, category?: string, title?: string, orderBy?: string): Promise<ResponseAPI<CouponModel[] | []>> => {
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
      filter.order = orderBy
    } else {
      filter.order = 'discount DESC'
    }

    const { data }: { data: CouponModel[] } = await api.get(`${EXPOAPI.url}/coupons`, {
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
    } as ResponseAPI<CouponModel[] | []>;
  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CouponModel[] | []>
  }
}

export const deleteCoupon = async (id: string): Promise<ResponseAPI<CouponModel>> => {
  try {

    const { data }: { data: CouponModel } = await api.delete(`${EXPOAPI.url}/coupons/${id}`);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<CouponModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<CouponModel>
  }
}

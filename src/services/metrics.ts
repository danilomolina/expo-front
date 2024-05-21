import { api, apiEcommerce } from "src/configs/api";
import { ResponseAPI } from "src/models/api";
import configValues from "src/configs/configValues";
import { MetricsIpModel, MetricsModel } from "src/models/metrics"

const { API: { EXPOAPI } } = configValues;

export const saveMetrics = async (metrics: MetricsModel): Promise<ResponseAPI<MetricsModel>> => {
  try {

    const { data }: { data: MetricsModel } = await api.post(`${EXPOAPI.url}/metrics`, metrics);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<MetricsModel>;

  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<MetricsModel>
  }
}


export const getMetricsIp = async (): Promise<ResponseAPI<MetricsIpModel>> => {
  try {

    const { data }: { data: MetricsIpModel } = await apiEcommerce.get(`https://api.ipify.org?format=json`);

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<MetricsIpModel>;
  }
  catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<MetricsIpModel>
  }
}


export const getMetrics = async (userIP?: string, startDate?: Date, endDate?: Date): Promise<ResponseAPI<MetricsModel[] | []>> => {
  try {
    const filter: any = {};

    if (userIP || (startDate && endDate)) {
      const where: any[] = [];
      if (userIP) {
        where.push({ userIP: userIP });
      }
      if (startDate && endDate) {
        const formattedStartDate = new Date(startDate.setHours(0, 0, 0, 0)); // Define a hora inicial para 00:00:00
        const formattedEndDate = new Date(endDate.setHours(23, 59, 59, 999)); // Define a hora final para 23:59:59
        where.push({ currentDate: { between: [formattedStartDate, formattedEndDate] } });
      }
      filter.where = { or: where };
    }

    const { data }: { data: MetricsModel[] } = await api.get(`${EXPOAPI.url}/metrics`, {
      params: {
        filter: JSON.stringify(filter)
      }
    });

    return {
      data: data,
      isSuccess: true
    } as ResponseAPI<MetricsModel[] | []>;
  } catch (error: any) {
    console.log(error);

    return {
      isSuccess: false,
      message: error.message
    } as ResponseAPI<MetricsModel[] | []>;
  }
};



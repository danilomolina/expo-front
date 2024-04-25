import { api, apiEcommerce } from "src/configs/api";
import { ResponseAPI } from "src/models/api";
import configValues from "src/configs/configValues";
import { MetricsIpModel, MetricsModel } from "src/models/metrics";

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


  export const getMetrics = async (userIP?: string, currentDate?: Date): Promise<ResponseAPI<MetricsModel[] | []>> => {
    try {
  
      const filter: any = {};
  
      if (userIP || currentDate) {
        filter.where = {
          or: [
            userIP ? { userIP: userIP } : {},
            currentDate ? { currentDate: currentDate } : {}
          ],
        };
      }
  
      const { data }: { data: MetricsModel[] } = await api.get(`${EXPOAPI.url}/metrics`, {
        params: {
          filter: filter
        }
      });
  
      return {
        data: data,
        isSuccess: true
      } as ResponseAPI<MetricsModel[] | []>;
    }
    catch (error: any) {
      console.log(error);
  
      return {
        isSuccess: false,
        message: error.message
      } as ResponseAPI<MetricsModel[] | []>
    }
  }

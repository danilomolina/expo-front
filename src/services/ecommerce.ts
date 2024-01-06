import { api } from "src/configs/api";
import configValues from "src/configs/configValues";

const { API: { ECOMMERCE } } = configValues;

export const getToken = async (email: string, name: string): Promise<string> => {
    try {
      const { data }: { data: string } = await api.get(`${ECOMMERCE.url}/?key=ZWNvbW1lcmNlIG5hIHByw6F0aWNh&email=${email}&full_name=${name}`);
 
      return data
    }
    catch (error: any) {
      console.log(error);

      return error
    }
  }
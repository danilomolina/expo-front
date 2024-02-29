import { apiEcommerce } from "src/configs/api";
import configValues from "src/configs/configValues";

const { API: { ECOMMERCE } } = configValues;

export const getToken = async (email: string | null, full_name: string | undefined): Promise<string> => {
    try {
      const { data }: { data: string } = await apiEcommerce.get(`${ECOMMERCE.url}?email=${email}&key=ZWNvbW1lcmNlIG5hIHByw6F0aWNh&full_name=${full_name}`);

      return data
    }
    catch (error: any) {
      console.log(error);

      return error
    }
  }

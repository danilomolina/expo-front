const configValues = {
    API: {
        EXPOAPI: {
            url: process.env.NEXT_PUBLIC_EXPO_API_URL,
        },
        Pagination: {
            pageSize: 10
        },
        ECOMMERCE: {
            url: process.env.NEXT_PUBLIC_ECOMMERCE_API_URL
        },
        CITYS: {
            url: process.env.NEXT_PUBLIC_EXPO_API_CIDADES_URL
        }
    },
    messages: {
        apiError: 'Desculpe, houve algum problema de comunicação com o servidor.'
    },
    AWS: {
      ACCESS_KEY: {
         id: process.env.NEXT_PUBLIC_ACCESS_KEY_ID
      },
      SECRET_ACCESS: {
        key: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY
     }
    }
};
export default configValues;

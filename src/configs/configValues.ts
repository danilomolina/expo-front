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
        }
    },
    messages: {
        apiError: 'Desculpe, houve algum problema de comunicação com o servidor.'
    }
};

export default configValues;

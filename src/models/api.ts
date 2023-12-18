export type ResponseLoginDefault = {
    error?: {
        statusCode: number,
        name: string,
        message: string
    }
    token?: string
};

export type ResponseAPI<T> = {
    data: T
    isSuccess: boolean
    message?: string
    errors?: Errors[]
};

type Errors = {
    field: string
    message: string
}

export interface IUser {
    access_token?: string
    username: string
    email: string
    createdAt: string
    id: number
}


export interface ILoginUserRequest {
    email: string
    password: string
}

export interface IRegistrationUserRequest {
    username: string
    email: string
    password: string
}
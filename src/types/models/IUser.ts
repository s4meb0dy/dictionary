export interface IUser {
    access_token?: string
    username: string
    password: string
    email: string
    createdAt: string
    userId: number
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

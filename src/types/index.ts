export enum AuthorizationEnum {
    Login = 0,
    Logout = 1,
    Unknown = 2,
}

export type userType = {
    username: string
    email: string
}

export type registrationDataType = {
    username: string
    email: string
    password: string
}

export type loginDataType = {
    email: string
    password: string
}

export enum InputSizeEnum {
    Small = 0,
    Medium = 1,
    Large = 2,
}

export enum InputStateEnum {
    Default = 0,
    Error = 1,
    Success = 2,
}

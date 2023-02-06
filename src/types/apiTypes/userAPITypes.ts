//--------------------register--------------
export type registerUserRequestType = {
    username: string
    email: string
    password: string
}
export type registerUserResponseType = {
    access_token: string
    username: string
    email: string
    createdAt: string
    id: number
}

//--------------------login--------------
export type loginUserRequestType = {
    email: string
    password: string
}

export type loginUserResponseType = {
    access_token: string
    username: string
    email: string
    createdAt: string
    id: number
}

//--------------------infoUser--------------
export type infoUserResponseType = {
    username: string
    email: string
    createdAt: string
    id: number
}

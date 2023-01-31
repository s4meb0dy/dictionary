export const errorHandling = (error: any): string => {
    const errorMessage: Array<string> = error.response
        ? error.response.data.message
        : error.message

    if (Array.isArray(errorMessage)) return errorMessage.join(' | ')

    return errorMessage
}

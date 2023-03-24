export const transformErrorFromApi = (
    error: string | string[] | undefined
): string => {
    let errorMsg: string = 'Occurred some error :('
    if (Array.isArray(error)) {
        errorMsg = error
            .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
            .join('. ')
    } else if (error) errorMsg = error

    return errorMsg
}


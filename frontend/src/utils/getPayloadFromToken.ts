export const getPayloadFromToken = (token: string) => {
    const encodedPayload = token.split('.')[1]
    return JSON.parse(window.atob(encodedPayload))
}
export const idValidator = (id: string) => {
    let error = null
    const numberId = +id
    if (isNaN(numberId) || !Number.isInteger(numberId)) {
        error = 'invalid ID'
    }
    return error
}

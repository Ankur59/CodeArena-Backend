export const asyncHandler = (someFunc) => async (req, res, next) => {
    try {
        await someFunc(req, res, next)
    } catch (error) {
        console.log(error)
    }
}
import {availableResolutionVariant, VideoDTOType} from "../types/video";

export const createPostInputDTOValidator = (body: VideoDTOType) => {
    const errorsMessages: any[] = [
        // {
        //     message: "string",
        //     field: "string"
        // }
    ]

    const title = body.title
    const author = body.author
    const availableResolutions = body.availableResolutions
    if (!title) {
        errorsMessages.push({
            message: "title is required",
            field: "title"
        })
    }
    if (title && title.trim().length > 40) {
        errorsMessages.push({
            message: "title должен быть не больше 40 символов",
            field: "title"
        })
    }

    if (!author) {
        errorsMessages.push({
            message: "author is required",
            field: "author"
        })
    }
    if (author && author.trim().length > 20) {
        errorsMessages.push({
            message: "author должен быть не больше 20 символов",
            field: "author"
        })
    }

    if (!availableResolutions || availableResolutions.length <= 0) {
        errorsMessages.push({
            message: "availableResolutions is required",
            field: "availableResolutions"
        })
    }
    if (availableResolutions && availableResolutions.length > 0) {
        availableResolutions.forEach(resolution => {
            const exists = Object.values(availableResolutionVariant).includes(
                resolution as typeof availableResolutionVariant[keyof typeof availableResolutionVariant]
            );
            if (!exists) {
                errorsMessages.push({
                    message: `${resolution} не соответствует формату`,
                    field: "availableResolutions"
                })
            }
        })
    }
    return errorsMessages
}
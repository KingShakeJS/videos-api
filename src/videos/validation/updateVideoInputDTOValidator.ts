import {updateVideoDTOTypes} from "../types/video";
import {createVideoInputDTOValidator} from "./createVideoInputDTOValidator";

function isExactISOString(value: unknown) {
    if (typeof value === 'string') {

        const date = new Date(value);
        return (
            !Number.isNaN(date.getTime()) &&
            date.toISOString() === value
        );
    } else {
        return false;
    }

}

export const updateVideoInputDTOValidator = (body: updateVideoDTOTypes) => {
    const { canBeDownloaded, minAgeRestriction, publicationDate } = body
    const baseErr = createVideoInputDTOValidator(body)
    const updateErr: any[] = []

    // 1. Валидация canBeDownloaded (должен быть строго boolean)
    if (canBeDownloaded !== undefined && typeof canBeDownloaded !== 'boolean') {
        updateErr.push({
            message: "canBeDownloaded должно быть булевым типом (boolean)",
            field: "canBeDownloaded"
        })
    }

    // 2. Валидация minAgeRestriction (число от 1 до 18 или null)
    if (minAgeRestriction !== undefined && minAgeRestriction !== null) {
        if (typeof minAgeRestriction !== 'number' || minAgeRestriction < 1 || minAgeRestriction > 18) {
            updateErr.push({
                message: "minAgeRestriction должно быть числом от 1 до 18",
                field: "minAgeRestriction"
            })
        }
    }

    // 3. Валидация publicationDate (строка формата ISO)
    if (publicationDate !== undefined) {
        if (typeof publicationDate !== 'string' || !isExactISOString(publicationDate)) {
            updateErr.push({
                message: "publicationDate должно быть строкой формата ISO",
                field: "publicationDate"
            })
        }
    }

    return [...baseErr, ...updateErr]
}




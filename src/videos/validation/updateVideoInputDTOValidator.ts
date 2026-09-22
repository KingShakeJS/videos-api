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
    const {canBeDownloaded, minAgeRestriction, publicationDate} = body
    const baseErr = createVideoInputDTOValidator(body)
    const updateErr: any[] = []


    if (!canBeDownloaded) {
        updateErr.push({
            message: "canBeDownloaded is required",
            field: "canBeDownloaded"
        })
    }
    if (!minAgeRestriction && canBeDownloaded !== null) {
        updateErr.push({
            message: "minAgeRestriction должно быть булевым",
            field: "minAgeRestriction"
        })
    }
    if (minAgeRestriction && canBeDownloaded !== null && minAgeRestriction < 1) {
        updateErr.push({
            message: "minAgeRestriction должно быть больше 0",
            field: "minAgeRestriction"
        })
    }
    if (minAgeRestriction && canBeDownloaded !== null && minAgeRestriction > 18) {
        updateErr.push({
            message: "minAgeRestriction должно быть не больше 18",
            field: "minAgeRestriction"
        })
    }
    if (!publicationDate) {
        updateErr.push({
            message: "publicationDate is required",
            field: "publicationDate"
        })
    }
    if (!publicationDate) {
        updateErr.push({
            message: "publicationDate is required",
            field: "publicationDate"
        })
    }
    if (publicationDate && !isExactISOString(publicationDate)) {
        updateErr.push({
            message: "publicationDate не соответствует формату",
            field: "publicationDate"
        })
    }

//todo
    return [...baseErr, ...updateErr]

}




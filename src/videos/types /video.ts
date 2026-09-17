export type VideoType = {
    id: number;
    title: string;
    author: string;
    canBeDownloaded: boolean;
    minAgeRestriction: number | null;
    createdAt: string; // ISO 8601 date
    publicationDate: string; // ISO 8601 date
    availableResolutions: string[];
};

type availableResolutionType = "P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160"


export type VideoDTOType = {
    title: string,
    author: string,
    availableResolutions: availableResolutionType[]
}




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

// type availableResolutionType = "P144" | "P240" | "P360" | "P480" | "P720" | "P1080" | "P1440" | "P2160"
 export const availableResolutionVariant= {
    144: "P144",
    240: "P240",
    360: "P360",
    480: "P480",
    720: "P720",
    1080: "P1080",
    1440: "P1440",
    2160: "P2160",
} as const;


export type availableResolutionType =
    typeof availableResolutionVariant[keyof typeof availableResolutionVariant];

export type VideoDTOType = {
    title: string,
    author: string,
    availableResolutions: availableResolutionType[]
}


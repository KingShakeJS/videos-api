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
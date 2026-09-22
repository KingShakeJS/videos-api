import {VideoType} from "../videos/types/video";

export const inMemoryDb = {
    videos: <VideoType[]>[
        {
            "id": 1,
            "title": "string1",
            "author": "string1",
            "canBeDownloaded": true,
            "minAgeRestriction": null,
            "createdAt": "2026-09-17T06:38:57.601Z",
            "publicationDate": "2026-09-17T06:38:57.601Z",
            "availableResolutions": [
                "P144"
            ]
        },
        {
            "id": 2,
            "title": "string2",
            "author": "string2",
            "canBeDownloaded": false,
            "minAgeRestriction": null,
            "createdAt": "2025-09-17T06:38:57.601Z",
            "publicationDate": "2025-09-17T06:38:57.601Z",
            "availableResolutions": [
                "P144"
            ]
        },

    ]
}
import {Router} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {inMemoryDb} from "../../db/in-memory.db";
import type {Request, Response} from "express";
import {VideoDTOType, VideoType} from "../types /video";

export const videosRouter = Router({});

videosRouter


    .get("", (req, res) => {
        res.status(HttpStatus.Ok).json(inMemoryDb.videos)
    })
    .post("", (req: Request<{}, {}, VideoDTOType>, res: Response) => {

        const newVideo:VideoType = {
            id: 3,
            // title: "",
            // author: "",
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            // availableResolutions: []
            ...req.body
        }
        inMemoryDb.videos.push(newVideo)
        console.log(inMemoryDb.videos)

        res.sendStatus(HttpStatus.Created)
    })




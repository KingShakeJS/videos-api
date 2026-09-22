import {Router} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {inMemoryDb} from "../../db/in-memory.db";
import type {Request, Response} from "express";
import {VideoDTOType, VideoType} from "../types/video";
import {createPostInputDTOValidator} from "../validation/createPostInputDTOValidator";


export const videosRouter = Router({});

videosRouter


    .get("", (req, res) => {
        res.status(HttpStatus.Ok).json(inMemoryDb.videos)
    })
    .post("", (req: Request<{}, {}, VideoDTOType>, res: Response) => {
        const body = req.body;
        const errorsMessages = createPostInputDTOValidator(body)
        if (errorsMessages.length === 0) {
            const lastVideoId = inMemoryDb.videos.at(-1)?.id
            const newVideo: VideoType = {
                id: lastVideoId ? lastVideoId + 1 : 1,
                title: body.title,
                author: body.author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: new Date().toISOString(),
                publicationDate: new Date().toISOString(),
                availableResolutions: body.availableResolutions,

            }
            inMemoryDb.videos.push(newVideo)
            res.status(HttpStatus.Created).json(newVideo)
        } else {
            res.status(HttpStatus.BadRequest).json({
                "errorsMessages": [
                    errorsMessages[0]
                ]
            })
        }
    })




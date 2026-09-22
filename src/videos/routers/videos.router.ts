import {Router} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {inMemoryDb} from "../../db/in-memory.db";
import type {Request, Response} from "express";
import {createVideoDTOType, updateVideoDTOTypes, VideoType} from "../types/video";
import {createVideoInputDTOValidator} from "../validation/createVideoInputDTOValidator";
import {idValidator} from "../validation/idValidator";
import {updateVideoInputDTOValidator} from "../validation/updateVideoInputDTOValidator";


export const videosRouter = Router({});

videosRouter


    .get("", (req, res) => {
        res.status(HttpStatus.Ok).json(inMemoryDb.videos)
    })
    .post("", (req: Request<{}, {}, createVideoDTOType>, res: Response) => {
        const body = req.body;
        const errorsMessages = createVideoInputDTOValidator(body)
        if (errorsMessages.length === 0) {
            const lastVideoId = inMemoryDb.videos.at(-1)?.id
            const dateNow = new Date();

// Создаем копию даты и прибавляем к ней 1 день
            const publicationDate = new Date(dateNow);
            publicationDate.setDate(dateNow.getDate() + 1);

            const newVideo: VideoType = {
                id: lastVideoId ? lastVideoId + 1 : 1,
                title: body.title,
                author: body.author,
                canBeDownloaded: false,
                minAgeRestriction: null,
                createdAt: dateNow.toISOString(),
                publicationDate: publicationDate.toISOString(), // Теперь здесь дата на день больше
                availableResolutions: body.availableResolutions,
            };
            inMemoryDb.videos.push(newVideo)
            res.status(HttpStatus.Created).json(newVideo)
        } else {
            res.status(HttpStatus.BadRequest).json({
                "errorsMessages": [
                    ...errorsMessages
                ]
            })
        }
    })
    .get('/:id', (req: Request<{ id: string }, {}, {}>, res) => {
        const {id} = req.params;

        const err = idValidator(id)

        if (!err) {
            const findVideo = inMemoryDb.videos.find(video => video.id === +id)
            if (findVideo) {
                res.status(HttpStatus.Ok).json(findVideo)
            } else {
                res.sendStatus(HttpStatus.NotFound)
            }

        } else {
            res.sendStatus(HttpStatus.NotFound)
        }


    })
    .put('/:id', (req: Request<{ id: string }, {}, updateVideoDTOTypes>, res) => {
        const {id} = req.params;

        const idErr = idValidator(id)
        const updateInputErr = updateVideoInputDTOValidator(req.body)

        if (idErr) {
            res.sendStatus(HttpStatus.NotFound)
        }
        if (!idErr && updateInputErr.length === 0) {
            const findVideo = inMemoryDb.videos.find(video => video.id === +id)
            if (findVideo) {
                //логика изменения

                inMemoryDb.videos = inMemoryDb.videos.map(video => {
                    if (video.id !== findVideo.id) return video
                    else return {...findVideo, ...req.body}
                })
                console.log(inMemoryDb.videos)
                res.sendStatus(HttpStatus.NoContent)
            } else {
                res.sendStatus(HttpStatus.NotFound)
            }
        } else {
            res.status(HttpStatus.BadRequest).json({
                errorsMessages: [
                    updateInputErr[0]
                ]
            })
        }


    })
    .delete('/:id', (req: Request<{ id: string }, {}, {}>, res) => {
        const {id} = req.params;

        const err = idValidator(id)

        if (!err) {
            const findVideo = inMemoryDb.videos.find(video => video.id === +id)

            if (findVideo) {
                //логика удаления

                inMemoryDb.videos = [...inMemoryDb.videos.filter(video => video.id !== findVideo.id)]

                res.sendStatus(HttpStatus.NoContent)
            } else {
                res.sendStatus(HttpStatus.NotFound)
            }

        } else {
            res.sendStatus(HttpStatus.NotFound)
        }


    })
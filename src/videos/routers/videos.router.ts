import {Router} from "express";
import {HttpStatus} from "../../core/types/http-statuses";
import {inMemoryDb} from "../../db/in-memory.db";

export const videosRouter = Router({});

videosRouter


    .get("", (req, res) => {
        res.status(HttpStatus.Ok).json(inMemoryDb.videos)
    })





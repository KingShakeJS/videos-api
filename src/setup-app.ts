import express, {Express} from "express";
import {HttpStatus} from "./core/types/http-statuses";
import {inMemoryDb} from "./db/in-memory.db";
import {videosRouter} from "./videos/routers/videos.router";


export const setupApp = (app: Express) => {
    app.use(express.json());
    app.get("/", (req, res) => {
        res.status(HttpStatus.Ok).send("дороу");

    })


    app.use("/videos", videosRouter)

    return app;
};
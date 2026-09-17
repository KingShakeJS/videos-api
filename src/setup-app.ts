import express, {Express} from "express";
import {HttpStatus} from "./core/types/http-statuses";
import {inMemoryDb} from "./db/in-memory.db";
import {videosRouter} from "./videos/routers/videos.router";
import {setupSwagger} from "./core/swagger/setup-swagger";


export const setupApp = (app: Express) => {
    app.use(express.json());
    app.get("/", (req, res) => {
        res.status(HttpStatus.Ok).send("дороу");

    })


    app.use("/api/videos", videosRouter)
    setupSwagger(app);
    return app;
};
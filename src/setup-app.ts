import express, {Express} from "express";
import {HttpStatus} from "./core/types/http-statuses";
import {videosRouter} from "./videos/routers/videos.router";
import {setupSwagger} from "./core/swagger/setup-swagger";
import {testingRouter} from "./testing/routers/testing.router";






export const setupApp = (app: Express) => {

    app.use(express.json());
    app.get("/", (req, res) => {
        res.status(HttpStatus.Ok).send("дороу");

    })


    app.use("/videos", videosRouter)
    app.use("/testing", testingRouter); // URL теперь начинается с /api/
    setupSwagger(app);
    return app;
};
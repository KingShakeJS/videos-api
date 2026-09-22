import { Router, Request, Response } from 'express';

import {HttpStatus} from "../../core/types/http-statuses";
import {inMemoryDb} from "../../db/in-memory.db";


// Служебный роутер для тестов. Подключается по базовому пути '/testing'.
export const testingRouter = Router({});

// Полностью очищает данные (используется в e2e-тестах перед прогоном).
testingRouter.delete('/all-data', (req: Request, res: Response) => {
    inMemoryDb.videos = [];
    res.sendStatus(HttpStatus.NoContent);
});

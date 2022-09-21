import { Request, Response, Router } from "express";

import { getLesson, makeLesson } from './controller/lesson'
import { getTopic, makeTopic } from './controller/topic'
import { getSubject, makeSubject } from './controller/subject'

const router = Router();

router.get('/lesson/:id', getLesson);
router.post('/create/lesson', makeLesson);

router.get('/topic/:title', getTopic);
router.post('/create/topic', makeTopic);

router.get('/subject/:title', getSubject);
router.post('/create/subject', makeSubject);

export = router;
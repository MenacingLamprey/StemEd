import { Request, Response, Router } from "express";

import { getLesson, makeLesson } from './controller/lesson'
import { getTopic, makeTopic, getSubjectTopics } from './controller/topic'
import { getSubject, getAllSubjects, makeSubject } from './controller/subject'
import { getExercise, makeExercise, getExercisebyLesson, getExerciseFormatsbyLesson } from './controller/exercise'
import { authMiddleware } from './middleware/auth';
const router = Router();

router.get('/lesson/:title', getLesson);
router.post('/create/lesson', makeLesson);

router.get('/topic/:title', getTopic);
router.get('subject/:title/topics/', getSubjectTopics);
router.post('/create/topic', makeTopic);

router.get('/subject/:title', getSubject);
router.get('/subjects', getAllSubjects);
router.post('/create/subject', makeSubject);

router.get('/exercise/:id', getExercise);
router.get('/exercises/:lessonName/', getExercisebyLesson)
router.get('/exerciseFormats/:lessonName/', getExerciseFormatsbyLesson)
router.post('/create/exercise', makeExercise);

export = router;
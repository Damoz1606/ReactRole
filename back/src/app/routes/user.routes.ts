import { Router } from 'express';
import { isAuthenticated, isAuthorized } from '../controller/auth.controller';
import * as Controller from '../controller/user.controller';
import * as NoteController from '../controller/note.controller';
import * as ImageController from '../controller/image.controller';
import multer from '../../config/multer';
import { Role } from '../../utils/utils';

const router = Router();

router.route("/auth")
    .post(Controller.auth);

router.route("/signup")
    .post(Controller.signup);

router.route("/logout")
    .post(isAuthenticated, Controller.logout);

router.route("/notes")
    .get(isAuthenticated, NoteController.getAll)
    .post(isAuthenticated, isAuthorized(`${Role.ADMIN}|${Role.AUTHOR}`), NoteController.postNote)
    .delete(isAuthenticated, isAuthorized(`${Role.ADMIN}`), NoteController.deleteAll);

router.route("/notes/:id")
    .get(isAuthenticated, NoteController.getNote)
    .put(isAuthenticated, isAuthorized(`${Role.ADMIN}|${Role.AUTHOR}`), NoteController.putNote)
    .delete(isAuthenticated, isAuthorized(`${Role.ADMIN}|${Role.AUTHOR}`), NoteController.deleteNote);

router.route("/images")
    .get(isAuthenticated, ImageController.getAll)
    .post(isAuthenticated, isAuthorized(`${Role.ADMIN}|${Role.AUTHOR}`), multer.single('image'), ImageController.postImage)
    .delete(isAuthenticated, isAuthorized(`${Role.ADMIN}`), ImageController.deleteAll);

router.route("/images/:id")
    .get(isAuthenticated, ImageController.getImage)
    .put(isAuthenticated, isAuthorized(`${Role.ADMIN}|${Role.AUTHOR}`), multer.single('image'), ImageController.putImage)
    .delete(isAuthenticated, isAuthorized(`${Role.ADMIN}|${Role.AUTHOR}`), ImageController.deleteImage);

export default router;
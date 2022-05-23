import express from "express";
import multer from "multer";
import { addMedia, deleteMedia, getMedia } from "./media.controller";

const upload = multer();

export const mediaRouter = express
  .Router()
  .get("/:id", getMedia)
  .post("/", upload.single("media"), addMedia)
  .delete("/:id", deleteMedia);

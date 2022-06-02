import express from "express";
import multer from "multer";
import { adminOnly, auth } from "../../middleware";
import { addMedia, deleteMedia, getMedia } from "./media.controller";

const upload = multer();

export const mediaRouter = express
  .Router()
  .get("/:id", getMedia)
  .post("/", auth, adminOnly, upload.single("media"), addMedia)
  .delete("/:id", auth, adminOnly, deleteMedia);

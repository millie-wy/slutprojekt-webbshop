import { NextFunction, Request, Response } from "express";
import { GridFSFile } from "mongodb";
import { Types } from "mongoose";
import sharp from "sharp";
import { Readable } from "stream";
import { ErrorCodes } from "../../errorRequestHandler";
import { bucket } from "./media.model";

export const getMedia = async (req: Request, res: Response) => {
  const _id = new Types.ObjectId(req.params.id);
  const file = await bucket.find({ _id }).next();
  if (!file || !file.contentType)
    return res.status(404).json(`File with id "${_id}" does not exist.`);

  res.setHeader("Content-Type", file.contentType);
  const readableStream = bucket.openDownloadStream(_id);

  readableStream.pipe(res);
};

export const addMedia = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.file) throw Error(ErrorCodes.noImageSent);
  const { originalname, mimetype, buffer } = req.file;
  const readableStream = Readable.from(buffer);
  const writeableStream = bucket.openUploadStream(originalname, {
    contentType: mimetype,
  });

  const piplines = sharp();

  piplines
    .clone()
    .resize({
      width: 1500,
      height: 2260,
      fit: "cover",
      position: sharp.strategy.entropy,
    })
    .pipe(writeableStream)
    .on("finish", (file: GridFSFile) => {
      res.status(201).json(file);
    });

  // these lines for error doesnt work for now?
  readableStream.pipe(piplines).on("error", () => {
    return Error(ErrorCodes.unsupportedImgFormat);
  });
};

export const deleteMedia = async (req: Request, res: Response) => {
  const _id = new Types.ObjectId(req.params.id);
  const file = await bucket.find({ _id }).next();
  if (!file)
    return res.status(404).json(`File with id "${_id}" does not exist.`);
  await bucket.delete(_id);
  res.status(204).json(null);
};

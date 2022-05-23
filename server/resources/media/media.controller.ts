import { NextFunction, Request, Response } from "express";
import { Readable } from "stream";
import { bucket } from "./media.model";
import { GridFSFile } from "mongodb";
import { Types } from "mongoose";
// import sharp from "sharp";

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
  if (!req.file) return res.status(400).json("No file was sent");
  // throw new HTTPError(400, "No file was sent, make sure to name your input field to 'middle'.");

  const { originalname, mimetype, buffer } = req.file;
  //   const thumbname = "thumb-" + originalname;
  //   const images: GridFSFile[] = [];

  const readableStream = Readable.from(buffer);
  const writeableStream = bucket.openUploadStream(originalname, {
    contentType: mimetype,
    // metadata: { thumbnail: false },
  });
  //   const writeableStreamThumb = bucket.openUploadStream(thumbname, {
  //     contentType: mimetype,
  //     metadata: { thumbnail: true },
  //   });

  readableStream.pipe(writeableStream).on("finish", (file: GridFSFile) => {
    res.status(201).json(file);
  });

  //   const onFinishUpload = (file: GridFSFile) => {
  //     images.push(file);
  //     if (images.length === 2) {
  //       res.status(201).json(images);
  //     }
  //   };

  // to convert large images in common formats to smaller, web-friendly JPEG, PNG, WebP, GIF and AVIF images of varying dimensions.
  // const piplines = sharp();
  //   piplines
  //     .clone()
  //     .resize({
  //       width: 1000,
  //       height: 1000,
  //       fit: "cover",
  //       position: sharp.strategy.entropy,
  //     })
  //     .pipe(writeableStream)
  //     .on("finish", onFinishUpload);

  //   piplines
  //     .clone()
  //     .resize({
  //       width: 100,
  //       height: 100,
  //       fit: "cover",
  //       position: sharp.strategy.entropy,
  //     })
  //     .pipe(writeableStreamThumb)
  //     .on("finish", onFinishUpload);

  //   readableStream.pipe(piplines).on("error", next);
};

export const deleteMedia = async (req: Request, res: Response) => {
  const _id = new Types.ObjectId(req.params.id);
  const file = await bucket.find({ _id }).next();
  if (!file)
    return res.status(404).json(`File with id "${_id}" does not exist.`);

  await bucket.delete(_id);
  res.status(204).json(null);
};

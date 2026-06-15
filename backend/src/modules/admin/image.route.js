import express from "express";
import {
  uploadSingle,
  uploadMultiple,
  deleteImage,
} from "./image.controller.js";

import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/single", upload.single("image"), uploadSingle);
router.post("/multiple", upload.array("images", 10), uploadMultiple);
router.delete("/delete", deleteImage);

export default router;
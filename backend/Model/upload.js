import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const upload = mongoose.model("upload",UploadSchema);
export default upload;
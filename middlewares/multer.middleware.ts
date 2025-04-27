import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export const upload_single_file = (field_name: string) => upload.single(field_name);

export const upload_multiple_files = (field_name: string) => upload.array(field_name);

import path from "path";
import fs from "fs";

const uploads_dir = path.join(__dirname, "../uploads");

if (!fs.existsSync(uploads_dir)) {
  fs.mkdirSync(uploads_dir, { recursive: true });
}

export const save_uploaded_file = (file: Express.Multer.File, filename: string): string => {
  const file_path = path.join(uploads_dir, filename);
  fs.writeFileSync(file_path, file.buffer);
  return `/uploads/${filename}`;
};

export const save_multiple_uploaded_files = (files: Express.Multer.File[], user_id: string): string[] => {
  const saved_files: string[] = [];

  files.forEach((file, index) => {
    const ext = path.extname(file.originalname) || ".jpg";
    const filename = `user_${user_id}_${index + 1}${ext}`;
    const file_path = path.join(uploads_dir, filename);
    fs.writeFileSync(file_path, file.buffer);
    saved_files.push(`/uploads/${filename}`);
  });

  return saved_files;
};

import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export function ImageUpload({ onImageSelect, currentImageUrl }) {
  const [preview, setPreview] = useState(currentImageUrl || null);

  useEffect(() => {
    if (currentImageUrl) {
      setPreview(`http://localhost:5000${currentImageUrl}`);
    } else {
      setPreview(null);
    }
  }, [currentImageUrl]);

  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);

      const data = new FormData();
      data.append("image", file);
      try {
        const res = await axios.post("http://localhost:5000/api/upload", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const relativePath = new URL(res.data.url).pathname;
        onImageSelect(relativePath);
      } catch (err) {
        console.error("Resim yükleme hatası:", err);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxFiles: 1,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors \
          ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-500"
          }`}
      >
        <input {...getInputProps()} />
        <ArrowUpTrayIcon className="mx-auto h-8 w-8 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          {isDragActive
            ? "Bırak…"
            : "Resim yüklemek için tıklayın veya sürükleyin"}
        </p>
      </div>
      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

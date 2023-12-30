"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X } from "lucide-react";
import clsx from "clsx";
import { OldImages } from "../../editforms/EditElectronic";

interface UpdateFileUploadProps {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  imgError: string;
  totalImgCount?: number;
  oldImages?: OldImages[] | [];
  setOldImages?: (val: OldImages[]) => void;
  setOldImagesId?: React.Dispatch<React.SetStateAction<number[]>>;
}

const UpdateFileUpload: React.FC<UpdateFileUploadProps> = ({
  files,
  setFiles,
  imgError,
  totalImgCount,
  oldImages,
  setOldImages,
  setOldImagesId,
}) => {
  const imgurl = "http://127.0.0.1:8000/images/";

  const totalImageCount = useMemo(() => {
    const data: number = 5 - totalImgCount!;
    return data;
  }, [totalImgCount]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length) {
        const newFiles = acceptedFiles.slice(
          0,
          5 - totalImgCount! - files.length,
        );
        setFiles((previousFiles: any) => [
          ...previousFiles,
          ...newFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              id: uuidv4(),
            }),
          ),
        ]);
      }
    },
    [files, setFiles, totalImgCount],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    maxFiles: totalImageCount,
    multiple: true,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (id: string) => {
    setFiles((files) => {
      const updatedFiles = files.filter((file) => file.id !== id);
      updatedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
      return updatedFiles;
    });
  };

  function handleDeleteOldImg(id: number) {
    if (setOldImages && setOldImagesId) {
      setOldImagesId((prev: number[]) => [...prev, id]);
      const updatedImgs = oldImages?.filter((img) => img.id !== id);
      setOldImages(updatedImgs || []);
    }
  }

  return (
    <div className="relative flex flex-col gap-4 border-b-[1px] border-content px-3 py-8 lg:px-10">
      <h3 className="font-semibold underline underline-offset-2">
        UPLOAD UPTO 5 PHOTOS
      </h3>

      <div
        {...getRootProps({
          className: clsx(
            "p-5 lg:p-10 border-[2px] border-primary border-dashed rounded-lg cursor-pointer hover:bg-neutral-100 transition",
            {
              "border-[3px] border-red-500 placeholder:text-destructive bg-destructive/20":
                imgError !== "",
            },
          ),
        })}
      >
        <div>
          <input
            {...getInputProps()}
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
          />

          {isDragActive ? (
            <p className="text-center font-semibold text-destructive">
              Drop the Images here ...
            </p>
          ) : (
            <p className="text-center text-sm font-semibold text-destructive lg:text-[1.125rem]">
              Drag and Drop Images here, or click to select images <br />
              &quot;First Selected Image will be the cover of AD&quot;
            </p>
          )}
        </div>
      </div>

      {imgError && (
        <span className="pl-3 text-sm font-semibold text-destructive">
          ** {imgError}
        </span>
      )}

      <div className="flex items-center gap-5">
        {oldImages?.map((oldimg) => (
          <div
            key={oldimg.id}
            className="relative h-[100px] w-[150px] rounded-lg"
          >
            <Image
              src={imgurl + oldimg.image_url}
              alt="image preview"
              fill
              className="rounded-lg brightness-90"
            />
            <X
              onClick={() => handleDeleteOldImg(oldimg.id)}
              className="absolute right-1 top-1 z-0 h-8 w-8 cursor-pointer rounded-full bg-destructive-foreground p-[0.3rem] font-bold text-destructive brightness-150 transition hover:opacity-90"
            />
          </div>
        ))}
        {files.map((file, i) => (
          <div
            key={file.id}
            className="relative h-[100px] w-[150px] rounded-lg"
          >
            <Image
              src={file.preview}
              alt="image preview"
              fill
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              className="z-10 rounded-lg brightness-90"
            />
            {/* {i === 0 && (
              <span className="absolute bottom-0 z-20 w-full rounded-lg rounded-tl-none rounded-tr-none bg-primary py-1 text-center text-sm font-semibold tracking-wide text-white">
                Cover
              </span>
            )} */}
            <X
              onClick={() => removeFile(file.id)}
              className="absolute right-1 top-1 z-20 h-8 w-8 cursor-pointer rounded-full bg-destructive-foreground p-[0.3rem] font-bold text-destructive brightness-150 transition hover:opacity-90"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateFileUpload;

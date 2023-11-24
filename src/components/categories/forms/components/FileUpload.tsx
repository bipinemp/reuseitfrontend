"use client";
import { v4 as uuidv4 } from "uuid";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X } from "lucide-react";
import clsx from "clsx";

interface FileUploadProps {
  files: any[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
  imgError: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  files,
  setFiles,
  imgError,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length) {
        const newFiles = acceptedFiles.slice(0, 5 - files.length);
        setFiles((previousFiles: any) => [
          ...previousFiles,
          ...newFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              id: uuidv4(),
            })
          ),
        ]);
      }
    },
    [files, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/webp": [".webp"],
    },
    maxFiles: 5,
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

  return (
    <div className="relative flex flex-col gap-4 border-b-[1px] border-content px-3 lg:px-10 py-8">
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
            }
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
            <p className="font-semibold text-destructive text-center">
              Drop the Images here ...
            </p>
          ) : (
            <p className="text-sm lg:text-[1.125rem] font-semibold text-destructive text-center">
              Drag and Drop Images here, or click to select images <br />
              "First Selected Image will be the cover of AD"
            </p>
          )}
        </div>
      </div>

      {imgError && (
        <span className="text-destructive text-sm font-semibold pl-3">
          ** {imgError}
        </span>
      )}

      <div className="flex gap-5 items-center">
        {files.map((file, i) => (
          <div
            key={file.id}
            className="relative w-[150px] h-[100px] rounded-lg"
          >
            <Image
              src={file.preview}
              alt="image preview"
              fill
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              className="rounded-lg brightness-90 z-10"
            />
            {i === 0 && (
              <span className="rounded-lg rounded-tl-none rounded-tr-none absolute text-sm font-semibold tracking-wide py-1 z-20 text-white bg-primary w-full text-center bottom-0">
                Cover
              </span>
            )}
            <X
              onClick={() => removeFile(file.id)}
              className="z-20 absolute right-1 cursor-pointer hover:opacity-90 bg-destructive-foreground font-bold transition p-[0.3rem] top-1 h-8 w-8 rounded-full brightness-150 text-destructive"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;

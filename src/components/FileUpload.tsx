"use client";

import { uploadtoS3 } from "@/lib/db/s3";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

function FileUpload() {
  const { mutate } = useMutation({
    mutationFn: async ({
      file_key,
      file_name,
    }: {
      file_key: string;
      file_name: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key,
        file_name,
      });

      return response.data;
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file.size > 10 * 1024 * 1024) {
        // bigger than 10 MiB!
        toast.error("File too large");
        return;
      }
      try {
        const data = await uploadtoS3(file);

        if (!data?.file_key || !data.file_name) {
          toast.error("Something went wrong!");
          return;
        }

        mutate(data, {
          onSuccess: (data) => {
            console.log(data);
          },
          onError: (error) => {
            toast.error("Error creating chat");
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-blue-500" />
          <p className="mt-2 text-sm text-slate-400">Drop PDF here</p>
        </>
      </div>
    </div>
  );
};
export default FileUpload;

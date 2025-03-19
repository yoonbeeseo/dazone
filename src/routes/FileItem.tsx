import React, { Ref } from "react";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

interface Props {
  ref?: Ref<HTMLInputElement>;
  file?: File;
  onChangeFiles?: PropsFunc<FileList>;
  onDelete?: Func;
}
const FileItem = ({ file, onChangeFiles, ref, onDelete }: Props) => {
  return (
    <div className="relative w-25 h-25 border rounded overflow-hidden">
      {!file ? (
        <input
          type="file"
          className="relative z-10 w-full h-full bg-red-500 opacity-0"
          onChange={(e) => {
            if (onChangeFiles && e.target.files) {
              onChangeFiles(e.target.files);
            }
          }}
          multiple
          ref={ref}
        />
      ) : (
        <button
          className="relative z-10 w-full h-full opacity-0 hover:opacity-80 bg-gray-900 text-white text-2xl"
          type="button"
          onClick={onDelete}
        >
          <AiOutlineDelete />
        </button>
      )}
      <div className="absolute top-0 left-0 w-full h-full text-2xl flex justify-center items-center">
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <AiOutlinePlus />
        )}
      </div>
    </div>
  );
};

export default FileItem;

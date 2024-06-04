import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageDropzone = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  const thumbs = files.map((file) => (
    <div className="" key={file.name}>
      <div className="">
        <img
          src={file.preview}
          className="h-24 w-24 rounded-md object-cover"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
        {/* remove image cross at the top right of image */}
        <button
          onClick={() => {
            setFiles(files.filter((f) => f !== file));
          }}
          className="relative -top-24 -right-16 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center absolute"
        >
          x
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="flex h-16 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300">
          <p>Selecione ou arraste imagens para aqui</p>
        </div>
      </div>
      <aside className="flex flex-wrap">{thumbs}</aside>
    </>
  );
};

export default ImageDropzone;

import { Button, IconButton, TextField, CircularProgress } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { motion } from "framer-motion";
import { useRouter } from "next/router";


// ! Firestore imports to create a document
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../components/Auth/firebaseAuth";

const NewPost = ({user}) => {
  const router = useRouter();

  const [caption, setCaption] = useState("");

  const [uploading, setUploading] = useState(false);

  const [image, setImage] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    // Do something with the files
    const file = acceptedFiles[0];
    // Save the file as a base64 string
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setUploading(true);
    reader.onloadend = function () {
      setImage(reader.result);
      setUploading(false);
    };
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [], // make this more specific by adding ".jpg" and ".png" to the array if you wish
    },
  });

  if (typeof window !== "undefined") {
    document.onpaste = function (event) {
      const items = (event.clipboardData || event.originalEvent.clipboardData)
        .items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === "file") {
          const blob = items[i].getAsFile();
          onDrop([blob]);
          break;
        }
      }
    };
  }

  const createPost = async () => {
    if (caption === "") alert("Please enter a caption");
    else if (image === null) alert("Please upload an image");
    else {
      setUploading(true);

      // ! Firestore create a document here
      // ? Logic goes here...

      router.push("/profile");
    }
  };

  return (
    <div>
      <div className="text-3xl text-center mt-8 font-bold">
        Create a New Post!
      </div>
      <div className="w-[80%] md:w-[40%] mx-auto mt-10">
        <TextField
          type="text"
          placeholder="Whats on your mind?"
          label="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          fullWidth
        />
        {image === null ? (
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{
              scale: 0.9,
            }}
            {...getRootProps()}
            className="w-full mt-10 text-center cursor-pointer border-8 bg-slate-200 px-4 flex items-center justify-center text-2xl rounded-xl h-[50vh]">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>
                Drag &amp; drop some files here, paste an image or click to select
                files
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div className="w-full flex ">
            <div className="w-full h-auto max-w-full md:max-h-[60vh] md:w-auto mx-auto mt-10 relative">
              <img src={image} className="w-full h-full rounded-xl" />
              <IconButton
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 bg-white text-red-600 hover:scale-110">
                <ClearRoundedIcon />
              </IconButton>
            </div>
          </motion.div>
        )}
        <Button
          variant="contained"
          className="w-full mx-auto py-4 my-8 rounded-xl text-2xl"
          startIcon={
            uploading ? (
              <CircularProgress size={"1.5rem"} color="inherit" />
            ) : (
              <SendRoundedIcon />
            )
          }
          disabled={uploading}
          onClick={createPost}>
          {uploading ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
};

export default NewPost;

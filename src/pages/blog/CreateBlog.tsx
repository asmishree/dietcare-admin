import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import CloudinaryUploadWidget from "../../components/CloudinaryUploadWidget";
import { Box, Button, TextField } from "@mui/material";
import API from "../../API";
import toast from "react-hot-toast";

function CreateBlog({ placeholder }: any) {
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const currentTheme = "dark";
  const editor = useRef(null);

  

  const config: any = useMemo(
    () => ({
      theme: currentTheme,
      readonly: false,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const summery = e.target.summary.value;
    try {
      const response = await axios.post(`${API}/blog/create`, {
        title,
        description,
        summery,
        img: imageUrl,
      });
      toast.success(response.data.message)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <h1>Create Blog</h1>
        <Box sx={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <TextField
            label="Title"
            name="title"
            variant="filled"
            required
            fullWidth
          />
        </Box>
        <TextField
          label="Summary"
          name="summary"
          rows={5}
          variant="filled"
          required
          fullWidth
          multiline
          margin="normal"
        />
        
        <Box my={2}>
          {imageUrl ? (
            <Box>
              <h3>Poster</h3>
              <Box my={2} className="media-box">
                {imageUrl && <img src={imageUrl} alt="Uploaded" />}
              </Box>
            </Box>
          ) : (
            ""
          )}

          {!imageUrl ? (
            <CloudinaryUploadWidget
              imageLimit={1}
              onImageUpload={(uploadedImages: any) => {
                if (uploadedImages.length > 0) {
                  setImageUrl(uploadedImages[0]);
                }
              }}
            />
          ) : (
            ""
          )}
        </Box>
        <JoditEditor
          ref={editor}
          config={config}
          value={description}
          onBlur={(newContent) => setDescription(newContent)}
          onChange={(newContent) => setDescription(newContent)}
        />
        <Button type="submit" variant="contained" sx={{margin:"20px 0"}}>
          Create Blog
        </Button>
      </form>
    </Box>
  );
}

export default CreateBlog;

import React, { useMemo, useRef, useState, useEffect } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import JoditEditor from "jodit-react";
import CloudinaryUploadWidget from "../../components/CloudinaryUploadWidget";
import { Box, Button, TextField } from "@mui/material";
import API from "../../API";
import toast from "react-hot-toast";

function EditBlog() {
    const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [blogData, setBlogData] = useState({
    title: "",
    summery: "",
    img: "",
    description: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const currentTheme = "dark";
  const editor = useRef(null);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API}/blog/delete/${id}`);
      navigate("/blog")
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch blog data using the provided blog ID
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(`${API}/blog/getblog/${id}`);
        const { title, summery, img, description } = response.data;
        setBlogData({ title, summery, img, description });
        setImageUrl(img);
        setDescription(description);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [id]);

  const config: any = useMemo(
    () => ({
      theme: currentTheme,
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    const summery = e.target.summery.value;
    try {
      const response = await axios.put(`${API}/blog/update/${id}`, {
        title,
        description,
        summery,
        img: imageUrl,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <h1>Edit Blog</h1>
        <Box sx={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <TextField
            label="Title"
            name="title"
            variant="filled"
            required
            fullWidth
            value={blogData.title}
  onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          />
        </Box>
        <TextField
          label="summery"
          name="summery"
          rows={5}
          variant="filled"
          required
          fullWidth
          multiline
          margin="normal"
          value={blogData.summery}
          onChange={(e) => setBlogData({ ...blogData, summery: e.target.value })}
        />

        <Box my={2}>
          {imageUrl && (
            <Box>
              <h3>Poster</h3>
              <Box my={2} className="media-box">
                {imageUrl && <img src={imageUrl} alt="Uploaded" />}
              </Box>
            </Box>
          )}

          {!imageUrl && (
            <CloudinaryUploadWidget
              imageLimit={1}
              onImageUpload={(uploadedImages: any) => {
                if (uploadedImages.length > 0) {
                  setImageUrl(uploadedImages[0]);
                }
              }}
            />
          )}
        </Box>
        <JoditEditor
          ref={editor}
          config={config}
          value={description}
          onBlur={(newContent) => setDescription(newContent)}
          onChange={(newContent) => setDescription(newContent)}
        />
        <Box sx={{display:"flex", gap:"20px"}}>
        <Button type="submit" variant="contained" sx={{ margin: "20px 0" }}>
          Update Blog
        </Button>
        <Button color="error" variant="contained" sx={{ margin: "20px 0" }} onClick={handleDelete}>
          Delete Blog
        </Button>
        </Box>

      </form>
    </Box>
  );
}

export default EditBlog;

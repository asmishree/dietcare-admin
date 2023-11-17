import React, { useMemo, useRef, useState, useEffect } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { FormControl } from "@mui/material";
import {
  Box,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../API";
import toast from "react-hot-toast";

function EditDiet() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [dietData, setDietData] = useState({
    title: "",
    activity: "",
    dietpref: "",
    yourdiet: "",
  });

  const currentTheme = "dark";
  const editor = useRef(null);

  const config: any = useMemo(
    () => ({
      theme: currentTheme,
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  useEffect(() => {
    // Fetch diet data using the provided diet ID
    const fetchDietData = async () => {
      try {
        const response = await axios.get(`${API}/diet/getdiet/${id}`);
        const { title, activity, dietpref, yourdiet } = response.data;
        setDietData({ title, activity, dietpref, yourdiet });
      } catch (error) {
        console.error("Error fetching diet data:", error);
      }
    };

    fetchDietData();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const title = e.target.title.value;
    try {
      const response = await axios.put(`${API}/diet/update/${id}`, {
        title,
        activity: dietData.activity,
        dietpref: dietData.dietpref,
        yourdiet: dietData.yourdiet,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${API}/diet/delete/${id}`);
      navigate("/diets");
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <h1>Edit Diet</h1>
        <Box sx={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <TextField
            label="Title"
            name="title"
            variant="filled"
            required
            fullWidth
            value={dietData.title}
            onChange={(e) =>
              setDietData({ ...dietData, title: e.target.value })
            }
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gap: "10px",
            margin: "30px 0",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <FormControl>
            <InputLabel>Activity Level</InputLabel>
            <Select
              variant="filled"
              required
              fullWidth
              value={dietData.activity}
              onChange={(e) =>
                setDietData({ ...dietData, activity: e.target.value })
              }
            >
              <MenuItem value="sedentary">Sedentary</MenuItem>
              <MenuItem value="moderately">Moderately Active</MenuItem>
              <MenuItem value="highly">Highly Active</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Dietary Preference</InputLabel>
            <Select
              variant="filled"
              required
              fullWidth
              value={dietData.dietpref}
              onChange={(e) =>
                setDietData({ ...dietData, dietpref: e.target.value })
              }
            >
              <MenuItem value="veg">Vegetarian</MenuItem>
              <MenuItem value="nonveg">Non Vegetarian</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box my={2}>
          <JoditEditor
            ref={editor}
            config={config}
            value={dietData.yourdiet}
            onBlur={(newContent) =>
              setDietData({ ...dietData, yourdiet: newContent })
            }
            onChange={(newContent) =>
              setDietData({ ...dietData, yourdiet: newContent })
            }
          />
        </Box>

        <Box sx={{ display: "flex", gap: "20px" }}>
          <Button type="submit" variant="contained" sx={{ margin: "20px 0" }}>
            Update Diet
          </Button>
          <Button
            color="error"
            variant="contained"
            sx={{ margin: "20px 0" }}
            onClick={handleDelete}
          >
            Delete Diet
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default EditDiet;

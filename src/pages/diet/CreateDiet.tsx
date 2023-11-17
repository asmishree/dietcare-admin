import React, { useMemo, useRef, useState } from "react";
import axios from "axios";
import JoditEditor from "jodit-react";
import { FormControl } from '@mui/material';
import { Box, Button, Select, MenuItem, TextField,InputLabel } from "@mui/material";
import API from "../../API";
import toast from "react-hot-toast";

function CreateDiet({ placeholder }: any) {
  const [yourdiet, setYourdiet] = useState("");
  const [activity, setActivity] = useState("");
  const [dietpref, setDietpref] = useState("");
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
    try {
      const response = await axios.post(`${API}/diet/create`, {
        title,
        activity,
        dietpref,
        yourdiet

        
      });
      console.log("Form Data:", {
        title,
        dietpref,
        activity,
        yourdiet,
      });
      toast.success(response.data.message)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <h1>Create Diet</h1>
        <Box sx={{ display: "flex", gap: "10px", margin: "10px 0" }}>
          <TextField
            label="Title"
            name="title"
            variant="filled"
            required
            fullWidth
          />
        </Box>

        <Box sx={{ display: "grid", gap: "10px", margin: "30px 0", gridTemplateColumns:"1fr 1fr" }}>
        <FormControl>
        <InputLabel>Activity Level</InputLabel>
        <Select
            variant="filled"
            required
            fullWidth
            value={activity}
            onChange={(e)=>{setActivity(e.target.value)}}
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
            value={dietpref}
            onChange={(e)=>{setDietpref(e.target.value)}}
          >
            <MenuItem value="veg">Vegetarian</MenuItem>
            <MenuItem value="nonveg">Non Vegetarian</MenuItem>
          </Select>
          </FormControl>
        </Box>
        
        <Box my={2}>
          

          
        </Box>
        <JoditEditor
          ref={editor}
          config={config}
          value={yourdiet}
          onBlur={(newContent) => setYourdiet(newContent)}
          onChange={(newContent) => setYourdiet(newContent)}
        />
        <Button type="submit" variant="contained" sx={{margin:"20px 0"}}>
          Create Diet
        </Button>
      </form>
    </Box>
  );
}

export default CreateDiet;

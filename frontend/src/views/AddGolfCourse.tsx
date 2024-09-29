import React, { useState } from "react";

import Navbar from "../components/Navbar";
import { Typography, TextField, Button, Box, Alert } from "@mui/material";
import axios from "axios";

interface GolfCourseForm {
  name: string;
  location: string;
  contact: string;
}

const AddGolfCourse: React.FC = () => {
  const [formData, setFormData] = useState<GolfCourseForm>({
    name: "",
    location: "",
    contact: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const { user } = useContext(AuthContext);
    const userId = user ? user.id : null;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/golfcourses",
        {
          ...formData,
          createdBy: userId,
        }
      );

      setSuccess("Golf course added successfully!");
      setFormData({ name: "", location: "", contact: "" });
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Add Golf Course
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Golf Course Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Address"
            name="location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Golf Course"}
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default AddGolfCourse;

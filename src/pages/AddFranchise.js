// AddFranchiseForm.js
import React, { useState } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import { useFranchise } from "src/contexts/franchise-context";

const AddFranchiseForm = ({ open, setOpen }) => {
  const { addFranchise } = useFranchise();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    location: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneNumberChange = (event) => {
    const inputValue = event.target.value;

    // Check if the input value is a number
    if (!isNaN(inputValue) && inputValue.length <= 10) {
      setFormData((prevData) => ({
        ...prevData,
        phoneNumber: inputValue,
      }));
    }
  };

  // const handleImageChange = (e) => {
  //   setFormData({ ...formData, image: e.target.files[0] });
  // };
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB (adjust as needed)
    if (file.size > maxSizeInBytes) {
      alert("File size exceeds the maximum allowed limit (2MB). Please select a smaller file.");
    } else {
      setFormData({ ...formData, image: file });

      // Display image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (let key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      addFranchise(formDataToSend);

      // Reset form after submission
      setFormData({
        name: "",
        phoneNumber: "",
        location: "",
        password: "",
        image: null,
      });
      setImagePreview(null);
      setOpen(false);
    } catch (error) {
      console.error("Error adding franchise:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setImagePreview(null);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent>
          {/* Edit form section */}
          <Typography variant="h6" gutterBottom>
            Add Franchise
          </Typography>
          <form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Franchise Name"
                  name="name"
                  variant="outlined"
                  margin="normal"
                  type="text"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  variant="outlined"
                  margin="normal"
                  value={formData.phoneNumber}
                  onChange={handlePhoneNumberChange}
                  type="tel"
                />
              </Grid>

              <Grid item xs={12}>
                <div>
                  <TextField
                    fullWidth
                    label="Location"
                    name="location"
                    variant="outlined"
                    margin="normal"
                    type="text" // Set input type to tel for phone numbers
                    onChange={handleChange}
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  variant="outlined"
                  margin="normal"
                  type="password" // Set input type to tel for phone numbers
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                  id="upload-image"
                />
                <label htmlFor="upload-image">
                  <Button
                    variant="outlined"
                    component="span"
                    fullWidth
                    sx={{ justifyContent: "flex-start" }}
                  >
                    Upload Image
                  </Button>
                </label>
              </Grid>
              {imagePreview && (
                <Grid item xs={12}>
                  <Box mt={2}>
                    <Typography variant="subtitle1">Uploaded Image Preview:</Typography>
                    <img
                      src={imagePreview}
                      alt="Uploaded"
                      style={{ maxWidth: "50%", maxHeight: "50%", height: "auto", marginTop: 8 }}
                    />
                  </Box>
                </Grid>
              )}

              <Grid item xs={12}>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button type="submit" color="primary">
                    Save Changes
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddFranchiseForm;

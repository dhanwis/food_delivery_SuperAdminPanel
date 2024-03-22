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

  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    location: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate input value after each change
    switch (name) {
      case "name":
        validateName(value);
        break;
      case "phoneNumber":
        validatePhoneNumber(value);
        break;
      case "location":
        validateLocation(value);
        break;
      case "password":
        validatePassword(value);
        break;
      default:
        break;
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Reset corresponding error when the user types
    switch (name) {
      case "name":
        if (!value.trim()) {
          setNameError("Franchise name is required");
        }
        break;
      case "phoneNumber":
        if (!value.trim()) {
          setPhoneNumberError("Phone number is required");
        }
        break;
      case "location":
        if (!value.trim()) {
          setLocationError("Location is required");
        }
        break;
      case "password":
        if (!value.trim()) {
          setPasswordError("Password is required");
        }
        break;
      default:
        break;
    }
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

    const isNameValid = validateName(formData.name);
    const isPhoneNumberValid = validatePhoneNumber(formData.phoneNumber);
    const isLocationValid = validateLocation(formData.location);
    const isPasswordValid = validatePassword(formData.password);

    if (!isNameValid || !isPhoneNumberValid || !isLocationValid || !isPasswordValid) {
      return;
    }

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

  //validation setup here;

  const validateName = (name) => {
    if (!name.trim()) {
      setNameError("Name is required");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber.trim()) {
      setPhoneNumberError("Phone number is required");
      return false;
    }
    setPhoneNumberError("");
    return true;
  };

  const validateLocation = (location) => {
    if (!location.trim()) {
      setLocationError("Location is required");
      return false;
    }
    setLocationError("");
    return true;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError("Password must contain at least 8 characters, one letter, and one number");
      return false;
    }
    setPasswordError("");
    return true;
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
                  onBlur={handleBlur}
                />
                <Typography color="error" variant="body2">
                  {nameError}
                </Typography>
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
                  onBlur={handleBlur}
                  type="tel"
                />
                <Typography color="error" variant="body2">
                  {phoneNumberError}
                </Typography>
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
                    onBlur={handleBlur}
                  />
                  <Typography color="error" variant="body2">
                    {locationError}
                  </Typography>
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
                  onBlur={handleBlur}
                />
                <Typography color="error" variant="body2">
                  {passwordError}
                </Typography>
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

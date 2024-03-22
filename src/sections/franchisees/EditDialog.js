import React, { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  SvgIcon,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import { useFranchise } from "src/contexts/franchise-context";
import ConfirmationDialog from "./ConfirmationDialog";

const EditFranchiseForm = ({ franchiseData, setOpen, open }) => {
  const { editFranchise, deleteFranchise, blockFranchise, unblockFranchise } = useFranchise();
  const [imagePreview, setImagePreview] = useState(null);

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState(null);

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

  // Populate form data with franchise data when modal opens
  useEffect(() => {
    if (open && franchiseData) {
      setFormData({
        name: franchiseData.name || "",
        phoneNumber: franchiseData.phoneNumber || "",
        location: franchiseData.location || "",
        password: "",
      });
      setImagePreview(franchiseData.imageUrl);
    }
  }, [open, franchiseData]);

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

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
    setImagePreview(URL.createObjectURL(e.target.files[0]));
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

  const handleEdit = (e) => {
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

      editFranchise(franchiseData._id, formDataToSend);

      // Reset form after submission
      setOpen(false);
      setImagePreview(null);
    } catch (error) {
      console.error("Error editing franchise:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setImagePreview(null);
  };

  const handleOpenConfirmation = (action) => {
    setConfirmationAction(() => action);
    setOpenConfirmation(true);
  };

  const handleBlock = () => {
    handleOpenConfirmation(blockFranchise);
  };

  const handleUnBlock = () => {
    handleOpenConfirmation(unblockFranchise);
  };

  const handleDelete = () => {
    handleOpenConfirmation(deleteFranchise);
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
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {/* Edit form section */}
          <Typography variant="h6" gutterBottom>
            Edit Franchise
          </Typography>
          <form onSubmit={handleEdit} encType="multipart/form-data" method="PUT">
            <TextField
              fullWidth
              label="Franchise Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              onBlur={handleBlur}
            />
            <Typography color="error" variant="body2">
              {nameError}
            </Typography>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              variant="outlined"
              margin="normal"
              value={formData.phoneNumber}
              type="tel"
              onBlur={handleBlur}
              onChange={handlePhoneNumberChange}
            />
            <Typography color="error" variant="body2">
              {phoneNumberError}
            </Typography>
            <TextField
              fullWidth
              label="Location"
              name="location"
              variant="outlined"
              value={formData.location}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              type="text"
            />
            <Typography color="error" variant="body2">
              {locationError}
            </Typography>
            <TextField
              fullWidth
              label="Password"
              name="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="normal"
              type="password"
            />
            <Typography color="error" variant="body2">
              {passwordError}
            </Typography>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="upload-image"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ maxWidth: "50%", maxHeight: "50%", height: "auto", marginTop: 8 }}
              />
            )}
            <label htmlFor="upload-image">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ justifyContent: "flex-start" }}
              >
                Update Image
              </Button>
            </label>

            {franchiseData.status == "blocked" ? (
              <Button
                onClick={handleUnBlock}
                variant="contained"
                sx={{
                  marginRight: 1,
                  marginTop: "10px",
                  bgcolor: "green",
                  "&:hover": {
                    bgcolor: "green",
                  },
                }}
                startIcon={
                  <SvgIcon fontSize="small">
                    <BlockIcon />
                  </SvgIcon>
                }
              >
                UnBlock
              </Button>
            ) : (
              <Button
                onClick={handleBlock}
                variant="contained"
                sx={{
                  marginRight: 1,
                  marginTop: "10px",
                  bgcolor: "black",
                  "&:hover": {
                    bgcolor: "black",
                  },
                }}
                startIcon={
                  <SvgIcon fontSize="small">
                    <BlockIcon />
                  </SvgIcon>
                }
              >
                Block
              </Button>
            )}
            <Button
              onClick={handleDelete}
              variant="contained"
              startIcon={
                <SvgIcon fontSize="small">
                  <DeleteIcon />
                </SvgIcon>
              }
              sx={{
                marginRight: 1,
                marginTop: "10px",
                bgcolor: "red",
                "&:hover": {
                  bgcolor: "red",
                },
              }}
            >
              Delete
            </Button>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save Changes
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      <ConfirmationDialog
        setOpen={setOpen} // for open / close edit model window not this one!
        openConfirmation={openConfirmation}
        setOpenConfirmation={setOpenConfirmation}
        action={confirmationAction}
        franchiseData={franchiseData}
      />
    </div>
  );
};

export default EditFranchiseForm;

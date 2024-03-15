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
        password: franchiseData.password || "",
      });
      setImagePreview(franchiseData.imageUrl);
    }
  }, [open, franchiseData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <div>
      {" "}
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
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              variant="outlined"
              margin="normal"
              value={formData.phoneNumber}
              type="tel"
              onChange={handlePhoneNumberChange}
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              variant="outlined"
              value={formData.location}
              onChange={handleChange}
              margin="normal"
              type="text"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              type="password"
            />
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

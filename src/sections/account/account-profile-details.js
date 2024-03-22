import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Avatar,
  Typography,
  Unstable_Grid2 as Grid,
  Modal,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useAuth } from "src/hooks/use-auth";
import { adminImageUrl } from "src/utils/constant/urls";

export const AccountProfileDetails = () => {
  const { user, createProfile } = useAuth();
  const adminData = user?.adminData;
  console.log(useAuth());

  let full_name = user?.adminData ? `${user.adminData.fname} ${user.adminData.lname}` : "Admin";

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    emailID: "",
    adminPhoneNumber: "",
    adminImg: null,
  });
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    emailID: "",
    adminPhoneNumber: "",
  });

  useEffect(() => {
    if (adminData) {
      setFormData({
        //_id: adminData._id,
        fname: adminData && adminData.fname,
        lname: adminData && adminData.lname,
        emailID: adminData && adminData.email,
        adminPhoneNumber: adminData && adminData.adminPhoneNumber,
        adminImg: adminData.adminImg ? adminData.adminImg : null,
      });

      setImagePreview(adminData.adminImg ? adminData.adminImg : null);
    }
  }, [adminData]);

  useEffect(() => {
    // Close success modal after 5 seconds
    const timer = setTimeout(() => {
      setShowSuccessModal(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [showSuccessModal]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset error when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB (adjust as needed)
    if (file.size > maxSizeInBytes) {
      alert("File size exceeds the maximum allowed limit (2MB). Please select a smaller file.");
    } else {
      setFormData({ ...formData, adminImg: file });

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

    // Validate form fields
    let formIsValid = true;
    const newErrors = { ...errors };

    if (!formData.fname) {
      newErrors.fname = "First name is required";
      formIsValid = false;
    }

    if (!formData.lname) {
      newErrors.lname = "Last name is required";
      formIsValid = false;
    }

    // if (!formData.emailID) {
    //   newErrors.emailID = "Email is required";
    //   formIsValid = false;
    // }

    if (!formData.adminPhoneNumber) {
      newErrors.adminPhoneNumber = "Phone number is required";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (formIsValid) {
      try {
        const formDataToSend = new FormData();

        for (let key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        await createProfile(formDataToSend);
        setShowSuccessModal(!showSuccessModal);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  //  console.log(imagePreview);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <CardContent sx={{ pt: 0 }}>
          <Grid xs={12} md={6} lg={4}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar
                src={imagePreview && imagePreview}
                sx={{
                  height: 80,
                  mb: 2,
                  width: 80,
                }}
              />
              <Typography gutterBottom variant="h5">
                {full_name}
              </Typography>
              {/* <Typography color="text.secondary" variant="body2">
                {adminData.state} {adminData.country}
              </Typography> */}
            </Box>
            <Grid item xs={12}>
              <input
                type="file"
                accept="image/*"
                name="adminImg"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="upload-image"
              />
              <label htmlFor="upload-image">
                <Button variant="outlined" component="span" fullWidth>
                  Upload Image
                </Button>
              </label>
            </Grid>
          </Grid>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText={errors.fname}
                  error={Boolean(errors.fname)}
                  label="First name"
                  name="fname"
                  value={formData.fname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText={errors.lname}
                  error={Boolean(errors.lname)}
                  label="Last name"
                  name="lname"
                  value={formData.lname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="emailID"
                  value={"admin@example.com"} // If this value is hard-coded, ensure it's not overridden
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  helperText={errors.adminPhoneNumber}
                  error={Boolean(errors.adminPhoneNumber)}
                  label="Phone Number"
                  name="adminPhoneNumber"
                  value={formData.adminPhoneNumber}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </CardActions>
      </Card>

      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: 400,
            backgroundColor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 60, color: "green", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Profile Saved Successfully
          </Typography>
          <Typography variant="body1" gutterBottom>
            Your profile has been saved successfully.
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Box>
      </Modal>
    </form>
  );
};

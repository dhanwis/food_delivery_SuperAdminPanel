import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";

const user = {
  avatar: "/assets/avatars/avatar-anika-visser.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developer",
  name: "Anika Visser",
  timezone: "GTM-7",
};

export const AccountProfile = ({ values, setValues, handleSubmit }) => {
  const [imagePreview, setImagePreview] = useState();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const maxSizeInBytes = 2 * 1024 * 1024; // 2MB (adjust as needed)
    if (file.size > maxSizeInBytes) {
      alert("File size exceeds the maximum allowed limit (2MB). Please select a smaller file.");
    } else {
      setValues({ ...values, image: file });

      // Display image preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={imagePreview}
              sx={{
                height: 80,
                mb: 2,
                width: 80,
              }}
            />
            <Typography gutterBottom variant="h5">
              {user.name}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.city} {user.country}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user.timezone}
            </Typography>
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
          {/* {imagePreview && (
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
          )} */}
        </form>
      </CardContent>
      <Divider />
    </Card>
  );
};

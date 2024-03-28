import React, { createContext, useContext, useState } from "react";
import axios from "../utils/constant/axiosConfig";
import { imageUrl } from "src/utils/constant/urls";

// Create a context for franchise data
const FranchiseContext = createContext();

// Custom hook to use the franchise context
export const useFranchise = () => useContext(FranchiseContext);

// Franchise context provider component
export const FranchiseProvider = ({ children }) => {
  // State to hold franchise data
  const [franchises, setFranchises] = useState([]);

  // Function to add a new franchise
  const addFranchise = async (newFranchise) => {
    try {
      // Make POST request to add new franchise
      const response = await axios.post("franchise/addFranchise", newFranchise);

      if (response.status === 201) {
        // Add the newly created franchise from response data to the state
        const createdFranchise = response.data;
        setFranchises((prevFranchises) => [...prevFranchises, createdFranchise]);
        console.log("New franchise added successfully:", createdFranchise);
      } else {
        throw new Error("Failed to add new franchise");
      }
    } catch (error) {
      console.error("Error adding franchise:", error);
      // Handle error
    }
  };

  // Function to edit a franchise
  const editFranchise = async (franchiseId, updatedData) => {
    try {
      // Make PUT request to update franchise
      const response = await axios.put(`franchise/${franchiseId}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      });
      if (response.status === 200) {
        const updatedFranchise = response.data;
        // Update franchises state with the updated franchise
        setFranchises((prevFranchises) =>
          prevFranchises.map((franchise) =>
            franchise._id === updatedFranchise._id ? updatedFranchise : franchise
          )
        );
        console.log("Franchise updated successfully");
      } else {
        throw new Error("Failed to update franchise");
      }
    } catch (error) {
      console.error("Error updating franchise:", error);
    }
  };

  // Function to fetch all franchises
  const fetchFranchises = async () => {
    try {
      // Make GET request to fetch all franchises
      const response = await axios.get("franchise/allFranchiseData");
      if (response.status !== 200) {
        throw new Error("Failed to fetch franchises");
      }

      // Extract data from response
      const franchises = response.data;
      console.log(response.config);

      // Optionally transform data
      const transformedFranchises = franchises.map((franchise) => ({
        ...franchise,
        imageUrl: franchise.imageUrl ? `${imageUrl}/${franchise.imageUrl}` : null,
        createdAt: new Date(franchise.createdAt).toLocaleString(),
      }));

      return transformedFranchises;
    } catch (error) {
      console.error("Error fetching franchises:", error);
      throw error; // Rethrow the error to handle it where the function is called
    }
  };

  const deleteFranchise = async (franchiseId) => {
    try {
      // Send DELETE request to delete franchise
      let response = await axios.delete(`franchise/${franchiseId}`);

      if (response.status === 200) {
        setFranchises((prevFranchises) =>
          prevFranchises.filter((franchise) => franchise._id !== franchiseId)
        );
        console.log("Franchise deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting franchise:", error);
      // Handle error scenarios
    }
  };

  //Blocking setup for each franchise;
  // Blocking setup for each franchise;
  const blockFranchise = async (franchiseId) => {
    try {
      // Make a request to your backend API to block the franchise
      const response = await axios.put(`franchise/block-franchise/${franchiseId}`);

      if (response.status === 200) {
        // Update the franchise status in the frontend
        const updatedFranchise = response.data.updatedFranchise;

        console.log(response.data.updatedFranchise);

        //updation after franchise is blocked;
        setFranchises((prevFranchises) =>
          prevFranchises.map((franchise) => franchise._id === franchiseId && franchise)
        );
      }
    } catch (error) {
      console.error("Error blocking franchise:", error);
    }
  };

  // UnBlocking setup for each franchise;
  const unblockFranchise = async (franchiseId) => {
    try {
      // Make a request to your backend API to unblock the franchise
      const response = await axios.put(`franchise/unblock-franchise/${franchiseId}`);

      if (response.status === 200) {
        // Update the franchise status in the frontend
        const updatedFranchise = response.data.updatedFranchise;

        //updation after franchise is unblocked;
        setFranchises((prevFranchises) =>
          prevFranchises.map((franchise) => franchise._id === franchiseId && franchise)
        );

        console.log(response.data); // Log the data
      }
    } catch (error) {
      console.error("Error unblocking franchise:", error);
    }
  };

  // Provide the franchise data and functions to child components
  return (
    <FranchiseContext.Provider
      value={{
        franchises,
        addFranchise,
        fetchFranchises,
        editFranchise,
        deleteFranchise,
        blockFranchise,
        unblockFranchise,
      }}
    >
      {children}
    </FranchiseContext.Provider>
  );
};

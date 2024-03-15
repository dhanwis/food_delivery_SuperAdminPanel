import { franchisesData } from "src/pages/franchise";

export const getFranchiseById = (id) => {
  return new Promise((resolve, reject) => {
    // Find the franchise with the matching id
    const franchise = franchisesData.find((franchise) => franchise.id === id);
    if (franchise) {
      resolve(franchise);
    } else {
      reject(new Error("Franchise not found"));
    }
  });
};

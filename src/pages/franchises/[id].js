import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getFranchiseById } from "src/utils/franchiseService";

const FranchiseDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [franchise, setFranchise] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch franchise data based on the id
      getFranchiseById(id)
        .then((data) => {
          setFranchise(data);
        })
        .catch((error) => {
          console.error("Error fetching franchise data:", error);
        });
    }
  }, [id]);

  return (
    <div>
      {franchise ? (
        <>
          <h1>{franchise.title}</h1>
          <p>{franchise.description}</p>
          {/* Render other franchise details */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FranchiseDetailsPage;

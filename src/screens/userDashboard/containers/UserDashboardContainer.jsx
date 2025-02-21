import React, { useEffect, useState } from "react";
import { useAuth } from "../../../auth";
import { getUserDetails, getUserIndividuals, addIndividual } from "../services/userService";//added
import UserDashboard from "../components/UserDashboard";
import {toast} from "react-hot-toast";

const UserDashboardContainer = () => {
  const { userId, token } = useAuth();
  const [user, setUser] = useState(null);
  const [individuals, setIndividuals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetails = await getUserDetails(userId, token);
        const individualsList = await getUserIndividuals(userId, token);
        setUser(userDetails);
        setIndividuals(individualsList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId, token]);

  const handleAddIndividual = async (formData) => {
    try {
      await addIndividual(userId, token, formData);
      const updatedIndividuals = await getUserIndividuals(userId, token);
      setIndividuals(updatedIndividuals);
    } catch (error) {
      console.error('Error adding individual:', error);
    }
  };//added

  return <UserDashboard user={user} individuals={individuals} onAddIndividual={handleAddIndividual} />;//added
};

export default UserDashboardContainer;
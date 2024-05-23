import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import Header from "./components/Header/header";
import UsersTable from "./components/UsersTable/users-table";
import TabsBar from "./components/TabsBar/tabs-bar";
import { useAuth } from "../../contexts/AuthProvider";
import api from "../../services/usersApi";
import { User } from "../../types";

const Home: React.FC = () => {
  const { user } = useAuth();
  const [userList, setUserList] = useState<User[]>([]);
  const [filteredUserList, setFilteredUserList] = useState<User[]>([]);

  const filterUserList = (searchInputValue: string) => {
    const filteredUsers = userList.filter((user) =>
      `${user.nome} ${user.sobrenome}`
        .toLowerCase()
        .includes(searchInputValue.toLowerCase())
    );
    setFilteredUserList(filteredUsers);
  };

  const loadDataGridData = async () => {
    try {
      const response = await api.get("");
      setUserList(response.data);
      setFilteredUserList(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    loadDataGridData();
  }, []);

  return (
    userList &&
    user && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundColor: "#F5F5F5",
        }}
      >
        <Header filterUserList={filterUserList} />
        <TabsBar triggerRefetchListDataGrid={loadDataGridData} />
        <UsersTable
          userList={filteredUserList}
          triggerRefetchListDataGrid={loadDataGridData}
        />
      </Box>
    )
  );
};

export default Home;

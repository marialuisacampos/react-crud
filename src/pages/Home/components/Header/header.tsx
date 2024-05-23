import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Toolbar, Typography, TextField, Box, AppBar } from "@mui/material";
import { styled } from "@mui/system";
import { useAuth } from "../../../../contexts/AuthProvider";

const ToolbarItem = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

interface IHeaderProps {
  filterUserList: (searchInputValue: string) => void;
}

const Header: React.FC<IHeaderProps> = ({ filterUserList }) => {
  const { user } = useAuth();

  return (
    user && (
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Gerenciar usuários
          </Typography>
          <ToolbarItem>
            <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              hiddenLabel
              variant="standard"
              size="small"
              sx={{ marginRight: "16px" }}
              onChange={(e) => filterUserList(e.target.value)}
            />
          </ToolbarItem>
          <ToolbarItem>
            <AccountCircleIcon fontSize="large" />
            <Box sx={{ display: "flex", flexDirection: "column", gap: "0px" }}>
              <Typography>{`${user.nome} ${user.sobrenome}`}</Typography>
              <Typography sx={{ fontSize: "0.8rem", color: "gray" }}>
                {user.tipoUsuario}
              </Typography>
            </Box>
          </ToolbarItem>
        </Toolbar>
      </AppBar>
    )
  );
};

export default Header;

import React, { useEffect, useMemo, useState } from "react";
import { Paper, Menu, MenuItem, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { User } from "../../../../types";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IProfileModalProps, ProfileModal } from "../../../../components";
import api from "../../../../services/usersApi";
import { useAuth } from "../../../../contexts/AuthProvider";

interface IUsersTableProps {
  triggerRefetchListDataGrid: () => void;
  userList: User[];
}

const UsersTable: React.FC<IUsersTableProps> = ({
  triggerRefetchListDataGrid,
  userList,
}) => {
  const [profileModalProps, setProfileModalProps] = useState<
    Omit<IProfileModalProps, "closeModal">
  >({ mode: "edit", userToEdit: null, visible: false });

  const { user } = useAuth();

  const [anchorEls, setAnchorEls] = useState<{
    [key: string]: HTMLElement | null;
  }>({});

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    userId: string
  ) => {
    event.preventDefault();
    setAnchorEls((prev) => ({ ...prev, [userId]: event.currentTarget }));
  };

  const handleMenuClose = (userId: string) => {
    setAnchorEls((prev) => ({ ...prev, [userId]: null }));
  };

  const deleteUser = async (userId: string) => {
    try {
      await api.delete(`/${userId}`);
      triggerRefetchListDataGrid();
    } catch (error) {}
  };

  const ActionIcons = (userRow: User & { id: string }) =>
    userRow?.tipoUsuario === "Administrador" && (
      <>
        <IconButton
          onClick={() => {
            setProfileModalProps((prev) => ({
              ...prev,
              visible: true,
              userToEdit: userRow,
            }));
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton onClick={(event) => handleMenuOpen(event, userRow.id)}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEls[userRow.id]}
          open={Boolean(anchorEls[userRow.id])}
          onClose={() => handleMenuClose(userRow.id)}
        >
          <MenuItem onClick={() => deleteUser(userRow.id)}>Excluir</MenuItem>
        </Menu>
      </>
    );

  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "Usuário",
      renderCell: (cellData) => (
        <div>{`${cellData.row.nome} ${cellData.row.sobrenome}`}</div>
      ),
      width: 1000,
    },
    { field: "tipoUsuario", headerName: "Tipo de usuário", width: 200 },
    {
      field: "active",
      headerName: "Usuário ativo",
      renderCell: (cellData) => <div>{cellData.row.ativo ? "Sim" : "Não"}</div>,
      width: 200,
    },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: (cellData) => ActionIcons(cellData.row),
    },
  ];

  const UsersDataGrid = useMemo(() => {
    return (
      <DataGrid
        sx={{
          borderColor: "transparent",
        }}
        autoHeight
        columns={columns}
        rows={userList}
      />
    );
  }, [userList, user, anchorEls]);

  return (
    <Paper
      sx={{
        padding: "16px",
        margin: "50px 150px",
      }}
    >
      {UsersDataGrid}
      {profileModalProps.visible && (
        <ProfileModal
          {...profileModalProps}
          closeModal={(triggerRefetchList: boolean) => {
            setProfileModalProps((prev) => ({
              ...prev,
              visible: false,
              userToEdit: null,
            }));
            triggerRefetchList && triggerRefetchListDataGrid();
          }}
        />
      )}
    </Paper>
  );
};

export default UsersTable;

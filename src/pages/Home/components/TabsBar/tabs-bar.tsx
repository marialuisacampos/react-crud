import React, { useState } from "react";
import { AppBar, Button, Tabs, Tab } from "@mui/material";
import { IProfileModalProps, ProfileModal } from "../../../../components";
import { useAuth } from "../../../../contexts/AuthProvider";

interface ITabsBarProps {
  triggerRefetchListDataGrid: () => void;
}

const TabsBar: React.FC<ITabsBarProps> = ({ triggerRefetchListDataGrid }) => {
  const [profileModalProps, setProfileModalProps] = useState<
    Omit<IProfileModalProps, "closeModal">
  >({ mode: "create", userToEdit: null, visible: false });

  const { user } = useAuth();

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white", padding: "0px 8px" }}
    >
      <Tabs value={0}>
        <Tab label="Usuários" />
        {user?.tipoUsuario === "Administrador" && (
          <Button
            variant="contained"
            color="primary"
            sx={{ margin: "10px", borderRadius: 0, marginLeft: "auto" }}
            onClick={() =>
              setProfileModalProps((prev) => ({ ...prev, visible: true }))
            }
          >
            Cadastrar
          </Button>
        )}
      </Tabs>
      {profileModalProps.visible && (
        <ProfileModal
          {...profileModalProps}
          closeModal={(triggerRefetchList) => {
            setProfileModalProps((prev) => ({ ...prev, visible: false }));
            triggerRefetchList && triggerRefetchListDataGrid();
          }}
        />
      )}
    </AppBar>
  );
};

export default TabsBar;

import React, { useEffect } from "react";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Box,
  Typography,
} from "@mui/material";
import { User } from "../../types";
import api from "../../services/usersApi";

export interface IProfileModalProps {
  visible: boolean;
  mode: "edit" | "create";
  userToEdit: User | null;
  closeModal: (triggerRefetchList: boolean) => void;
}

const ProfileModal: React.FC<IProfileModalProps> = ({
  visible,
  mode,
  userToEdit,
  closeModal,
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      ativo: false,
      tipoUsuario: "Usuário Padrão",
      nome: "",
      sobrenome: "",
      email: "",
      senha: "",
    },
  });

  useEffect(() => {
    if (userToEdit && mode === "edit") {
      reset(userToEdit);
    } else {
      reset({
        ativo: false,
        tipoUsuario: "Usuário Padrão",
        nome: "",
        sobrenome: "",
        email: "",
        senha: "",
      });
    }
  }, [userToEdit, mode, reset]);

  const editUser = async (data: User) => {
    await api.put(`/${userToEdit?.id}`, data);
  };

  const createUser = async (data: User) => {
    await api.post("", data);
  };

  const onSubmit = async (data: User) => {
    try {
      mode === "create" ? await createUser(data) : await editUser(data);
      handleCloseModal(true);
    } catch (error) {}
  };

  const handleCloseModal = (triggerRefetchList: boolean) => {
    reset({
      ativo: false,
      tipoUsuario: "Usuário Padrão",
      nome: "",
      sobrenome: "",
      email: "",
      senha: "",
    });
    closeModal(triggerRefetchList);
  };

  return (
    <Modal open={visible}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          backgroundColor: "white",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          {mode === "create" ? "Cadastro de usuário" : "Editar usuário"}
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            margin: "auto",
          }}
        >
          <FormControlLabel
            control={
              <Controller
                name="ativo"
                control={control}
                render={({ field }) => (
                  <Switch {...field} checked={field.value} />
                )}
              />
            }
            label="Usuário Ativo"
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Tipo de Usuário</FormLabel>
            <Controller
              name="tipoUsuario"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field}>
                  <FormControlLabel
                    value="Administrador"
                    control={<Radio />}
                    label="Administrador"
                  />
                  <FormControlLabel
                    value="Usuário Padrão"
                    control={<Radio />}
                    label="Usuário Padrão"
                  />
                </RadioGroup>
              )}
            />
          </FormControl>
          <Controller
            name="nome"
            control={control}
            render={({ field }) => (
              <TextField {...field} variant="standard" label="Nome" />
            )}
          />
          <Controller
            name="sobrenome"
            control={control}
            render={({ field }) => (
              <TextField {...field} variant="standard" label="Sobrenome" />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} variant="standard" label="Email" />
            )}
          />
          <Controller
            name="senha"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Senha"
                variant="standard"
                type="password"
              />
            )}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="button"
              variant="text"
              onClick={() => handleCloseModal(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="text" color="primary">
              {mode === "create" ? "Cadastrar" : "Salvar"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ProfileModal;

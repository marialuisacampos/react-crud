import React from "react";
import { Box, TextField, Button, Paper } from "@mui/material";
import { styled } from "@mui/system";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginBox = styled(Paper)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px 50px",
  width: "350px",
  boxShadow:
    "0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)",
  backgroundColor: "white",
});

const Login: React.FC = () => {
  const { login } = useAuth();
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      senha: "",
    },
  });
  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; senha: string }) => {
    try {
      await login(data.email, data.senha);
      navigate("/", { replace: true });
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#F5F5F5",
      }}
    >
      <LoginBox>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "Email é obrigatório" }}
            render={({ field, fieldState }) => (
              <TextField
                label="Email"
                type="email"
                variant="standard"
                fullWidth
                required
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Controller
            name="senha"
            control={control}
            rules={{ required: "Senha é obrigatória" }}
            render={({ field, fieldState }) => (
              <TextField
                label="Senha"
                type="password"
                variant="standard"
                margin="normal"
                fullWidth
                required
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : null}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              padding: "8px 50px",
              backgroundColor: "#F0815A",
              borderRadius: 0,
              ":hover": {
                backgroundColor: "#e27b58",
              },
            }}
          >
            Entrar
          </Button>
        </form>
      </LoginBox>
    </Box>
  );
};

export default Login;

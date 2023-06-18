import React from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "../../contexts/auth";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const Login: React.FC = () => {
  const { Login } = useAuth();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    await Login({
      email,
      password,
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Acessar
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
          <TextField
            {...register("email", { required: "Campo obrigatório" })}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            {...register("password", { required: "Campo obrigatório" })}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

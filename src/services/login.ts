import api from "./api";

export async function loginAPI(userData: object): Promise<LoginResponse> {
  try {
    const response = await api.post('/api/auth', {
      ...userData,
    });

    const { user, token } = response.data;

    return { user, token };
  } catch (error) {
    // Trate qualquer erro que possa ocorrer durante a requisição
    throw new Error('Erro na requisição');
  }
}

interface LoginResponse {
  user: string;
  token: string;
}

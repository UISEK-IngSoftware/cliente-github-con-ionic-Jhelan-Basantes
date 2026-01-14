import axios from 'axios';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import { UserInfo } from '../interfaces/UserInfo';
import AuthServices from './AuthServices';

const GITHUB_API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
    baseURL: GITHUB_API_URL,
});

// ===============================
// Interceptor de autenticación
// ===============================
githubApi.interceptors.request.use(
    (config) => {
        const authHeader = AuthServices.getAuthHeaders();
        if (authHeader) {
            config.headers.Authorization = authHeader;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ===============================
// GET repositorios del usuario
// ===============================
export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await githubApi.get('/user/repos', {
            params: {
                per_page: 100,
                sort: 'created',
                direction: 'desc',
                affiliation: 'owner',
            }
        });

        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description ?? null,
            owner: repo.owner?.login ?? null,
            imageUrl: repo.owner?.avatar_url ?? null,
            language: repo.language ?? null,
        }));

        return repositories;
    } catch (error) {
        console.error('Hubo un error al obtener repositorios:', error);
        return [];
    }
};

// ===============================
// POST crear repositorio
// ===============================
export const createRepository = async (repo: RepositoryItem): Promise<void> => {
    try {
        const response = await githubApi.post('/user/repos', repo);
        console.log('Repositorio ingresado:', response.data);
    } catch (error) {
        console.error('Error al crear repositorio:', error);
    }
};

// ===============================
// GET información del usuario
// ===============================
export const getUserInfo = async (): Promise<UserInfo | null> => {
    try {
        const response = await githubApi.get('/user');
        return response.data as UserInfo;
    } catch (error) {
        console.error('Error al obtener la informacion del usuario:', error);
        const userNotFound: UserInfo = {
            login: 'undefined',
            name: 'Usuario no encontrado',
            bio: 'No se pudo obtener la informacion del usuario',
            avatar_url:
                'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png',
        };
        return userNotFound;
    }
};

// ===============================
// DELETE eliminar repositorio
// ===============================
export const deleteRepository = async (
    owner: string,
    repo: string
): Promise<void> => {
    try {
        await githubApi.delete(`/repos/${owner}/${repo}`);
        console.log('Repositorio eliminado:', repo);
    } catch (error) {
        console.error('Error al eliminar repositorio:', error);
        throw error;
    }
};

// ===============================
// PUT / PATCH editar repositorio
// ===============================
export const updateRepository = async (
    owner: string,
    repo: string,
    newName: string,
    newDescription?: string
): Promise<void> => {
    try {
        await githubApi.patch(`/repos/${owner}/${repo}`, {
            name: newName,
            description: newDescription
        });
        console.log('Repositorio actualizado:', newName);
    } catch (error) {
        console.error('Error al actualizar repositorio:', error);
        throw error;
    }
};

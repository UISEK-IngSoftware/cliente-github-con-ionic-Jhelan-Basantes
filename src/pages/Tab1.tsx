import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  useIonViewDidEnter
} from '@ionic/react';
import { useState } from 'react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { RepositoryItem } from '../interfaces/RepositoryItem';
import {
  fetchRepositories,
  deleteRepository,
  updateRepository
} from '../services/GithubService';

const Tab1: React.FC = () => {

  const [repos, setRepos] = useState<RepositoryItem[]>([]);

  // ===============================
  // Cargar repositorios
  // ===============================
  const loadRepos = async () => {
    const reposData = await fetchRepositories();
    setRepos(reposData);
  };

  useIonViewDidEnter(() => {
    loadRepos();
  });

  // ===============================
  // ELIMINAR repositorio (DELETE)
  // ===============================
  const handleDelete = async (repo: RepositoryItem) => {
    if (!repo.owner) return;

    const confirmDelete = window.confirm(
      `¿Seguro que deseas eliminar el repositorio "${repo.name}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteRepository(repo.owner, repo.name);
      loadRepos();
    } catch {
      alert('Error al eliminar repositorio');
    }
  };

  // ===============================
  // GUARDAR EDICIÓN INLINE (PUT / PATCH)
  // ===============================
  const handleSave = async (
    repo: RepositoryItem,
    newName: string,
    newDescription?: string
  ) => {
    if (!repo.owner) return;

    try {
      await updateRepository(
        repo.owner,
        repo.name,
        newName,
        newDescription
      );
      loadRepos();
    } catch {
      alert('Error al actualizar repositorio');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {repos.map((repo, index) => (
            <RepoItem
              key={index}
              repo={repo}
              onDelete={handleDelete}
              onSave={handleSave}
            />
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;

import {
  IonItem,
  IonLabel,
  IonThumbnail,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonInput,
  IonTextarea,
  IonButton
} from '@ionic/react';
import { useRef, useState } from 'react';
import './RepoItem.css';
import { RepositoryItem } from '../interfaces/RepositoryItem';

interface Props {
  repo: RepositoryItem;
  onDelete: (repo: RepositoryItem) => void;
  onSave: (
    repo: RepositoryItem,
    newName: string,
    newDescription?: string
  ) => void;
}

const RepoItem: React.FC<Props> = ({ repo, onDelete, onSave }) => {

  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(repo.name);
  const [description, setDescription] = useState(repo.description ?? '');

  // ===============================
  // ACTIVAR EDICIÓN
  // ===============================
  const startEdit = async () => {
    // 🔴 Cerrar el slide antes de editar
    await slidingRef.current?.close();
    setEditing(true);
  };

  // ===============================
  // GUARDAR CAMBIOS
  // ===============================
  const handleSave = async () => {
    if (name.trim() === '') {
      alert('El nombre no puede estar vacío');
      return;
    }

    await onSave(repo, name, description);
    setEditing(false);
  };

  // ===============================
  // CANCELAR EDICIÓN
  // ===============================
  const cancelEdit = async () => {
    await slidingRef.current?.close();
    setEditing(false);
    setName(repo.name);
    setDescription(repo.description ?? '');
  };

  return (
    <IonItemSliding ref={slidingRef} disabled={editing}>

      {/* OPCIONES SLIDE */}
      <IonItemOptions side="end">
        <IonItemOption color="primary" onClick={startEdit}>
          Editar
        </IonItemOption>

        <IonItemOption color="danger" onClick={() => onDelete(repo)}>
          Eliminar
        </IonItemOption>
      </IonItemOptions>

      {/* ITEM */}
      <IonItem lines="full">
        <IonThumbnail slot="start">
          <img
            src={repo.imageUrl || 'https://i.pinimg.com/originals/1d/40/0e/1d400e79e924b844848049f3e52172b2.jpg'}
            alt={repo.name}
          />
        </IonThumbnail>

        {!editing ? (
          <IonLabel>
            <h2>{repo.name}</h2>
            <p>{repo.description}</p>
            <p>Propietario: {repo.owner}</p>
            <p>Lenguaje: {repo.language}</p>
          </IonLabel>
        ) : (
          <IonLabel className="edit-form">
            <IonInput
              label="Nombre"
              labelPlacement="floating"
              fill="outline"
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
            />

            <IonTextarea
              label="Descripción"
              labelPlacement="floating"
              fill="outline"
              rows={4}
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
            />

            <IonButton expand="block" onClick={handleSave}>
              Guardar
            </IonButton>

            <IonButton
              expand="block"
              color="medium"
              onClick={cancelEdit}
            >
              Cancelar
            </IonButton>
          </IonLabel>
        )}
      </IonItem>

    </IonItemSliding>
  );
};

export default RepoItem;

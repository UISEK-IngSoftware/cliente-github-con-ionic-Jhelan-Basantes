import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
      <img alt="Silhouette of mountains" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBlvwAFZOSFDTOCFf4CEzpkHEJ-3u2XUU13Q&s" />
      <IonCardHeader>
        <IonCardTitle>Jhelan Basantes</IonCardTitle>
        <IonCardSubtitle>Jhelan-Basantes</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>Esta es mi cuenta de github en donde subo mis proyectos, soy un estudiante de ingeniería informática de 5to semestre</IonCardContent>
    </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;

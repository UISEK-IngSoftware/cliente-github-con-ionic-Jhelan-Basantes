import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab1.css';
import RepoItem from '../components/RepoItem';

const Tab1: React.FC = () => {
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
          <RepoItem name="Android-Proyect" imageUrl="https://images.icon-icons.com/729/PNG/512/android_icon-icons.com_62719.png" />
          <RepoItem name="Ios-Proyect" imageUrl="https://images.icon-icons.com/729/PNG/512/android_icon-icons.com_62719.png" />
          <RepoItem name="Ionic Proyect" imageUrl="https://images.icon-icons.com/729/PNG/512/android_icon-icons.com_62719.png" />
        </IonList>
      
      </IonContent>
    </IonPage>
  );
};

export default Tab1;

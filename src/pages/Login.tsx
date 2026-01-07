import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react"
import { logoGithub } from "ionicons/icons";
import './Login.css';
import { useState } from "react";
import AuthServices from "../services/AuthServices";

const Login: React.FC = () => {

    const[username,setUsername] = useState('');
    const[token,setToken] = useState('');
    const[error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if(!username || !token){
            setError('Por favor ingresa tu usuario y token de Github');
            return;
        }

        const success = AuthServices.login(username, token);
        if(success){
            window.location.href = '/tab1';
        } else {
            setError('Error al iniciar sesion.');
        }
    };

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <div className="login-container">
                    <IonIcon name={logoGithub} className="login-icon" />
                    <h1>Iniciar Sesión a Github</h1>
                    <form className="login-form" onSubmit={handleLogin}>
                        <IonInput
                            className="login-field"
                            label="Usuario de github"
                            labelPlacement="floating"
                            fill="outline"
                            type="text"
                            value={username}
                            onIonChange={(e) => setUsername(e.detail.value!)}
                            required
                            />
                        <IonInput
                            className="login-field"
                            label="Token de github"
                            labelPlacement="floating"
                            fill="outline"
                            type="password"
                            value={token}
                            onIonChange={(e) => setToken(e.detail.value!)}
                            required
                            />

                            {error &&(
                                <IonText color="danger" className="error-message">
                                    {error}
                                    </IonText>
                        )}

                            <IonButton expand="block" type="submit">Iniciar Sesión</IonButton>
                            <IonText color="medium" className="loging-hint">
                                <p>Ingresa tu usuario y tu token de Github</p>
                            </IonText>

                    </form>
                </div>

            </IonContent>
        </IonPage>
    );
}

export default Login;
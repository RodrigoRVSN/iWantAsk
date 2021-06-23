import { useHistory } from "react-router";

import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../services/firebase";
import { toast } from "react-toastify";

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");

  async function handleCreateRoomWithGoogle() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      toast.dark("⚠️ A sala não existe.", {
        autoClose: 3000,
      });
      return;
    }
    history.push(`/rooms/${roomCode}`);
  }

  return (
    <>
      <div id="page-auth">
        <aside>
          <img
            src={illustrationImg}
            alt="Ilustração que simboliza troca de perguntas e respostas"
          />
          <strong>Crie salas de Q&amp;A ao-vivo</strong>
          <p>Tire as dúvidas de sua audiência em tempo real.</p>
        </aside>
        <main>
          <div className="main-content">
            <img src={logoImg} alt="Logo do i want to ask" />
            <p className="reponsive-title">
              Tire as dúvidas de sua audiência em tempo real.
            </p>

            <button
              onClick={handleCreateRoomWithGoogle}
              className="create-room"
            >
              <img src={googleIconImg} alt="Logo do google" />
              Crie com o google
            </button>

            <div className="separator">ou entre em uma sala</div>
            <form onSubmit={handleJoinRoom}>
              <input
                type="text"
                placeholder="Digite o código da sala"
                onChange={(event) => setRoomCode(event.target.value)}
                value={roomCode}
              />
              <Button type="submit">Entrar</Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

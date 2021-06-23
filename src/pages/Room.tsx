import logoImg from "../assets/images/logo.svg";
import { useParams } from "react-router";
import "../styles/userRoom.scss";
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import { database } from "../services/firebase";
import { useEffect } from "react";

type RoomParams = {
  id: string;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
  }
>;

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
};

export function Room() {
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState("");
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isAnswered: value.isAnswered,
            isHighlighted: value.isAnswered,
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }
    if (!user) {
      toast.error("Você precisa estar logado");
      throw new Error();
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion("");
    toast.dark("Mensagem enviada!");
  }

  return (
    <>
      <div id="page-room">
        <div className="container">
          <header>
            <img src={logoImg} alt="logo i want to ask" />
            <div>
              <RoomCode code={roomId} />
            </div>
          </header>
        </div>

        <main className="content">
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && <span>9 perguntas</span>}
          </div>

          <form onSubmit={handleSendQuestion}>
            <textarea
              placeholder="O que você deseja perguntar?"
              onChange={(event) => setNewQuestion(event.target.value)}
              value={newQuestion}
            />
            <div className="form-footer">
              {user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>
                  Para enviar uma pergunta, <button>faça seu login</button>
                </span>
              )}

              <Button type="submit" disabled={!user}>
                Enviar pergunta
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
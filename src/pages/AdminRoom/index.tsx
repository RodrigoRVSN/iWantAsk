import { useHistory, useParams } from "react-router";
import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { useRoom } from "../../hooks/useRoom";

import "./styles.scss";
import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import { database } from "../../services/firebase";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useHistory();
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <>
      <div id="page-room">
        <div className="container">
          <header>
            <img src={logoImg} alt="logo i want to ask" />
            <div>
              <RoomCode code={roomId} />
              <Button isOutlined onClick={handleEndRoom}>
                Encerrar sala
              </Button>
            </div>
          </header>
        </div>

        <main className="content">
          <div className="room-title">
            <h1>Sala {title}</h1>
            {questions.length > 0 && <span>{questions.length} perguntas</span>}
          </div>
          <div className="questions-list">
            {questions.map((question) => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                >
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="deletar pergunta" />
                  </button>
                </Question>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}

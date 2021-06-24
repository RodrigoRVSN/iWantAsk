import illustrationImg from "../../assets/images/illustration.svg";
import "./style.scss";

export function Aside() {
  return (
    <aside>
      <img
        src={illustrationImg}
        alt="Ilustração que simboliza troca de perguntas e respostas"
      />
      <strong>Crie salas de Q&amp;A ao-vivo</strong>
      <p>Tire as dúvidas de sua audiência em tempo real.</p>
    </aside>
  );
}

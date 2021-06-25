import React from 'react'

import { useParams } from 'react-router'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'
import { ModalRoom } from '../../components/ModalRoom'
import { useRoom } from '../../hooks/useRoom'

import './styles.scss'
import logoImg from '../../assets/images/logo.svg'
import deleteImg from '../../assets/images/delete.svg'
import checkImg from '../../assets/images/check.svg'
import answerImg from '../../assets/images/answer.svg'

import { database } from '../../services/firebase'

import Modal from 'react-modal'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

type RoomParams = {
    id: string
}

export function AdminRoom(): JSX.Element {
    const params = useParams<RoomParams>()
    const roomId = params.id
    const { title, questions } = useRoom(roomId)
    const [modalIsOpen, setIsOpen] = React.useState(false)

    async function handleAnsweredQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        })
        toast.dark('✔️ Pergunta respondida!')
    }

    async function handleHighlightedQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        })
        toast.dark('✔️ Link destacada!')
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
            await database
                .ref(`rooms/${roomId}/questions/${questionId}`)
                .remove()
        }
        toast.dark('✔️ Pergunta excluída!')
    }

    const history = useHistory()
    function handleInvite() {
        navigator.clipboard.writeText(
            `https://iwantask-62521.web.app${history.location.pathname.substr(
                6
            )}`
        )
        toast.dark('✔️ Link copiado!')
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#081c15'
        }
    }

    return (
        <>
            <div id="page-room">
                <div className="container">
                    <header>
                        <img src={logoImg} alt="logo i want to ask" />
                        <div id="adminHeader">
                            <RoomCode code={roomId} />
                            <Button
                                isOutlined
                                onClick={() => {
                                    setIsOpen(true)
                                }}
                            >
                                Encerrar sala
                            </Button>
                        </div>
                    </header>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    ariaHideApp={false}
                    onRequestClose={() => {
                        setIsOpen(false)
                    }}
                >
                    <Button
                        onClick={() => {
                            setIsOpen(false)
                        }}
                    >
                        X
                    </Button>
                    <ModalRoom />
                </Modal>

                <main className="content">
                    <div className="room-title">
                        <h1>Sala {title}</h1>
                        {questions.length > 0 && (
                            <span>{questions.length} perguntas</span>
                        )}
                    </div>
                    {questions.length > 0 ? (
                        <div className="questions-list">
                            {questions.map(question => {
                                return (
                                    <Question
                                        key={question.id}
                                        content={question.content}
                                        author={question.author}
                                        isAnswered={question.isAnswered}
                                        isHighlighted={question.isHighlighted}
                                    >
                                        {!question.isAnswered && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleAnsweredQuestion(
                                                            question.id
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={checkImg}
                                                        alt="Marcar como respondida"
                                                    />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleHighlightedQuestion(
                                                            question.id
                                                        )
                                                    }
                                                >
                                                    <img
                                                        src={answerImg}
                                                        alt="Dar destaque"
                                                    />
                                                </button>
                                            </>
                                        )}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDeleteQuestion(
                                                    question.id
                                                )
                                            }
                                        >
                                            <img
                                                src={deleteImg}
                                                alt="Deletar pergunta"
                                            />
                                        </button>
                                    </Question>
                                )
                            })}
                        </div>
                    ) : (
                        <>
                            <div id="noQuestions">
                                <Button onClick={handleInvite}>
                                    Clique para copiar o link!
                                </Button>
                                <h2>
                                    Ao clicar no botão, o link será copiado e
                                    você pode compartilhar com outras pessoas,
                                    que irão enviar perguntas nessa sala.
                                </h2>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </>
    )
}

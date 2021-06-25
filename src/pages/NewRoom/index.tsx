import React, { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Button } from '../../components/Button'
import { Aside } from '../../components/Aside/Index'

import useAuth from '../../hooks/useAuth'

import { database } from '../../services/firebase'

import logoImg from '../../assets/images/logo.svg'
import '../../styles/auth.scss'
import { toast } from 'react-toastify'

export function NewRoom(): JSX.Element {
    const { user } = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        // remove espaços em branco
        if (newRoom.trim() === '') {
            toast.dark('⚠️ Preencha o campo!')
            return
        }

        // captura a chave da sala, titulo e dono
        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })

        // direciona para a respectiva sala
        history.push(`/admin/rooms/${firebaseRoom.key}`)
    }

    return (
        <>
            <div id="page-auth">
                <Aside />
                <main>
                    <div className="main-content">
                        <img src={logoImg} alt="Logo do i want to ask" />
                        <p className="reponsive-title">
                            Tire as dúvidas de sua audiência em tempo real.
                        </p>
                        <div className="user-info">
                            <img src={user?.avatar} alt={user?.name} />
                            <h3>{user?.name}</h3>
                        </div>
                        <h2>Criar nova sala</h2>
                        <form onSubmit={handleCreateRoom}>
                            <input
                                onChange={event =>
                                    setNewRoom(event.target.value)
                                }
                                type="text"
                                placeholder="Nome da sala"
                                value={newRoom}
                            />
                            <Button type="submit">Criar sala</Button>
                        </form>
                        <p>
                            Quer entrar em uma sala existente?{' '}
                            <Link to="/">Clique aqui</Link>
                        </p>
                    </div>
                </main>
            </div>
        </>
    )
}

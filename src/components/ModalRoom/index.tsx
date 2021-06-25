/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useHistory, useParams } from 'react-router-dom'
import { database } from '../../services/firebase'
import { Button } from '../Button'

import './styles.scss'

type RoomParams = {
    id: string
}

export function ModalRoom(): JSX.Element {
    const params = useParams<RoomParams>()
    const roomId = params.id
    const history = useHistory()

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        })
        history.push('/')
    }

    return (
        <>
            <div className="modalBox">
                <h2>ENCERRAR A SALA</h2>
                <h3>Deseja mesmo encerrar a sala?</h3>
                <Button onClick={handleEndRoom}>ENCERRAR</Button>
            </div>
        </>
    )
}

/* eslint-disable react/react-in-jsx-scope */
import copyImg from '../../assets/images/copy.svg'

import './styles.scss'

type RoomCodeProps = {
    code: string
}

export function RoomCode(props: RoomCodeProps): JSX.Element {
    function copyRoomCodeToClipBoard(): void {
        navigator.clipboard.writeText(props.code)
    }

    return (
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="copy Img" />
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}

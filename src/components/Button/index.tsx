/* eslint-disable react/react-in-jsx-scope */
import { ButtonHTMLAttributes } from 'react'

import './styles.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}

export function Button({
    isOutlined = false,
    ...props
}: ButtonProps): JSX.Element {
    return (
        <>
            <button
                className={`button ${isOutlined ? 'outlined' : ''}`}
                {...props}
            ></button>
        </>
    )
}

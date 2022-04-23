import React, { CSSProperties } from 'react'

enum FloatPosition {
    TOP_LEFT = 'top-left',
    TOP_RIGHT = 'top-right',
    BOTTOM_LEFT = 'bottom-left',
    BOTTOM_RIGHT = 'bottom-right',
    CENTER_LEFT = 'center-left',
    CENTER_RIGHT = 'center-right',
    CENTER = 'center',
}

const container: CSSProperties = {
    position: 'fixed',
    margin: '0.5rem',
}

const topLeft: CSSProperties = {
    ...container,
    top: 0,
    left: 0
}

const topRight: CSSProperties = {
    ...container,
    top: 0,
    right: 0
}

const bottomLeft: CSSProperties = {
    ...container,
    bottom: 0,
    left: 0
}

const bottomRight: CSSProperties = {
    ...container,
    bottom: 0,
    right: 0
}

const centerLeft: CSSProperties = {
    ...container,
    top: '50%',
    left: 0,
    transform: 'translateY(-50%)'
}

const centerRight: CSSProperties = {
    ...container,
    top: '50%',
    right: 0,
    transform: 'translateY(-50%)'
}

const center: CSSProperties = {
    ...container,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
}

interface Props {
    children?: React.ReactNode,
    position?: string,
}

function Float(props: Props) {
    const getPosition = () => {
        switch (props.position) {
            case FloatPosition.TOP_LEFT:
                return topLeft
            case FloatPosition.TOP_RIGHT:
                return topRight
            case FloatPosition.BOTTOM_LEFT:
                return bottomLeft
            case FloatPosition.BOTTOM_RIGHT:
                return bottomRight
            case FloatPosition.CENTER_LEFT:
                return centerLeft
            case FloatPosition.CENTER_RIGHT:
                return centerRight
            case FloatPosition.CENTER:
                return center
            default:
                return topLeft
        }
    }
    return <>

        <div style={getPosition()}>{props.children}</div>
    </>
}

export default Float
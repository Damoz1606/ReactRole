import { CSSProperties } from "react"
import { PRIMARY } from "./color"

export const BORDER_RADIUS = '100px'
export const ICON_SIZE = 24;

const container: CSSProperties = {
    position: "relative",
    padding: "1rem 1rem 1rem 1rem",
}

const center: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const spaceBetween: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}

const spaceAround: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
}

const spaceEvenly: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
}

const column: CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
}

const row: CSSProperties = {
    display: 'flex',
    flexDirection: 'row'
}

const input: CSSProperties = {
    padding: "0.5rem 1rem",
    margin: "0.5rem 0",
    border: "1px solid #ccc",
    borderRadius: BORDER_RADIUS,
}

const button: CSSProperties = {
    padding: "0.5rem 1rem",
    margin: "0.5rem 0",
    border: "none",
    borderRadius: BORDER_RADIUS,
    backgroundColor: PRIMARY.MAIN,
    color: PRIMARY.CONTRAST,
    cursor: "pointer",
    fontSize: "1rem",
}

const link: CSSProperties = {
    padding: "0.5rem 1rem",
    margin: "0.5rem 0",
    textDecoration: "none",
    color: PRIMARY.MAIN,
}

export const theme = {
    container,
    column,
    row,
    center,
    spaceBetween,
    spaceAround,
    spaceEvenly,
    input,
    button,
    link
}
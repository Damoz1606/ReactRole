import { ButtonBase, Card, CardContent } from '@mui/material'
import React, { createRef, RefObject, useState } from 'react'
import { BORDER_RADIUS } from '../style/theme'
import { PRIMARY } from '../style/color'
import { InsertPhotoOutlined } from '@mui/icons-material'

const buttonSize = 275;
const iconSize = 275 / 5;

interface Props {
    id: string;
    name: string;
    required?: boolean;
    value?: string;
    accept?: string;
}
function InputImage(props: Props) {

    const ref: RefObject<HTMLInputElement> = createRef();

    const [file, setfile] = useState<File | null>(null);
    const [selected, setselected] = useState<string | null>();

    const onClick = () => {
        if (ref.current) {
            ref.current.click();
        }
    }

    const handleChange = (event: HTMLInputElement) => {
        if (event.files && event.files[0]) {
            setfile(event.files[0]);
            const reader = new FileReader();
            reader.onload = (e: any) => setselected(e.target.result as string);
            reader.readAsDataURL(event.files[0]);
        }
    }

    return <>
        <input
            type="file"
            id={props.id}
            name={props.name}
            value={props.value}
            accept={props.accept}
            ref={ref}
            onChange={() => handleChange(ref.current!)}
            required={!!props.required}
            style={{ display: 'none' }}
        />
        <ButtonBase sx={{
            width: buttonSize,
            height: buttonSize,
            borderRadius: BORDER_RADIUS
        }} onClick={onClick}>
            <Card sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: buttonSize,
                height: buttonSize,
                cursor: 'pointer',
                elevation: 10,
                borderRadius: BORDER_RADIUS
            }}>
                <CardContent>
                    {
                        selected ?
                            <img src={selected ? selected : ""} style={{ width: buttonSize, height: 'auto' }} /> :
                            <InsertPhotoOutlined style={{ color: PRIMARY.MAIN, width: iconSize, height: iconSize }} />
                    }
                </CardContent>
            </Card>
        </ButtonBase>
    </>
}

export default InputImage
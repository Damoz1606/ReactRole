import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { Image } from '../classes/Image';
import { BACKGROUND, PRIMARY } from '../style/color';
import { theme } from '../style/theme';
import InputImage from './InputImage';

const input = {
    padding: "0.5rem 1rem",
    margin: "0.5rem 0",
    border: 'none',
    background: BACKGROUND.DEFAULT,
}

type Props = {
    onSubmit?: (image: Image) => void;
    image?: Image;
}

function ImageForm(props: Props) {

    const [image, setImage] = React.useState<Image | null>();

    useEffect(() => {
        if (props.image) {
            setImage(props.image);
        }
        return () => { }
    }, [props.image]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.onSubmit && props.onSubmit(image as Image);
    }

    return <>
        <Card elevation={0}>
            <CardContent>
                <form onSubmit={handleSubmit} style={{ ...theme.container, ...theme.column }}>
                    <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                        <ButtonBase style={{ width: 'auto', backgroundColor: '#FFF', color: PRIMARY.MAIN, padding: '0.5rem', borderRadius: '10px' }}>
                            <Typography variant='subtitle2'>
                                {image ? 'Update' : 'Create'}
                            </Typography>
                        </ButtonBase>
                    </div>
                    <div style={{...theme.center, ...theme.row}}>
                        <InputImage id='image' name='image' src={image? `data:${image.image.contentType};base64,${Buffer.from(image.image.data).toString('base64')}` : undefined} />
                        <div style={{...theme.column, marginLeft: '1rem '}}>
                            <Typography marginY={'0.5rem'} variant='subtitle1'>{image ? image.name : 'No hay imagen seleccionada'}</Typography>
                            {image && <Typography marginY={'0.5rem'} variant='subtitle1'>{image ? image.image.contentType : 'No hay imagen seleccionada'}</Typography>}
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    </>
}

export default ImageForm
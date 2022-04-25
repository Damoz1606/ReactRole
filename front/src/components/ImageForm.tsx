import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Image, imageConverter } from '../classes/Image';
import { postImage, putImage } from '../services/image.service';
import { BACKGROUND, PRIMARY } from '../style/color';
import { theme } from '../style/theme';
import { toastError, toastPromise } from '../utils/toast-manager';
import { IMAGE_MESSAGES } from '../utils/utils';
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

    const [image, setImage] = useState<Image | null>();
    const [file, setfile] = useState<File|null>(null);

    useEffect(() => {
        if (props.image) {
            setImage(props.image);
        }
        return () => { }
    }, [props.image]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (props.image) {
            toastPromise({
                success: IMAGE_MESSAGES.UPDATE_SUCCESS,
                pending: IMAGE_MESSAGES.UPDATE_PENDING,
                error: IMAGE_MESSAGES.UPDATE_ERROR
            }, updateImage(image as Image));
        } else {
            toastPromise({
                success: IMAGE_MESSAGES.ADDING_SUCCESS,
                pending: IMAGE_MESSAGES.ADDING_PENDING,
                error: IMAGE_MESSAGES.ADDING_ERROR
            }, createImage(image as Image));
        }
    }

    const handleChange = (data: File) => {
        setfile(data);
    }

    const createImage = async (image: any) => {
        try {
            const response = file && (await postImage(file)).data;
            props.onSubmit && props.onSubmit(imageConverter.toObject(response.image));
        } catch (error: any) {
            toastError(IMAGE_MESSAGES.ADDING_ERROR);
        }
    }

    const updateImage = async (image: Image) => {
        try {
            const response = file && (await putImage(image._id as string, file)).data;
            image.image = response.images.image;
            image.name = response.images.name;
            props.onSubmit && props.onSubmit(image);
        } catch (error: any) {
            toastError(IMAGE_MESSAGES.UPDATE_ERROR);
        }
    }

    return <>
        <Card elevation={0}>
            <CardContent>
                <form onSubmit={handleSubmit} style={{ ...theme.container, ...theme.column }}>
                    <div style={{ display: 'flex', justifyContent: 'end', width: '100%' }}>
                        <ButtonBase type='submit' style={{ width: 'auto', backgroundColor: '#FFF', color: PRIMARY.MAIN, padding: '0.5rem', borderRadius: '10px' }}>
                            <Typography variant='subtitle2'>
                                {image ? 'Update' : 'Create'}
                            </Typography>
                        </ButtonBase>
                    </div>
                    <div style={{...theme.center, ...theme.row}}>
                        <InputImage 
                        id='image' 
                        name='image' 
                        onChange={handleChange}
                        src={image? `data:${image.image.contentType};base64,${Buffer.from(image.image.data).toString('base64')}` : undefined} />
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
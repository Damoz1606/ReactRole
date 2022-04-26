import { Close, Visibility } from '@mui/icons-material';
import { Backdrop, Box, ButtonBase, Fade, Modal, Typography } from '@mui/material'
import React, { createRef, CSSProperties, RefObject, useEffect, useState } from 'react'
import { Image as ImageClass } from '../classes/Image';
import { RoleGate } from '../providers/PermissionGate';
import { deleteImage } from '../services/image.service';
import { toastError } from '../utils/toast-manager';
import { IMAGE_MESSAGES, ROLE } from '../utils/utils';
import CardBackdrop from './CardBackdrop'
import ImageForm from './ImageForm';

const style: CSSProperties = {
    width: '100%',
    borderRadius: '5px',
}

interface Props {
    image: ImageClass;
    onDelete?: (image: ImageClass) => void;
}

function Image(props: Props) {

    const [open, setopen] = useState<boolean>(false);
    const [image, setimage] = useState<ImageClass>(props.image);

    const container: RefObject<HTMLDivElement> = createRef();

    const handleOpen = () => setopen(true);
    const handleClose = () => setopen(false);

    const backdropContent = () => {
        return <>
            <ButtonBase style={{ borderRadius: '100%', padding: '0.5rem' }} onClick={handleOpen}><Visibility /></ButtonBase>
            <RoleGate roles={[ROLE.admin]}>
                <ButtonBase style={{ borderRadius: '100%', padding: '0.5rem' }} onClick={handleDelete}><Close /></ButtonBase>
            </RoleGate>
        </>
    }

    const handleUpdate = (data: ImageClass) => {
        setimage(data);
        handleClose();
    }

    const handleDelete = async () => {
        try {
            await deleteImage(image._id as string);
            if (container.current) {
                container.current.style.transition = 'all 0.5s ease-in-out';
                container.current.style.transform = 'scale(0)';
            }
            setTimeout(() => {
                props.onDelete && props.onDelete(image);
            }, 500);
        } catch (error: any) {
            toastError(IMAGE_MESSAGES.DELETE_ERROR);
        }
    }

    return <>
        <div ref={container}>
            <CardBackdrop backdropContent={backdropContent()}>
                <img style={style} src={`data:${image.image.contentType};base64,${Buffer.from(image.image.data).toString('base64')}`} />
            </CardBackdrop>
        </div>
        <Modal open={open}
            onClose={handleClose}
            closeAfterTransition>
            <Fade in={open}>
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: '500px',
                    width: '100%',
                }}>
                    <ImageForm
                        image={image}
                        onSubmit={handleUpdate} />
                </Box>
            </Fade>
        </Modal>
    </>
}

export default Image
import { Backdrop, Fade, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ButtonIncrese from '../../components/ButtonIncrese'
import Float from '../../components/Float'
import ImageComponent from '../../components/Image'
import { theme } from '../../style/theme'
import { Add } from '@mui/icons-material'
import { Box } from '@mui/system'
import ImageForm from '../../components/ImageForm'
import { Image } from '../../classes/Image'
import { ImageManager } from '../../managers/ImageManager'
import { getImages } from '../../services/image.service'
import { toastError, toastPromise } from '../../utils/toast-manager'
import { IMAGE_MESSAGES, ROLE } from '../../utils/utils'
import { RoleGate } from '../../providers/PermissionGate'

function Images() {

  const [images, setimages] = useState<Image[]>([]);
  const [open, setopen] = useState<boolean>(false);

  useEffect(() => {
    getAllImages();
    return () => { }
  }, [])


  const getAllImages = async () => {
    if (ImageManager.getInstance().getImages()) {
      setimages(ImageManager.getInstance().getImages() as Image[]);
      return;
    }
    try {
      const response = (await getImages()).data;
      setimages(response.images);
    } catch (error) {
      toastError(IMAGE_MESSAGES.GETTING_ERROR);
    }
  }

  const handleSubmit = (image: Image) => {
    setimages([...images, image]);
    handleClose();
  }

  const handleDelete = (image: Image) => {
    setimages(images.filter(n => `${n._id}` !== `${image._id}`));
  }

  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);

  return <>
    <div style={{ ...theme.column, ...theme.center, width: '100%', height: '100%' }}>
      <Typography variant="h4">Images</Typography>
      <div style={{ ...theme.spaceEvenly, ...theme.row, width: '100%', marginTop: '1rem', flexWrap: 'wrap' }}>
        {images.map((image, index) => {
          return <>
            <ImageComponent
              onDelete={handleDelete}
              image={image}
              key={index} />
          </>
        })}
      </div>
      <RoleGate roles={[ROLE.admin, ROLE.author]}>
        <Float position='bottom-right'>
          <ButtonIncrese
            icon={<Add />}
            onClick={handleOpen}>
            <Typography variant="subtitle1">Add Image</Typography>
          </ButtonIncrese>
        </Float>
      </RoleGate>
    </div>
    <Modal open={open}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
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
          <ImageForm onSubmit={handleSubmit} />
        </Box>
      </Fade>
    </Modal>
  </>
}

export default Images
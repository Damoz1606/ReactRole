import { ButtonBase, Checkbox, FormControlLabel, Radio, RadioGroup, Slider, TextareaAutosize, TextField, Typography } from '@mui/material'
import React from 'react'
import Float from '../../components/Float'
import InputImage from '../../components/InputImage'
import { PRIMARY } from '../../style/color'
import { theme } from '../../style/theme'

function Component() {
    return <>
        <div style={theme.container}>
            <Typography variant='h1'>H1</Typography>
            <Typography variant='h2'>H2</Typography>
            <Typography variant='h3'>H3</Typography>
            <Typography variant='h4'>H4</Typography>
            <Typography variant='h5'>H5</Typography>
            <Typography variant='h6'>H6</Typography>
            <Typography variant='subtitle1'>Subtitle1</Typography>
            <Typography variant='subtitle2'>Subtitle2</Typography>
            <Typography variant='body1'>Body1</Typography>
            <Typography variant='body2'>Body2</Typography>
            <Typography variant='caption'>Caption</Typography>
            <Typography variant='button'>Button</Typography>
            <Typography variant='overline'>Overline</Typography>
            <input style={theme.input} type="text" />
            <input style={theme.input} type="number" name="" id="" />
            <input style={theme.input} type="email" name="" id="" />
            <input style={theme.input} type="datetime-local" name="" id="" />
            <input style={theme.input} type="month" name="" id="" />
            <input style={theme.input} type="week" name="" id="" />
            <input style={theme.input} type="hidden" name="" />
            <input style={theme.input} type="password" name="" id="" />
            <TextareaAutosize minRows={1} maxRows={6} style={theme.input} />
            <Slider style={{ color: PRIMARY.MAIN }} />
            <InputImage name="file" id="file" accept='.jpg,.png' />
            <FormControlLabel control={<Checkbox style={{ color: PRIMARY.MAIN }} />} label="Checkbox" />
            <RadioGroup defaultValue={2}>
                <FormControlLabel value={1} control={<Radio style={{ color: PRIMARY.MAIN }} />} label="Radio" />
                <FormControlLabel value={2} control={<Radio style={{ color: PRIMARY.MAIN }} />} label="Radio 2" />
            </RadioGroup>
            <ButtonBase sx={theme.button}>Press me</ButtonBase>
            <a style={theme.link} href="">Press me</a>
            <Float position='top-right' ><ButtonBase sx={theme.button}>Press me</ButtonBase></Float>
        </div>
    </>
}

export default Component
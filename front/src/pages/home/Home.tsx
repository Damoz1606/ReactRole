import { NotesOutlined, PhotoCameraBackOutlined } from '@mui/icons-material';
import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { NavigationItem } from '../../classes/NavigationItem';
import { SessionManager } from '../../managers/SessionManager';
import Appbar from '../../components/Appbar';
import { theme } from '../../style/theme';
import Images from './Images';
import Notes from './Notes';

const routes: NavigationItem[] = [
    {
        name: 'Notes',
        path: 'notes',
        icon: <NotesOutlined />
    },
    {
        name: 'Images',
        path: 'images',
        icon: <PhotoCameraBackOutlined />
    }
]

function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        checkLoggedIn();
        return () => { }
    }, [])

    const checkLoggedIn = () => {
        if (!SessionManager.getInstance().isLoggedIn()) {
            navigate('/login');
        }
    }


    return <>
        <div style={{ ...theme.row, width: '100%', height: '100%' }}>
            <Appbar items={routes} />
            <div style={{ ...theme.container, ...theme.column, ...theme.center, width: '100%' }}>
                <Routes>
                    <Route path="notes" element={<Notes />} />
                    <Route path="images" element={<Images />} />
                    <Route path="*" element={<Navigate to='notes' replace />} />
                </Routes>
            </div>
        </div>
    </>;
}

export default Home
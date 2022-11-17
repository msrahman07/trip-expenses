import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {closeModal, modalState, modalContent} from '../stores/modalStore';
import { useSelector, useDispatch } from 'react-redux';

const CommonModal = () => {

    const show = useSelector(modalState);
    const content = useSelector(modalContent);

    const dispatch = useDispatch();

    const handleClose = () => dispatch(closeModal());
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} >
                <Modal.Body>{content}</Modal.Body>
            </Modal>
        </>
    )
}

export default CommonModal
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const contentModal = ({ isOpen, onRequestClose }) => {
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
        <h1>Default Content Title</h1>
        <p>Default Content Text</p>
        <button onClick= {onRequestClose}>Close</button>
    </Modal>
};

export default contentModal;
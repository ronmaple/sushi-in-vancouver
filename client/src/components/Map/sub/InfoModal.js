import React, { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const Main = styled.section`
  position:fixed;
  background: white;
  width: 80%;
  height: auto;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
`
Modal.setAppElement('#root');

export default function InfoModal(props) {
    // const [isOpen, setIsOpen] = useState(false)
    console.log('props', props)


    return (
        <div>

            <Modal
                isOpen={props.isOpen}
            >
                <button onClick={props.closeModal}>Close</button>

                <h2>{props.restaurantName || ''}</h2>
                <p>{props.restaurantAddress || ''}</p>
            </Modal>
        </div>
    )
}
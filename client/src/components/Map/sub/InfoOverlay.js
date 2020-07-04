import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
    height: 100px;
    width: 100px;
    margin: 10px;
`
export default function InfoOverlay() {

    return (
        <Wrapper>
            <h1>hello there</h1>
        </Wrapper>
    )
}
import React from 'react'
import styled from "styled-components";
import Error from '../assets/Error.png'
const Notfound = () => {
  return (
    <Container>
        <img src={Error} alt="" />
    </Container>
  )
}

const Container = styled.div`
min-height:80vh;
width:100%;
display: flex;
align-items: center;
justify-content: center;
img{
    height:auto;
}
@media (max-width: 908px){
    img{
        height:50vh;
    }
}
@media (max-width: 508px){
    img{
        height:35vh;
    }
}
`

export default Notfound
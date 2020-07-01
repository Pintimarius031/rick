import styled from 'styled-components';


export const Container = styled.div`
    
    background-color: black;
`;
export const Button = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;


`;
export const ParticularButton = styled.button`
    border-style: none;
    padding: 5px 10px;
    margin-right: 10px;
    border-radius: 5px;
    background: white;
    color: black;
    font-size: 1em;
`;
export const GridContainer = styled.div`
    width: auto;
    display: grid;
    margin-left: auto;
    margin-right: auto;
    grid-template-columns: repeat(4, minmax(300px, 1fr));
    grid-gap: 10px;

`;
export const Form = styled.div`
    display: center;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10;
    right: 10;
    bottom: 10;
    left: 10;
`;
import styled from 'styled-components'
import { Box } from '../components/Box'

const Container = styled(Box)`
  width: 700px;
  margin: 150px auto;

  h1 {
    font-size: 20px;
    margin: 0 0 30px 0;
  }
`

const ButtonAdd = styled.button`
  justify-content: center;
  background-color: transparent;
  text-transform: capitalize;
  
  transition: all .2s ease-in-out;

  &:hover {
    background-color: transparent;
    transform: translateY(-4px);
  }
`

const ButtonSalvar = styled.button`
  width: 100%;
  margin-top: 10px;
`

const Linhas = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .linha {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
  
    input[placeholder="Nome"] {
      width: 35%;
    }

    .botao_sub {
      width: 15%;
    }
  }
`

export { Container, ButtonAdd, ButtonSalvar, Linhas }
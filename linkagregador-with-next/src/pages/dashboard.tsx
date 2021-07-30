import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../contexts/authContext'
import { database } from '../services/firebase'
import { Container, ButtonAdd, ButtonSalvar, Linhas } from '../styles/dashboard'

type Linha = {
  name: string
  url: string
}

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [linhas, setLinhas] = useState<Linha[]>([])

  useEffect(() => {
    if (!user) return
    database.ref(`users/${user?.id}`).get().then(data => {
      if (data.val()) {
        setLinhas(data.val())
      }
    })
  }, [user])

  function handleNameChange(index: number, name: string) {
    linhas[index].name = name
    setLinhas([...linhas])
  }

  function handleUrlChange(index: number, url: string) {
    linhas[index].url = url
    setLinhas([...linhas])
  }

  function handleRemoveItem(index: number) {
    linhas.splice(index, 1)
    setLinhas([...linhas])
  }

  function handleAddItem() {
    setLinhas([...linhas, { name: '', url: '' }])
  }

  function handleSave() {
    database.ref(`users/${user?.id}`).set(linhas)
  }

  function getTreeUrl() {
    if (typeof window !== 'undefined') {
      return `${location.protocol}//${location.host}/tree/${user?.id}`
    }
  }

  return (
    <>
      <Nav>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href={getTreeUrl()}>Sua árvore</a></li>
          <div>
            <span>Olá, {user?.name}</span>
            <img src={user?.avatar} alt={`Imagem de ${user?.name}`} />
          </div>
        </ul>
      </Nav>
      <Container>
        <h1>Insira seus links abaixo</h1>
        <div className="form">
          <Linhas>
            {linhas.map((linha, index) => {
              return (
                <div className="linha" key={index}>
                  <input
                    type="text"
                    className="name"
                    placeholder="Nome"
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    value={linha.name}
                  />
                  <input
                    type="text"
                    className="url"
                    placeholder="Link"
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    value={`${linha.url}`}
                  />

                  <button
                    className="botao botao_sub"
                    onClick={() => handleRemoveItem(index)}
                  >
                    -
                  </button>
                </div>
              )
            })}
          </Linhas>

          <ButtonAdd
            className="botao"
            onClick={handleAddItem}
          >
            + Adicionar Link
          </ButtonAdd>

          <ButtonSalvar
            className="botao"
            onClick={handleSave}
          >
            Salvar
          </ButtonSalvar>
        </div>
      </Container>
    </>
  )
}

const Nav = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 80px;
  
  background-color: #2a2c41;
  box-shadow: 0 4px 2px 1px #353750;

  ul, div {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    
    height: inherit;
    align-items: center;
  }

  li {
    list-style: none;
  }
  
  a {
    color: white;
    text-decoration: none;
    position: relative;
    z-index: 20;

    font-weight: 700;

    &::after {
      content: " ";
      z-index: -1;
      position: absolute;
      top: 70%;
      left: -4px;
      right: -4px;
      bottom: 0;
      background: var(--bt);
      transition: all .2s;
    }

    &:hover::after {
      top: -10px;
    }
  }

  span {
    margin-right: 2.5rem;
  }

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 100%;
  }
`
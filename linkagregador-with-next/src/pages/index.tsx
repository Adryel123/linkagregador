import { useRouter } from 'next/dist/client/router'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import { AuthContext } from '../contexts/authContext'

export default function Home() {
  const { signInWithGoogle, user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/dashboard')
    }
  }, [user])

  return (
    <Container>
      <h1>Monte sua página de <span>links</span> para indicar no <span>Instagram</span></h1>
      <div className="container__right">
        <p className="container__subtext">Faça login com o Google</p>
        <div className="buttons-container">
          <button
            onClick={signInWithGoogle}
            className="botao"
          >
            Entrar com o Google
          </button>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  color: white;
  display: flex;
  width: 1000px;
  margin: 0 auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  justify-content: space-between;

  h1 {
    width: 50%;
    margin: 0;
    font-size: 60px;
    line-height: 1.2;

    span {
      position: relative;

      &::after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        top: 70%;
        z-index: -1;
        background: var(--bt);
        animation: create-underline 1s ease-in-out forwards;
      }
    }
  }
  h1 span:nth-child(2)::after {
    animation-delay: 0.2s;
  }

  @keyframes create-underline {
    0% {
      right: 100%;
    }
    100% {
      right: 0;
    }
  }

  .container__right {
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .container__subtext {
    width: 300px;
    margin: 0 auto;
    text-align: center;
    line-height: 1.4;
    letter-spacing: 1px;
  }

  .buttons-container {
    width: 400px;
    margin-top: 30px;
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .botao {
    width: 70%;
  }
`
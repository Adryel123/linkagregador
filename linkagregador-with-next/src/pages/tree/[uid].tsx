import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Box } from '../../components/Box'
import { database } from '../../services/firebase'

interface LinkObject {
  name: string
  url: string
}

export default function Dashboard() {
  const [links, setLinks] = useState<LinkObject[]>([])
  const router = useRouter()
  const { uid } = router.query

  useEffect(() => {
    if (!uid) return

    database.ref(`/users/${uid}`).get().then(data => {
      setLinks(data.val())
    })
  }, [uid])

  return (
    <Container>
      <h1>Adryel</h1>
      <Links>
        {links.length ? links.map(link => (
          <a
            id={link.url}
            href={`https://${link.url}`}
            className="botao"
          >
            {link.name}
          </a>
        )) : 'Carregando...'}
      </Links>
    </Container>
  )
}

const Container = styled(Box)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  h1 {
    font-size: 35px;
    margin-bottom: 40px;
    text-align: center;
  }
`

const Links = styled.div`
  gap: 1rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    width: 250px;
  }
`
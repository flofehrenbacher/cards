import { css } from '@emotion/core'
import React from 'react'
import { clientEmit } from '../../../../socket-io/client-to-server'
import { colors } from '../../../../styles/global'
import { useAppState } from '../../../app-state'
import { SinglePlayer } from '../../atoms/single-player/single-player'
import { Layout } from '../../../layout'
import { GameboyButton } from '../../atoms/buttons'

export function Players() {
  const { players, me } = useAppState()

  function onButtonClick(event: any): void {
    event.preventDefault()
    clientEmit({ type: 'give-cards', payload: { playerName: me.name } })
  }

  return (
    <Layout>
      <section css={playersListStyles}>
        {players
          .filter(p => p.name !== me.name)
          .map(player => (
            <SinglePlayer name={player.name} key={player.name} />
          ))}
      </section>
      <StartGameButton onButtonClick={onButtonClick} css={{ flexGrow: 1 }} />
      {me && (
        <section css={{ padding: 16, fontSize: 32 }}>
          <p>{me.name}</p>
        </section>
      )}
    </Layout>
  )
}

function StartGameButton({ onButtonClick, ...props }: { onButtonClick: (event: any) => void }) {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 160,
        flexGrow: 1,
        justifyContent: 'center',
      }}
      {...props}
    >
      <p
        css={css`
          display: flex;
          justify-content: center;
          background: ${colors.mint};
          margin-bottom: 8px;
          font-size: 18px;
        `}
      >
        Spiel starten
      </p>
      <GameboyButton onClick={onButtonClick} title="Spiel starten" />
    </div>
  )
}

export function PlayersInOrder() {
  const { players, me } = useAppState()
  const playersAfterMe = players.filter(p => p.order > me.order)
  const playersBeforeMe = players.filter(p => p.order < me.order)
  const playersInOrder = [...playersAfterMe, ...playersBeforeMe]

  return (
    <section css={playersListStyles}>
      {playersInOrder.map(player => (
        <SinglePlayer name={player.name} key={player.name} />
      ))}
    </section>
  )
}

const playersListStyles = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
  justify-self: flex-start;
  margin-top: 32px;
`

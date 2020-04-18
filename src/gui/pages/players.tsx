import { css } from '@emotion/core'
import React from 'react'
import { useHistory } from 'react-router-dom'

import { colors } from '../../styles/global'
import { Header } from '../components/header/header'
import { TransitionTime } from '../components/nickname-form/nickname-form'
import { SinglePlayer } from '../components/single-player/single-player'
import { pageStyles } from './home'
import { useAppState } from '../app-state'
import { clientEmit } from '../../socket-io/client-to-server'

export function Players() {
  const { players, me } = useAppState()
  const history = useHistory()
  const [clickedButton, setClickedButton] = React.useState(false)

  function onButtonClick(event: any): void {
    event.preventDefault()
    setClickedButton(true)
    clientEmit({ event: 'give-cards', payload: { playerName: me?.name } })
  }

  return (
    <div css={pageStyles}>
      <Header />
      <section css={playersListStyles}>
        {players
          .filter(p => p.name !== me?.name)
          .map(player => (
            <SinglePlayer name={player.name} key={player.name} />
          ))}
      </section>
      <StartGameButton
        clicked={clickedButton}
        onButtonClick={onButtonClick}
        css={{ flexGrow: 1 }}
      />
      {me && (
        <section css={{ padding: 16, fontSize: 32 }}>
          <p>{me.name}</p>
        </section>
      )}
    </div>
  )
}

const playersListStyles = css`
  display: flex;
  justify-content: space-around;
  width: 100%;
  justify-self: flex-start;
  margin-top: 32px;
`

const buttonStyles = (clicked: boolean) => css`
  border-radius: 0;
  border: ${colors.green} 3px solid;
  background: ${colors.white};
  cursor: pointer;
  opacity: ${clicked ? 0 : 1};
  width: 50px;
  height: 50px;
  transform: ${clicked ? 'scale(4)' : 'none'};
  transition: ease-in-out all ${TransitionTime}ms;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus {
    border: 3px ${colors.mint} solid;
  }
`

function StartGameButton({
  clicked,
  onButtonClick,
  ...props
}: {
  clicked: boolean
  onButtonClick: (event: any) => void
}) {
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
      <button
        css={[buttonStyles(clicked), { alignSelf: 'center' }]}
        title="Spiel starten"
        onClick={onButtonClick}
      >
        <img
          src={`${window.location.origin}/public/game-boy.svg`}
          css={{ width: '100%', height: 'auto' }}
        />
      </button>
    </div>
  )
}

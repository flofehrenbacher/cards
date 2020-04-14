import { css } from '@emotion/core'
import { equals } from 'ramda'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { CardName, Icon, Player } from '../../model'
import { Card } from '../components/card/card'
import { Header } from '../components/header/header'
import { SinglePlayer } from '../components/single-player/single-player'
import { pageStyles } from './home'
import { colors } from '../../styles/global'

type Card = import('../../model').Card

export function Game({
  players,
  me,
  myCards,
  setMyCards,
  stack,
}: {
  players: Player[]
  me?: Player
  myCards: Card[]
  setMyCards: React.Dispatch<React.SetStateAction<Card[]>>
  stack: Card[]
}) {
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
      <DragDropContext
        onDragEnd={result => {
          const { destination, source, draggableId } = result
          const movedCard: Card = {
            name: draggableId.split('-')[0] as CardName,
            icon: draggableId.split('-')[1] as Icon,
          }
          if (!destination) {
            socket.emit('play card', movedCard)
            setMyCards(myCards.filter(c => !equals(movedCard, c)))
          }
          // destination is not null AND draggable actually moved
          if (
            destination &&
            !(destination.droppableId === source.droppableId && destination.index === source.index)
          ) {
            const newMyCards = myCards.filter(c => !equals(movedCard, c))
            setMyCards([
              ...newMyCards.slice(0, destination.index),
              movedCard,
              ...newMyCards.slice(destination.index),
            ])
          }
        }}
      >
        <div
          css={[
            {
              display: 'flex',
              flexGrow: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        >
          {stack.map((stackCard, i) => (
            <div
              key={`${stackCard.icon}-${stackCard.name}`}
              css={{
                position: 'absolute',
                transform: `rotate(${40 * i}deg)`,
                zIndex: i,
              }}
            >
              <Card card={stackCard} />
            </div>
          ))}
        </div>
        <Droppable droppableId={`hand`} direction={'horizontal'}>
          {provided => (
            <section
              css={{
                width: '100%',
                height: 100,
                display: 'flex',
                justifyContent: 'center',
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {myCards.map((card, index) => (
                <Draggable
                  draggableId={`${card.name}-${card.icon}`}
                  index={index}
                  key={`${card.icon}-${card.name}`}
                >
                  {(provided, snapshot) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getStyle(provided.draggableProps.style, snapshot)}
                      ref={provided.innerRef}
                    >
                      <Card
                        card={card}
                        css={{ backgroundColor: snapshot.isDragging ? colors.mint : 'white' }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </section>
          )}
        </Droppable>
      </DragDropContext>
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

function getStyle(style: any, snapshot: any) {
  if (!snapshot.isDropAnimating) {
    return style
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.00001s`,
  }
}

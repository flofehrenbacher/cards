import { equals } from 'ramda'
import React from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { CardName, Icon } from '../../../../model'
import { clientEmit } from '../../../../socket-io/client-to-server'
import { colors } from '../../../../styles/global'
import { useAppState, useDispatch } from '../../../app-state'
import { Layout } from '../../../layout'
import { CardsButton, HandButton } from '../../atoms/buttons'
import { Card } from '../../atoms/card'
import { PlayersInOrder } from '../players/players'

type Card = import('../../../../model').CardType

export function Game({ onClickLastTrick: watchLastTrick }: { onClickLastTrick: () => void }) {
  const { me, myCards, stack } = useAppState()
  const dispatch = useDispatch()

  return (
    <Layout>
      <section
        css={{
          position: 'absolute',
          height: '100%',
          right: 0,
          top: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <CardsButton title="Letzten Stich ansehen" onClick={watchLastTrick} />
        <HandButton
          onClick={() => clientEmit({ type: 'take-trick', payload: { player: me, cards: stack } })}
          css={{ marginTop: 10 }}
          title="Stich nehmen"
        />
      </section>
      <PlayersInOrder />
      <DragDropContext
        onDragEnd={result => {
          const { destination, source, draggableId } = result
          const movedCard: Card = {
            name: draggableId.split('-')[0] as CardName,
            icon: draggableId.split('-')[1] as Icon,
          }
          if (!destination) {
            clientEmit({
              type: 'update-stack',
              payload: { cards: [...stack, movedCard], playerName: me.name },
            })
            dispatch({
              type: 'update-my-cards',
              payload: myCards.filter(c => !equals(movedCard, c)),
            })
          }
          // destination is not null AND draggable actually moved
          if (
            destination &&
            !(destination.droppableId === source.droppableId && destination.index === source.index)
          ) {
            const newMyCards = myCards.filter(c => !equals(movedCard, c))
            dispatch({
              type: 'update-my-cards',
              payload: [
                ...newMyCards.slice(0, destination.index),
                movedCard,
                ...newMyCards.slice(destination.index),
              ],
            })
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
    </Layout>
  )
}

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

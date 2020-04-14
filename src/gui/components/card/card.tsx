import { css } from '@emotion/core'
import React from 'react'
import { Icon } from '../../../model'
import { UnreachableCaseError } from '../../../utils/unreachable-case-error'
import { BlattIcon } from './deck/bavarian/blatt'
import { EichelIcon } from './deck/bavarian/eichel'
import { HerzIcon } from './deck/bavarian/herz'
import { SchelleIcon } from './deck/bavarian/schelle'

type Card = import('../../../model').Card

type CardProps = {
  card: Card
} & React.HTMLAttributes<HTMLElement>

export const Card = ({ card, ...props }: CardProps) => {
  const Icon = getIconComponent(card.icon)

  const nameAndIcon = {
    icon: Icon,
    name: card.name,
  }
  return (
    <figure css={cardStyles} {...props}>
      <HalfCard {...nameAndIcon} css={{ top: '3%', left: '6%' }} />
      <HalfCard {...nameAndIcon} css={{ bottom: '3%', right: '6%', transform: 'rotate(180deg)' }} />
    </figure>
  )
}

const HalfCard = ({
  icon: Icon,
  name,
  ...props
}: {
  icon: (props: any) => JSX.Element
  name: string
}) => {
  return (
    <div css={iconAndNameStyles} {...props}>
      <Icon css={{ height: '100%' }} />
      {name}
    </div>
  )
}

function getIconComponent(icon: Icon) {
  switch (icon) {
    case 'eichel':
      return EichelIcon
    case 'blatt':
      return BlattIcon
    case 'herz':
      return HerzIcon
    case 'schelle':
      return SchelleIcon
    default:
      throw new UnreachableCaseError(icon)
  }
}

const cardStyles = css`
  width: 75px;
  height: 150px;
  border: 2px solid black;
  border-radius: 5px;
  position: relative;
  background: white;
  &::after {
    content: '';
    width: 100%;
    background: black;
    height: 1px;
    top: 50%;
    position: absolute;
  }
`

const iconAndNameStyles = css`
  position: absolute;
  height: 10%;
  display: flex;
  align-items: baseline;
  font-size: 24px;
`

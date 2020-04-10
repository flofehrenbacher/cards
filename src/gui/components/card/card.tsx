import React from 'react'
import { css } from '@emotion/core'

type CardProps = {
  icon: (props: any) => JSX.Element
  name: string
} & React.HTMLAttributes<HTMLElement>

export const Card = ({ icon: Icon, name, ...props }: CardProps) => {
  const nameAndIcon = {
    icon: Icon,
    name,
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
    <section css={halfCardStyles} {...props}>
      <Icon css={{ height: '100%' }} />
      <svg viewBox="0 0 15 15" css={{ height: '100%', width: '100%' }}>
        <text x="0" y="13">
          {name}
        </text>
      </svg>
    </section>
  )
}

const cardStyles = css`
  width: 200px;
  height: 400px;
  border: 1px solid black;
  border-radius: 5px;
  position: relative;
  &::after {
    content: '';
    width: 100%;
    background: black;
    height: 1px;
    top: 50%;
    position: absolute;
  }
`

const halfCardStyles = css`
  position: absolute;
  height: 6%;
  display: flex;
  align-items: baseline;
`

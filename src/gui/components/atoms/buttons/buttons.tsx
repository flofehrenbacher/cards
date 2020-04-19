import { css } from '@emotion/core'
import { colors } from '../../../../styles/global'
import React, { ButtonHTMLAttributes } from 'react'

type ButtonProps = { title: string } & React.ButtonHTMLAttributes<HTMLButtonElement>

export function RightArrowButton({ title, ...props }: ButtonProps) {
  return <IconButton title={title} svgName="right-arrow" {...props} />
}

export function LeftArrowButton({ title, ...props }: ButtonProps) {
  return <IconButton title={title} svgName="left-arrow" {...props} />
}

export function GameboyButton({ title, ...props }: ButtonProps) {
  return <IconButton title={title} svgName="game-boy" {...props} />
}

export function HandButton({ title, ...props }: ButtonProps) {
  return <IconButton title={title} svgName="hand" {...props} />
}

export function CardsButton({ title, ...props }: ButtonProps) {
  return <IconButton title={title} svgName="cards" {...props} />
}

export function IconButton({
  title,
  svgName,
  actionComplete,
  ...props
}: {
  title: string
  svgName: string
  actionComplete?: boolean
}) {
  return (
    <button
      css={[buttonStyles(Boolean(actionComplete)), { alignSelf: 'center' }]}
      title={title}
      {...props}
    >
      <img src={`/${svgName}.svg`} css={{ width: '100%', height: 'auto' }} />
    </button>
  )
}

const buttonStyles = (clicked: boolean) => css`
  border-radius: 0;
  border: ${colors.green} 3px solid;
  background: ${colors.white};
  cursor: pointer;
  opacity: ${clicked ? 0 : 1};
  width: 50px;
  height: 50px;
  transform: ${clicked ? 'scale(4)' : 'none'};
  transition: ease-in-out all 500ms;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover,
  &:focus {
    border: 3px ${colors.mint} solid;
  }
`

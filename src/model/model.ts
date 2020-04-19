export type Player = {
  order: number
  name: string
  id: string
  tricks: CardType[][]
}

export type Icon = 'eichel' | 'blatt' | 'herz' | 'schelle'
export type CardName = 'A' | 'K' | 'O' | 'U' | '10' | '9'

export type CardType = {
  icon: Icon
  name: CardName
}

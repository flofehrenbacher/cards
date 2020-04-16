export type Player = {
  name: string
  id: string
}

export type Icon = 'eichel' | 'blatt' | 'herz' | 'schelle'
export type CardName = 'A' | 'K' | 'O' | 'U' | '10' | '9'

export type CardType = {
  icon: Icon
  name: CardName
}

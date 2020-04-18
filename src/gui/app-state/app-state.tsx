import React from 'react'

import { CardType, Player } from '../../model'
import { UnreachableCaseError } from '../../utils/unreachable-case-error'

type AppState = {
  me: undefined | Player
  myCards: CardType[]
  stack: CardType[]
  players: Player[]
  lastAction: undefined | string
}
export type AppStateAction =
  | AssignMeAction
  | AssignCardsAction
  | UpdateUsersAction
  | UpdateStackAction
  | GiveCardsAction

type AssignMeAction = {
  type: 'assign-me'
  payload: {
    name: string
    id: string
  }
}
type AssignCardsAction = {
  type: 'update-my-cards'
  payload: CardType[]
}
type UpdateUsersAction = { type: 'update-players'; payload: Player[] }
type UpdateStackAction = {
  type: 'update-stack'
  payload: { cards: CardType[]; playerName?: string }
}
type GiveCardsAction = {
  type: 'give-cards'
  payload: { cards: CardType[]; playerName?: string }
}

export function appStateReducer(prevState: AppState, action: AppStateAction): AppState {
  switch (action.type) {
    case 'assign-me':
      return {
        ...prevState,
        me: action.payload,
        lastAction: `Servus ${action.payload?.name ?? 'Unbekannter Spieler'}!`,
      }
    case 'give-cards':
      return {
        ...prevState,
        myCards: action.payload.cards,
        lastAction: `${action.payload.playerName ?? 'Unbekannter Spieler'} hat Karten gegeben`,
      }
    case 'update-my-cards':
      return { ...prevState, myCards: action.payload }
    case 'update-players':
      return { ...prevState, players: action.payload }
    case 'update-stack':
      const { cards, playerName } = action.payload
      const playedCard = `${cards[cards.length - 1].name} in ${cards[cards.length - 1].icon}`
      return {
        ...prevState,
        stack: cards,
        lastAction: `${playerName ?? 'Unbekannter Spieler'} hat ${playedCard} gelegt`,
      }
    default: {
      throw new UnreachableCaseError(action)
    }
  }
}

export const initialState = {
  me: undefined,
  myCards: [],
  stack: [],
  players: [],
  lastAction: undefined,
}

const DispatchContext = React.createContext<React.Dispatch<AppStateAction> | undefined>(undefined)
export function DispatchProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: React.Dispatch<AppStateAction>
}) {
  return <DispatchContext.Provider value={value}>{children}</DispatchContext.Provider>
}

const AppStateContext = React.createContext<AppState | undefined>(undefined)
export function AppStateProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: AppState
}) {
  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export function useAppState(): AppState {
  const appState = React.useContext(AppStateContext)
  if (appState === undefined) throw new Error('useAppState must be used within a AppStateProvider')
  return appState
}

export function useDispatch(): React.Dispatch<AppStateAction> {
  const dispatch = React.useContext(DispatchContext)
  if (dispatch === undefined) throw new Error('useDispatch must be used within a DispatchProvider')
  return dispatch
}

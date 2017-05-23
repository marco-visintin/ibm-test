export type Deck = Card[]
type DeckManipulator = (a: Card, b: Card) => -1|1

export const SUITS = {
  0: { weight: 0, name: 'club', color: 'black' },
  1: { weight: 1, name: 'spade', color: 'black' },
  2: { weight: 2, name: 'heart', color: 'red' },
  3: { weight: 3, name: 'diamond', color: 'red' }
}

export class Card {
  suit: number
  value: number
}

export function getDeck() : Deck {
  const deck:Deck = []
  for (const s in SUITS) {
    const suit = SUITS[s]
    for (let value = 1; value <= 13; value++) {
      deck.push({ suit: suit.weight, value })
    }
  }
  return deck
}

function _shuffleCards(a: Card, b: Card): -1|1 {
  return Math.floor(Math.random() * 10) >= 4 ? -1 : 1
}

function _sortCards(a: Card, b: Card): -1|1 {
  if (a.suit !== b.suit)
    return a.suit > b.suit ? 1 : -1

  if (a.value === 1) return 1
  if (b.value === 1) return -1
  
  return a.value > b.value ? 1 : -1
}

const _manipulateDeck = (manipulator: DeckManipulator) => (deck: Deck = []) => {
  const _deck:Deck = JSON.parse(JSON.stringify(deck))
  _deck.sort(manipulator)
  return _deck
}

export const sortCards = _manipulateDeck(_sortCards)
export const shuffleDeck = _manipulateDeck(_shuffleCards)

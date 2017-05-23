import { getDeck, sortCards, shuffleDeck } from '../deck.service'

test('should return a fully formed deck', () => {
  const deck = getDeck()
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

  expect(deck.length).toBe(52)

  const clubs = deck.filter(c => c.suit === 0)
  expect(clubs.length).toBe(13)
  const clubsValues = clubs.map(c => c.value)
  expect(clubsValues).toEqual(expect.arrayContaining(values))

  const spades = deck.filter(c => c.suit === 1)
  expect(spades.length).toBe(13)
  const spadesValues = spades.map(c => c.value)
  expect(spadesValues.length).toBe(13)
  expect(spadesValues).toEqual(expect.arrayContaining(values))

  const hearts = deck.filter(c => c.suit === 2)
  expect(hearts.length).toBe(13)
  const heartsValues = hearts.map(c => c.value)
  expect(heartsValues.length).toBe(13)
  expect(heartsValues).toEqual(expect.arrayContaining(values))
  
  const diamonds = deck.filter(c => c.suit === 3)
  expect(diamonds.length).toBe(13)
  const diamondsValues = diamonds.map(c => c.value)
  expect(diamondsValues.length).toBe(13)
  expect(diamondsValues).toEqual(expect.arrayContaining(values))
})

test('after shuffle it should return the same deck', () => {
  const deck = [{ suit: 0, value: 1 }, { suit: 1, value: 2 }]
  const shuffled = shuffleDeck(deck)
  expect(shuffled.length).toBe(deck.length)
  expect(shuffled).toEqual(expect.arrayContaining(deck))
})

test('should reorder a shuffled deck', () => {
  const deck = [
    { suit: 3, value: 4 },
    { suit: 3, value: 2 },
    { suit: 2, value: 3 },
    { suit: 2, value: 2 }
  ]
  const _alreadySorted = [
    { suit: 2, value: 2 },
    { suit: 2, value: 3 },
    { suit: 3, value: 2 },
    { suit: 3, value: 4 }
  ]

  const sorted = sortCards(deck)
  expect(sorted.length).toBe(deck.length)
  expect(sorted).toEqual(expect.arrayContaining(deck))
  sorted.forEach((c, index) => {
    expect(c.suit).toEqual(_alreadySorted[index].suit)
    expect(c.value).toEqual(_alreadySorted[index].value)
  })
})

test('should prioritize ace when reordering', () => {
  const deck = [
    { suit: 0, value: 13 },
    { suit: 0, value: 1 },
    { suit: 0, value: 10 },
    { suit: 0, value: 2 },
  ]

  const sorted = sortCards(deck)
  expect(sorted[sorted.length - 1].value).toBe(1)
})

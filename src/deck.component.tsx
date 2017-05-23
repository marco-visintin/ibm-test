import React, { Component } from 'react'
import { Deck } from './deck.service'
import CardComponent from './card.component'

import './deck.style'

interface IDeckProps {
  deck: Deck,
  cardOnClick: any
}

interface IDeckState {
  shuffle: boolean
}

const ANIMATION_DELAY_STEP = 10

class DeckComponent extends Component<IDeckProps, IDeckState> {
  constructor(props) {
    super(props)
    this.state = { shuffle: false }
  }

  componentWillReceiveProps(nextProps: IDeckProps) {
    const currentLastCard = this.props.deck[this.props.deck.length - 1];
    const nextLastCard = nextProps.deck[nextProps.deck.length - 1]
    if (currentLastCard !== nextLastCard) {
      this.setState(
        { shuffle: true },
        () => setTimeout(
          () => this.setState({ shuffle: false }), ANIMATION_DELAY_STEP * nextProps.deck.length
        )
      )
    }
  }

  render() {
    const { deck, cardOnClick } = this.props
    const { shuffle } = this.state
    return (
      <ul className='deck'>
        {deck.map((card, index) => 
          <li
            key={`deck-card-${index}`}
            className={shuffle ? 'all-day-shuffling' : ''}
            onClick={cardOnClick}
            style={{ 
              left: `${index}px`,
              top: `${index}px`,
              transitionDelay: `${ANIMATION_DELAY_STEP * index}ms` 
            }}>
              <CardComponent card={card} show={false} /> 
          </li>
        )}
      </ul>
    )
  }
}

export default DeckComponent

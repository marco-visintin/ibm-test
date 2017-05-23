import React, { Component } from 'react'
import { Card, SUITS } from './deck.service'

import './card.style'

interface ICardProps {
  card: Card
  show: boolean
}

class CardComponent extends Component<ICardProps, {}> {

  getCardDisplayValue(value: number) : string|number {
    if (value > 1 && value <= 10) { return value }
    
    switch(value) {
      case 1:  return 'A'
      case 11: return 'J'
      case 12: return 'Q'
      case 13: return 'K'
    }
  }

  getStacks(value: number) : [number, number, number] {
    if (value <= 3) {
      return [0, value, 0]
    }

    if (value <= 10) {
      let _possibleSide = Math.floor(value / 2)
      const sideValue = _possibleSide > 4 ? 4 : _possibleSide
      const middleValue = value - (sideValue * 2)
      return [sideValue, middleValue, sideValue]
    }
  }

  getSuits(numberOfSuits: number, suitClass: string): JSX.Element[] {
    const suits = []
    for (let i = 0; i < numberOfSuits; i++) {
      suits.push(<div 
        key={`${suitClass}-${i}`}
        className={`card-suit suit-${numberOfSuits} suit-${suitClass}`} />
      )
    }
    return suits
  }

  getCardFigure(value: number): string {
    switch(value) {
      case 11: return 'figure-jack'
      case 12: return 'figure-queen'
      case 13: return 'figure-king'
    }
  }

  render() {
    const { card, show } = this.props

    if (!show) {
      return (
        <div className='card'>
          <div className='card-content back'>
          </div>
        </div>
      )
    }

    const { name: suitClass, color } = SUITS[card.suit]
    const displayValue = this.getCardDisplayValue(card.value)

    return (
      <div className={`card ${color}`}>
        {
          ['top left', 'top right', 'bottom left', 'bottom right']
            .map(position =>
              <div className={`card-value ${position}`} key={`card-value-${position}`}>
                <div className='card-number'> {displayValue} </div>
                <div className={`card-suit suit-${suitClass}`} />
              </div>
          )
        }
        <div className='card-content'>
          {
            card.value <= 10
            ?
              this
                .getStacks(card.value)
                .map((n, index) => 
                  <div 
                    className='suit-stack' 
                    key={`stack-${card.suit}-${card.value}-${index}`}> {this.getSuits(n, suitClass)} 
                  </div>
                )

            : <div className={`card-figure ${this.getCardFigure(card.value)}`} />
          }
        </div>
      </div>
    )
  }
}

export default CardComponent

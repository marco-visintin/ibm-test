import React, { Component } from 'react'
import { Deck, getDeck, shuffleDeck, sortCards } from './deck.service'
import DeckComponent from './deck.component'
import CardComponent from './card.component'

import './table.style'

// TS does not let me import module that are not .ts / .tsx so this is a workaround to import
// the button .gif
declare function require(string): string;

interface ITableState {
  deck: Deck,
  drawn: Deck
}

class Table extends Component<{}, ITableState> {
  constructor(props) {
    super(props)
    this.state = { deck: sortCards(getDeck()), drawn: [] }
  }

  draw() {
    const card = this.state.deck.pop()
    this.setState({ deck: this.state.deck, drawn: [card, ...this.state.drawn] })
  }

  shuffle() {
    this.setState({ ...this.state, deck: shuffleDeck(this.state.deck) })
  }

  reset() {
    this.setState({ deck: sortCards(getDeck()), drawn: [] })
  }

  sort() {
    this.setState({ ...this.state, drawn: sortCards(this.state.drawn) })
  }

  render() {
    const { deck, drawn } = this.state
    return (
      <div className='table'>
        <div className='drawn-side'>
          <div className='drawn-cards-wrapper'>
            <ul className='drawn-cards'>
              {
                drawn.map((card, index) =>
                  <li key={`table-card-${index}`}> 
                    <CardComponent card={card} show={true} /> 
                  </li>
                )
              }
            </ul>
          </div>
        </div>
        <div className='deck-side'>
          <div className='deck-buttons'>
            <button className='btn' type='button' onClick={() => this.reset()}>
              <img src={require('./static/reset.gif')} />
              <div> Reset </div>
            </button>
            <button className='btn' type='button' onClick={() => this.shuffle()}>
              <img src={require('./static/shuffle.gif')} />
              <div> Shuffle </div>
            </button>
            <button className='btn' type='button' onClick={() => this.sort()}>
              <img src={require('./static/sort.gif')} />
              <div> Sort </div>
            </button>
          </div>
          <DeckComponent deck={this.state.deck} cardOnClick={() => this.draw()} />
        </div>
      </div>
    )
  }
}

export default Table

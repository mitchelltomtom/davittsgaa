'use strict'

import createReducer from '../utils/create-reducer'

import {GAME, FIXTURE} from '../constant'

const initialState = {
  data: [
  /*    {
        id: {Number},
        type: {String},
        home: {
          team: {String},
          score: {String}
        },
        visitor: {
          team: {String},
          score: {String}
        },
        detail: {
          url: {String},
          loaded: {Boolean},
          data: {Object}
        }
      }*/
  ]
}

const actionHandler = {
  [FIXTURE.INFO]: (state, action) => {
    return Object.assign({}, state, {
      fixtureDate: action.data.fixtureDate,
      data: action.data
    })
  },

  [GAME.INFO]: (state, action) => {
    return Object.assign({}, state, {
      gameDate: action.data.gameDate,
      data: action.data.over
    })
  },

  [GAME.DETAIL]: (state, action) => {
    if (action.gameType !== 'over') return state
    let newState = Object.assign([], state)
    state.data.some(game => {
      if (game.id === action.gameId) {
        game.detail = game.detail || {}
        game.detail.loaded = true
        game.detail.data = action.data
        return true
      }
      return false
    })

    return newState
  }
}

export default createReducer(initialState, actionHandler)

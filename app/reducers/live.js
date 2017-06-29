'use strict'

import createReducer from '../utils/create-reducer'

import {GAME, FIXTURE} from '../constant'

const initialState = {
  data: [
    /*  {
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
          data: {Object}
        },
        process: {
          time: {String},
          quarter: {String}
        }
      }*/
  ]
}

const actionHandler = {
  [FIXTURE.INFO]: (state, action) => {
    return Object.assign({}, state, {
      fixtureDate: action.data.date,
      data: action.data
    })
  },

  [GAME.INFO]: (state, action) => {
    return Object.assign({}, state, {
      gameDate: action.data.gameDate,
      data: action.data.live
    })
  },

  [GAME.DETAIL]: (state, action) => {

    if (action.gameType !== 'live') return state
    let newState = Object.assign([], state)
    state.data.some(fixture => {
      if (true) {
        fixture.detail = fixture.detail || {}
        fixture.detail.data = action.data
        fixture.detail.loaded = true
        fixture.process = action.data.process
        fixture.home = {}
        fixture.away = {}
        fixture.home.score = action.data.home.score
        fixture.away.score = action.data.visitor.score
        return true
      }
      return false
    })
    return newState
  }
}

export default createReducer(initialState, actionHandler)

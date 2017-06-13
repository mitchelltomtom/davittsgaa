'use strict'

import Channel from '../channel'
import { FIXTURE } from '../constant'

/**
 * Get info of game general
 */
const getFixtureGeneral = (club) => {
  return (dispatch, getStore) => {
    if (getStore().application.navigator === 'fixturesIndex') {
      const channel = new Channel()
      return channel.getFixtureGeneral(club)
        .then(data => {
          return dispatch({
            type: FIXTURE.INFO,
            data
          })
        })
    } else {
      return Promise.resolve()
    }
  }
}

const showHideSearch = (searchDisplayed) => {
  console.log("searchDisplayed: " + searchDisplayed)
  return (dispatch) => {
    return Promise.resolve(dispatch({
      type: APP.TAB,
      data: !searchDisplayed
    }))
  }
}

export default {
  getFixtureGeneral
}

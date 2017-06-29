'use strict'

import Channel from '../channel'
import { TWEET } from '../constant'

/**
 * Get info of game general
 */
const getRecentTweets= (handle) => {
  return (dispatch, getStore) => {
    if (getStore().application.navigator === 'fixturesIndex') {
      const channel = new Channel()
      return channel.getFixtureGeneral(club)
        .then(data => {
          return dispatch({
            type: TWEET.INFO,
            data
          })
        })
    } else {
      return Promise.resolve()
    }
  }
}

export default {
  getRecentTweets
}

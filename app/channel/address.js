'use strict'

const d = new Date()
const currentMonth = d.getMonth() + 1
let season
const defaultDate = 20151125;
const defaultTeamID = 1610612739;
if (currentMonth >= 10) {
  season = d.getFullYear().toString() + '-' + (d.getFullYear() + 1).toString().substring(2, 4)
} else {
  season = (d.getFullYear().toString() - 1) + '-' + d.getFullYear().toString().substring(2, 4)
}

const address = {
  /**
   * All game of the date
   * @params gameDate: {String} {Format: yearmonthdate}
   * @example gameDate: 20151125
   */
  gameGeneral: (gameDate) => {
    console.log("called gameGeneral with date:" + gameDate); // Some dates return an error.
    return `http://data.nba.com/data/5s/json/cms/noseason/scoreboard/${defaultDate}/games.json`;
  },
  /**
   * Detail of a game in a specific date
   * @params gameDate: {String} {Format: yearmonthdate} & gameId: {String}
   * @example gameDate: 20151128 & gameId: 0021500239
   */
  gameDetail: (gameDate, gameId) => {
    console.log("called gameDetail with date:" + gameDate + " & game id:" + gameId); // Some dates return an error.
    return `http://data.nba.com/data/10s/json/cms/noseason/game/${defaultDate}/${gameId}/boxscore.json`
  },
  /**
   * Current league standing
   * @params year {String}
   * @example year: 2015
   */
  leagueStanding: (year) => {
    console.log("called gameDetail with year: "+ year)// Some dates return an error.
    return `http://data.nba.com/data/json/cms/${year}/league/standings.json`
  },

  playerList: () => {
    console.log("called player list for season: "+ season)// Some dates return an error.
    return `http://stats.nba.com/stats/commonallplayers?IsOnlyCurrentSeason=0&LeagueID=00&Season=${season}`
  },

  playerInfo: (id) => {
    return `http://stats.nba.com/stats/commonplayerinfo?LeagueID=00&PlayerID=${id}&SeasonType=Regular+Season`
  },

  playerLog: (id) => {
    return `http://stats.nba.com/stats/playergamelog?LeagueID=00&PerMode=PerGame&PlayerID=${id}&Season=${season}&SeasonType=Regular+Season`
  },

 /**
  * @params gameDate month/date/year
  */
  teamRank: (gameDate) => {
    console.log("teamRank called");
    //const defaultDate = "11/28/2015";
    //return `http://stats.nba.com/stats/scoreboard?DayOffset=0&LeagueID=00&gameDate=${gameDate}`
    return `http://stats.nba.com/js/data/widgets/players_landing_sidebar.json`
  },

  teamInfo: (id) => {
    console.log("teamInfo called");
    return `http://stats.nba.com/stats/teaminfocommon?LeagueID=00&SeasonType=Regular+Season&TeamID=${defaultTeamID}&season=${season}`
  },

  teamDetail: (id) => {
    console.log("teamDetail called");
    return `http://stats.nba.com/stats/teamplayerdashboard?DateFrom=&DateTo=&GameSegment=&LastNGames=0&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PaceAdjust=N&PerMode=PerGame&Period=0&PlusMinus=N&Rank=N&Season=${season}&SeasonSegment=&SeasonType=Regular+Season&TeamID=${defaultTeamID}&VsConference=&VsDivision=`
  },

  teamDetailBasic: (id) => {
    console.log("teamDetailBasic called");
    return `http://stats.nba.com/stats/commonteamroster?LeagueID=00&Season=${season}&TeamID=${defaultTeamID}`
  }
}

export default address

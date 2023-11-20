import { buildSchema } from 'graphql'

export const schema = buildSchema(`
type Competition {
  name: String
  code: String
  areaName: String
}

type Team {
  name: String
  tla: String 
  shortName: String
  areaName: String
  address: String
  players: [Player]
}

type Player {
    name: String
    position: String
    dateOfBirth: String
    nationality: String
    team: String
    leagueCode: String
    isCoach: Boolean
}

type Query {
  competitions: [Competition]
  getPlayers(leagueCode: String!, teamName: String, coach:Boolean): [Player]
  getTeamByName(name: String!): Team
}

type Mutation {
  importLeague(leagueCode: String!): Competition
}
`)

# Santex Test

## Description

This project has been developed as part of a technical test for Santex. The application is built in TypeScript and uses MongoDB as the database. Below are some important aspects of the development:

## Database

The choice of MongoDB as the database was based on the nature of the data provided for the test. The data did not have a strong relationship between them, and MongoDB, with its flexible document model, adapted well to this situation. Mongoose was used as the Object-Document Mapper (ODM) to facilitate interaction with the MongoDB database from the Node.js application.

## Repositories

To access data in the database, repositories were implemented using the repository design pattern. Repositories act as an intermediate layer between the application logic and the database, providing a clean and consistent interface to interact with data models.

## Interfaces

Interfaces were used to define clear contracts between different parts of the system. This helps decouple concrete implementations from interfaces, making unit testing easier and improving code maintainability.

## GraphQL Schema

Below is a description of the final GraphQL schema used in the application:

```graphql
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
  getPlayers(leagueCode: String!, teamName: String, coach: Boolean): [Player]
  getTeamByName(name: String!): Team
}

type Mutation {
  importLeague(leagueCode: String!): Competition
}

```
## Usage Guide

### Prerequisites

1. **Docker**: Make sure you have Docker installed on your machine as the database is mounted in a Docker image (check DockerFile and docker-compose files).

### Configuration

1. Open the `.env` file and complete the value of `TOKEN_SOCCER_API` with your valid token from [api.football-data.org](https://www.football-data.org/).

### Execution Steps

1. **Build the Database**: Execute the following command to build and mount the database:

   ```bash
   npm run buildDatabase

   ```
2. **Start the application**: Execute the following command:

   ```bash
   npm run start

   ```

## Mutations 

1. The following mutation is goint to import all the data to our database acording with the league code

```graphql
mutation importLeague($leagueCode: String!){
    importLeague(leagueCode:$leagueCode){
        name,
        areaName,
        code
    }
}
```

## Queries

1. The following query return a list of players according wit the league, team or if you want, you can just choose the coach

```graphql
query getPlayers($leagueCode: String!, $teamName: String, $coach: Boolean){
    getPlayers(leagueCode:$leagueCode, teamName: $teamName, coach: $coach){
        name,
        position,
        nationality,
        team
    }
}
```

2. The following query return a team with the players, in case that the team doesnt has players, is going to return the coach

```graphql
query getTeamByName( $name: String!){
    getTeamByName(name:$name){
        name,
        tla,
        areaName,
        players{
            name,
            position
        }
    }
}
```

I add a postman collection in postman_collection folder
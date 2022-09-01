
# NgPokemon
This is Angular prosject for Noroff assignment. The purpose of the assignment is to get familiar with Angular and fetch data from api using HttpClient.

The goal of the application is to create Pokemon trainer page using Angular. The application should consist of a landing page, trainer page, and catalogue page.

## Authors

- [@Oddbjørn S. Borge-Jensen](https://github.com/oddbjornborg/pokemon-trainer)
- [@Chonlawit With-Pettersen](https://github.com/oddbjornborg/pokemon-trainer)

## API Reference

#### Get pokemon pagination

```http
  GET https://pokeapi.co/api/v2/pokemon/?limit=20&offset=20/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `limit`   | `string` |                            |
| `offset`  | `string` |                             |

#### Get pokemon image

```http
  GET https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of image to fetch



#### Get trainers

```http
  GET https://osb-assignment-api.herokuapp.com/trainers
```
## Installation

Install 
pokemon-trainer with npm

```bash
  cd pokemon-trainer
  npm install
  ng serve --open
  
```
    
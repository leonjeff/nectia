# Assignment

## API

Endpoint URL: https://retoolapi.dev/HLtTWb/jobs

### Job structure

```JSON
  {
    "id": 1,
    "company": "Citigroup",
    "location": "Memphis, Tennessee, United States",
    "position": "Inbound BDR"
  }
```

### HTTP method endpoints

| Method Type  | Endpoint                          |
| ------------ | --------------------------------- |
| GET          | HLtTWb/jobs                      |
| GET filter   | HLtTWb/jobs?company=value             |
| GET by id    | HLtTWb/jobs/1                    |
| GET paginate | HLtTWb/jobs/?\_page=2&\_limit=10 |
| POST         | HLtTWb/jobs                      |
| PUT          | HLtTWb/jobs/1                    |
| PATCH        | HLtTWb/jobs/1                    |
| DELETE       | HLtTWb/jobs/1                    |

You can see more routes [here](https://www.npmjs.com/package/json-server#routes)

## App main page

Example of app main page

| Company   | Location                          | Open Position | 
| --------- | --------------------------------- | ------------  | 
| Citigroup | Memphis, Tennessee, United States | Inbound BDR   | 



# How to test

- Git clone this repository
- ```bash
  npm install
- ```
  npm start

- Now go to your browser and hit localhost:3000/


# Users examples for login
user: sberryann4q@ebay.co.uk        
password: MacGoun

user: ceilles29@google.ru     
password: Gecks

user: gbeston6d@businessweek.com       
password: Rotter

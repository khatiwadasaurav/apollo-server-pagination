# Apollo Server Mocking Activity

In this project, we are using apollo server with node js to setup our backend , this project demonstrates the use of pagination in our schema how we can setup graphql pagination using relay connection.Also it uses faker to mimic data as well. Give it a star to help me build more projects in the future thanks.

## Setup

1. Clone the Repo

```
git clone https://github.com/khatiwadasaurav/apollo-server-pagination.git
```

2. Install Dependencies

```
npm i
```

3. Start the Server

```
npm start
```

4. Open `localhost:4000`


## initial schema architecture

query {
  projects(pageSize: 10) {
    cursor
    hasMore
    projects {
      id
      name
      code
      color
      address
    }
  }
}

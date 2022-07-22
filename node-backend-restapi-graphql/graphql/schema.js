const { buildSchema } = require('graphql');


//Exclamation mark in String! , Integer! indicates that the data is compulsory, we have to return a String or Integer, or whatever we have defined

module.exports = buildSchema(`
    type Posts {
        _id:  ID!
        title: String!
        content: String!
        imageURL : String!
        creator: User!
        createdAt: String!
        updatedAt: String!

    }

    type User {
        _id:  ID!
        name: String!
        email: String!
        password: String
        status: String!
        posts: [Posts!]!
    }
    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type RootMutation {
        createUser(userInput: UserInputData) : User!
    }
    type RootQuery {
        hello: String
    }
    schema {
        query: RootQuery
        mutation: RootMutation 
    }
`);
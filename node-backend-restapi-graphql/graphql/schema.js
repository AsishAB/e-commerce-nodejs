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

    type AuthData {
        token: String!
        userId: String!
    }

    input PostData {
        title: String!
        content: String!
        image: String!
    } 

    type AllPosts {
        posts: [Posts!]
        totalPost: Int!
    }
    

    type RootMutation {
        createUser(userInput: UserInputData) : User!
        createPost(postInput : PostData!): Posts!
        editPost(postId : ID!, postInput: PostData!):Posts!
        deletePost(postId: ID!): Boolean!
        updateUserStatus(status: String!): User!
        
    }
    type RootQuery {
        login(email: String!, password: String!) : AuthData!
        getPosts(paginator: Int!): AllPosts!
        getPostById(postId: ID!): Posts!
        userStatus: User!
       
    }
    schema {
        query: RootQuery
        mutation: RootMutation 
    }
`);
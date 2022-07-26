import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    
    const graphqlQuery = {
      query: `
          query GetPostById($postId: ID!){
            getPostById(postId: $postId) {
              _id
              title
              content
              imageURL
              creator {
                name
              }
              createdAt
              }
      
          }
      `,
      variables: {
        postId: postId
      }
    }
    fetch('http://localhost:8090/graphql', {
      method: "POST",
      headers: {
        'Authorization' : 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors) {
          console.log(resData.errors);
          throw new Error('Fetching Posts failed!');
        }
        console.log(resData)
        this.setState({
          title: resData.data.getPostById.title,
          author: resData.data.getPostById.creator.name,
          image: resData.data.getPostById.imageURL,
          date: new Date(resData.data.getPostById.createdAt).toLocaleDateString('en-US'),
          content: resData.data.getPostById.content
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;

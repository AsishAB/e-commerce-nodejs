import React, { Component, Fragment } from 'react';


import Post from '../../components/Feed/Post/Post';
import Button from '../../components/Button/Button';
import FeedEdit from '../../components/Feed/FeedEdit/FeedEdit';
import Input from '../../components/Form/Input/Input';
import Paginator from '../../components/Paginator/Paginator';
import Loader from '../../components/Loader/Loader';
import ErrorHandler from '../../components/ErrorHandler/ErrorHandler';
import './Feed.css';

class Feed extends Component {
  state = {
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    status: '',
    postPage: 1,
    postsLoading: true,
    editLoading: false
  };

  componentDidMount() {
    const graphqlQuery = {
      query: `
          {
            userStatus {
                  status
              }
      
          }
      `
    };
    fetch('http://localhost:8090/graphql',{
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
        // console.log("User Status");
        // console.log(resData);
        
        if (resData.errors) {
          console.log(resData.errors);
          throw new Error('Getting User status failed!');
        }
        this.setState({ status: resData.data.userStatus.status });
      })
      .catch(this.catchError);

    this.loadPosts();
    
  }

  addPost = post => {
    this.setState(prevState => {
      const updatedPosts = [...prevState.posts];
      if (prevState.postPage === 1) {
        if (prevState.posts.length >= 2) {
          updatedPosts.pop();
        }
        updatedPosts.unshift(post);
      }
      return {
        posts: updatedPosts,
        totalPosts: prevState.totalPosts + 1
      };
    });
    
  };

  loadPosts = direction => {
    if (direction) {
      this.setState({ postsLoading: true, posts: [] });
    }
    let page = this.state.postPage;
    if (direction === 'next') {
      page++;
      this.setState({ postPage: page });
    }
    if (direction === 'previous') {
      page--;
      this.setState({ postPage: page });
    }

    const graphqlQuery = {
      query: `
          {
            getPosts(paginator: ${page}) {
                  posts {
                    _id
                    title
                    content
                    imageURL
                    creator {
                      name
                    }
                    createdAt
                  }
                  totalPost
              }
      
          }
      `
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
        //console.log(resData);
        if (resData.errors) {
          console.log(resData.errors);
          throw new Error('Fetching Posts failed!');
        }
        this.setState({
          posts: resData.data.getPosts.posts,
          totalPosts: resData.data.getPosts.totalPosts,
          postsLoading: false
        });
      })
      .catch(this.catchError);
  };

  statusUpdateHandler = event => {
    event.preventDefault();
    const graphqlQuery = {
      query: `
          mutation{
            updateUserStatus(status: "${this.state.status}") {
                  status
              }
      
          }
      `
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
        //console.log(resData);
      })
      .catch(this.catchError);
  };

  newPostHandler = () => {
    this.setState({ isEditing: true });
  };

  startEditPostHandler = postId => {
    this.setState(prevState => {
      const loadedPost = { ...prevState.posts.find(p => p._id === postId) };

      return {
        isEditing: true,
        editPost: loadedPost
      };
    });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editPost: null });
  };

  finishEditHandler = postData => {
    this.setState({
      editLoading: true
    });
    // Set up data (with image!)
    let url = 'http://localhost:8090/graphql';
    let method = "POST";
   
    const formData = new FormData();
    formData.append('postImage', postData.image);

    // if (this.state.editPost) {
    //   //console.log(`Inside React- ${this.state.editPost.imagePath}`)
    //   formData.append('oldPath', this.state.editPost.imagePath);
    // }
    fetch('http://localhost:8090/upload-image', {
      method: 'POST',
      headers: {
        'Authorization' : 'Bearer ' + this.props.token
        
      },
      body: formData,
    })
      .then(res => {
        return res.json();
       
      })
      .then(fileRes => {
         //Add- Edit post Stats here
        //console.log(`Inside React app->Feedjs ->finishEditHandler ${fileRes}`);
        let graphqlQuery = {
          query :
            `
              mutation{
                createPost(postInput:{title:"${postData.title}", content: "${postData.content}", image: "${fileRes.fileName}"}) {
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
            ` 
        };
        // console.log(graphqlQuery);
        if (this.state.editPost) {
          graphqlQuery = {
            query :
              `
                mutation{
                  editPost(postId: "${this.state.editPost._id}",postInput:{title:"${postData.title}", content: "${postData.content}", image: "${fileRes.fileName}"}) {
                            _id
                            title
                            content
                            imageURL
                            creator {
                              name
                            }
                            updatedAt
                            
                  }
                
                }
              ` 
          };
        }
        fetch(url, {
          method: method,
          body: JSON.stringify(graphqlQuery),
          headers: {
            'Authorization' : 'Bearer ' + this.props.token,
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            return res.json();
           
          })
          .then(resData => {
            
            //console.log(resData);
            if (resData.errors && resData.errors[0].errorStatusCode === 422) {
              throw new Error(
                "Validation failed."
              );
            }
            if (resData.errors) {
              console.log(resData.errors);
              throw new Error('Creating a Post failed!');
            }
            //console.log(resData);
            var resDataField = 'createPost';
            if (this.state.editPost) {
              resDataField = 'editPost';
            }
            const post = {
              _id: resData.data.resDataField.post._id,
              title: resData.data.resDataField.title,
              content: resData.data.resDataField.content,
              creator: resData.data.resDataField.creator,
              createdAt: resData.data.resDataField.createdAt,
              imagePath: resData.data.resDataField.imageURL
            };
            this.setState(prevState => {
              let updatedPosts = [...prevState.posts];
              if (prevState.editPost) {
                const postIndex = prevState.posts.findIndex(
                  p => p._id === prevState.editPost._id
                );
                updatedPosts[postIndex] = post;
              } else {
                updatedPosts.pop();
                updatedPosts.unshift(post);
              }
              return {
                posts: updatedPosts,
                isEditing: false,
                editPost: null,
                editLoading: false
              };
            });
          })
          .catch(err => {
            console.log(err);
            this.setState({
              isEditing: false,
              editPost: null,
              editLoading: false,
              error: err
            });
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err
        });
      });
        
      
 
  };

  statusInputChangeHandler = (input, value) => {
    this.setState({ status: value });
  };

  deletePostHandler = postId => {
    this.setState({ postsLoading: true });
    let graphqlQuery = {
      query :
        `
          mutation{
            deletePost(postId: "${postId}") 
          
          }
        ` 
    };
    fetch('http://localhost:8090/graphql',{
      method: "POST",
      headers: {
        'Authorization' : 'Bearer ' + this.props.token,
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(graphqlQuery)
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        //console.log(resData);
        if (resData.errors) {
          console.log(resData.errors);
          throw new Error('Deleting Post failed!');
        }
        this.setState(prevState => {
          const updatedPosts = prevState.posts.filter(p => p._id !== postId);
          return { posts: updatedPosts, postsLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ postsLoading: false });
      });
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  catchError = error => {
    this.setState({ error: error });
  };

  render() {
    return (
      <Fragment>
        <ErrorHandler error={this.state.error} onHandle={this.errorHandler} />
        <FeedEdit
          editing={this.state.isEditing}
          selectedPost={this.state.editPost}
          loading={this.state.editLoading}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
        />
        <section className="feed__status">
          <form onSubmit={this.statusUpdateHandler}>
            <Input
              type="text"
              placeholder="Your status"
              control="input"
              onChange={this.statusInputChangeHandler}
              value={this.state.status}
            />
            <Button mode="flat" type="submit">
              Update
            </Button>
          </form>
        </section>
        <section className="feed__control">
          <Button mode="raised" design="accent" onClick={this.newPostHandler}>
            New Post
          </Button>
        </section>
        <section className="feed">
          {this.state.postsLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Loader />
            </div>
          )}
          {this.state.posts.length <= 0 && !this.state.postsLoading ? (
            <p style={{ textAlign: 'center' }}>No posts found.</p>
          ) : null}
          {!this.state.postsLoading && (
            <Paginator
              onPrevious={this.loadPosts.bind(this, 'previous')}
              onNext={this.loadPosts.bind(this, 'next')}
              lastPage={Math.ceil(this.state.totalPosts / 2)}
              currentPage={this.state.postPage}
            >
              {this.state.posts.map(post => (
                <Post
                  key={post._id}
                  id={post._id}
                  author={post.creator.name}
                  date={new Date(post.createdAt).toLocaleDateString('en-US')}
                  title={post.title}
                  image={post.imageUrl}
                  content={post.content}
                  onStartEdit={this.startEditPostHandler.bind(this, post._id)}
                  onDelete={this.deletePostHandler.bind(this, post._id)}
                />
              ))}
            </Paginator>
          )}
        </section>
      </Fragment>
    );
  }
}

export default Feed;

import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    };

    componentDidMount() {
        // console.log("Blog is mounted now");
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const oldPosts = response.data.slice(0, 4);
                const updatedPosts = oldPosts.map(oldPost => { return { ...oldPost, author: "Max" } });
                console.log(updatedPosts);
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                this.setState({ error: true });
                console.log(error);
            });

    }

    showFullPostHandler = id => {
        this.setState({ selectedPostId: id });
        console.log("You clicked " + this.state.selectedPostId);
    };

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong here</p>;
        if (!this.state.error)
            posts = this.state.posts.map((post) => {
                return <Post
                    title={post.title}
                    key={post.id}
                    author={post.author}
                    clicked={this.showFullPostHandler.bind(this, post.id)}
                />;
            })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;
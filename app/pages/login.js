import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';

import NavMenu from '../components/NavMenu';

// Straight away require/import scss/css just like in react.
import indexStyle from '../styles/index.scss';

export default class extends React.Component {
    static async getInitialProps({ req }) {
      const errorMessage = req ? req.flash('error').pop() : '';
      return { errorMessage }
    }
  
    render() {
        let errorMessage = '';
        if(this.props.errorMessage) {
            errorMessage = (
                <div class="alert alert-danger" role="alert">
                    {this.props.errorMessage}
                </div>
            );
        }
        return (
            // Wrap your page inside <Theme> HOC to get bootstrap styling.
            // Theme can also be omitted if react-bootstrap components are not used.
            <Theme>
                <div className="container">
                    <div className="jumbotron login">
                        <img src="/Hackrobot.jpg" />
                        <br />
                        <div class="login-form row">
                            <div class="col-md-3">&nbsp;</div>
                            <div class="col-md-6">
                                {errorMessage}
                                <form action="/auth/local" method="post">
                                    <div class="form-group">
                                        <label>Email address:</label>
                                        <input type="text" name="username" class="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Password:</label>
                                        <input type="password" name="password" class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" value="Log In" class="form-control"/>
                                        <a href="/register">or register if you don't have an account yet.</a>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-3">&nbsp;</div>
                            <div class="col-md-6">
                                <a href="/auth/slack">
                                    <div className="btn" id="login-btn">
                                        <img src="/slack-btn.png" alt="slack logo" />
                                        <p>LOGIN WITH Slack</p>
                                    </div>
                                </a>

                                {/* <a href="/auth/github">
                                    <div className="btn" id="login-btn">
                                        <img src="/GitHub-Mark-64px.png" alt="github logo" />
                                        <p>LOGIN WITH Github</p>
                                    </div>
                                </a> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Styling using styled-jsx. */}
                <style jsx>{`
                        .btn {
                        display: flex;
                        justify-content: center;
                        }
                        .btn img{
                            height: 3vh;
                        }
                        .login {
                        // margin: 86px auto 0 auto;
                        text-align: center;
                    }
                    
                    #login-btn {
                        width: 225px;
                        padding: 7px 5px;
                    }
                    
                    .btn p {
                        margin: 8px 0 0 0;
                        padding: 0;
                    }
                    
                    .btn > img {
                        float: left;
                        // margin-left: 10px
                    }
                    /****** Logo Div Styling ******/
                    
                    img {
                        margin: 0 auto;
                        display: block;
                    }
                    
                    .clementine-text { /* Styling for the Clementine.js text */
                        padding: 0;
                        margin: -25px 0 0 0;
                        font-weight: 500;
                        font-size: 60px;
                        color: #FFA000;
                    }`
                }
                </style>
            </Theme>
        );
    }
  }

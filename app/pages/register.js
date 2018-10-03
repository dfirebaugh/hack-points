import Link from 'next/link';
import React from 'react';
import { Button } from 'react-bootstrap';
import Theme from '../components/Theme';

import NavMenu from '../components/NavMenu';

// Straight away require/import scss/css just like in react.
import indexStyle from '../styles/index.scss';

export default class extends React.Component {
    static async getInitialProps({ req }) {
      const errorMessage = req ? req.flash('error') : '';
      const successMessage = req ? req.flash('success').pop() : '';
      return { errorMessage, successMessage }
    }
  
    render() {
        let errorMessage = '';
        let successMessage = '';
        if(this.props.errorMessage && this.props.errorMessage.length > 0) {
            errorMessage = (
                <div class="alert alert-danger" role="alert">
                    <ul>
                        {this.props.errorMessage.map(m => (<li>{m}</li>))}
                    </ul>
                </div>
            );
        }
        if(this.props.successMessage) {
            successMessage = (
                <div class="alert alert-success" role="alert">
                    {this.props.successMessage} <a href="/login">You can now log in!</a>
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
                                {successMessage}
                                <form action="/register" method="post">
                                    <div class="form-group">
                                        <label>Name:</label>
                                        <input type="text" name="name" class="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Email address:</label>
                                        <input type="text" name="email" class="form-control"/>
                                    </div>
                                    <div class="form-group">
                                        <label>Password:</label>
                                        <input type="password" name="password" class="form-control" />
                                    </div>
                                    <div class="form-group">
                                        <input type="submit" value="Register" class="form-control"/>
                                    </div>
                                </form>
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

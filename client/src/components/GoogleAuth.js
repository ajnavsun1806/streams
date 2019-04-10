import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';


class GoogleAuth extends React.Component{
    
    componentDidMount(){
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '634554294123-a4pn11tvpu8p644cst5m3kkt491kasuf.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.auth.isSignedIn.listen(this.onAuthChange);
                this.onAuthChange(this.auth.isSignedIn.get());
            });
        });
    }

    onSignIn = () =>{
        this.auth.signIn();
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }    
    }

    renderAuth(){
        if(this.props.isSignedIn){
            return (<button className="ui red google button" onClick={this.onSignOut}>
                <i className="google icon" />Sign out
            </button>);
        }else {
            return (<button className="ui red google button" onClick={this.onSignIn}>
                <i className="google icon" />Sign In With Google
            </button>);
        }
    }
    render(){
        return this.renderAuth();
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        isSignedIn : state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
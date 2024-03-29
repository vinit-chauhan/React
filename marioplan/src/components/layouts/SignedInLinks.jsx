import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
  return (
   <ul className="right">
     <li><NavLink to="/create">New Project</NavLink></li>
     <li><a href="" onClick={props.signOut}>Logout</a></li>
     <li><NavLink to="/" className="btn btn-floating blue lighten-1">{props.profile.initials}</NavLink></li>
   </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);
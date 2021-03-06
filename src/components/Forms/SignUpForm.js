import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector, getFormSyncErrors } from 'redux-form';
import HeaderBar from '../HeaderBar';
import Fields from './Fields';
import {isTrimmed, nonEmpty, required, validEmail, length} from './validators';
import { registerUser } from '../../actions/registerUser';

import './forms.css';
import {login} from "../../actions/auth";

const passwordLength = length({min: 8, max: 72});
// const matchesPassword = matches('password');

class SignUpForm extends React.Component {

  componentWillReceiveProps(nextProp) {
    if (nextProp.loginError) {
      document.getElementById('top').scrollIntoView();
    }
  }

  onSubmit = (values) => {
    const {full_name, email, password, location, role, service_type = ''} = values;
    const user = {full_name, email, password, location, role, service_type};
    return this.props.dispatch(registerUser(user));
  };

  render() {
    let loader;
    if (this.props.loading) {
      loader = (
        <div className="bouncing-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      );
    }

    let error;
    if (this.props.loginError) {
      error = (
        <div className="error-bar" aria-live="polite" role="alert">{this.props.loginError}</div>
      );
    }

    // If user logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (this.props.isAuthenticated) {
      if (this.props.user.role === 'pro') {
        return <Redirect to="/profiles/myprofile"/>;
      }
      return <Redirect to="/profiles"/>
    }

    return (
      <React.Fragment>
        {loader}
        <HeaderBar />
        {error}
        <main className="signin-form-wrapper">
          <div className="signin-form">
            <h1 className="signin-form-header">Account Sign Up</h1>
            <form
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="full_name"
                label="Full name"
                type="text"
                component={Fields}
                validate={[required, nonEmpty, isTrimmed]}
                autoFocus={true}
                autocomplete="off"
              />
              <Field
                // hideNativeErrors
                // onInvalid={e => e.preventDefault()}
                name="email"
                label="Email address"
                type="email"
                component={Fields}
                validate={[required, validEmail, isTrimmed]}
                autocomplete="off"
              />
              <Field
                name="password"
                label="Password"
                type="password"
                component={Fields}
                validate={[required, isTrimmed, passwordLength]}
                autocomplete="off"
              />
              <Field
                name="location"
                label="Location"
                element="select"
                component={Fields}
                validate={required}
              >
                {this.props.locations.map((location, ind) =>
                  <option key={ind} value={location}>{location}</option>)
                }
              </Field>
              <fieldset>
                <legend>User role</legend>
                <Field
                  id="roleUserField"
                  name="role"
                  label="User"
                  component={Fields}
                  type="radio"
                  value="user"
                  validate={required}
                />
                <Field
                  id="roleProField"
                  name="role"
                  label="Pro"
                  component={Fields}
                  type="radio"
                  value="pro"
                  validate={required}
                />
              </fieldset>

              {(this.props.roleValue === 'pro') &&
                <Field
                  name="service_type"
                  label="Service type"
                  element="select"
                  component={Fields}
                  validate={required}
                  autocomplete="off"
                >
                  {this.props.serviceTypes.map((service, ind) =>
                    <option key={ind} value={service}>{service}</option>)
                  }
                </Field>
              }
              <div className="form-field form-field-signup-btns">
                <button
                  className="form-btn"
                  type="submit"
                >
                  Sign Up
                </button>
                <button
                  className="form-btn"
                  type="button"
                  disabled={this.props.pristine || this.props.submitting}
                  onClick={this.props.reset}
                >
                  Clear Values
                </button>
              </div>

            </form>
            <p
              className="account-message"
            >
              Already have an account?
              <Link to="/signin">Sign In</Link>
            </p>
            <p className="account-message">
              Or sign in as
              <button
                type="button"
                className="demo-btn"
                onClick={() => this.props.dispatch(login("user_name@email.com", "password"))}>
                Demo
              </button>
              user
            </p>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

SignUpForm = reduxForm({
  form: 'signup',
  // onSubmitFail: (errors, dispatch) =>
  //   dispatch(focus('signup', 'email'))
})(SignUpForm);

const selector = formValueSelector('signup');

// Pass values from radio buttons to props
// This will allow to conditionally add 'Select type' field to the form
SignUpForm = connect(
  state => {
    const roleValue = selector(state, 'role');

    return {
      roleValue,
      isAuthenticated: state.auth.currentUser !== null,
      user: state.auth.currentUser,
      loading: state.auth.loading,
      loginError: state.auth.error,
      locations: state.profiles.locations,
      serviceTypes: state.profiles.serviceTypes,
      syncErrors: getFormSyncErrors('signup')(state)
    }
  }
)(SignUpForm);

export default SignUpForm;
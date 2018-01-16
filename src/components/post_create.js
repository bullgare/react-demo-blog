import _ from 'lodash';
import React, { Component } from 'react';
import { LocalForm, Control, Errors } from 'react-redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { createPost } from '../actions'

const TextField = (props) => {
  const safeProps = _.omit(props, ['children', 'model', 'label', 'messages', 'mapProps']);
  let input = <input type="text" {...safeProps} />;
  if (props.fieldType === 'textarea') {
    input = <textarea {...safeProps} />
  }

  return (
    <div className="form-group row b-form-row">
      <label className="col-sm-4">{props.label}</label>

      {input}
      <Errors
          model={props.theModel}
          className="col-sm-8 offset-sm-4 text-danger b-form-error"
          show={{touched: true}}
          messages={props.messages} />

      {props.children}
    </div>
  );
}

const classNameBy = (fieldValue) => {
  let className = 'form-control col-sm-8';
  if (fieldValue.touched && !fieldValue.valid) {
    className += ' is-invalid';
  }

  return className;
}

class PostCreate extends Component {
  handleSubmit(val) {
    this.props.createPost(val, (error) => {
      if (error) {
        console.log("WTF", error);
      } else {
        this.props.history.push('/');
      }
    });
  }
  handleChange(val) {
    // console.log('change', val);
  }
  handleUpdate(val) {
    // console.log('update', val);
  }

  render() {
    return (
      <div>
        <LocalForm
            onSubmit={this.handleSubmit.bind(this)}
            onChange={this.handleChange.bind(this)}
            onUpdate={this.handleUpdate.bind(this)}>
          <Control.text
              component={TextField}
              mapProps={{
                className: ({fieldValue}) => {
                  return classNameBy(fieldValue);
                },
                theModel: ({model}) => {
                  return model;
                },
              }}
              label="Enter a title"
              model=".title"
              errors={{
                required: (val) => !val || !val.length,
                length: (val) => !!val && val.length < 3
              }}
              messages={{
                required: 'It is a required field',
                length: 'Title should take at least 3 chars'
              }} />

          <Control.text
              component={TextField}
              mapProps={{
                className: ({fieldValue}) => {
                  return classNameBy(fieldValue);
                },
                theModel: ({model}) => {
                  return model;
                },
              }}
              label="Enter categories"
              model=".categories"
              errors={{
                required: (val) => !val || !val.length,
                quantity: (val) => !!val && !(/\S+\s*,\s*\S+/).test(val)
              }}
              messages={{
                required: 'It is a required field',
                quantity: 'At least two categories separated by comma'
              }} />

          <Control.text
              component={TextField}
              fieldType='textarea'
              mapProps={{
                className: ({fieldValue}) => {
                  return classNameBy(fieldValue);
                },
                theModel: ({model}) => {
                  return model;
                },
              }}
              label="Enter post contents"
              model=".content"
              errors={{
                required: (val) => !val || !val.length,
                length: (val) => !!val && val.length < 20
              }}
              messages={{
                required: 'It is a required field',
                length: 'At least 20 chars long'
              }} />

          <div className="col-sm-8 offset-sm-4 btn-group">
            <button className="btn btn-primary">Create</button>
            <Link to="/" className="btn btn-link">Cancel</Link>
          </div>
        </LocalForm>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPost }, dispatch);
}

export default connect(null, mapDispatchToProps)(PostCreate);

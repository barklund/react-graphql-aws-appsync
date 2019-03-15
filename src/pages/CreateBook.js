import React from 'react'
import { withRouter } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/styles/withStyles';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';

import Form from '../components/Form';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';

import { default as cacheSuspender, killCache } from '../components/cacheSuspender';
import invokeGraphql from '../components/invokeGraphql';

const query = `
query q {
  listAuthors {
    items {
      id
      name
    }
  }
}
`;

const mutation = `
mutation createBook($title: String!, $pageCount: Int!, $authorid: ID!) {
  createBook(input: {title: $title, pageCount: $pageCount, authorid: $authorid}) {
    id
  }
}
`;

const styles = {
  success: {
    backgroundColor: green[600],
  },
}

class CreateBook extends React.Component {
  state = {
    data: {},
    isLoading: false,
    isCreated: false,
  }

  handleSubmit = e => {
    this.setState({isLoading: true});

    invokeGraphql(mutation, this.state.data)
      .then(() => this.setState({isLoading: false, isCreated: true}));

    e.preventDefault();
  }

  handleChange = key => e => {
    e.persist();
    this.setState(
      ({data}) => (
        {data: {...data, [key]: e.target.value}}
      )
    );
  }

  componentWillUnmount() {
    killCache(invokeGraphql)(query);
  }

  render() {
    const res = cacheSuspender(invokeGraphql)(query);
    const authors = res.data.listAuthors.items.map(({id, name}) => ({key: id, value: name}))

    return (
      <Form onSubmit={this.handleSubmit}>
        <Typography variant='h4' gutterBottom>Create book</Typography>

        <InputField label="Author" values={authors} onChange={this.handleChange('authorid')} />

        <InputField label="Title" onChange={this.handleChange('title')} />

        <InputField label="Page count" onChange={this.handleChange('pageCount')} />

        <SubmitButton label="Create" />

        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={this.state.isCreated}
          onClose={this.handleSnacked}
          ContentProps={{className: this.props.classes.success}}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleSnacked}
            >
              <CloseIcon />
            </IconButton>,
          ]}
          message={<span id="message-id">Author created!</span>}
        />
      </Form>
    );
  }
}

export default withRouter(withStyles(styles)(CreateBook));
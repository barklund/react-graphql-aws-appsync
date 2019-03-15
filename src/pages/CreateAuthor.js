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

import invokeGraphql from '../components/invokeGraphql';

const mutation = `
mutation createAuthor($name: String!, $teletubbie: String!) {
  createAuthor(input: {name: $name, teletubbie: $teletubbie}) {
    id
  }
}
`;

const styles = {
  success: {
    backgroundColor: green[600],
  },
}

class CreateAuthor extends React.Component {
  state = {
    isLoading: false,
    isCreated: false,
    data: {},
  }

  handleSubmit = e => {
    this.setState({isLoading: true});

    invokeGraphql(mutation, this.state.data)
      .then(() => this.setState({isLoading: false, isCreated: true}));

    e.preventDefault();
  }

  handleSnacked = () => this.setState({isCreated: false});

  handleChange = key => e => {
    e.persist();
    this.setState(
      ({data}) => (
        {data: {...data, [key]: e.target.value}}
      )
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Typography variant='h4' gutterBottom>Create author</Typography>

        <InputField value={this.state.data.name} label="Author" onChange={this.handleChange('name')} />

        <InputField value={this.state.data.teletubbie} label="Favorite Teletubbie" onChange={this.handleChange('teletubbie')} />

        <SubmitButton disabled={this.state.isLoading} label={this.state.isLoading ? "Creating..." : "Create"} />

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

export default withRouter(withStyles(styles)(CreateAuthor));

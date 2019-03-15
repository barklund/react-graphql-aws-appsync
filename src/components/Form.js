import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  flex: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Form = (props) => (
  <form onSubmit={props.onSubmit} className={props.classes.flex}>
    {props.children}
  </form>
);

export default withStyles(styles)(Form);
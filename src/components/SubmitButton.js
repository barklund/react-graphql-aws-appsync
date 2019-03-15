import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function SubmitButton(props) {
  const { classes, label } = props;

  return (
    <Button type="submit" variant="contained" className={classes.button}>
      {label}
      <Send className={classes.rightIcon} />
    </Button>
  );
}

export default withStyles(styles)(SubmitButton);
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: purple[500],
    },
  },
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: purple[500],
    },
  },
  notchedOutline: {},
  menu: {
    width: 200,
  },
});

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    }
  }

  handleChange = event => {
    this.setState({value: event.target.value});
    this.props.onChange(event);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value && newProps.value !== this.props.value) {
      this.setState({value: newProps.value });
    }
  }

  render() {
    const { classes, label, values } = this.props;
    const { value } = this.state;

    const name = `field${Math.floor(Math.random()*1e9)}`;

    const menu = values
    ? values.map(({key, value}) => <MenuItem key={key} value={key}>{value}</MenuItem>)
    : null;

    const extraProps = values
    ? {
      select: true,
      SelectProps: {
        MenuProps: {
          className: classes.menu,
        },
      }
    }
    : {};

    return (
      <TextField
        className={classes.margin}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            focused: classes.cssFocused,
          },
        }}
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            focused: classes.cssFocused,
            notchedOutline: classes.notchedOutline,
          },
        }}
        label={label}
        value={value}
        variant="outlined"
        id={name}
        name={name}
        onChange={this.handleChange}
        {...extraProps}
      >
        {menu}
      </TextField>
    );
  }
}

export default withStyles(styles)(InputField);
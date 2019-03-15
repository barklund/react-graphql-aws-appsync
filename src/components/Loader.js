import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MDSpinner from "react-md-spinner";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '300px',
  },
}

class Loader extends React.Component {
  render() {
    return <div className={this.props.classes.container}>
      <MDSpinner size={100} borderSize={3} />
    </div>;
  }
}

export default withStyles(styles)(Loader);

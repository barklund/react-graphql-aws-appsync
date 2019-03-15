import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import * as pages from './pages';
import Loader from './components/Loader';

const styles = {
  main: {
    margin: '1em',
  },
}

class App extends Component {
  handleNav = path => event => {
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar>
            <Button color="inherit" onClick={this.handleNav('/author/create')}>Create author</Button>
            <Button color="inherit" onClick={this.handleNav('/author/list')}>List authors</Button>
            <Button color="inherit" onClick={this.handleNav('/book/create')}>Create book</Button>
          </Toolbar>
        </AppBar>
        <React.Suspense fallback={<Loader />}>
          <main className={this.props.classes.main}>
            <Switch>
              <Route path="/author/create" exact component={pages.CreateAuthor} />
              <Route path="/author/list" exact component={pages.ListAuthors} />
              <Route path="/author/:id" exact component={pages.ShowAuthor} />
              <Route path="/book/create" exact component={pages.CreateBook} />
              <Route path="/book/:id" exact component={pages.ShowBook} />
            </Switch>
          </main>
        </React.Suspense>
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(App));

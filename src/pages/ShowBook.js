import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import { default as cacheSuspender, killCache } from '../components/cacheSuspender';
import invokeGraphql from '../components/invokeGraphql';

const query = `
query getBook($book: ID!) {
  getBook(id: $book) {
    id
    title
    pageCount
    author {
      name
    }
  }
}
`;

const styles = theme => ({
  card: {
    marginBottom: '1em',
  },
});

class ShowBook extends React.Component {

  componentWillUnmount() {
    killCache(invokeGraphql)(query, {book: this.props.match.params.id});
  }

  render() {
    const { data: {getBook: book }} = cacheSuspender(invokeGraphql)(query, {book: this.props.match.params.id})

    return (
      <Card className={this.props.classes.card}>
        <CardContent>
          <Typography variant="h3" component="h1">
            {book.title}
          </Typography>
          <Typography variant="h5" color="textSecondary" component="h2">
            Written by {book.author.name}
          </Typography>
          <Typography variant="h6" component="h3">
            Page count: {book.pageCount}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withRouter(withStyles(styles)(ShowBook));

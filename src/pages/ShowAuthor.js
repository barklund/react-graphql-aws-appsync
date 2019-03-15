import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Link from 'react-router-dom/Link';

import { default as cacheSuspender, killCache } from '../components/cacheSuspender';
import invokeGraphql from '../components/invokeGraphql';

const query = `
query getAuthor($author: ID!) {
  getAuthor(id: $author) {
    id
    name
    teletubbie
    books {
      items {
        id
        title
        pageCount
      }
    }
  }
}
`;

const styles = theme => ({
  card: {
    marginBottom: '1em',
  },
});

class ShowAuthor extends React.Component {
  
  componentWillUnmount() {
    killCache(invokeGraphql)(query, {author: this.props.match.params.id});
  }

  render() {
    const { data: { getAuthor: author }} = cacheSuspender(invokeGraphql)(query, {author: this.props.match.params.id})

    return (
      <React.Fragment>
        <Typography variant='h4' gutterBottom>{author.name}</Typography>
        <Typography variant='h6' gutterBottom>Favorite animal: {author.teletubbie}</Typography>
        {author.books.items.map(book => (
          <Card className={this.props.classes.card} key={author.id}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Book
              </Typography>
              <Typography variant="h5" component="h2">
                {book.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to={`/book/${book.id}`} size="small">See more</Button>
            </CardActions>
          </Card>
        ))}
      </React.Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(ShowAuthor));

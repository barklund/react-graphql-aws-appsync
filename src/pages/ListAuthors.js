import React from 'react';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Link from 'react-router-dom/Link';

import { default as cacheSuspender, killCache } from '../components/cacheSuspender';
import invokeGraphql from '../components/invokeGraphql';

const query = `
query q {
  listAuthors {
    items {
      id
      name
      teletubbie
      books {
        items {
          id
        }
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



class ListAuthors extends React.Component {

  componentWillUnmount() {
    killCache(invokeGraphql)(query);
  }

  render() {
    const { classes } = this.props;

    const { data: { listAuthors: { items: authors }}} = cacheSuspender(invokeGraphql)(query);

    return (
      <div>
        <Typography variant='h4' gutterBottom>List authors</Typography>
        {authors.map(author => (
          <Card className={classes.card} key={author.id}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {author.name}
              </Typography>
              <Typography variant="h6" color="textSecondary">
                favorite animal: {author.teletubbie}
              </Typography>
              <Typography color="textSecondary">
                books written: {author.books.items.length}
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to={`/author/${author.id}`} size="small">See more</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    );
  }
}

export default withRouter(withStyles(styles)(ListAuthors));


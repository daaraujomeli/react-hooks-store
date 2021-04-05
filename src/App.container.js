import App from './App';

import { connect } from './store';

import * as posts from './store/posts';
import * as filterPost from './store/filter-post';

export default connect({ posts, filterPost })(App);

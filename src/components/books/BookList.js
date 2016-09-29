import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {groupBooks} from '../../selectors/selectors';
import Book from './Book';
import Filter from './Filter';
import truncateText from '../../utils/truncateText';
import getUniqueTags from '../../utils/getUniqueTags';
import flatten from 'lodash/flatten';
import uniq from 'lodash/uniq';
import flatMap from 'lodash/flatMap';
import escape from 'lodash/escape';
import uniqBy from 'lodash/uniqBy';

class BookList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showFilters: false,
      tags: this.props.tags.length ? this.props.tags.map(tag => Object.assign({}, {tag: tag, show: true})) : [],
      categories: this.props.categories.length ? this.props.categories.map(category => Object.assign({}, {path: category, show: true})) : []
    };

    this.onFilterButtonClick = this.onFilterButtonClick.bind(this);
    this.onFilterTagClick = this.onFilterTagClick.bind(this);
    this.onFilterCategoryClick = this.onFilterCategoryClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.tags.length > this.props.tags.length) {
      this.setState({
        tags: nextProps.tags.map(tag => Object.assign({}, {tag: tag, show: true}))
      });
    }
    if(nextProps.categories.length > this.props.categories.length) {
      this.setState({
        categories: nextProps.categories.map(category => Object.assign({}, {path: category, show: true}))
      });
    }
  }

  onFilterCategoryClick(newData) {
    const categories = this.state.categories;
    let updatedCategories = [];
    for(let i = 0; i < categories.length; i++) {
      const category = newData.find(c => c.path === categories[i].path);
      updatedCategories.push(Object.assign({}, categories[i], {show: category.selected}));
    }
    this.setState({
      categories: updatedCategories
    });
  }

  onFilterButtonClick(e) {
    this.setState({
      showFilters: !this.state.showFilters
    });
  }

  onFilterTagClick(e) {
    const tags = this.state.tags;
    const index = tags.findIndex(t => t.tag === e.target.innerHTML);
    const tag = tags[index];
    this.setState({
      tags: [
        ...tags.slice(0, index),
        Object.assign({}, tag, {show: !tag.show}),
        ...tags.slice(index + 1)
      ]
    });
  }

  showBook(bookTags, bookCategories) {
    let {categories, tags} = this.state;
    console.log('tags', tags)
    for(let i = 0; i < bookTags.length; i++) {
      let tag = tags.find(c => c.tag === bookTags[i]);
      if(tag.show) return true;
    }

    for(let i = 0; i < bookCategories.length; i++) {
      let category = categories.find(c => c.path === bookCategories[i]);
      if(category.show) return true;
    }

    return false;
  }

  render() {
    console.log('render BookList')
    const books = this.props.books.map((book, index) => {
      const {title, author, industryIdentifiers, tags, categories, desc, availability, link} = book;
      //const tags = getUniqueTags(categories);
      if(!this.showBook(tags, categories)) {
        return null;
      }
      return (
        <Book
        key={index}
        author={author}
        title={title}
        tags={tags}
        industryIdentifiers={industryIdentifiers}
        desc={truncateText(desc, 215)}
        availability={availability}
        link={link} />
      );
    });

    return (
      <div className="container">
        <h2 className="sub-header">All books</h2>
        <Filter
          show={this.state.showFilters}
          tags={this.props.tags}
          categories={this.props.categories}
          filters={Object.assign({}, {tags: this.state.tags, categories: this.state.categories})}
          onButtonClick={this.onFilterButtonClick}
          onTagClick={this.onFilterTagClick}
          onCategoryClick={this.onFilterCategoryClick}/>
        <div className="book-list">
          {books}
        </div>
      </div>

    );
  }
}

BookList.propTypes = {
  books: React.PropTypes.array.isRequired,
  tags: React.PropTypes.array.isRequired,
  categories: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
  const books = uniqBy(flatten(state.groups.map(group => groupBooks(group))), 'id');
  const categories = uniq(flatMap(books, book => book.categories));
  const tags = flatMap(books, book => book.tags);

  return {
    books,
    categories,
    tags,
  };
}

export default connect(mapStateToProps)(BookList);

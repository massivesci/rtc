/* BookCollectionView.js
**
** This class displays a collection of books.
** Each book is represented by the first cover in its array.
** When a book in the collection is clicked or tapped,
** the detail view for that book is rendered.
** NOTE: THE DETAIL VIEW SHOULD BE DECOUPLED FROM THE COLLECTION VIEW!
*/

var React = require('react');

var BookDetailView = require('./BookDetailView.jsx');
var Cover = require('./Cover.jsx');

var BookCollectionView = React.createClass({
  getInitialState: function() {
    return {
      largeScrollX: 0,
      pageWidth: window.innerWidth,
      selected: null,
      grid: false
    }
  },
  componentDidMount: function() {
    document.querySelector('.large.covers').style.width = this.props.books.length * 396 + 'px';
  },
  viewDetail: function(index) {
    this.setState({selected: index});
  },
  viewCollection: function() {
    this.setState({selected: null});
  },
  handleLargeScroll: function() {
     this.setState({
         largeScrollX: this.refs.large.getDOMNode().scrollLeft
     });
  },
  render: function(){
    display_mode = this.state.grid ? 'grid' : 'scroll';
    covers = this.props.books.map(function(book, i){
      return (
        <li className="cover" key={i}>
          <Cover book={book} index={i} handleClick={this.viewDetail} />
        </li>
        )
    }, this);

    if(this.state.selected == null) {
      return (
        <div className="gallery">
            <div className="large container" ref="large" onScroll={this.handleLargeScroll}>
                <ul className="large covers">{covers}</ul>
            </div>
            <div className="small container">
                <ul className={"small covers " + display_mode}>{covers}</ul>
            </div>
        </div>
      );
    } else {
      return <BookDetailView book={this.props.books[this.state.selected]} handleExit={this.viewCollection} />;
    }

  }
});

module.exports = BookCollectionView;

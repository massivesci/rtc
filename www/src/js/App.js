window.React = require('react/addons');
var Nav = require('./Nav');
var CoverGallery = require('./CoverGallery');
var books = require('./books');
var _ = require('lodash');

books.sort(function(a, b) {
  aname = a.name.replace('The ', '');
  bname = b.name.replace('The ', '');
  if (aname < bname) {
    return -1;
  }
  if (aname > bname) {
    return 1;
  }
  if (aname == bname) {
    return 0;
  }
});

function buildAlphabet(books) {
  // Builds the alphabet of present book titles
  // For example, a book collection like ["Alpha", "Beta", "Gamma"]
  // would return an alphabet of ["A", "B", "C"]
  var alphabet = [];
  _.each(books, function(book){
      cleaned_title = book.name.replace('The ', '');
      alphabet.push(cleaned_title.slice(0,1));
  });
  alphabet = _.uniq(alphabet, true);
  console.log(alphabet);
  return alphabet;
}

var App = React.createClass({
  render: function(){
    nav = <Nav handleModal={this.handleModalClick} handleExit={this.handleExit} />
    gallery = <CoverGallery books={books} />
    return (
      <div key="app">
        {nav}
        {gallery}
      </div>
    );
  }
});

React.render(<App />, document.getElementById('app'));

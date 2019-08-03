import React, { Component } from "react";
import { toast } from "react-toastify";
import Book from "../components/Book/index";
import SearchForm from "../components/SearchForm/index";
import { List } from "../components/List/index";
import API from "../utils/API";

class Search extends Component {
  state = {
    books: [],
    q: "",
    message: "" // Search for books via the Google Books API
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  getBooks = () => {
    API.getBooks(this.state.q)
      .then(res =>
        this.setState({
          books: res.data,
          currentPage: 1
        })
      )
      .catch(() => {
        toast.error("Not match any book results.");

        this.setState({
          books: [],
          message: "Not match any book results.",
          currentPage: 1
        });
      });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    toast.info("Books ... !");
    this.getBooks();
  };

  handleBookSave = id => {
    const book = this.state.books.find(book => book.id === id);

    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getBooks());
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 col-centered card-content mb-4 justify-content-center flex-wrap flex-row">
            <h1 className="flex-wrap flex-row heading-title mx-sm-3 mb-2 text-center">
              Search and Save Books of Interest
            </h1>
            <h2 className="flex-wrap flex-row heading-title mx-sm-3 mb-2 text-center">
              Google Books Search
            </h2>
          </div>
          <div className="col-10 col-centered mb-4 justify-content-center flex-wrap flex-row">
            <div className="d-flex bd-highlight flex-wrap flex-row mx-sm-3 mb-2 justify-content-center align-items-center">
              <div className="flex-wrap flex-row order-sm-1 p-2 bd-highlight justify-content-center align-items-center">
                <SearchForm
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}/>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-10 col-centered card-content mb-4">
            <h1 className="heading-title mx-sm-3 mb-2 text-center">Results</h1>

            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <Book
                    key={book.id}
                    title={book.volumeInfo.title}
                    subtitle={book.volumeInfo.subtitle}
                    link={book.volumeInfo.infoLink}
                    authors={book.volumeInfo.authors.join(", ")}
                    description={book.volumeInfo.description}
                    image={book.volumeInfo.imageLinks.thumbnail}
                    Button={() => (
                      <button
                        onClick={() => this.handleBookSave(book.id)}
                        className="btn save-button  heading-subtitle ml-2">
                        Save
                      </button>
                    )}
                  />
                ))}
              </List>
            ) : (
              <div className="mockup-content">
                <h2 className="heading-title text-center">
                  {this.state.message}
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;

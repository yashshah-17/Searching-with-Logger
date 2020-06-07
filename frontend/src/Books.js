// Importing the necessary dependencies
import React from 'react';
import axios from 'axios';
import NoteArea from './Note'


// Logic and UI for the entire website
class Books extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchFor: '',
            author: '',
            books:[],
        };
    }

    fetchBooks = () => {
        axios.get(`http://localhost:3001/books?author=${this.state.author}`)
            .then(res => {
                res.data.forEach(book => {
                    book.displayNote = false
                });
                console.log(res.data);
                this.setState({
                   books: res.data
                });
                console.log(this.state)
            })
    };

    preserveLogs = async () => {
        try {
            const response = await axios.post('http://localhost:3001/logs', {
                search: this.state.author
            });
            console.log('Returned data:', response);
        } catch (e) {
            console.log(`Preserve Log request failed: ${e}`);
        }
    };

    onClear = () => {
        this.setState({
            searchFor: '',
            author: '',
            books: [],
        });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.preserveLogs();
        this.fetchBooks();
    };

    myChangeHandler = (event) => {
        this.setState({author: event.target.value});
    };


    render() {
        return (
            <div>
                <form onSubmit={this.onSubmitHandler}>
                    <h3>You are searching for books with author {this.state.author}</h3>
                    <p>Enter author name and submit</p>
                    <input
                        type='text'
                        onChange={this.myChangeHandler}
                    />
                    <input
                        type='submit'
                    />
                    <button onClick={this.onClear}>
                        Clear
                    </button>

                </form>
                <div>
                    <ol>
                    {this.state.books.map((book, index) => {
                        return (
                            <li key={index}>
                                <p> <b>Book : </b>{book.Title}</p>
                                <p> <b>Author : </b>{book.Author} </p>
                                { this.state.books[index].displayNote? <div> <b>Notes:</b> {book.Notes.map( (note,index) => {
                                    return (
                                        <div>
                                            <i key={index}>{note}</i>
                                        </div>
                                    )
                                })}</div>: <p>{index}</p>}
                                <button onClick={() => {
                                    let state = this.state;
                                    state.books[index].displayNote = true;
                                    this.setState({
                                        ...state
                                    });
                                }}>
                                    Retrieve Notes
                                </button>
                                <div>
                                    <NoteArea book={book.Title} notes={book.Notes} />
                                </div>
                            </li>
                        )
                    })}
                    </ol>
                </div>
            </div>

        );
    }
}

export default Books
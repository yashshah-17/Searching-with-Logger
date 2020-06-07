// Importing the necessary dependencies
import React, { useState } from 'react';
import axios from 'axios'


// UI and logic for note addition and retrieval
class NoteArea extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            note:''
        };
    }

    handleChange = (event) => {
        this.setState({note: event.target.value});
    };

    handleSubmit = async () => {
        try {

            const response = await axios.post('http://localhost:3001/notes', {
                book: this.props.book,
                note:this.state.note,
            });
            console.log('Notes added successfully:', response);
        } catch (e) {
            console.log(`failed to add notes: ${e}`);
        }
    };
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        onChange={this.handleChange}
                    />
                    <input type='submit' />
                </form>
            </div>
        )
    }

}

export default NoteArea
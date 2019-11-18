import React, { Component } from 'react';
import axios from 'axios';
import { Table, Button } from 'reactstrap';

export default class CrudForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            stocks: []
        }
    }

    componentWillMount() {
        axios.get("https://api-project-backend.herokuapp.com/").then((Response) => {
            this.setState({
                stocks: Response.data
            });
        });
    }

    render() {
        let stocks = this.state.stocks.map((stock) => {
            return (
                <tr key={stock.name}>
                    <td>{stock.name}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-1">Edit</Button>
                        <Button color="danger" size="sm">Delete</Button>
                    </td>
                </tr>
            );
        })
        return(
            <div className="FormContainer">
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {stocks}
                    </tbody>
                </Table>
            </div>
        );
    }
}
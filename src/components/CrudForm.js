import React, { Component } from 'react';
import axios from 'axios';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

export default class CrudForm extends Component {
    constructor (props) {
        super(props);
        this.state = {
            stocks: [],
            newStock: {
                name: '',
                data: [{
                    Date: '',
                    Close: null
                }]
            },
            editStock: {
                name: '',
                data: [{
                    Date: '',
                    Close: null
                }]
            },
            newStockModal: false,
        }
    }

    componentWillMount() {
        axios.get("https://api-project-backend.herokuapp.com/").then((Response) => {
            this.setState({
                stocks: Response.data
            });
        });
    }

    toggleNewStockModal() {
        this.setState({
            newStockModal: !this.state.newStockModal
        })
    }

    addStock() {
        axios.post("https://api-project-backend.herokuapp.com/", this.state.newStock).then((Response) => {
            console.log(Response.data)

            let { stocks } = this.state;
            stocks.push(Response.data);

            this.setState({ stocks, newStockModal: false, newStock: {
                name: '',
                data: [{
                    Date: '',
                    Close: null
                }]
            } })
        })
    }

    editStockData(name, data) {
        console.log(name);
        console.log(data);
    }

    render() {
        let stocks = this.state.stocks.map((stock) => {
            return (
                <tr key={stock.name}>
                    <td>{stock.name}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-1" onClick={this.editStockData.bind(this, stock.name, stock.data)}>Edit</Button>
                        <Button color="danger" size="sm">Delete</Button>
                    </td>
                </tr>
            );
        })
        return(
            <div className="FormContainer">

                <Button color="primary" size="sm" className="my-2"onClick={this.toggleNewStockModal.bind(this)}>Add</Button>

                <Modal isOpen={this.state.newStockModal} toggle={this.toggleNewStockModal.bind(this)} className={this.props.className}>

                    <ModalHeader toggle={this.toggleNewStockModal.bind(this)}>Modal title</ModalHeader>
                    <ModalBody>

                        <FormGroup>
                            <Label for="Stock"></Label>
                            <Input type="name" placeholder="Stock Name" value={this.state.newStock.name} onChange={(e) => {
                                let {newStock} = this.state;
                                newStock.name = e.target.value;
                                this.setState({newStock});
                            }}/>
                        </FormGroup>

                        <FormGroup>
                            <Label for="Data"></Label>
                            <Input type="string" placeholder="YYYY-MM-DD" value={this.state.newStock.Date} onChange={(e) => {
                                let {newStock} = this.state;
                                newStock.data.Date = e.target.value;
                                this.setState({newStock});
                            }}/>
                            <Input type="number" placeholder="Closing Price" value={this.state.newStock.Close} onChange={(e) => {
                                let {newStock} = this.state;
                                newStock.data.Close = e.target.value;
                                this.setState({newStock});
                            }}/>
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={this.addStock.bind(this)}>Add Stock</Button>{' '}
                        <Button color="secondary" onClick={this.toggleNewStockModal.bind(this)}>Cancel</Button>
                    </ModalFooter>

                </Modal>

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
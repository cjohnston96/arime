import React from 'react';

export default class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            stocks: []
        }
    }

    componentDidMount() {
        fetch("https://api-project-backend.herokuapp.com/Apple")
            .then(res => res.json())
            .then(
                (result) => {
                this.setState({
                    isLoaded: true,
                    stocks: result.stocks
                });
                },
                (error) => {
                    this.setState({
                    isLoaded: true,
                    error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, stocks } = this.state;
        if(error){
            return(
                <div>Error: {error.message}</div>
            )
        } else if (!isLoaded) {
            return(
                <div>Fetching data...</div>
            )
        } else {
        return(
            <ul>
                {stocks.map(stock =>(
                    <li key = {stock.name}>
                        {stock.name}
                        {stock.data}
                    </li>
                ))}
            </ul>
        );
        }
    }
}
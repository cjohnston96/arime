import React from 'react';
import './Stock.css';

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
                    console.log(result)
                this.setState({
                    isLoaded: true,
                    stocks: result
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
                {stocks.data.map(stock =>(
                    <li key={stock.Date}>
                        {stock.Date}: ${stock.Close}
                    </li>
                ))}
            </ul>
        );
        }
    }
}
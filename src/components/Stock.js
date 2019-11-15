import React from 'react';
import './Stock.css';
import Plot from 'react-plotly.js';


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
            let closeArr = this.state.stocks.data.map(stock => {
                return stock.Close;
            })
        return(
            <div>
                <ul>
                    {stocks.data.map(stock =>(
                        <li key={stock.Date}>
                            {stock.Date}: ${stock.Close}
                        </li>
                    ))}.
                </ul>
                {console.log(closeArr)}
                        
                <Plot 
                    data = {[
                    {
                        x: [...Array(1258).keys()],
                        y: closeArr,
                        type: 'scattergl',
                        name: 'test'
                    }
                    ]}
                />

            </div>
        );
        }
    }
}
import React from 'react';
import './Stock.css';
import Plot from 'react-plotly.js';
const choice = 'Snap';


export default class Stock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            stocks: []
        }
    }

    componentDidMount() {
        
        fetch(`https://api-project-backend.herokuapp.com/${choice}`)
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

            let dateArr = this.state.stocks.data.map(stock => {
                return stock.Date;
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
                        x: dateArr,
                        y: closeArr,
                        type: 'scatter',
                        mode: 'lines',
                        name: 'test'
                    }
                    ]}

                    layout = {{ title:`${choice} Closing Prices from Nov 2014 - Nov 2019`,
                                xaxis: {rangeslider: {range: [dateArr[0], '2019-11-11']},
                                type: 'date'},
                                yaxis: {autorange: true}
                            }}
                />

            </div>
        );
        }
    }
}
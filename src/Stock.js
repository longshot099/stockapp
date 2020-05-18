import React, {Component} from "react";
import Plot from 'react-plotly.js';

const API_KEY = 'HGJWFG4N8AQ66ICD';
var StockSymbol = 'KO';

class Stock extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef(); // create a reference to the input element
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
  	var api_call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    const pointerToThis = this;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

     fetch(api_call)

    .then(
      function(response) {
        return response.json(); // becomes data
      }
    )
    .then(
      function(data) {

        for (var key in data['Time Series (Daily)']) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
        }
        // 'this' is undefined since it's out of scope so 'pointerToThis' is used
        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction
        });
      }
    )
  } // end of fetchStock()
  
     search = ()=>{
       StockSymbol = this.inputRef.current.value;
       this.fetchStock();
    } // end of search()

  // html aspect of this file
  render() {

    return (
      <div className = "container">
          <div>
            <h1>Stock Market</h1>
            <input ref = {this.inputRef}  type = "text" placeholder = "Ticker Symbol Here..." />
            <button onClick = {this.search}>Search</button> 
        </div>
        <Plot
          data={[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: StockSymbol}}
        />
      </div>
    )
  }
}

export default Stock;
import React, { Component } from 'react';
import './App.css';
import BarChart from './BarChart';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      products: [],
    };
  }

  componentDidMount() {
    fetch("http://127.0.0.1:8080/product", {
      method: 'get'})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            products: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    // this.setState({ isLoading: false });
    // console.log("Hello")
    // console.log(this.state.products[0])
    // fetch("http://127.0.0.1:5000/product")
    //   .then(response => response.json())
    //   .then(data => this.setState({
    //     products: data.products,
    //     isLoading: false
    //   }))
    //   .then();
  }

  render() {
    const { error, isLoaded, products } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      const barData = products.map((product) => product.price)
      return (
        <BarChart data={barData} width="700" height="500" />
      );
    }
  }
  //   let barData = []
  //   fetch("http://127.0.0.1:5000/product")
  //   .then(response => response.json())
  //   .then(data => this.setState({
  //     products: data.products,
  //     isLoading: false
  //   })).then(
  //     console.log("Hello");
  //     console.log(this.state.products[0]);
  //     barData = products.map((product) => product.price)
      
  //   );
  //   return <p> Hello</p>
  //   // <BarChart data={barData} width="700" height="500" />
  // }
}

export default App;
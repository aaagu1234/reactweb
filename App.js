import  React,  { Component } from "react"
import './App.css'
import OrderList from "./src/component/OrderList"
import Header from "./src/component/Header"
 class App extends Component {
   render() {
     return (
     <div className="app_wrap">
       <Header></Header>
       <OrderList></OrderList>
     </div>)
   }
 } 
 export default App
import React, { Component } from 'react'
import OrderItem from '../OrderItem'

export default class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        fetch('mock/data.json').then(res => {
            if (res.ok) {
                res.json().then(data => {
                    this.setState({
                        data
                    })
                })
            }
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.data.map(item => {
                        return <OrderItem onSubmit={this.submmitHandle} key={item.id} data={item}></OrderItem>
                    })
                }
            </div>
        )
    }
    submmitHandle=(id, comment, stars)=>{
        const newData = this.state.data.map(item=>{
            if(item.id === id){
                return {
                    ...item,
                    comment,
                    stars,
                    ifCommented:true
                }
            }
            return item;
        })
    this.setState({
        data:newData
    })
    }
}

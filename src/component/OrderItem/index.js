import React, { Component } from 'react'
import './style.css'
export default class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stars:  props.data.stars || 0,
            editing: false,
            comment: props.data.comment ||  ''
        }

    }
    render() {
        const { shop, pro, price, pic, ifCommented } = this.props.data;
        return (
            <div>
                <div>
                    <span>{shop}</span>
                    <span>{pro}</span>
                    <span>{price}</span>
                    <img src={pic} width="100" />
                    {
                        ifCommented ? (<button>已评价</button>)  :   (<button onClick={this.openEditHandle}>评价</button>)

                    }
                    {this.state.editing ? this.renderEditArea() : ''}
                </div>
            </div>
        )
    }

    openEditHandle = () => {
        this.setState({
            editing: true
        })
    }

    renderEditArea() {
        return (
            <div>
                <textarea onChange={this.commentChange} value={this.state.comment}></textarea>
                {this.renderStars()}
                <button onClick={this.submitHandle} className="item_submit">提交</button>
                <button onClick={this.cancelHandle} className="item_cancel">取消</button>
            </div>
        )
    }

    commentChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }

    renderStars() {
        const { stars } = this.state;
        return (
            <div>
                {
                    [1, 2, 3, 4, 5].map((item, index) => {
                        const light = stars >= item ? 'item_light' : 'item_gray';
                        return (
                            <span className={light} onClick={this.starsHandle.bind(this, item)} key={index}>★</span>
                        )
                    })
                }

            </div>
        )
    }
    submitHandle=()=>{
        const id = this.props.data.id;
        const { comment , stars } = this.state;
        this.setState({
            editing:false
        })
        this.props.onSubmit(id, comment, stars);
    }
    starsHandle = (item) => {
        this.setState({
            stars: item
        })
    }
    cancelHandle = () => {
        this.setState({
            stars:  this.props.data.stars || 0,
            editing: false,
            comment: this.props.data.comment ||  ''
        })
    }
}

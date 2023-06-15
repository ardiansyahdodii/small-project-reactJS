import axios from 'axios'
import React, { Component } from 'react'
import { Col, ListGroup } from 'react-bootstrap'
import { API_URL } from '../utils/constants.js'

export default class ListCategories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        axios
            .get(API_URL + "categories")
            .then(res => {
                const categories = res.data;
                this.setState({ categories })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { categories } = this.state
        const {changeCategory, pickedCategory} = this.props
        return (
            <Col md={2} mt="2">
                <h4><strong>Daftar Kategori</strong></h4>
                <hr />
                <ListGroup>
                    {categories && categories.map(category => (
                        <ListGroup.Item key={category.id} onClick={() => changeCategory(category.nama)}
                        className={pickedCategory === category.nama && "category-aktif"}
                        style={{cursor: 'pointer'}}>
                            <h5>{category.nama}</h5>
                        </ListGroup.Item>
                    ))}

                </ListGroup>
            </Col>
        )
    }
}

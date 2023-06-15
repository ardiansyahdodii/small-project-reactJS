import React, { Component } from 'react'
import { Badge, Col, ListGroup, Row } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils.js'
import TotalBayar from './TotalBayar.js'
import ModalKeranjang from './ModalKeranjang.js'


export default class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
        }
    }

    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
        })
    }

    handleClose = () => {
        this.setState({
            showModal: false,
        })
    }

    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah+1
        })
    }

    kurang = () =>{
        if (this.state.jumlah !== 1) {
            this.setState({
                jumlah: this.state.jumlah-1
            })           
        }
    }

    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("hai", this.state.keterangan )
    }

    render() {
        const { keranjangs } = this.props
        return (
            <Col md={3} mt="2">
                <h4><strong>Hasil</strong></h4>
                <hr />
                {keranjangs.length !== 0 && (
                    <ListGroup variant="flush">
                        {keranjangs.map((menuKeranjang) =>
                            <ListGroup.Item key={menuKeranjang} onClick={() => this.handleShow(menuKeranjang)}>
                                <Row>
                                    <Col xs={2} style={{ textAlign: 'center' }}>
                                        <Badge bg="success">
                                            {menuKeranjang.jumlah}
                                        </Badge>
                                    </Col>
                                    <Col>
                                        <h5>{menuKeranjang.product.nama}</h5>
                                        <p>Rp. {numberWithCommas(menuKeranjang.product.harga)}</p>
                                    </Col>
                                    <Col style={{ textAlign: 'right' }}>
                                        <strong>Rp. {numberWithCommas(menuKeranjang.total_harga)}</strong>
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        )}

                            <ModalKeranjang handleClose={this.handleClose} {...this.state} tambah={this.tambah} kurang={this.kurang} changeHandler={this.changeHandler} handleSubmit={this.handleSubmit}/>

                    </ListGroup>
                )}
                <TotalBayar keranjangs={keranjangs} {...this.props} />
            </Col>
        )
    }
}

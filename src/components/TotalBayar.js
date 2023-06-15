import React, { Component } from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import axios from 'axios';
//import { Link } from 'react-router-dom'
import { numberWithCommas } from '../utils/utils.js';
import { API_URL } from '../utils/constants.js';
import { Link } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';



export default class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        //const navigate = useNavigate()
        const pesanan = {
            total_bayar: totalBayar,
            menus: this.props.keranjangs,
        }

        axios
        .post(API_URL+`pesanans`, pesanan)
        .then((res) => {
            console.log(pesanan)
        })
    }

    render() {
        const totalBayar = this.props.keranjangs.reduce(function (result, item) {
            return result + item.total_harga;
        }, 0);
        return (
            <div className='fixed-bottom'>
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className='px-4 bg-light'>
                        <h4 className='mt-4'>Total Harga : <strong className='float-end me-2'>Rp. {numberWithCommas(totalBayar)}</strong></h4>
                        <div className='d-grid gap-2'>
                            <Button variant='primary' size='lg' className='mb-4 mt-4 me-2' onClick={() => this.submitTotalBayar(totalBayar)} as={Link
                            } to='/sukses'>
                                <strong>BAYAR</strong>
                            </Button>
                        </div>

                    </Col>
                </Row>


            </div>
        )
    }
}

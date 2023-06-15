import React from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'


const ModalKeranjang = ({ showModal, handleClose, keranjangDetail, jumlah, keterangan, tambah, kurang, changeHandler, handleSubmit }) => {

    if (keranjangDetail) {
        return (
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {`${keranjangDetail.product.nama} `}
                        <strong>( Rp. {numberWithCommas(keranjangDetail.product.harga)} )</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Label>Total Harga : </Form.Label>
                            <p>
                                <strong> Rp. {numberWithCommas(keranjangDetail.product.harga)} </strong>
                            </p>
                        </Form.Group>

                        <Form.Group controlId='exampleForm.ControlInput1'>
                            <Form.Label> Jumlah : </Form.Label>
                            <br />
                            <Button variant='primary' size='sm' className='me-2' onClick={() => tambah()}>
                                +
                            </Button>
                            <strong>{jumlah}</strong>
                            <Button variant='primary' size='sm' className='ms-2' onClick={() => kurang()}>
                                -
                            </Button>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Keterangan : </Form.Label>
                            <Form.Control as="textarea" rows={3} name='keterangan' placeholder='Contoh : Pedas, Nasi banyakin mang' value={keterangan} onChange={(event) => changeHandler(event)}/>
                        </Form.Group>

                        <Button variant='primary' type='submit'>
                            Simpan
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger">
                        Hapus Pesanan
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    } else {
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Kosong
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>Kosong</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    }


}

export default ModalKeranjang
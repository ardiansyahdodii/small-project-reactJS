import React, { Component } from 'react'
import { Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import ListCategories from '../components/listCategories.js';
import Hasil from '../components/Hasil.js';
import Menus from '../components/menus.js';
import { API_URL } from '../utils/constants.js';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menus: [],
      pickedCategory: '',
      keranjangs: []
    }
  }

  componentDidMount() {
    axios.get(API_URL + `products`).then(res => {
      const menus = res.data;
      this.setState({ menus });
    })
      .catch(error => {
        console.error();
      })

    axios.get(API_URL + `keranjangs`).then(res => {
      const keranjangs = res.data;
      this.setState({ keranjangs });
    })
      .catch(error => {
        console.error();
      })
  }

  componentDidUpdate(prevState) {
    if (this.state.keranjangs !== prevState.keranjangs) {
      axios.get(API_URL + `keranjangs`).then(res => {
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
        .catch(error => {
          console.error();
        })
    }
  }

  changeCategory = (value) => {
    this.setState({
      pickedCategory: value,
      menus: []
    })

    axios
      .get(API_URL + `products?category.nama=${value}`)
      .then(res => {
        const menus = res.data;
        this.setState({ menus });
      })
      .catch(error => {
        console.error();
      })
  }

  masukKeranjang = (value) => {

    axios
      .get(API_URL + `keranjangs?product.id=${value.id}`)
      .then(res => {
        if (res.data.length === 0) {
          const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
          }

          axios
            .post(API_URL + `keranjangs`, keranjang)
            .then(res => {
              swal({
                title: "Berhasil ditambahkan ke keranjang",
                text: "Berhasil ditambahkan ke keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch(error => {
              console.error();
            })

        } else {
          const keranjang = {
            jumlah: res.data[0].jumlah + 1,
            total_harga: res.data[0].total_harga + value.harga,
            product: value
          }

          axios
            .put(API_URL + `keranjangs/${res.data[0].id}`, keranjang)
            .then(res => {
              swal({
                title: "Berhasil ditambahkan ke keranjang",
                text: "Berhasil ditambahkan ke keranjang" + keranjang.product.nama,
                icon: "success",
                button: false,
                timer: 2000,
              });
            })
            .catch(error => {
              console.error();
            })
        }
      })
      .catch(error => {
        console.error();
      })
  }



  render() {
    const { menus, pickedCategory, keranjangs } = this.state
    return (
        <div className='mt-3'>
          <Container fluid>
            <Row>
              <ListCategories changeCategory={this.changeCategory} pickedCategory={pickedCategory} />
              <Col>
                <h4><strong>Daftar Produk</strong></h4>
                <hr />
                <Row>
                  {menus && menus.map(menu => (
                    <Menus
                      key={menu.id}
                      menu={menu}
                      masukKeranjang={this.masukKeranjang}
                    />
                  ))}
                </Row>
              </Col>
              <Hasil keranjangs={keranjangs} {...this.props}/>
            </Row>
          </Container>
        </div>
    )
  }
}

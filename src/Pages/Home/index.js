import React, { Component } from 'react'
//import {Redirect} from 'react-router-dom'
import FormLogin from '../Login/LoginForm'
import { Helmet } from 'react-helmet'
import {Container, Row, Col, Carousel, Card} from 'react-bootstrap'

class Home extends Component {

    render() {
        return (
            
            <>
             <Helmet>
            <style type="text/css">{`
                body {
                    background: #653E92 url('') no-repeat center center fixed;-webkit-background-size: cover;
                    -moz-background-size: cover;
                    -o-background-size: cover;
                    background-size: cover;
                }
                `}
                </style>
            </Helmet>
            <Container>
            <Carousel className="mb-3">
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="http://pmb.amikompurwokerto.ac.id/files/slide_new.jpeg"
                    alt="First slide"
                    />
                    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="http://pmb.amikompurwokerto.ac.id/files/3.jpeg"
                    alt="Third slide"
                    />

                    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="http://pmb.amikompurwokerto.ac.id/files/2.png"
                    alt="Third slide"
                    />

                    
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src="http://pmb.amikompurwokerto.ac.id/files/4.png"
                    alt="Third slide"
                    />

                    
                </Carousel.Item>
            </Carousel>

            
            
            <Row className="pt-1 pb-3">
            <Col md={8}>
            <Card className="bg-white border-0 py-0">
            <Card.Body>
            <Card.Title><h3>Alur Pendaftaran</h3></Card.Title>

            <img src="/images/alur_daftar.png" className="img-fluid" width="600" alt="" />

            </Card.Body>
            </Card>

            </Col>
            <Col md={4}>

            <Card className="bg-white border-0 py-0">
            <Card.Body>
            <Card.Title>Masuk</Card.Title>

            <FormLogin />

            </Card.Body>
            </Card>


            </Col>
            </Row>

            </Container>
            </>
        )
    }
}

export default Home
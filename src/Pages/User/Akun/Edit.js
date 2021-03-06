import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import API from '../../../ServiceApi/Index'
import { Helmet } from 'react-helmet'
import ContentLoader from '../../../Components/Loader'
import { Nav,Container, Card, Form, Button, Row, Col } from 'react-bootstrap'
import { NotificationManager } from 'react-notifications'

const TITLE = ' - PMB Universitas Amikom Purwokerto'
class AkunEdit extends Component {
constructor(props) {
super(props)
this.state = {
    id : '',
    nama : '',
    telp: '',
    email:'',
    foto: '',
    file: {
        foto: ''
    },
    imagePreviewUrl: '',
    loading: true,
    url: 'http://localhost/pmbamikompwt-server/assets/img/'
}
this.handlerData = this.handlerData.bind(this)
this.handlerImage = this.handlerImage.bind(this)
this.handlerSubmit = this.handlerSubmit.bind(this)
}


handlerData = (e) => {
this.setState({
    [ e.target.name] : e.target.value
})
}

handlerImage = (e)=>{

this.setState({
    foto: e.target.files[0].name,
    file: {
        foto: e.target.files[0]
    },
    imagePreviewUrl: URL.createObjectURL(e.target.files[0])
})

}

handlerSubmit = (e) =>{
e.preventDefault()
if (this.state.avatar === "") {
    API.PutUser(this.state).then(res=>{
        if (res.status === 1) {
            //this.props.history.push('/akun/profil')
        }
    })
} else {
    API.PostFoto(this.state.file.foto, this.state.file.foto.name).then(res => {
        console.log('img_ok')
    })
    API.PutUser(this.state).then(res=>{
        console.log(res)
        if (res.status === 1) {
            //this.props.history.push('/akun/profil')
            window.location.reload();
        }
    })
}
NotificationManager.success('Berhasil menyimpan data profil');
}


componentDidMount = () => {
const id = this.props.match.params.id
this.setState({
    id : id
})
API.GetUserId(id).then(res=>{
    setTimeout(() => this.setState({
        nama : res.nama,
        telp : res.telp,
        email : res.email,
        foto : res.foto,
        loading: false 
    }), 100);
})
}


render() {

return (
    <>
        <Helmet>
        <title>{ 'Edit Akun' + TITLE }</title>
        </Helmet>

        <Container fluid>

        <Card className="shadow my-3">
            <Card.Body>
            <Row>
                <Col md="3" className="border-right">
                <Nav id="nav" className="flex-column">
                <NavLink className="nav-link" to={'/akun/edit/' + this.state.id} activeClassName="active">Edit Profile</NavLink>
                <NavLink className="nav-link" to={'/akun/password/' + this.state.id} activeClassName="active">Ganti Password</NavLink>
                 
                </Nav>
                </Col>  
                <Col md="9">
                {
                this.state.loading
                ?
                <ContentLoader />
                :
      
                <Form onSubmit={this.handlerSubmit}>
                    
                    <Form.Group as={Row}>
                    <Form.Label column sm={3} className="text-md-right font-weight-bold">Avatar</Form.Label>
                   
                        <Col sm={9}>
                        <Form.File name="foto" onChange={this.handlerImage} />
                        {this.state.imagePreviewUrl ? 
                        <>
                        <img src={this.state.imagePreviewUrl} width="200" alt="" className="mt-2 img-fluid" />    
                        </>
                        :
                        <>
                        </>
                        }
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={3} className="text-md-right font-weight-bold">Nama Lengkap</Form.Label>
                        <Col sm={9}>
                        <Form.Control value={this.state.nama} name="nama" className="text-dark" onChange={this.handlerData} type="text" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                    <Form.Label column sm={3} className="text-md-right font-weight-bold">No Telp/HP</Form.Label>
                    <Col sm={9}>
                        <Form.Control value={this.state.telp} name="telp" className="text-dark" onChange={this.handlerData} type="text" />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}> 
                    <Form.Label column sm={3} className="text-md-right font-weight-bold">E-mail</Form.Label>
                    <Col sm={9}>
                        <Form.Control value={this.state.email} name="email" className="text-dark" onChange={this.handlerData} type="text" />
                        </Col>
                    </Form.Group>
                    
                    <Form.Group as={Row}>
                    <Form.Label column sm={3}></Form.Label>
                    <Col sm={9}>
                    <Button variant="primary" type="submit">Simpan</Button>
                    </Col>

                    </Form.Group>

                </Form>
               
                }
                </Col>
            </Row> 
            </Card.Body>
            </Card>
        </Container>
       
    
    </>
)
}
}

export default AkunEdit
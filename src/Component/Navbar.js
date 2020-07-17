import React,{Component} from 'react'
import {Link,Redirect} from 'react-router-dom'
import PeriksaForm from './Form/PeriksaForm'
import {Button, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import {TextLeft} from 'react-bootstrap-icons'

class NavBar extends Component{
    render(){
        if (sessionStorage.getItem('isLogin')) {
            return(<Redirect to="/user" />)
        }
        if (sessionStorage.getItem('isAdmin')) {
            return(<Redirect to="/admin" />)
        }
        return(  
              
        <Navbar variant="dark" expand="lg" sticky="top" style={{backgroundColor:'#371260'}}>

    <Button type="button" id="sidebarCollapse" className="btn btn-warning">
    <TextLeft size="20" />
    </Button>
              <Navbar.Brand as={Link} to='/'> 
              <img
                src="/logo.png"
                width="180"
                className="d-inline-block align-center"
                alt="Logo"
                />
                
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="mr-auto">
             
             <Nav.Link as={Link} to='/' exact="true">Home</Nav.Link>
             <NavDropdown title="Menu Utama" id="basic-nav-dropdown">
             <NavDropdown.Item href='/page/14'>Jenis Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item href='/page/34'>Syarat Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item href='/page/18'>Prosedur Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item href='/page/30'>Beasiswa</NavDropdown.Item>
             <NavDropdown.Item href='/page/31'>Alur Pendaftaran</NavDropdown.Item>
             <NavDropdown.Item href='/page/19'>Kegiatan Pra Kuliah Mahasiswa Baru</NavDropdown.Item>
             <NavDropdown.Item href='/page/21'>Tata Tertib Penerimaan Mahasiswa Baru</NavDropdown.Item>
             
           </NavDropdown>
           
         
             {/*<Nav.Link as={Link} to='/register'><Button variant="info" size="sm">Daftar</Button></Nav.Link>
             <Nav.Link as={Link} to='/login'><Button variant="warning" size="sm">Masuk</Button></Nav.Link>*/}
             </Nav>
            
            <PeriksaForm />

            <Nav className="ml-auto">
           
            <Nav.Link as={Link} to='/page/33'>FAQ</Nav.Link>
           
            <Nav.Link as={Link} to='/login' className="btn btn-info btn-sm">Daftar/Masuk</Nav.Link>
            </Nav>
           
           
            

              </Navbar.Collapse>
            </Navbar>
            
        )
    }
}

export default NavBar
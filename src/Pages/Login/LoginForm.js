import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import API from '../../ServiceApi/Index'
import { NotificationManager } from 'react-notifications'
import { FormGroup, Spinner } from 'react-bootstrap'
import {BoxArrowInRight,BoxArrowRight} from 'react-bootstrap-icons'
import Form from 'react-formal'
import * as yup from 'yup'
import { logout, isLogin } from '../../Utils'
import ContentLoader from '../../Components/Loader/Loader2'
 
const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  }); 
class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            level: "USER",
            isLogin:false,
            idLogin:"",
            loading: false,
            isloading: true,
            login:false,
            id:"",
            nama:"",
            foto:"",
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this)
        
    }

 
    handlerChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerSubmit = () => {
        this.setState({ loading: true });
        API.PostLogin(this.state).then(res=>{
            setTimeout(() => {
            if (res.id === "1" ) {
                sessionStorage.setItem('isLogin',JSON.stringify(res.data))
                this.setState({
                    isLogin:true,
                    loading: false,
                    idLogin:"1"
                })
                window.location.href = '/user';
                NotificationManager.success('Berhasil masuk sistem');
                
            } else if (res.id === "2" ) {
                sessionStorage.setItem('isAdmin',JSON.stringify(res.data))
                this.setState({
                    isLogin:true,
                    loading: false,
                    idLogin:"2"
                })
                window.location.href = '/admin';
                NotificationManager.success('Berhasil masuk sistem');
                
            } else {
                NotificationManager.warning('Login gagal, periksa username dan password anda');
            }
            }, 100);
        })
        
    }

    Logout = () => {
        logout();
    }

    componentDidMount = () => {
        if (isLogin()) {
           //console.log('LOGIN')
           const data = JSON.parse(sessionStorage.getItem('isLogin'))
                const id = data[0].username
                API.GetUserId(id).then(res=>{
                    this.setState({
                        id : res.username,
                        nama: res.nama,
                        foto: res.foto,
                        isloading: false
                    })
                })
                
        } else {
            this.setState({
                login:true
            })
        }
    }

    render() {
    
        return (
            <>
         {this.state.login ?
            <>
            <Form onSubmit={this.handlerSubmit} schema={schema}>
                    <input type="hidden" name="level" value="USER" />
                    <FormGroup>
                    
                        <Form.Field type="text" name="username" placeholder="Username" errorClass="error" onChange={this.handlerChange} />
                        <Form.Message for="username" className="error" />
                    </FormGroup>
                    <FormGroup>
                 
                        <Form.Field type="password" name="password" placeholder="Password" errorClass="error" onChange={this.handlerChange} />
                        <Form.Message for="password" className="error" />
                    </FormGroup>
                    <Form.Submit type="submit" className="btn btn-primary btn-block">
                        {
                        this.state.loading
                        ?
                       <>
                            <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            /> Memuat...
                       </>
                        :  <><BoxArrowInRight size="20"/> Login</> }</Form.Submit>
                </Form>   
            </>
         :
         <>
            <h5>Anda Login sebagai:</h5>
            { this.state.isloading ?
                <>
                <ContentLoader />
                </>
                :  
                <>
                <h5>{this.state.nama}</h5>
                
                <div className="mb-1"><Link className="btn btn-outline-primary btn-sm" to='/user'>Dashboard</Link></div>
                <div><Link className="btn btn-outline-danger btn-sm" onClick={this.Logout} to=''><BoxArrowRight/> Keluar</Link></div>
                </>    
            }
          
            
         </>

        }
                                
  
            </>
        )
    }

}

export default LoginForm
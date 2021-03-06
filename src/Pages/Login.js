import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/Login.css';
import axios from 'axios';
import Footer from '../Components/Footer'
import Navjs from '../Components/Navbar'
export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            users: [],
            usuario: "",
            contraseña: "",
            encontro: ""
        }
    }
    onChangeUsuario = (e) => {
        this.setState({
            usuario: e.target.value
        })
    }
    onChangeContraseña = (e) => {
        this.setState({
            contraseña: e.target.value
        })
    }
    async componentDidMount() {
        const res = await axios.get('https://cioscar-backend.herokuapp.com/api/users/');
        this.setState({ users: res.data });
    }
    onSubmitLogin = async e => {
        e.preventDefault();
        this.setState({ encontro: false })
        this.state.users.map(users => {
            if (!this.state.encontro && users.usuario === this.state.usuario && users.contraseña === parseInt(this.state.contraseña)) {
                this.setState({ encontro: true })
               // window.location.href = 'http://localhost:3000/'
                return true
            } else {
                return false
            }
            return null
        })
        if (this.state.encontro) {
            alert("Bienvenido")
            window.location.href = 'http://localhost:3000/'
        } else {
            alert("usuario y/o contraseña incorrecta")
        }


    }
    render() {
        return (
            <div>
                <Navjs ></Navjs>
                <div className="login-page" >
                    <div className="form">
                        <h2 className="fs-title">Ingresa</h2>
                        <form className="login-form" onSubmit={this.onSubmitLogin}>
                            <input type="text" placeholder="Usuario" onChange={this.onChangeUsuario} />
                            <input type="password" placeholder="Contraseña" onChange={this.onChangeContraseña} />
                            <button type="submit">login</button>
                            <p className="message">No estas registrado?<Link to="/Register">Crea una cuenta</Link></p>
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

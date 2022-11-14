import React, { Component } from 'react'
import Backdrop from '../../UI/Backdrop/Backdrop' 
import styles from './Drawer.module.css'
import { NavLink } from 'react-router-dom'

const links = [
    {to: '/', label: 'List of tests', exact: 1},
    {to: '/auth', label: 'Authorization', exact: 0},
    {to: '/quiz-creator', label: 'Create test', exact: 0}
]
class Drawer extends Component {
    clickHandler = () => {
        this.props.onClose()
    }
    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to = {link.to}
                        exact = {link.exact}
                        //activeclassname={styles.active}
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        const cls = [styles.Drawer]
        if (!this.props.isOpen) {
            cls.push(styles.close)
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                        <ul>
                            {this.renderLinks()}
                        </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer
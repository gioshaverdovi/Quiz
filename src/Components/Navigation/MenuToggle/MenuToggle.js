import React from 'react'
import styles from './MenuToggle.module.css'
import {FaBars} from 'react-icons/fa'
import {IoCloseSharp} from 'react-icons/io5'
import  open from '../../Sound/open.wav'
import  close from '../../Sound/close.wav'


const MenuToggle = props => {
    const cls = [
        styles.MenuToggle
    ]
    const cls2 = [
        styles.MenuToggle
    ]
    const toggleMenu =  () => {
        props.onToggle();
        var start = new Audio(open);
        var stop = new Audio (close);
        if (!props.isOpen){
            console.log(stop);
            start.play();
        } else { 
            stop.play();
        }
    }
    if (props.isOpen) {
        cls.push(styles.open)
        cls.push(styles.hide)
        cls2.push(styles.open)
        cls2.push(styles.unhide)
    } else {
        cls2.push(styles.hide) 
    }
  return (
    <React.Fragment>
        <FaBars
            className={cls.join(' ')}
            onClick={props.onToggle}
         />
        <IoCloseSharp
            className={cls2.join(' ')}
            onClick={props.onToggle}
        />
    </React.Fragment>
  )
}

export default MenuToggle
import classNames from "classnames/bind";
import styles from './pagination.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Pagination({ total = [], state, setState }) {

    function next(){
        if(state !== total.length){
            setState(state + 1)
        }
    }

    function prev(){
        if(state !== 1){
            setState(state - 1)
        }
    }

    return ( 
        <div className={cx('wapper')}>
        <div onClick={prev} className={cx('item', 'icon', { 'hiden': state === 1 })}><FontAwesomeIcon icon={faCaretLeft}/></div>
            {
                total.map((item, index)=>(
                    <div onClick={()=>setState(item)} className={cx('item', {'active': state === item})} key={index}>{item}</div>
                ))
            }
        <div onClick={next} className={cx('item', 'icon', { 'hiden': state === total[total.length-1] })}><FontAwesomeIcon icon={faCaretRight}/></div>
        </div>
     );
}

export default Pagination;
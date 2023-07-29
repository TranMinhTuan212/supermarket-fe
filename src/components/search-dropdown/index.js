import classNames from "classnames/bind";
import styles from './search-dropdown.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const cx = classNames.bind(styles)

function SearchDropdown({ data = [], setState = ()=>{}, topic = '' }) {

    const selectRef = useRef()

    function handleSelect(){
        selectRef.current.click()
    }

    return ( 
        <div className={cx('wapper')}>
        <div onClick={handleSelect} className={cx('icon')}>
            <FontAwesomeIcon icon={faChevronDown}/>
        </div>
            <select ref={selectRef} className={cx('select')} onChange={(e=>setState(e.target.value))}>
            <option value={''}>{topic}</option>
                {
                    data.map((item, index)=>(
                        <option key={index} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
        </div>
     );
}

export default SearchDropdown;
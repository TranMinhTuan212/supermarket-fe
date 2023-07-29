import classNames from "classnames/bind";
import styles from './status-tem.module.scss'
import { PRODUCT_STATUS } from "~/enum";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function StatusTem({ status = '' }) {

    const [active, setActive] = useState({})

    useEffect(()=>{
        switch(status){
            case PRODUCT_STATUS.INTERRUPTIVE:
                setActive({ content: 'Ngưng bán', style: 'INTERRUPTIVE' })
                break 
            case PRODUCT_STATUS.ON_SALE:
                setActive({ content: 'Đang bán', style: 'ON_SALE' })
                break
            case PRODUCT_STATUS.OUT_OF_STOCK:
                setActive({ content: 'Hết hàng', style: 'OUT_OF_STOCK' })
                break
            case PRODUCT_STATUS.WAITING_APPROVE:
                setActive({ content: 'Chờ phê duyệt', style: 'WAITING_APPROVE' })
                break
            default:
                setActive({ content: '', style: '' })
        }
    }, [status])

    return ( 
        <div className={cx('wapper', active.style)}>
        <FontAwesomeIcon icon={faMedal}/>
        <div className={cx('text')}>{active.content}</div>
        </div>
     );
}

export default StatusTem;
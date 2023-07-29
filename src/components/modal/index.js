import classNames from "classnames/bind";
import styles from './modal.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)

function Modal({type = false, content}) {
    return ( 
        <div className={cx('wapper')}>
            <div className={cx('modal-icon')}>
                {
                    type === true ? <FontAwesomeIcon icon={faCircleCheck}/> : <FontAwesomeIcon icon={faCircleExclamation}/>
                }
            </div>
            <div className={cx('modal-content')}>
                {content}
            </div>
        </div>
     );
}

export default Modal
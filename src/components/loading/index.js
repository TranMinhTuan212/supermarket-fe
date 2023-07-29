import classNames from "classnames/bind"
import styles from './loading.module.scss'

const cx = classNames.bind(styles)


function Loading() {
    return ( 
        <div className={cx('wapper')}>
            <div className={cx('loader')}>    .</div>
        </div>
     );
}

export default Loading
import classNames from "classnames/bind";
import styles from './button.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles)

function Button({
    text = false,
    icon = false,
    onSubmit = ()=>{},
    large = false,
    outlinePrimary = false,
    outlineDanger = false,
    danger = false,
    textButton = false,
    topicButton = false,
    backgroundDark = false,
    backgroundLight = false
}) {
        
    const classnames = cx('wapper',{ backgroundLight, backgroundDark, large, outlinePrimary, danger, outlineDanger, textButton, topicButton})

    return (
        <div onClick={onSubmit} className={classnames}>
            { icon && <span className={cx('icon')}><FontAwesomeIcon icon={icon}/></span> }
            <button className={cx('my-button')}>{text}</button>
        </div>
     );
}

export default Button
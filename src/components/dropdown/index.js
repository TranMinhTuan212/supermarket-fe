import styles from './dropdown.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

function Dropdown({data = [], topic = '', setState = ()=>{}, setRef = false, resetRef = false}) {

    function handleInput(e){
        setRef.current.textContent = ''
        setState(e.target.value)
    }


    return ( 
        <div className={cx('wapper')}>
            <span className={cx('topic')}>{topic}</span> <br/>
            <select ref={resetRef} onChange={(e)=>handleInput(e)} className={cx('select')}>
                <option value={''}>-- {topic} --</option>
                {
                    data.map((item, index)=>(
                        <option key={index} value={item.id}>{item.name}</option>
                    ))
                }
            </select> 
            <span ref={setRef} className={cx('message')}></span>
        </div>
     );
}

export default Dropdown
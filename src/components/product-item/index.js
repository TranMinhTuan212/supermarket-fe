import classNames from "classnames/bind";
import styles from './product-item.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { apiLink, imageLink, userKey } from "~/key";
import Button from "../button";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useGlobalState } from "~/provider/useGlobalState";
import { setOrder, setPoPup } from "~/provider/action";
import { pages } from "~/config";

const cx = classNames.bind(styles)

function ProductItem({ product}) {

    const [, dispatch] = useGlobalState()
    const navigate = useNavigate()

    function handleOrder(e, id){
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem(userKey))
        if(!user){
            localStorage.setItem(userKey, null)
            dispatch(setPoPup({ type: false, text: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại !' }))
            navigate(pages.login)
        }
        const headers = {
            Authorization: `Bearer ${user.accessToken}`
        }
        axios.get(`${apiLink}product/detail/${id}`, { headers })
        .then(response => {
            if(response.data.status === 200){
                dispatch(setOrder(response.data.data))
            }else{
                dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
            }
        })
        .catch(e => dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' })))
    }

    return ( 
        <Link to={`/detail/${product.id}`} className={cx('wapper')}>
            <div className={cx('product')}>
                <div className={cx('photo')}>
                    <img className={cx('photo-full')} src={imageLink + product.image} alt=""/>
                </div>
                <div className={cx('content', 'mt-4', 'mb-1')}>
                    <div className={cx('fw-bold', 'text', 'fs-3')}>{product.name}</div>
                    <div className={cx('text')}>{product.user.name}</div>
                    <div className={cx('text', 'mb-1')}>{product.price}</div>
                    <div className={cx('button')}><Button onSubmit={(e)=>handleOrder(e, product.id)} icon={faCartShopping } text="Thêm vào giỏ hàng"/></div>
                </div>
            </div>
        </Link>
     );
}

export default ProductItem;
import classNames from "classnames/bind";
import styles from "./order-box.module.scss";
import { useGlobalState } from "~/provider/useGlobalState";
import { apiLink, imageLink, userKey } from "~/key";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Button from "../button";
import { setLoading, setOrder, setPoPup } from "~/provider/action";
import axios from "axios";

const cx = classNames.bind(styles);

function OrderBox() {
  const [state, dispatch] = useGlobalState();
  const [quantity, setQuantity] = useState(1);

  function handleQuantity(e) {
    if(!isNaN(e.target.value)){
        setQuantity(e.target.value);
    }
  }

  function reducerQuantity(e) {
    if (quantity > 1) {
      setQuantity((e) => e - 1);
    }
  }

  function increaseQuantity(e) {
    setQuantity((e) => e + 1);
  }

  function handleSubmit(){
    if(quantity < 1){
        return dispatch(setPoPup({ type: false, text: 'Vui lòng nhập số lượng' }))
    }

    const user = JSON.parse(localStorage.getItem(userKey))
    const headers = {
        Authorization: `Bearer ${user.accessToken}`
    }

    const data = {
        quantity: quantity,
        barcode: state.order.barcode,
        discount: state.order.discount,
        name: state.order.name,
        categoryId: state.order.categoryId,
        description: state.order.description,
        price: state.order.price * quantity,
        image: state.order.image,
        supplierId: state.order.user.id
    }

    dispatch(setLoading(true))
    axios.post(`${apiLink}product/add-cart`, data, { headers })
    .then(response => {
        if(response.data.status === 200){
            dispatch(setPoPup({ type: true, text: 'Thêm vào giỏ hàng thành công !' }))
        }else{
            if(response.data.status === 500){
                dispatch(setPoPup({ type: false, text: response.data.message }))
            }else{
              dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
            }
        }
        dispatch(setOrder(null))
        dispatch(setLoading(false))
    })
    .catch((e)=>{
        if(e.response && e.response.status === 401){
          dispatch(setPoPup({ type: false, text: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' }))
        }else{
          dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
        }
        dispatch(setOrder(null))
        dispatch(setLoading(false))
    })
  }

  return (
    <div className={cx("wapper")}>
      <div className={cx("d-flex")}>
        <div className={cx("product")}>
          <div className={cx("photo")}>
            <img
              className={cx("photo-full")}
              src={imageLink + state.order.image}
              alt=""
            />
          </div>
          <div className={cx("content", "mt-4", "mb-1")}>
            <div className={cx("fw-bold", "text", "fs-3")}>
              {state.order.name}
            </div>
            <div className={cx("text")}>{state.order.user.name}</div>
            <div className={cx("text", "mb-1")}>{state.order.price}</div>
          </div>
          <div className={cx("count-button")}>
            <div onClick={(e) => reducerQuantity(e)} className={cx("btn")}>
              <FontAwesomeIcon icon={faCaretLeft} />
            </div>
            <input className={cx('counter')} onChange={(e) => handleQuantity(e)} value={quantity} />
            <div
              onClick={(e) => increaseQuantity(e)}
              className={cx("btn")}
            >
              <FontAwesomeIcon icon={faCaretRight} />
            </div>
          </div>
        </div>
        <div className={cx("info")}>
            <div className={cx('info-item')}>Tên sản phẩm : {state.order.name}</div>
            <div className={cx('info-item')}>Mã sản phẩm : {state.order.barcode}</div>
            <div className={cx('info-item')}>Tên số lượng : {quantity}</div>
            <div className={cx('info-item')}>Chi tiết sản phẩm : {state.order.description}</div>
            <div className={cx('info-item')}>Danh mục  : {state.order.category.name}</div>
            <div className={cx('info-item')}>Nhà cung cấp  : {state.order.user.name}</div>
            <div className={cx('option')}>
                <Button onSubmit={handleSubmit} text="Xác nhận"/>
                <Button onSubmit={()=>dispatch(setOrder(null))} danger text="Hủy bỏ"/>
            </div>
        </div>
      </div>
    </div>
  );
}

export default OrderBox;

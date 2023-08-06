import classNames from "classnames/bind";
import styles from './table-cart.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { apiLink, imageLink, userKey } from "~/key";
import Button from "../button";
import { useGlobalState } from "~/provider/useGlobalState";
import { setLoading, setPoPup, setRender } from "~/provider/action";
import axios from "axios";
import { pages } from "~/config";
import { useState } from "react";
import { checkExistsInArray } from "~/utils";

const cx = classNames.bind(styles)

function TableCart({ data = [], to = "" }) {

    const [, dispatch] = useGlobalState()
    const navigate = useNavigate()
    const [orderItems, setOrderItems] = useState([])

    function handleDelete(id){
        const user = JSON.parse(localStorage.getItem(userKey))
        if(!user){
            localStorage.setItem(userKey, null)
            dispatch(setPoPup({ type: false, text: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' }))
            navigate(pages.login)
        }
        const headers = {
            Authorization: `Bearer ${user.accessToken}`
        }
        dispatch(setLoading(true))
        axios.delete(`${apiLink}product/delete-cart/${id}`, { headers })
        .then(response => {
            if(response.data.status === 200){
                dispatch(setPoPup({ type: true, text: response.data.message }))
                dispatch(setRender())
            }else{
                if(response.data.status === 500){
                  dispatch(setPoPup({ type: false, text: response.data.message }))
                }else{
                  dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau' }))
                }
            }
            dispatch(setLoading(false))
        })
        .catch((error)=>{
            if(error.response && error.response.status === 401){
                localStorage.setItem(userKey, null)
                dispatch(setPoPup({ type: false, text: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại' }))
                navigate(pages.login)
            }else{
              dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau' }))
            }
            dispatch(setLoading(false))
        })
    }

    function handleSelecProduct(product){
      if(checkExistsInArray(orderItems, product)){
        const newOrderItems = orderItems.filter((pro)=> pro.id !== product.id)
        setOrderItems(newOrderItems)
      }else{
        setOrderItems(e => [...e, product])
      }
    }

    function handleOrder(){
      console.log(orderItems)
    }

    return ( 
        <div className={cx("wapper")}>
      <table>
        <thead>
          <tr>
            <th>Chọn</th>
            <th>Sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Nhà cung cấp</th>
            <th>Số lượng</th>
            <th>Giá</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index}>
            <td>
              <input onChange={()=>handleSelecProduct(product)} value={product} type="checkbox"/>
            </td>
              <td>
                <div className={cx('photo')}>
                    <img className={cx('photo-item')} src={`${imageLink + product.image}`} alt="ảnh"/>
                </div>
              </td>
              <td>
                <Link className={cx("remove-style")} to={to + `/${product.id}`}>
                  {product.name}
                </Link>
              </td>
              <td>
                <Link className={cx("remove-style")} to={to + `/${product.id}`}>
                  {product.supplier.name}
                </Link>
              </td>
              <td>
                <Link className={cx("remove-style")} to={to + `/${product.quantity}`}>
                  {product.quantity}
                </Link>
              </td>
              <td>
                <Link className={cx("remove-style")} to={to + `/${product.id}`}>
                  {product.price}
                </Link>
              </td>
              <td>
                <Button onSubmit={()=>handleDelete(product.id)} danger text="Xóa"/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={cx('d-flex', 'justify-content-end', 'mt-5')}><Button onSubmit={handleOrder} text='Đặt hàng'/></div>
    </div>
     );
}

export default TableCart;
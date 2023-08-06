import classNames from "classnames/bind";
import styles from './cart.module.scss'
import { useGlobalState } from "~/provider/useGlobalState";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLink, userKey } from "~/key";
import { pages } from "~/config";
import { setLoading, setPoPup } from "~/provider/action";
import axios from "axios";
import Button from "~/components/button";
import SearchDropdown from "~/components/search-dropdown";
import TableCart from "~/components/table-cart";

const cx = classNames.bind(styles)

function Cart() {
    const [state, dispatch] = useGlobalState();
  const [products, setProduct] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [categories, setCategories] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(userKey));
    if (!user) {
      return navigate(pages.login);
    }
    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
    };
    dispatch(setLoading(true));
      Promise.all([
        axios.get(`${apiLink}user/get-all-supplier`, { headers }),
        axios.get(`${apiLink}category/get-all-category`, { headers }),
      ]).then(([responseSupplier, responseCategory]) => {
        if (
          responseSupplier.data.status !== 200 ||
          responseCategory.data.status !== 200
        ) {
          dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
        } else {
          setSupplier(responseSupplier.data.data);
          setCategories(responseCategory.data.data);
        }
        dispatch(setLoading(false));
      })
      .catch((error)=>{
        if (error.response && error.response.status === 401) {
          localStorage.setItem(userKey, null);
          navigate(pages.login);
          dispatch(setPoPup({ type: false, text: 'phiên đăng nhập đã hết hạn vui lòng đăng nhập lại !' }))
        } else {
          dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
        }
        dispatch(setLoading(false));
      })
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem(userKey));
    if (!user) {
      return navigate(pages.login);
    }
    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
    };
    dispatch(setLoading(true));
    const data = {}
      data.supplierId = supplierId;
      data.categoryId = categoryId;
    try {
      axios
        .get(apiLink + "product/get-cart", { headers, params: data } )
        .then((response) => {
          if (response.data.status === 200) {
            setProduct(response.data.data);
          } else {
            dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
          }
          dispatch(setLoading(false));
        });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.setItem(userKey, null);
        navigate(pages.login);
        dispatch(setPoPup({ type: false, text: "phiên đăng nhập đã hết hạn vui lòng đăng nhập lại !" }))
      } else {
        dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
      }
      dispatch(setLoading(false));
    }
  }, [supplierId, categoryId, state.render]);

  return (
    <div className={cx("wapper")}>
      <div className={cx("header")}>
        <Button topicButton large text="Danh sách giỏ hàng" />
      </div>

      <div className={cx("search")}>
        <SearchDropdown
          setState={setSupplierId}
          data={supplier}
          topic="Nhà cung cấp"
        />
        <SearchDropdown setState={setCategoryId} data={categories} topic="Danh mục sản phẩm" />
        
      </div>

      <div className={cx("list")}>
        <TableCart to={"/detail"} data={products} />
      </div>

    </div>
  );
}

export default Cart;
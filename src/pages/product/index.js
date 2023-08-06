import classNames from "classnames/bind";
import styles from "./product.module.scss";
import SearchDropdown from "~/components/search-dropdown";
import { useState } from "react";
import { useGlobalState } from "~/provider/useGlobalState";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { apiLink, userKey } from "~/key";
import { pages } from "~/config";
import { setLoading, setPoPup } from "~/provider/action";
import axios from "axios";
import ProductItem from "~/components/product-item";
import { useRef } from "react";
import Pagination from "~/components/pagination";
  
const cx = classNames.bind(styles);

function Product() {
  const [supplier, setSupplier] = useState([]);
  const [categories, setCategories] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [products, setProducts] = useState([])
  const [state, dispatch] = useGlobalState();
  const [currentPage, setCurrentPage] = useState(1)
  const [page, setPage] = useState(true)
  const navigate = useNavigate();

  const arrPage = useRef([])

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
    ])
      .then(([responseSupplier, responseCategory]) => {
        if (
          responseSupplier.data.status !== 200 ||
          responseCategory.data.status !== 200
        ) {
          dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau' }))
        } else {
          setSupplier(responseSupplier.data.data);
          setCategories(responseCategory.data.data);
        }
        dispatch(setLoading(false));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.setItem(userKey, null);
          navigate(pages.login);
          dispatch(setPoPup({ type: false, text: "phiên đăng nhập đã hết hạn vui lòng đăng nhập lại !" }))
        } else {
          dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau' }))
        }
        dispatch(setLoading(false));
      });
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
    const data = { page: currentPage };
    if (!isNaN(+supplierId) || !isNaN(Number(supplierId))) {
      data.supplierId = supplierId;
    }
    if (!isNaN(+categoryId) || !isNaN(Number(categoryId))) {
      data.categoryId = categoryId;
    }
    try {
      axios
        .get(apiLink + "product", { headers, params: data })
        .then((response) => {
          if (response.data.status === 200) {
            setProducts(response.data.data);
            arrPage.current = response.data.pagination.total
          } else {
            dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau' }))
          }
          dispatch(setLoading(false));
        });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.setItem(userKey, null);
        navigate(pages.login);
        dispatch(setPoPup({ type: false, text: "phiên đăng nhập đã hết hạn vui lòng đăng nhập lại !" }))
      } else {
        dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau' }))
      }
      dispatch(setLoading(false));
    }
  }, [supplierId, categoryId, page, state.render, currentPage]);

  return (
    <div className={cx("wapper")}>
      <div className={cx("header")}>
        <h1 className={cx("header-topic")}>Mua Sắm</h1>
        <div className={cx("search")}>
          <SearchDropdown
            setState={setSupplierId}
            data={supplier}
            topic="Nhà cung cấp"
          />
          <SearchDropdown
            setState={setCategoryId}
            data={categories}
            topic="Danh mục sản phẩm"
          />
        </div>
      </div>
      <div className={cx("content")}>

      {
        products.map((product, index)=>(
          <ProductItem product={product} key={index}/>
        ))
      }
        
      </div>
      {
          arrPage.current.length > 1 && <div className={cx('pagination')}>
          <Pagination total={arrPage.current} state={currentPage} setState={setCurrentPage} />
        </div>
        }
    </div>
  );
}

export default Product;

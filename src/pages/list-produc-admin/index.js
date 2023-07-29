import classNames from "classnames/bind";
import styles from "./list-product-admin.module.scss";
import Button from "~/components/button";
import SearchDropdown from "~/components/search-dropdown";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiLink, userKey } from "~/key";
import Table from "~/components/table";
import { useGlobalState } from "~/provider/useGlobalState";
import { setLoading } from "~/provider/action";
import { useNavigate } from "react-router-dom";
import { pages } from "~/config";
import { PRODUCT_STATUS } from "~/enum";
import Pagination from "~/components/pagination";

const cx = classNames.bind(styles);

function ListProductAdmin() {
  const [state, dispatch] = useGlobalState();
  const [currentPage, setCurrentPage] = useState(1)
  const [page, setPage] = useState(true)
  const [status, setStatus] = useState('')
  const [products, setProduct] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [categories, setCategories] = useState([]);
  const [supplierId, setSupplierId] = useState("");
  const [categoryId, setCategoryId] = useState("");

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
      ]).then(([responseSupplier, responseCategory]) => {
        if (
          responseSupplier.data.status !== 200 ||
          responseCategory.data.status !== 200
        ) {
          alert("Có lỗi, vui lòng thử lại !");
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
          alert("phiên đăng nhập đã hết hạn vui lòng đăng nhập lại !");
        } else {
          alert("Có lôi, thử lại sau");
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
    const data = { page: currentPage };
    if (!isNaN(+supplierId) || !isNaN(Number(supplierId))) {
      data.supplierId = supplierId;
    }
    if (!isNaN(+categoryId) || !isNaN(Number(categoryId))) {
      data.categoryId = categoryId;
    }
    if (status === PRODUCT_STATUS.WAITING_APPROVE) {
      data.status = status;
    }
    try {
      axios
        .get(apiLink + "product", { headers, params: data })
        .then((response) => {
          if (response.data.status === 200) {
            setProduct(response.data.data);
            arrPage.current = response.data.pagination.total
          } else {
            alert("Có lỗi, vui lòng thử lại sau");
          }
          dispatch(setLoading(false));
        });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.setItem(userKey, null);
        navigate(pages.login);
        alert("phiên đăng nhập đã hết hạn vui lòng đăng nhập lại !");
      } else {
        alert("Có lỗi, thử lại sau");
      }
      dispatch(setLoading(false));
    }
  }, [supplierId, categoryId, page, state.render, currentPage]);

  function allProduct(){
      setPage(true)
      setCurrentPage(1)
      setStatus('')
    }
  
    function approve(){
      setPage(false)
      setCurrentPage(1)
      setStatus(PRODUCT_STATUS.WAITING_APPROVE)
    }

  return (
    <div className={cx("wapper")}>
      <div className={cx("header")}>
        <Button onSubmit={allProduct} backgroundDark={!page} topicButton large text="Danh sách sản phẩm" />
        <Button onSubmit={approve} backgroundDark={page} topicButton large text="Phê duyệt sản phẩm" />
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
        <Table to={"/detail"} data={products} />
      </div>

        {
          arrPage.current.length > 1 && <div className={cx('pagination')}>
          <Pagination total={arrPage.current} state={currentPage} setState={setCurrentPage} />
        </div>
        }

    </div>
  );
}

export default ListProductAdmin;

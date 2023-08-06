import classNames from "classnames/bind";
import styles from "./table.module.scss";
import { renderStatus } from "~/utils";
import { Link, useNavigate } from "react-router-dom";
import Button from "../button";
import { PRODUCT_STATUS } from "~/enum";
import { useGlobalState } from "~/provider/useGlobalState";
import { setLoading, setPoPup, setRender } from "~/provider/action";
import axios from "axios";
import { apiLink, userKey } from "~/key";
import { pages } from "~/config";

const cx = classNames.bind(styles);

function Table({ data = [], to = "" }) {
  const [, dispatch] = useGlobalState();

  const navigate = useNavigate();

  function handleApprove(id) {
    const user = JSON.parse(localStorage.getItem(userKey));
    if (!user) {
      return navigate(pages.login);
    }
    const headers = {
      Authorization: `Bearer ${user.accessToken}`
    };
    const data = {
      id: id
    }
    dispatch(setLoading());
      axios
        .put(apiLink + `product/approve-product/`, data, { headers })
        .then((response) => {
          if (response.data.status === 200) {
            dispatch(setRender())
            dispatch(setPoPup({ type: true, text: 'Phê duyệt thành công !' }))
          } else {
            dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
          }
          dispatch(setLoading(false));
        })
        .catch((error)=>{
          if (error.response && error.response.status === 401) {
            localStorage.setItem(userKey, null);
            navigate(pages.login);
            dispatch(setPoPup({ type: false, text: "phiên đăng nhập đã hết hạn vui lòng đăng nhập lại !" }))
          } else {
            dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
          }
          dispatch(setLoading(false));
        })
  }

  return (
    <div className={cx("wapper")}>
      <table>
        <thead>
          <tr>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Danh mục</th>
            <th>Nhà cung cấp</th>
            <th>Giá bán lẻ</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>
                <Link className={cx("remove-style")} to={to + `/${product.id}`}>
                  {product.name}
                </Link>
              </td>
              <td>
                <Link className={cx("remove-style")} to={to + `/${product.id}`}>
                  {product.category.name}
                </Link>
              </td>
              <td>
                <Link className={cx("remove-style")} to={to + `/${product.id}`}>
                  {product.user.name}
                </Link>
              </td>
              <td>
                <Link className={cx("remove-style")} to={to + `/${product.id}`}>
                  {product.price}
                </Link>
              </td>
              <td>
                {product.status === PRODUCT_STATUS.WAITING_APPROVE ? (
                  <Button
                    onSubmit={() => handleApprove(product.id)}
                    outlineDanger
                    text={renderStatus(product.status)}
                  />
                ) : (
                  renderStatus(product.status)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;

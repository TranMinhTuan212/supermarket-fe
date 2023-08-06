import classNames from "classnames/bind";
import styles from "./detail.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import Input from "~/components/input";
import Button from "~/components/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiLink, imageLink, userKey } from "~/key";
import { useGlobalState } from "~/provider/useGlobalState";
import { setLoading, setPoPup } from "~/provider/action";
import StatusTem from "~/components/status-tem";
import { pages } from "~/config";
import { ROLE } from "~/enum";

const cx = classNames.bind(styles);

function Detail() {
  const param = useParams();
  const [product, setProduct] = useState({
    user: { name: "" },
    name: "",
    category: { name: "" },
    price: "",
    description: "",
    discount: "",
    status: "",
    image: "",
  });
  const [, dispatch] = useGlobalState();
  const navigate = useNavigate();

  
  const user = JSON.parse(localStorage.getItem(userKey));

  useEffect(() => {
    if (!user) {
      navigate(pages.login);
      dispatch(setPoPup({ type: false, text:  "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại !"}))
    }
    const headers = {
      Authorization: `Bearer ${user.accessToken}`,
    };
    dispatch(setLoading(false));

    axios
      .get(`${apiLink}product/detail/${param.id}`, { headers })
      .then((response) => {
        if (response.data.status === 200) {
          response.data.data && setProduct(response.data.data);
        } else {
          dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
        }
        dispatch(setLoading(false));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          dispatch(setLoading(false));
          localStorage.setItem(userKey, null);
          navigate(pages.login);
          dispatch(setPoPup({ type: false, text:  "Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại !"}))
        } else {
          dispatch(setPoPup({ type: false, text: 'Có lỗi, thử lại sau !' }))
        }
        dispatch(setLoading(false));
      });
  }, []);

  return (
    <div className={cx("wapper")}>
      <div className={cx("col-md-3 px-2")}>
        <div className={cx("photo")}>
          <img
            className={cx("photo-demo")}
            src={imageLink + product.image}
            alt=""
          />
          <input type="file" name="file" hidden />
        </div>
        <span
          className={cx(
            "text-danger",
            "d-block",
            "px-3",
            "mt-2",
            "fs-4",
            "text-center"
          )}
        ></span>
        <h5 className={cx("text-center", "mt-3")}>
          <StatusTem status={product.status} />
        </h5>
      </div>
      <div className={cx("col-md-9", " px-2", "ps-5")}>
        <h2 className={cx("fw-bold", "fs-1", "mb-5")}>Thông tin sản phẩm</h2>

        <div className={cx("input-wapper")}>
          <Input state={product.name} small topic={"Tên sản phẩm"} disabled />
          <Input state={product.barcode} small topic={"Mã sản phẩm"} disabled />
          <Input
            state={`${product.price}`}
            small
            type="number"
            topic={"Giá sản phẩm"}
            disabled
          />
          <Input
            state={`${product.user.name}`}
            small
            type="text"
            topic={"Nhà cung cấp"}
            disabled
          />
          <Input
            state={`${product.category.name}`}
            small
            type="text"
            topic={"Danh mục"}
            disabled
          />
          <Input
            state={`${product.description}`}
            small
            type="text"
            topic={"Mô tả"}
            disabled
          />
          <Input
            state={`${product.discount}`}
            small
            topic={"Chiết khấu (%)"}
            disabled
          />
        </div>
        {
          user.role === ROLE.SUPPLIER ? <Button icon={""} text="Sửa" /> : ''
        }
      </div>
    </div>
  );
}

export default Detail;

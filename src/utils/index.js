

const { PRODUCT_STATUS } = require("~/enum");


function renderStatus(status){
    switch (status) {
        case PRODUCT_STATUS.INTERRUPTIVE:
            return 'Ngưng bán'
        case PRODUCT_STATUS.ON_SALE:
            return 'Đang bán'
        case PRODUCT_STATUS.OUT_OF_STOCK:
            return 'Hết hàng'
        case PRODUCT_STATUS.WAITING_APPROVE:
            return 'Phê duyệt'
    
        default:
            break;
    }
}

export { renderStatus }
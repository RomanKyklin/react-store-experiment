import _ from "lodash";

export const handleChangeTitle = (event, setTitle) => {
    setTitle(_.get(event, 'target.value', ''));
};

export const handleChangePurchasePrice = (event, setPurchasePrice) => {
    setPurchasePrice(_.get(event, 'target.value', ''));
};

export const handleChangeSellingPrice = (event, setSellingPrice) => {
    setSellingPrice(_.get(event, 'target.value', ''));
};

export const handleChangeCategory = (id, setCategoryId) => {
    setCategoryId(id);
};

export const handleVisible = (isVisible, setVisible) => {
  setVisible(isVisible);
};



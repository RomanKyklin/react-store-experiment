import _ from "lodash";

export const handleChangeField = setField => event => setField(_.get(event, 'target.value', ''));

export const handleChangeCategory = (id, setCategoryId) => {
    setCategoryId(id);
};

export const handleVisible = (isVisible, setVisible) => {
  setVisible(isVisible);
};



import React, {useState, useEffect} from "react";
import {Form, Icon, Input, Button, Col, Row, Select, Alert} from 'antd';
import axios from "axios";

const {Option} = Select;
var _ = require('lodash');


const GET_CATEGORIES_URL = 'http://localhost:3000/categories';
const CREATE_PRODUCTS_URL = 'http://localhost:3000/products';
const HOME_URL = 'http://localhost:3001/';

export default () => {
    const [{
        isError,
        errorMessage,
        isLoading,
        categories,
        title,
        selling_price,
        purchase_price,
        category_id,
    }, setState] = useState({
        isError: false,
        errorMessage: '',
        isLoading: true,
        categories: [],
        title: '',
        selling_price: '',
        purchase_price: '',
        category_id: '',
    });

    useEffect(() => {
        axios.get(GET_CATEGORIES_URL)
            .then(response => {
                const categories = _.get(response, 'data', []);

                if (!_.isArray(categories)) {
                    setState(currentState => ({...currentState, isError: true, isLoading: false}));
                    return;
                }
                setState(currentState => ({...currentState, categories, isLoading: false}));
            })
            .catch(error => {
                console.log(error);
                setState(currentState => ({...currentState, isError: true, isLoading: false}));
            });
    }, []);

    const handleForm = (event) => {
        event.preventDefault();
        if (title.trim().length === 0 || selling_price.trim().length === 0 || purchase_price.trim().length === 0
            || category_id.trim().length === 0) {
            setState(currentState => ({...currentState, isError: true, errorMessage: 'Поля заполнены некорректно.'}))
        }
        createProduct();
    };

    const handleChangeTitle = (event) => {
        const title = event.target.value;
        setState(currentState => ({...currentState, title}));
    };

    const handleChangeSellingPrice = (event) => {
        const selling_price = event.target.value;
        setState(currentState => ({...currentState, selling_price, isLoading: false}));
    };

    const handleChangePurchasePrice = (event) => {
        const purchase_price = event.target.value;
        setState(currentState => ({...currentState, purchase_price, isLoading: false}));
    };

    const handleChangeCategory = (id) => {
        setState(currentState => ({...currentState, category_id: id, isLoading: false}));
    };

    const createProduct = () => {
        console.log(title + "   " + selling_price + "  " + purchase_price + "  " + category_id);
        axios.post(CREATE_PRODUCTS_URL, {
            title, selling_price, purchase_price, category: category_id
        })
            .then(response => {
                window.location.href = HOME_URL;
            })
            .catch(error => {
                console.log(error);
                setState(currentState => ({
                    ...currentState,
                    isError: true,
                    isLoading: false,
                    errorMessage: 'Произошла ошибка, попробуйте повторить позже'
                }));
            });
    };

    return (
        <Row type="flex" justify="center">
            {
                isError ? <Col span={13} style={{textAlign: 'center'}}>
                    <Alert message={errorMessage} type="error"/>
                </Col> : ''
            }
            <Col style={{textAlign: "center"}} span={13}>
                <Form className="create-product-form" onSubmit={handleForm}>
                    <Form.Item>
                        <Input
                            placeholder="title"
                            onChange={handleChangeTitle}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            type="number"
                            placeholder="selling_price"
                            onChange={handleChangeSellingPrice}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Input
                            type="number"
                            placeholder="purchase_price"
                            onChange={handleChangePurchasePrice}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Select style={{width: 120}} onChange={handleChangeCategory}>
                            {categories.map(category => {
                                return (
                                    <Option key={category._id} value={category._id}>{category.title}</Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Add product
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )

}

//
// export default class AddProduct extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             isError: false,
//             errorMessage: '',
//             isLoading: true,
//             categories: [],
//             title: '',
//             selling_price: '',
//             purchase_price: '',
//             category_id: '',
//         };
//         this.GET_CATEGORIES_URL = 'http://localhost:3000/categories';
//         this.CREATE_PRODUCTS_URL = 'http://localhost:3000/products';
//         this.HOME_URL = 'http://localhost:3001/';
//     }
//
//     componentDidMount() {
//         this.getCategories();
//     }
//
//     handleForm = (event) => {
//         event.preventDefault();
//         const {title = '', selling_price = '', purchase_price = '', category_id} = this.state;
//         if (title.trim().length === 0 || selling_price.trim().length === 0 || purchase_price.trim().length === 0
//             || category_id.trim().length === 0) {
//             this.setState({isError: true, errorMessage: 'Поля заполнены некорректно.'})
//         }
//
//         this.createProduct();
//     };
//
//     handleChangeTitle = (event) => {
//         this.setState({title: event.target.value});
//     };
//
//     handleChangeSellingPrice = (event) => {
//         this.setState({selling_price: event.target.value});
//     };
//
//     handleChangePurchasePrice = (event) => {
//         this.setState({purchase_price: event.target.value});
//     };
//
//     handleChangeCategory = (id) => {
//         this.setState({category_id: id});
//     };
//
//     createProduct = () => {
//         const {title = '', selling_price = '', purchase_price = '', category_id} = this.state;
//         console.log(this.state);
//         axios.post(this.CREATE_PRODUCTS_URL, {
//             title, selling_price, purchase_price, category: category_id
//         })
//             .then(response => {
//                 window.location.href = this.HOME_URL;
//             })
//             .catch(error => {
//                 console.log(error);
//                 this.setState({
//                     isError: true,
//                     isLoading: false,
//                     errorMessage: 'Произошла ошибка, попробуйте повторить позже'
//                 });
//             });
//     };
//
//     getCategories = () => {
//         axios.get(this.GET_CATEGORIES_URL)
//             .then(response => {
//                 const categories = _.get(response, 'data', []);
//
//                 if (!_.isArray(categories)) {
//                     this.setState({isError: true, isLoading: false});
//                     return;
//                 }
//                 this.setState({categories, isLoading: false});
//             })
//             .catch(error => {
//                 console.log(error);
//                 this.setState({isError: true, isLoading: false});
//             });
//     };
//
//     render() {
//         const {isError = false, isLoading = true, categories = [], errorMessage, title = ''} = this.state;
//
//         return (
//             <Row type="flex" justify="center">
//                 {
//                     isError ? <Col span={13} style={{textAlign: 'center'}}>
//                         <Alert message={errorMessage} type="error"/>
//                     </Col> : ''
//                 }
//                 <Col style={{textAlign: "center"}} span={13}>
//                     <Form className="create-product-form" onSubmit={this.handleForm}>
//                         <Form.Item>
//                             <Input
//                                 placeholder="title"
//                                 onChange={this.handleChangeTitle}
//                             />
//                         </Form.Item>
//                         <Form.Item>
//                             <Input
//                                 type="number"
//                                 placeholder="selling_price"
//                                 onChange={this.handleChangeSellingPrice}
//                             />
//                         </Form.Item>
//                         <Form.Item>
//                             <Input
//                                 type="number"
//                                 placeholder="purchase_price"
//                                 onChange={this.handleChangePurchasePrice}
//                             />
//                         </Form.Item>
//                         <Form.Item>
//                             <Select style={{width: 120}} onChange={this.handleChangeCategory}>
//                                 {categories.map(category => {
//                                     return (
//                                         <Option key={category._id} value={category._id}>{category.title}</Option>
//                                     )
//                                 })}
//                             </Select>
//                         </Form.Item>
//                         <Form.Item>
//                             <Button type="primary" htmlType="submit" className="login-form-button">
//                                 Add product
//                             </Button>
//                         </Form.Item>
//                     </Form>
//                 </Col>
//             </Row>
//         )
//     }
// }
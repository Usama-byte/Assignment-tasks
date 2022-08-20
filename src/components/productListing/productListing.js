import React, { useState, useEffect } from "react";
import productData from "../../data/productData.json";
import Table from "react-bootstrap/Table";
import "./productListing.css";

const ProductListing = () => {
  const [product, setProduct] = useState([]);
  const [searchText, setSearchText] = useState(undefined);
  const [previousValues, setPreviousValues] = useState([]);
  const [addFormData, setAddFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    inventoryDate: "",
  });

  console.log(product);
  useEffect(() => {
    const getLocalStorageProduct = window.localStorage.getItem("product") || "[]";
    const productItem = JSON.parse(getLocalStorageProduct);
    if (productItem?.length === 0) {
      setProduct(productData);
      return;
    }
    setProduct(JSON.parse(getLocalStorageProduct));
  }, []);

  useEffect(() => {
    if (!searchText || searchText?.length === "") {
      window.localStorage.setItem("product", JSON.stringify(product));
      setPreviousValues(product);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.length]);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const name = event.target.getAttribute("name");
    const value = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[name] = value;

    setAddFormData(newFormData);
  };

  useEffect(() => {
    if (searchText === undefined) {
      const getLocalStorageProduct = window.localStorage.getItem("product") || "[]";
      // setProduct(JSON.parse(getLocalStorageProduct));
    }
    if (searchText?.length > 0) {
      const filteredProducts = product?.filter((prod) =>
        prod.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setProduct(filteredProducts || []);
    }
  }, [searchText]);

  console.log("Serach text", searchText);

  const handleSearch = (event) => {
    const value = event.target.value;

    if (!value?.length) {
      setSearchText(undefined);
      return;
    }
    setSearchText(value);
  };

  const handleDataSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      id: addFormData.id,
      name: addFormData.name,
      description: addFormData.description,
      price: addFormData.price,
      inventoryDate: addFormData.inventoryDate,
    };

    const newProducts = [...product, newProduct];
    setProduct(newProducts);
  };

  return (
    <>
      <input
        className="input-field"
        type="search"
        name="search"
        placeholder="please enter a text"
        value={searchText}
        onChange={handleSearch}
        defaultValue={undefined}
      />
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>inventoryDate</th>
          </tr>
        </thead>
        {product.map((item) => {
          return (
            <tbody>
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.inventoryDate}</td>
              </tr>
            </tbody>
          );
        })}
      </Table>
      <div className="head-wrapper">Add New Product</div>
      <form className="form-container" onSubmit={handleDataSubmit}>
        <input
          className="input-field"
          type="Number"
          name="id"
          required="required"
          placeholder="Enter Product ID"
          onChange={handleAddFormChange}
        />
        <input
          className="input-field"
          type="text"
          name="name"
          required="required"
          placeholder="Enter Product Name"
          onChange={handleAddFormChange}
        />
        <input
          className="input-field"
          type="text"
          name="description"
          required="required"
          placeholder="Enter Product Description"
          onChange={handleAddFormChange}
        />
        <input
          className="input-field"
          type="text"
          name="price"
          required="required"
          placeholder="Enter Product Price"
          onChange={handleAddFormChange}
        />
        <input
          className="input-field"
          type="text"
          name="inventoryDate"
          required="required"
          placeholder="Enter Product Date"
          onChange={handleAddFormChange}
        />
        <button className="btn-wrapper" type="submit">
          Add
        </button>
      </form>
    </>
  );
};

export default ProductListing;

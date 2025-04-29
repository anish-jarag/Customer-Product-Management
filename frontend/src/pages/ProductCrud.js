import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Badge, Pagination } from "react-bootstrap";
import { FiEdit, FiTrash2, FiPlus, FiCheck, FiX } from "react-icons/fi";

const ProductCrud = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    productCode: "",
    description: "",
    isPublished: false,
  });
  const [currentProduct, setCurrentProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [productToDelete, setProductToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);

  const colors = {
    primaryBrown: "#6b4226",
    lightBeige: "#f8f4e9",
    mediumBeige: "#e8d8c3",
    darkBeige: "#d2c0a5",
    accentBrown: "#8b5a2b",
    textDark: "#3e3e3e",
    textLight: "#ffffff",
  };

  const tableStyles = {
    backgroundColor: colors.lightBeige,
    borderColor: colors.mediumBeige,
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  };

  const headerStyles = {
    backgroundColor: colors.primaryBrown,
    color: colors.textLight,
    fontWeight: "500",
    borderBottom: `1px solid ${colors.accentBrown}`,
  };

  const buttonStyles = {
    primary: {
      backgroundColor: colors.primaryBrown,
      borderColor: colors.primaryBrown,
      fontWeight: "500",
      letterSpacing: "0.5px",
    },
    secondary: {
      backgroundColor: colors.mediumBeige,
      borderColor: colors.darkBeige,
      color: colors.textDark,
      fontWeight: "500",
    },
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        process.env.REACT_APP_BASE_URL +
          `/api/products?page=${currentPage}&limit=${productsPerPage}`
      );
      setProducts(res.data.data); // Make sure your API returns { data: [...] }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.REACT_APP_BASE_URL + "/api/products",
        formData
      );
      setProducts([...products, res.data]);
      resetForm();
      setShowAddModal(false);
    } catch (err) {
      console.error("Failed to add product", err);
      alert(err.response?.data?.message || "Failed to add product");
    }
  };
  const handleEditProduct = async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    try {
      await axios.put(`/api/products/${formData.id}`, formData);

      await fetchProducts();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!currentProduct) return;

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/products/${currentProduct._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Verify the response structure
      console.log("Update response:", res.data);

      if (res.data && res.data._id) {
        setProducts(
          products.map((p) => (p._id === currentProduct._id ? res.data : p))
        );
        resetForm();
        setCurrentProduct(null);
        setShowEditModal(false);
      } else {
        console.error("Invalid response format:", res.data);
        alert("Failed to update product: Invalid response from server");
      }
    } catch (err) {
      console.error("Failed to update product", err);
      alert(err.response?.data?.message || "Failed to update product");
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(
        process.env.REACT_APP_BASE_URL + `/api/products/${productToDelete._id}`
      );
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setProductToDelete(null);
      setShowDeleteModal(false);
    } catch (err) {
      console.error("Failed to delete product", err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      productCode: "",
      description: "",
      isPublished: false,
    });
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Loading Products...</p>
      </div>
    );
  }
  const [isUpdating, setIsUpdating] = useState(false);

  return (
    <div className="container py-4" style={{ maxWidth: "1200px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0" style={{ color: colors.primaryBrown }}>
          Product Management
        </h2>
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          style={buttonStyles.primary}
        >
          <FiPlus className="me-2" />
          Add Product
        </Button>
      </div>

      <div
        className="card border-0"
        style={{ backgroundColor: colors.lightBeige }}
      >
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table mb-0" style={tableStyles}>
              <thead>
                <tr>
                  <th style={headerStyles}>ID</th>
                  <th style={headerStyles}>Product Name</th>
                  <th style={headerStyles}>Code</th>
                  <th style={headerStyles}>Description</th>
                  <th style={headerStyles}>Status</th>
                  <th style={headerStyles}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    style={{ borderBottom: `1px solid ${colors.mediumBeige}` }}
                  >
                    <td style={{ color: colors.textDark }}>
                      {product._id.slice(-6)}
                    </td>
                    <td style={{ color: colors.textDark, fontWeight: "500" }}>
                      {product.name}
                    </td>
                    <td style={{ color: colors.accentBrown }}>
                      {product.productCode}
                    </td>
                    <td style={{ color: colors.textDark }}>
                      {product.description || (
                        <span style={{ color: colors.darkBeige }}>
                          No description
                        </span>
                      )}
                    </td>
                    <td>
                      <Badge
                        pill
                        bg={product.isPublished ? "success" : "secondary"}
                        style={{ fontWeight: "normal" }}
                      >
                        {product.isPublished ? (
                          <>
                            <FiCheck className="me-1" /> Published
                          </>
                        ) : (
                          <>
                            <FiX className="me-1" /> Draft
                          </>
                        )}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditProduct(product)}
                          style={{
                            borderColor: colors.primaryBrown,
                            color: colors.primaryBrown,
                          }}
                        >
                          <FiEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => {
                            setProductToDelete(product);
                            setShowDeleteModal(true);
                          }}
                          style={{
                            borderColor: "#dc3545",
                            color: "#dc3545",
                          }}
                        >
                          <FiTrash2 />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          />
          {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(
            (number) => (
              <Pagination.Item
                key={number + 1}
                active={number + 1 === currentPage}
                onClick={() => setCurrentPage(number + 1)}
              >
                {number + 1}
              </Pagination.Item>
            )
          )}
          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={products.length < productsPerPage}
          />
        </Pagination>
      </div>

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: colors.primaryBrown,
            color: colors.textLight,
            borderBottom: `1px solid ${colors.accentBrown}`,
          }}
        >
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: colors.lightBeige }}>
          <Form onSubmit={handleAddProduct}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label style={{ color: colors.textDark }}>
                Product Name
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                style={{
                  backgroundColor: colors.textLight,
                  borderColor: colors.mediumBeige,
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductCode">
              <Form.Label style={{ color: colors.textDark }}>
                Product Code
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.productCode}
                onChange={(e) =>
                  setFormData({ ...formData, productCode: e.target.value })
                }
                required
                style={{
                  backgroundColor: colors.textLight,
                  borderColor: colors.mediumBeige,
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label style={{ color: colors.textDark }}>
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                style={{
                  backgroundColor: colors.textLight,
                  borderColor: colors.mediumBeige,
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formIsPublished">
              <Form.Check
                type="checkbox"
                label="Publish this product"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
                style={{ color: colors.textDark }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setShowAddModal(false)}
                style={buttonStyles.secondary}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={buttonStyles.primary}
              >
                Create Product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      {/* Edit Product Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: colors.primaryBrown,
            color: colors.textLight,
            borderBottom: `1px solid ${colors.accentBrown}`,
          }}
        >
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: colors.lightBeige }}>
          <Form onSubmit={handleUpdateProduct}>
            <Form.Group className="mb-3" controlId="editFormName">
              <Form.Label style={{ color: colors.textDark }}>
                Product Name
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                style={{
                  backgroundColor: colors.textLight,
                  borderColor: colors.mediumBeige,
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editFormProductCode">
              <Form.Label style={{ color: colors.textDark }}>
                Product Code
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.productCode}
                onChange={(e) =>
                  setFormData({ ...formData, productCode: e.target.value })
                }
                required
                style={{
                  backgroundColor: colors.textLight,
                  borderColor: colors.mediumBeige,
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editFormDescription">
              <Form.Label style={{ color: colors.textDark }}>
                Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                style={{
                  backgroundColor: colors.textLight,
                  borderColor: colors.mediumBeige,
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="editFormIsPublished">
              <Form.Check
                type="checkbox"
                label="Publish this product"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
                style={{ color: colors.textDark }}
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => {
                  setShowEditModal(false);
                  resetForm();
                }}
                style={buttonStyles.secondary}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={buttonStyles.primary}
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Updating...
                  </>
                ) : (
                  "Update Product"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {/* Delete Product Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header
          closeButton
          style={{
            backgroundColor: colors.primaryBrown,
            color: colors.textLight,
            borderBottom: `1px solid ${colors.accentBrown}`,
          }}
        >
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{ backgroundColor: colors.lightBeige, color: colors.textDark }}
        >
          <p>
            Are you sure you want to delete{" "}
            <strong>{productToDelete?.name}</strong>?
          </p>
          <p>This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: colors.lightBeige }}>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            style={buttonStyles.secondary}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteProduct}
            style={{
              backgroundColor: "#dc3545",
              borderColor: "#dc3545",
              fontWeight: "500",
            }}
          >
            Delete Permanently
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductCrud;

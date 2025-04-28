import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  Form,
  Table,
  Pagination,
  Spinner,
  Container,
  Row,
  Col,
} from "react-bootstrap";

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
  const [totalProducts, setTotalProducts] = useState(0);

  // Color palette
  const colors = {
    primaryBrown: "#6b4226",
    lightBeige: "#f8f4e9",
    mediumBeige: "#e8d8c3",
    darkBeige: "#d2c0a5",
    accentBrown: "#8b5a2b",
    textDark: "#3e3e3e",
    textLight: "#ffffff",
    successGreen: "#4a8c5e",
    warningOrange: "#e67e22",
    dangerRed: "#c0392b",
  };

  // Styles
  const styles = {
    container: {
      backgroundColor: colors.lightBeige,
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 12px rgba(107, 66, 38, 0.1)",
      marginTop: "2rem",
    },
    header: {
      color: colors.primaryBrown,
      fontWeight: "600",
      marginBottom: "1.5rem",
      borderBottom: `2px solid ${colors.mediumBeige}`,
      paddingBottom: "0.5rem",
    },
    table: {
      backgroundColor: colors.lightBeige,
      borderColor: colors.mediumBeige,
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    tableHeader: {
      backgroundColor: colors.primaryBrown,
      color: colors.textLight,
      fontWeight: "500",
      borderBottom: `1px solid ${colors.accentBrown}`,
    },
    button: {
      primary: {
        backgroundColor: colors.primaryBrown,
        borderColor: colors.primaryBrown,
        fontWeight: "500",
        letterSpacing: "0.5px",
        ":hover": {
          backgroundColor: colors.accentBrown,
          borderColor: colors.accentBrown,
        },
      },
      secondary: {
        backgroundColor: colors.mediumBeige,
        borderColor: colors.darkBeige,
        color: colors.textDark,
        fontWeight: "500",
        ":hover": {
          backgroundColor: colors.darkBeige,
          borderColor: colors.accentBrown,
        },
      },
      success: {
        backgroundColor: colors.successGreen,
        borderColor: colors.successGreen,
      },
      warning: {
        backgroundColor: colors.warningOrange,
        borderColor: colors.warningOrange,
      },
      danger: {
        backgroundColor: colors.dangerRed,
        borderColor: colors.dangerRed,
      },
    },
    modalHeader: {
      backgroundColor: colors.primaryBrown,
      color: colors.textLight,
    },
    input: {
      backgroundColor: colors.lightBeige,
      borderColor: colors.mediumBeige,
      ":focus": {
        borderColor: colors.primaryBrown,
        boxShadow: `0 0 0 0.2rem ${colors.mediumBeige}`,
      },
    },
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `/api/products?page=${currentPage}&limit=${productsPerPage}`
      );
      setProducts(res.data.data);
      setTotalProducts(res.data.total || res.data.data.length);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/products", formData);
      setProducts([...products, res.data]);
      resetForm();
      setShowAddModal(false);
      fetchProducts(); // Refresh the list
    } catch (err) {
      console.error("Failed to add product", err);
      alert(err.response?.data?.message || "Failed to add product");
    }
  };

  const handleEditProduct = (product) => {
    if (!product) return;
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      productCode: product.productCode,
      description: product.description,
      isPublished: product.isPublished,
    });
    setShowEditModal(true);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!currentProduct) return;
    try {
      const res = await axios.put(
        `/api/products/${currentProduct._id}`,
        formData
      );
      setProducts(
        products.map((p) => (p._id === currentProduct._id ? res.data : p))
      );
      resetForm();
      setCurrentProduct(null);
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`/api/products/${productToDelete._id}`);
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

  // Pagination logic
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
        style={{
          backgroundColor:
            number === currentPage ? colors.primaryBrown : colors.lightBeige,
          borderColor: colors.mediumBeige,
          color: number === currentPage ? colors.textLight : colors.textDark,
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner
          animation="border"
          role="status"
          style={{ color: colors.primaryBrown }}
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container style={styles.container}>
      <Row className="justify-content-between align-items-center mb-4">
        <Col>
          <h2 style={styles.header}>Manage Products</h2>
        </Col>
        <Col xs="auto">
          <Button
            variant="primary"
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            style={styles.button.primary}
            className="shadow-sm"
          >
            <i className="bi bi-plus-circle me-2"></i>Add Product
          </Button>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover style={styles.table}>
          <thead style={styles.tableHeader}>
            <tr>
              <th style={{ color: colors.textLight }}>Name</th>
              <th style={{ color: colors.textLight }}>Code</th>
              <th style={{ color: colors.textLight }}>Description</th>
              <th style={{ color: colors.textLight }}>Status</th>
              <th style={{ color: colors.textLight }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.productCode}</td>
                  <td>{product.description || "-"}</td>
                  <td>
                    <span
                      className={`badge ${
                        product.isPublished ? "bg-success" : "bg-secondary"
                      }`}
                      style={{
                        backgroundColor: product.isPublished
                          ? colors.successGreen
                          : colors.mediumBeige,
                        color: product.isPublished
                          ? colors.textLight
                          : colors.textDark,
                      }}
                    >
                      {product.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() => handleEditProduct(product)}
                        style={{
                          color: colors.warningOrange,
                          borderColor: colors.warningOrange,
                        }}
                      >
                        <i className="bi bi-pencil-square me-1"></i>Edit
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                          setProductToDelete(product);
                          setShowDeleteModal(true);
                        }}
                        style={{
                          color: colors.dangerRed,
                          borderColor: colors.dangerRed,
                        }}
                      >
                        <i className="bi bi-trash me-1"></i>Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No products found. Add your first product!
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {totalProducts > productsPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              style={{
                backgroundColor: colors.lightBeige,
                borderColor: colors.mediumBeige,
              }}
            />
            {paginationItems}
            <Pagination.Next
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              style={{
                backgroundColor: colors.lightBeige,
                borderColor: colors.mediumBeige,
              }}
            />
          </Pagination>
        </div>
      )}

      {/* Add Product Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddProduct}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                style={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductCode">
              <Form.Label>Product Code</Form.Label>
              <Form.Control
                type="text"
                value={formData.productCode}
                onChange={(e) =>
                  setFormData({ ...formData, productCode: e.target.value })
                }
                required
                style={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                style={styles.input}
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
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowAddModal(false)}
                style={styles.button.secondary}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={styles.button.primary}
              >
                <i className="bi bi-save me-1"></i>Save Product
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
      >
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateProduct}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                style={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formProductCode">
              <Form.Label>Product Code</Form.Label>
              <Form.Control
                type="text"
                value={formData.productCode}
                onChange={(e) =>
                  setFormData({ ...formData, productCode: e.target.value })
                }
                required
                style={styles.input}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                style={styles.input}
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
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
                style={styles.button.secondary}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={styles.button.primary}
              >
                <i className="bi bi-save me-1"></i>Update Product
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
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete{" "}
            <strong>{productToDelete?.name}</strong>?
          </p>
          <p className="text-muted">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            style={styles.button.secondary}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteProduct}
            style={styles.button.danger}
          >
            <i className="bi bi-trash me-1"></i>Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductCrud;

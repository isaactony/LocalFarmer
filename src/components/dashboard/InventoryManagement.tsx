import React, { useState, useRef } from 'react';
import { Pencil, Trash2, Plus, Upload, X } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  description: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Organic Tomatoes",
    category: "Vegetables",
    price: 4.99,
    stock: 150,
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfca?auto=format&fit=crop&q=80",
    description: "Fresh, locally grown organic tomatoes"
  },
  {
    id: 2,
    name: "Fresh Eggs",
    category: "Dairy & Eggs",
    price: 6.99,
    stock: 200,
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80",
    description: "Free-range eggs from happy hens"
  },
  {
    id: 3,
    name: "Raw Honey",
    category: "Honey & Preserves",
    price: 12.99,
    stock: 50,
    image: "https://images.unsplash.com/photo-1587049352847-81a56d773cae?auto=format&fit=crop&q=80",
    description: "Pure, unfiltered honey from local wildflowers"
  },
  {
    id: 4,
    name: "Organic Spinach",
    category: "Vegetables",
    price: 3.99,
    stock: 100,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80",
    description: "Fresh organic spinach leaves"
  },
  {
    id: 5,
    name: "Heirloom Carrots",
    category: "Vegetables",
    price: 4.49,
    stock: 75,
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?auto=format&fit=crop&q=80",
    description: "Multi-colored organic heirloom carrots"
  }
];

export default function InventoryManagement() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    price: 0,
    stock: 0,
    image: '',
    description: ''
  });
  const [previewImage, setPreviewImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        if (isEdit && currentProduct) {
          setCurrentProduct({ ...currentProduct, image: imageUrl });
        } else {
          setNewProduct({ ...newProduct, image: imageUrl });
        }
        setPreviewImage(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price && newProduct.stock) {
      const product: Product = {
        id: products.length + 1,
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        image: newProduct.image || '',
        description: newProduct.description || ''
      };
      setProducts([...products, product]);
      setShowAddModal(false);
      setNewProduct({
        name: '',
        category: '',
        price: 0,
        stock: 0,
        image: '',
        description: ''
      });
      setPreviewImage('');
    }
  };

  const handleEditProduct = () => {
    if (currentProduct) {
      setProducts(products.map(p => p.id === currentProduct.id ? currentProduct : p));
      setShowEditModal(false);
      setCurrentProduct(null);
      setPreviewImage('');
    }
  };

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p.id !== productToDelete.id));
      setShowDeleteConfirm(false);
      setProductToDelete(null);
    }
  };

  const ImageUploadPreview = ({ image, onUpload, isEdit = false }) => (
    <div className="mt-2">
      {(image || previewImage) ? (
        <div className="relative">
          <img
            src={previewImage || image}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
          <button
            onClick={() => {
              if (isEdit && currentProduct) {
                setCurrentProduct({ ...currentProduct, image: '' });
              } else {
                setNewProduct({ ...newProduct, image: '' });
              }
              setPreviewImage('');
            }}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-green-500 transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500">Click to upload product image</p>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => onUpload(e)}
        accept="image/*"
        className="hidden"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Inventory Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.stock > 100
                        ? 'bg-green-100 text-green-800'
                        : product.stock > 50
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => {
                        setCurrentProduct(product);
                        setShowEditModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Product</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <ImageUploadPreview
                image={newProduct.image}
                onUpload={handleImageUpload}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Dairy & Eggs">Dairy & Eggs</option>
                  <option value="Honey & Preserves">Honey & Preserves</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && currentProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Product</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <ImageUploadPreview
                image={currentProduct.image}
                onUpload={(e) => handleImageUpload(e, true)}
                isEdit={true}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={currentProduct.category}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Vegetables">Vegetables</option>
                  <option value="Fruits">Fruits</option>
                  <option value="Dairy & Eggs">Dairy & Eggs</option>
                  <option value="Honey & Preserves">Honey & Preserves</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={currentProduct.price}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  value={currentProduct.stock}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditProduct}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{productToDelete.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
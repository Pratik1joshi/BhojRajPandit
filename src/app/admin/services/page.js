'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'puja',
    price: '',
    duration: '',
    requirements: '',
    benefits: '',
    featured: false,
    isActive: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/services');
      setServices(response.data.data);
    } catch (error) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      price: Number(formData.price),
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      benefits: formData.benefits.split('\n').filter(b => b.trim()),
    };

    try {
      if (editingService) {
        await axios.put(`/api/services/${editingService._id}`, data);
        toast.success('Service updated successfully');
      } else {
        await axios.post('/api/services', data);
        toast.success('Service created successfully');
      }
      setShowModal(false);
      resetForm();
      fetchServices();
    } catch (error) {
      toast.error('Failed to save service');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      price: service.price.toString(),
      duration: service.duration,
      requirements: service.requirements?.join('\n') || '',
      benefits: service.benefits?.join('\n') || '',
      featured: service.featured,
      isActive: service.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      await axios.delete(`/api/services/${id}`);
      toast.success('Service deleted');
      fetchServices();
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      category: 'puja',
      price: '',
      duration: '',
      requirements: '',
      benefits: '',
      featured: false,
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-2">Manage your service offerings</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-5xl">
              🪔
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                <span className={`px-2 py-1 text-xs rounded ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {service.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{service.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-orange-600">₹{service.price}</span>
                <span className="text-sm text-gray-500">{service.duration}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <FaEdit />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center space-x-2"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold mb-6">{editingService ? 'Edit Service' : 'Add New Service'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="puja">Puja</option>
                    <option value="bratabandhan">Bratabandhan</option>
                    <option value="wedding">Wedding</option>
                    <option value="housewarming">Housewarming</option>
                    <option value="custom">Custom</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium mb-2">Duration *</label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  required
                  placeholder="e.g., 2-3 hours"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="rounded"
                  />
                  <span>Featured</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="rounded"
                  />
                  <span>Active</span>
                </label>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700"
                >
                  {editingService ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'puja',
    featured: false,
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await axios.get('/api/gallery');
      setGallery(response.data.data);
    } catch (error) {
      toast.error('Failed to load gallery');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, image: '/images/default.jpg' };
    
    try {
      await axios.post('/api/gallery', data);
      toast.success('Gallery item added');
      setShowModal(false);
      setFormData({ title: '', description: '', category: 'puja', featured: false });
      fetchGallery();
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    try {
      await axios.delete(`/api/gallery/${id}`);
      toast.success('Item deleted');
      fetchGallery();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Image</span>
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {gallery.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-5xl">
              🪔
            </div>
            <div className="p-4">
              <h3 className="font-bold">{item.title}</h3>
              <button
                onClick={() => handleDelete(item._id)}
                className="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                <FaTrash className="inline mr-2" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-6">Add Gallery Item</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="puja">Puja</option>
                  <option value="bratabandhan">Bratabandhan</option>
                  <option value="wedding">Wedding</option>
                  <option value="housewarming">Housewarming</option>
                  <option value="festival">Festival</option>
                </select>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 py-3 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white py-3 rounded-lg"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

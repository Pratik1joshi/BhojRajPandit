'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaUpload, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
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

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploading(true);

    try {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formDataUpload,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      setFormData({ ...formData, image: data.secure_url });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error('Please upload an image');
      return;
    }
    
    try {
      await axios.post('/api/gallery', formData);
      toast.success('Gallery item added successfully');
      setShowModal(false);
      setFormData({ 
        title: '', 
        description: '', 
        image: '',
        category: 'puja', 
        featured: false 
      });
      fetchGallery();
    } catch (error) {
      toast.error('Failed to add item');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    try {
      await axios.delete(`/api/gallery/${id}`);
      toast.success('Item deleted successfully');
      fetchGallery();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-600 mt-1 text-sm">Upload and manage your ceremony photos</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaPlus />
          <span>Add Image</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        {gallery.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-xl">
            <p className="text-gray-500 text-lg">No images yet. Add your first gallery image!</p>
          </div>
        ) : (
          gallery.map((item) => (
            <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="relative h-48 sm:h-56 bg-gray-100">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-5xl">
                    🪔
                  </div>
                )}
                {item.featured && (
                  <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Featured
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 truncate">{item.title}</h3>
                <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                )}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="mt-3 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full p-6 lg:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Add Gallery Image</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Image Upload */}
              <div>
                <label className="block font-medium mb-3 text-gray-700">Image *</label>
                {formData.image ? (
                  <div className="relative">
                    <div className="relative h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="galleryImage"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="galleryImage"
                      className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                        uploading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <FaUpload className="text-4xl text-orange-600 mb-3" />
                      <p className="text-sm text-gray-600 font-medium">
                        {uploading ? 'Uploading...' : 'Click to upload image'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    </label>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Or enter image URL:</p>
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block font-medium mb-2 text-gray-700">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="e.g., Ganesh Puja Ceremony"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block font-medium mb-2 text-gray-700">Description (Optional)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Brief description of the ceremony"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block font-medium mb-2 text-gray-700">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="puja">Puja</option>
                  <option value="bratabandhan">Bratabandhan</option>
                  <option value="wedding">Wedding</option>
                  <option value="housewarming">Housewarming</option>
                  <option value="festival">Festival</option>
                </select>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <label htmlFor="featured" className="text-sm text-gray-700">
                  Mark as featured (will be highlighted)
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Add to Gallery'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

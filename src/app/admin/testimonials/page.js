'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('/api/testimonials');
      setTestimonials(response.data.data);
    } catch (error) {
      toast.error('Failed to load testimonials');
    }
  };

  const handleApprove = async (id, isApproved) => {
    try {
      await axios.put(`/api/testimonials/${id}`, { isApproved });
      toast.success('Testimonial updated');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await axios.delete(`/api/testimonials/${id}`);
      toast.success('Deleted');
      fetchTestimonials();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Testimonials Management</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <div key={t._id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                {t.name[0]}
              </div>
              <div>
                <div className="font-bold">{t.name}</div>
                <div className="text-sm text-gray-600">{t.service}</div>
              </div>
              <span className={`ml-auto px-3 py-1 rounded text-sm ${t.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {t.isApproved ? 'Approved' : 'Pending'}
              </span>
            </div>
            <p className="text-gray-700 mb-4">"{t.text}"</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleApprove(t._id, !t.isApproved)}
                className={`flex-1 py-2 rounded ${t.isApproved ? 'bg-gray-300' : 'bg-green-600 text-white'}`}
              >
                {t.isApproved ? 'Unapprove' : 'Approve'}
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

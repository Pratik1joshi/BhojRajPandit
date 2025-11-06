'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: 'BhojRaj Pandit',
    title: 'Hindu Religious Consultant',
    bio: '',
    email: 'contact@panditji.com',
    phone: '+1 (234) 567-8900',
    whatsapp: '+1 (234) 567-8900',
    address: 'Your Address',
    city: 'Your City',
    state: 'Your State',
    experience: 15,
    specializations: ['Vedic Pujas', 'Wedding Ceremonies', 'Bratabandhan'],
    languages: ['Hindi', 'English', 'Sanskrit'],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/profile', profile);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile Settings</h1>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">City</label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Experience (years)</label>
              <input
                type="number"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Write your bio..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

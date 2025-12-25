'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPlus, FaTrash, FaUpload } from 'react-icons/fa';

export default function AdminProfile() {
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    phone: '',
    whatsapp: '',
    address: '',
    city: '',
    state: '',
    experience: 0,
    ceremoniesCompleted: 0,
    happyClients: 0,
    specializations: [],
    languages: [],
    certifications: [],
    profileImage: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newCertification, setNewCertification] = useState({ name: '', institution: '', year: '' });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('/api/profile');
      if (data.success && data.data) {
        setProfile(data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/profile', profile);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
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
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setProfile({ ...profile, profileImage: data.secure_url });
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const addSpecialization = () => {
    if (newSpecialization.trim()) {
      setProfile({
        ...profile,
        specializations: [...profile.specializations, newSpecialization.trim()]
      });
      setNewSpecialization('');
    }
  };

  const removeSpecialization = (index) => {
    setProfile({
      ...profile,
      specializations: profile.specializations.filter((_, i) => i !== index)
    });
  };

  const addLanguage = () => {
    if (newLanguage.trim()) {
      setProfile({
        ...profile,
        languages: [...profile.languages, newLanguage.trim()]
      });
      setNewLanguage('');
    }
  };

  const removeLanguage = (index) => {
    setProfile({
      ...profile,
      languages: profile.languages.filter((_, i) => i !== index)
    });
  };

  const addCertification = () => {
    if (newCertification.name && newCertification.institution && newCertification.year) {
      setProfile({
        ...profile,
        certifications: [...(profile.certifications || []), { ...newCertification, year: parseInt(newCertification.year) }]
      });
      setNewCertification({ name: '', institution: '', year: '' });
    }
  };

  const removeCertification = (index) => {
    setProfile({
      ...profile,
      certifications: profile.certifications.filter((_, i) => i !== index)
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

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
              <label className="block font-medium mb-2">WhatsApp</label>
              <input
                type="tel"
                value={profile.whatsapp}
                onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">State</label>
              <input
                type="text"
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
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
            <div>
              <label className="block font-medium mb-2">Ceremonies Completed</label>
              <input
                type="number"
                value={profile.ceremoniesCompleted}
                onChange={(e) => setProfile({ ...profile, ceremoniesCompleted: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Happy Clients</label>
              <input
                type="number"
                value={profile.happyClients}
                onChange={(e) => setProfile({ ...profile, happyClients: parseInt(e.target.value) })}
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

          {/* Profile Image */}
          <div>
            <label className="block font-medium mb-2">Profile Image</label>
            <div className="flex items-center gap-4">
              {profile.profileImage && (
                <img
                  src={profile.profileImage}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profileImage"
                  disabled={uploading}
                />
                <label
                  htmlFor="profileImage"
                  className={`inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 ${uploading ? 'opacity-50' : ''}`}
                >
                  <FaUpload />
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </label>
                <p className="text-sm text-gray-500 mt-2">Or enter image URL:</p>
                <input
                  type="text"
                  value={profile.profileImage}
                  onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg mt-1"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div>
            <label className="block font-medium mb-2">Specializations</label>
            <div className="space-y-2">
              {profile.specializations?.map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec}
                    readOnly
                    className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecialization(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
                  className="flex-1 px-4 py-2 border rounded-lg"
                  placeholder="Add new specialization"
                />
                <button
                  type="button"
                  onClick={addSpecialization}
                  className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block font-medium mb-2">Languages</label>
            <div className="space-y-2">
              {profile.languages?.map((lang, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={lang}
                    readOnly
                    className="flex-1 px-4 py-2 border rounded-lg bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                  className="flex-1 px-4 py-2 border rounded-lg"
                  placeholder="Add new language"
                />
                <button
                  type="button"
                  onClick={addLanguage}
                  className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block font-medium mb-2">Certifications</label>
            <div className="space-y-3">
              {profile.certifications?.map((cert, index) => (
                <div key={index} className="flex items-start gap-2 p-4 bg-orange-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{cert.name}</div>
                    <div className="text-sm text-gray-600">{cert.institution} • {cert.year}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className="p-4 border rounded-lg space-y-2">
                <input
                  type="text"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Certification name"
                />
                <input
                  type="text"
                  value={newCertification.institution}
                  onChange={(e) => setNewCertification({ ...newCertification, institution: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Institution"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={newCertification.year}
                    onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                    className="flex-1 px-4 py-2 border rounded-lg"
                    placeholder="Year"
                  />
                  <button
                    type="button"
                    onClick={addCertification}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"
                  >
                    <FaPlus /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <label className="block font-medium mb-2">Social Media Links</label>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Facebook URL</label>
                <input
                  type="text"
                  value={profile.socialMedia?.facebook || ''}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    socialMedia: { ...profile.socialMedia, facebook: e.target.value } 
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Instagram URL</label>
                <input
                  type="text"
                  value={profile.socialMedia?.instagram || ''}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    socialMedia: { ...profile.socialMedia, instagram: e.target.value } 
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">X (Twitter) URL</label>
                <input
                  type="text"
                  value={profile.socialMedia?.twitter || ''}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    socialMedia: { ...profile.socialMedia, twitter: e.target.value } 
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="https://x.com/yourhandle"
                />
              </div>
            </div>
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

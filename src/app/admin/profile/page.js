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
    coverImage: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
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

  const handleCoverImageUpload = async (e) => {
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

    setUploadingCover(true);
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
        setProfile({ ...profile, coverImage: data.secure_url });
        toast.success('Cover image uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload cover image');
    } finally {
      setUploadingCover(false);
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
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Profile Settings</h1>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
        >
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-4 lg:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">Title</label>
                <input
                  type="text"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">WhatsApp</label>
                <input
                  type="tel"
                  value={profile.whatsapp}
                  onChange={(e) => setProfile({ ...profile, whatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">Address</label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">State</label>
                <input
                  type="text"
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">City</label>
                <input
                  type="text"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block font-medium mb-2 text-gray-700 text-sm">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Stats Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">Experience (years)</label>
                <input
                  type="number"
                  value={profile.experience}
                  onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">Ceremonies Completed</label>
                <input
                  type="number"
                  value={profile.ceremoniesCompleted}
                  onChange={(e) => setProfile({ ...profile, ceremoniesCompleted: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block font-medium mb-2 text-gray-700 text-sm">Happy Clients</label>
                <input
                  type="number"
                  value={profile.happyClients}
                  onChange={(e) => setProfile({ ...profile, happyClients: parseInt(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Profile Image Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Images</h2>
            <div className="space-y-6">
              <div>
                <label className="block font-medium mb-3 text-gray-700 text-sm">Profile Image (About Section)</label>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {profile.profileImage && (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                  )}
                  <div className="flex-1 w-full space-y-3">
                    <div>
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
                        className={`inline-flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                          uploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <FaUpload className="text-orange-600" />
                        {uploading ? 'Uploading...' : 'Upload Profile Image'}
                      </label>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Or enter image URL:</p>
                      <input
                        type="text"
                        value={profile.profileImage}
                        onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cover/Hero Image */}
              <div>
                <label className="block font-medium mb-3 text-gray-700 text-sm">Hero Image (Homepage)</label>
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  {profile.coverImage && (
                    <img
                      src={profile.coverImage}
                      alt="Hero"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                  )}
                  <div className="flex-1 w-full space-y-3">
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageUpload}
                        className="hidden"
                        id="coverImage"
                        disabled={uploadingCover}
                      />
                      <label
                        htmlFor="coverImage"
                        className={`inline-flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                          uploadingCover ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <FaUpload className="text-orange-600" />
                        {uploadingCover ? 'Uploading...' : 'Upload Hero Image'}
                      </label>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Or enter image URL:</p>
                      <input
                        type="text"
                        value={profile.coverImage || ''}
                        onChange={(e) => setProfile({ ...profile, coverImage: e.target.value })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="https://example.com/hero-image.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specializations */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Specializations</h2>
            <div className="space-y-3">
              {profile.specializations?.map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec}
                    readOnly
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecialization(index)}
                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="text"
                  value={newSpecialization}
                  onChange={(e) => setNewSpecialization(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSpecialization())}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Add new specialization"
                />
                <button
                  type="button"
                  onClick={addSpecialization}
                  className="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Languages</h2>
            <div className="space-y-3">
              {profile.languages?.map((lang, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={lang}
                    readOnly
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-700"
                  />
                  <button
                    type="button"
                    onClick={() => removeLanguage(index)}
                    className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row items-stretch gap-2">
                <input
                  type="text"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Add new language"
                />
                <button
                  type="button"
                  onClick={addLanguage}
                  className="px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <FaPlus />
                  <span className="hidden sm:inline">Add</span>
                </button>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Certifications</h2>
            <div className="space-y-4">
              {profile.certifications?.map((cert, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 break-words">{cert.name}</div>
                    <div className="text-sm text-gray-600 mt-1">{cert.institution} • {cert.year}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeCertification(index)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg space-y-3 bg-gray-50">
                <input
                  type="text"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Certification name"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newCertification.institution}
                    onChange={(e) => setNewCertification({ ...newCertification, institution: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Institution"
                  />
                  <input
                    type="number"
                    value={newCertification.year}
                    onChange={(e) => setNewCertification({ ...newCertification, year: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Year"
                  />
                </div>
                <button
                  type="button"
                  onClick={addCertification}
                  className="w-full sm:w-auto px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <FaPlus /> Add Certification
                </button>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-900 border-b pb-2">Social Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                <input
                  type="text"
                  value={profile.socialMedia?.facebook || ''}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    socialMedia: { ...profile.socialMedia, facebook: e.target.value } 
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                <input
                  type="text"
                  value={profile.socialMedia?.instagram || ''}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    socialMedia: { ...profile.socialMedia, instagram: e.target.value } 
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://instagram.com/yourprofile"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">X (Twitter) URL</label>
                <input
                  type="text"
                  value={profile.socialMedia?.twitter || ''}
                  onChange={(e) => setProfile({ 
                    ...profile, 
                    socialMedia: { ...profile.socialMedia, twitter: e.target.value } 
                  })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://x.com/yourhandle"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

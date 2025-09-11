import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { Trash2, PencilLine } from "lucide-react";
import { toast } from "react-hot-toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function ManageMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    type: "medicines",
    name: "",
    price: "",
    description: "",
    details: "",
    category: "General",
    image: "",
    isVerified: true,
  });

  const [preview, setPreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${SERVER_URL}/api/medicines`);
      setMedicines(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Failed to fetch medicines:", err);
      toast.error("Failed to fetch medicines.");
    }
    setLoading(false);
  };

  const applyFilters = useCallback(() => {
    if (!searchTerm.trim()) {
      setFiltered(medicines);
      return;
    }
    setFiltered(
      medicines.filter((m) =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [medicines, searchTerm]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imgFormData = new FormData();
    imgFormData.append("image", file);

    try {
      setUploadProgress(0);
      const res = await axios.post(`${SERVER_URL}/api/upload/image`, imgFormData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      if (res.data.success) {
        setPreview(res.data.imageUrl);
        setFormData((prev) => ({ ...prev, image: res.data.imageUrl }));
        toast.success("✅ Image uploaded!");
      } else {
        toast.error("❌ Image upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Error uploading image.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image || !formData.name.trim() || !formData.price) {
      return toast.error("Please fill in all required fields.");
    }

    try {
      setLoading(true);
      if (editId) {
        await axios.put(`${SERVER_URL}/api/medicines/${editId}`, formData);
        toast.success("✅ Medicine updated!");
      } else {
        await axios.post(`${SERVER_URL}/api/medicines`, formData);
        toast.success("✅ Medicine created!");
      }
      resetForm();
      fetchMedicines();
    } catch (err) {
      console.error(err);
      toast.error("❌ Error saving medicine.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      type: "medicines",
      name: "",
      price: "",
      description: "",
      details: "",
      category: "General",
      image: "",
      isVerified: true,
    });
    setPreview(null);
    setEditId(null);
    setUploadProgress(0);
  };

  const handleEdit = (medicine) => {
    setFormData(medicine);
    setPreview(medicine.image);
    setEditId(medicine._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this medicine?")) return;
    try {
      setLoading(true);
      await axios.delete(`${SERVER_URL}/api/medicines/${id}`);
      fetchMedicines();
      toast.success("Deleted successfully");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Error deleting medicine");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-4xl font-extrabold mb-8 text-gray-800 text-center">
        💊 Manage Medicines
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            placeholder="Medicine Name *"
            required
          />
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            placeholder="Price (ksh) *"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border rounded-md md:col-span-2"
            placeholder="Short Description *"
            required
          />
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border rounded-md md:col-span-2"
            placeholder="Full Details (optional)"
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            placeholder="Category (e.g. Painkiller, Antibiotic)"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isVerified"
              checked={formData.isVerified}
              onChange={handleChange}
              className="h-5 w-5 text-green-600"
            />
            <span>Verified</span>
          </label>
          <div className="md:col-span-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
            />
            {uploadProgress > 0 && uploadProgress < 100 && (
              <LinearProgress
                variant="determinate"
                value={uploadProgress}
                className="mt-2"
              />
            )}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-3 max-h-48 object-contain rounded-lg border"
              />
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {editId ? "Update Medicine" : "Add Medicine"}
          </button>
        </div>
      </form>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="search"
          placeholder="Search medicines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded border w-full max-w-lg"
        />
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center h-48">
            <CircularProgress />
          </div>
        ) : filtered.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No medicines found.
          </p>
        ) : (
          filtered.map((m) => (
            <div
              key={m._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <img
                src={m.image}
                alt={m.name}
                className="h-48 w-full object-contain rounded-md mb-3"
              />
              <h3 className="text-xl font-semibold">{m.name}</h3>
              <p className="text-green-700 font-bold">Ksh {m.price}</p>
              <p className="text-sm text-gray-600 flex-grow">{m.description}</p>
              <p className="text-xs mt-2 text-gray-500">
                {m.category} | {m.isVerified ? "✅ Verified" : "❌ Unverified"}
              </p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleEdit(m)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <PencilLine size={24} />
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

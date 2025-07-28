import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Plus, Upload, Car, ChevronDown, Image, Edit } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import api from "../../Utils/api";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [carData, setCarData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    modelYear: "",
    fuelType: "",
    transmission: "",
    drivenKms: "",
    color: "",
    bodyType: "",
    engine: "",
    condition: "",
    seats: "",
    doors: "",
    price: "",
  });
  const [features, setFeatures] = useState([]);
  const [newFeature, setNewFeature] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const bodyTypeOptions = [
    "SUV",
    "Sedan",
    "Offroad",
    "Hatchback",
    "Coupe",
    "Convertible",
    "Truck",
  ];
  const conditionOptions = ["Excellent", "Like New", "Good", "Fair", "Poor"];
  const fuelTypeOptions = ["Petrol", "Diesel", "Electric", "Hybrid"];
  const transmissionOptions = ["Automatic", "Manual"];

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await api.get(`/car/${id}`);
        const car = res.data.data;

        setCarData(car);

        setFormData({
          name: car.name || "",
          model: car.model || "",
          modelYear: car.modelYear || "",
          fuelType: car.fuelType || "",
          transmission: car.transmission || "",
          drivenKms: car.drivenKms || "",
          color: car.color || "",
          bodyType: car.bodyType || "",
          engine: car.engine || "",
          condition: car.condition || "",
          seats: car.seats || "",
          doors: car.doors || "",
          price: car.price || "",
        });

        setFeatures(car.features || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [
          ...prev,
          { id: Date.now() + Math.random(), url: e.target.result, file },
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, i) => i !== indexToRemove));
    setImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures((prev) => [...prev, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (feature) => {
    setFeatures((prev) => prev.filter((f) => f !== feature));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const payload = new FormData();

      for (const key in formData) {
        payload.append(key, formData[key]);
      }

      payload.append("features", JSON.stringify(features));

      images.forEach((img) => {
        payload.append("images", img);
      });

      await api.put(`/update/${id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      // For demo purposes
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Car updated successfully!");
      setTimeout(() => {
        navigate("/cars");
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update car. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const CustomSelect = ({ name, label, options, value, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [customValue, setCustomValue] = useState("");
    const [showCustomInput, setShowCustomInput] = useState(false);

    const handleSelect = (option) => {
      if (option === "custom") {
        setShowCustomInput(true);
        setIsOpen(false);
      } else {
        handleSelectChange(name, option);
        setIsOpen(false);
        setShowCustomInput(false);
      }
    };

    const handleCustomSubmit = () => {
      if (customValue.trim()) {
        handleSelectChange(name, customValue.trim());
        setCustomValue("");
        setShowCustomInput(false);
      }
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-800">
          {label}
        </label>
        <div className="relative">
          {showCustomInput ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                placeholder="Enter custom option"
                onKeyPress={(e) => e.key === "Enter" && handleCustomSubmit()}
                disabled={updating}
              />
              <button
                type="button"
                onClick={handleCustomSubmit}
                disabled={updating}
                className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setShowCustomInput(false)}
                disabled={updating}
                className="px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={updating}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl flex justify-between items-center bg-white hover:border-blue-300 focus:border-blue-500 focus:ring-0 transition-colors text-left disabled:opacity-50"
              >
                <span className={value ? "text-gray-900" : "text-gray-400"}>
                  {value || placeholder}
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                  {options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(opt)}
                      className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors first:rounded-t-xl"
                    >
                      {opt}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleSelect("custom")}
                    className="w-full px-4 py-3 text-left text-blue-600 font-medium border-t-2 border-gray-100 hover:bg-blue-50 transition-colors rounded-b-xl"
                  >
                    + Add Custom Option
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading car details...</p>
        </div>
      </div>
    );
  }

  const firstGridFields = [
    { name: "model", label: "Model", type: "text", placeholder: "e.g., Camry" },
    {
      name: "name",
      label: "Brand",
      type: "text",
      placeholder: "e.g., Toyota",
    },
    { name: "color", label: "Color", type: "text", placeholder: "e.g., White" },
    {
      name: "engine",
      label: "Engine",
      type: "text",
      placeholder: "e.g., 2.0L V6",
    },
  ];

  const secondGridFields = [
    { name: "modelYear", label: "Model Year", placeholder: "e.g., 2020" },
    { name: "drivenKms", label: "Driven (KMs)", placeholder: "e.g., 50000" },
    { name: "seats", label: "Seats", placeholder: "e.g., 5" },
    { name: "doors", label: "Doors", placeholder: "e.g., 4" },
    { name: "price", label: "Price", placeholder: "e.g., 20000" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
            <h2 className="text-4xl font-bold text-white flex items-center gap-3">
              <Edit className="w-10 h-10" />
              Edit Car Details
            </h2>
            <p className="text-blue-100 mt-2">Update your car information</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-10">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {firstGridFields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors placeholder-gray-400 disabled:opacity-50"
                      disabled={updating}
                      required
                    />
                  </div>
                ))}
                <CustomSelect
                  name="fuelType"
                  label="Fuel Type"
                  options={fuelTypeOptions}
                  value={formData.fuelType}
                  placeholder="Select fuel type"
                />
                <CustomSelect
                  name="transmission"
                  label="Transmission"
                  options={transmissionOptions}
                  value={formData.transmission}
                  placeholder="Select transmission"
                />
              </div>
            </div>

            {/* Technical Details Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3">
                Technical Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {secondGridFields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-800">
                      {field.label}
                    </label>
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      onWheel={(e) => e.target.blur()}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors placeholder-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50"
                      disabled={updating}
                      required
                    />
                  </div>
                ))}
                <CustomSelect
                  name="bodyType"
                  label="Body Type"
                  options={bodyTypeOptions}
                  value={formData.bodyType}
                  placeholder="Select body type"
                />
                <CustomSelect
                  name="condition"
                  label="Condition"
                  options={conditionOptions}
                  value={formData.condition}
                  placeholder="Select condition"
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3">
                Key Features
              </h3>
              <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="e.g., ABS, Airbags, Sunroof"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors placeholder-gray-400 disabled:opacity-50"
                    disabled={updating}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addFeature())
                    }
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    disabled={updating}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-semibold transition-colors disabled:opacity-50"
                  >
                    <Plus size={20} />
                    Add Feature
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      {feature}
                      <X
                        onClick={() => !updating && removeFeature(feature)}
                        className={`cursor-pointer hover:bg-green-200 rounded-full p-1 ml-1 transition-colors ${
                          updating ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        size={18}
                      />
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Images Section */}
            {carData && carData.images?.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3">
                  Current Images
                </h3>
                <div className="bg-gray-50 p-6 rounded-2xl">
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {carData.images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={img.url}
                          alt={`Current image ${idx + 1}`}
                          className="w-full h-24 object-cover rounded-xl shadow-md border-2 border-gray-200"
                        />
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                          {idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* New Images Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3">
                Add New Images
              </h3>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <Image className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <label
                    className={`cursor-pointer ${
                      updating ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="text-lg font-semibold text-gray-700">
                      Click to upload new images
                    </span>
                    <p className="text-gray-500 mt-1">
                      or drag and drop files here
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={updating}
                      className="hidden"
                    />
                  </label>
                </div>

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6">
                    {imagePreviews.map((img, i) => (
                      <div key={img.id} className="relative group">
                        <img
                          src={img.url}
                          alt="preview"
                          className="w-full h-24 object-cover rounded-xl shadow-md"
                        />
                        <button
                          onClick={() => !updating && removeImage(i)}
                          type="button"
                          disabled={updating}
                          className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg disabled:opacity-50"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={updating}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-xl text-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
              >
                {updating ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating Car...
                  </div>
                ) : (
                  "Update Car Details"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditForm;

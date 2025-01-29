import React from "react";
import TripCreationForm from "@/components/trip/TripCreationForm";

const CreateTripPage = () => {
  const handleTripSubmit = (data: any) => {
    // Handle form submission
    console.log("Trip data:", data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Plan Your Next Adventure
          </h1>
          <p className="text-lg text-gray-600">
            Create a new trip by filling out the details below
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          <TripCreationForm onSubmit={handleTripSubmit} />
        </div>

        {/* Optional Help Text */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Need help planning your trip?{" "}
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View our travel guides
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateTripPage;

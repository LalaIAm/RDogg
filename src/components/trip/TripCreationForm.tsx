import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import LocationInput from "./LocationInput";
import PreferencesSection from "./PreferencesSection";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";

interface TripFormData {
  startLocation?: string;
  destination?: string;
  preferences?: any;
}

interface TripCreationFormProps {
  onSubmit?: (data: TripFormData) => void;
  initialData?: TripFormData;
}

const TripCreationForm = ({
  onSubmit = () => {},
  initialData = {},
}: TripCreationFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<TripFormData>(initialData);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const updateFormData = (key: keyof TripFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Location</span>
          <span>Preferences</span>
          <span>Review</span>
        </div>
      </div>

      {/* Form Steps */}
      <div className="mt-6">
        {currentStep === 1 && (
          <Card className="p-6 space-y-6">
            <h2 className="text-2xl font-bold">Where are you traveling?</h2>
            <div className="space-y-4">
              <LocationInput
                label="Starting Location"
                placeholder="Enter your starting point"
                value={formData.startLocation}
                onChange={(value) => updateFormData("startLocation", value)}
              />
              <LocationInput
                label="Destination"
                placeholder="Where do you want to go?"
                value={formData.destination}
                onChange={(value) => updateFormData("destination", value)}
              />
            </div>
          </Card>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Travel Preferences</h2>
            <PreferencesSection
              onPreferencesChange={(preferences) =>
                updateFormData("preferences", preferences)
              }
            />
          </div>
        )}

        {currentStep === 3 && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Review Your Trip</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Starting Point</h3>
                  <p className="text-gray-600">
                    {formData.startLocation || "Not specified"}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">Destination</h3>
                  <p className="text-gray-600">
                    {formData.destination || "Not specified"}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Travel Preferences</h3>
                <pre className="bg-gray-50 p-4 rounded-md overflow-auto">
                  {JSON.stringify(formData.preferences, null, 2)}
                </pre>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="mr-2 h-4 w-4" /> Create Trip
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripCreationForm;

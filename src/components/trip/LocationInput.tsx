import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

interface LocationSuggestion {
  id: string;
  place: string;
  description: string;
}

interface LocationInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onLocationSelect?: (location: LocationSuggestion) => void;
  suggestions?: LocationSuggestion[];
}

const defaultSuggestions: LocationSuggestion[] = [
  { id: "1", place: "New York City", description: "New York, United States" },
  { id: "2", place: "London", description: "United Kingdom" },
  { id: "3", place: "Paris", description: "France" },
];

const LocationInput: React.FC<LocationInputProps> = ({
  label = "Location",
  placeholder = "Enter a location",
  value = "",
  onChange = () => {},
  onLocationSelect = () => {},
  suggestions = defaultSuggestions,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
    setInputValue(suggestion.place);
    onChange(suggestion.place);
    onLocationSelect(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg">
      <div className="space-y-2">
        <Label htmlFor="location">{label}</Label>
        <div className="relative">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="location"
              type="text"
              placeholder={placeholder}
              value={inputValue}
              onChange={handleInputChange}
              className="pl-10"
              onFocus={() => setShowSuggestions(true)}
            />
          </div>

          {showSuggestions && (
            <Card className="absolute z-10 w-full mt-1 shadow-lg">
              <div className="p-2">
                {suggestions.map((suggestion) => (
                  <Button
                    key={suggestion.id}
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-gray-100 p-2 rounded-md"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div>
                      <div className="font-medium">{suggestion.place}</div>
                      <div className="text-sm text-gray-500">
                        {suggestion.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationInput;

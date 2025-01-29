import React from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { addDays } from "date-fns";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

interface PreferencesSectionProps {
  onPreferencesChange?: (preferences: any) => void;
}

const PreferencesSection = ({
  onPreferencesChange = () => {},
}: PreferencesSectionProps) => {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const transportOptions = [
    { value: "car", label: "Car" },
    { value: "plane", label: "Plane" },
    { value: "train", label: "Train" },
    { value: "bus", label: "Bus" },
  ];

  const accommodationTypes = [
    { value: "hotel", label: "Hotel" },
    { value: "hostel", label: "Hostel" },
    { value: "apartment", label: "Apartment" },
    { value: "resort", label: "Resort" },
  ];

  const activities = [
    { id: "sightseeing", label: "Sightseeing" },
    { id: "adventure", label: "Adventure Sports" },
    { id: "culture", label: "Cultural Activities" },
    { id: "relaxation", label: "Relaxation" },
    { id: "food", label: "Food & Dining" },
  ];

  return (
    <Card className="p-6 space-y-8 bg-white">
      <div className="space-y-6">
        {/* Transport Mode */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            Mode of Transportation
          </Label>
          <Select
            defaultValue="car"
            onValueChange={(value) => onPreferencesChange({ transport: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select transport mode" />
            </SelectTrigger>
            <SelectContent>
              {transportOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Budget Range */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Budget Range</Label>
          <RadioGroup defaultValue="medium" className="flex gap-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="low" id="budget-low" />
              <Label htmlFor="budget-low">Economy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="budget-medium" />
              <Label htmlFor="budget-medium">Moderate</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="high" id="budget-high" />
              <Label htmlFor="budget-high">Luxury</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Travel Dates */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Travel Dates</Label>
          <DatePickerWithRange date={date} setDate={setDate} />
        </div>

        {/* Accommodation */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            Accommodation Preference
          </Label>
          <Select
            defaultValue="hotel"
            onValueChange={(value) =>
              onPreferencesChange({ accommodation: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select accommodation type" />
            </SelectTrigger>
            <SelectContent>
              {accommodationTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Activities */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Activities Interest</Label>
          <div className="grid grid-cols-2 gap-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-2">
                <Checkbox id={activity.id} />
                <Label htmlFor={activity.id}>{activity.label}</Label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Additional Notes</Label>
          <Input
            placeholder="Any special requirements or preferences..."
            className="w-full"
            onChange={(e) => onPreferencesChange({ notes: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
};

export default PreferencesSection;

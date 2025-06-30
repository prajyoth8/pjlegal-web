import { useState } from "react";

const countryCodes = [
  { code: "+91", label: "🇮🇳 India" },
  { code: "+1", label: "🇺🇸 USA" },
  { code: "+44", label: "🇬🇧 UK" },
  { code: "+61", label: "🇦🇺 Australia" },
  { code: "+971", label: "🇦🇪 UAE" },
  { code: "+65", label: "🇸🇬 Singapore" },
  // Add more if needed
];

export default function PhoneInputWithCountry({
  value,
  onChange,
}: {
  value: string;
  onChange: (fullPhone: string) => void;
}) {
  const [selectedCode, setSelectedCode] = useState("+91");
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value.replace(/[^\d]/g, "");
    setPhone(number);
    onChange(`${selectedCode}${number}`);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={selectedCode}
        onChange={(e) => {
          const code = e.target.value;
          setSelectedCode(code);
          onChange(`${code}${phone}`);
        }}
        className="border rounded-md p-2 bg-white dark:bg-gray-900"
      >
        {countryCodes.map((country) => (
          <option key={country.code} value={country.code}>
            {country.label} ({country.code})
          </option>
        ))}
      </select>
      <input
        type="tel"
        placeholder="Enter phone number"
        className="flex-1 border rounded-md p-2"
        value={phone}
        onChange={handlePhoneChange}
      />
    </div>
  );
}

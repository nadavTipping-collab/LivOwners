import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronDown, Search } from "lucide-react";

interface UserIdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userId: string) => void;
  hotelName: string;
}

interface CountryCode {
  code: string;
  name: string;
  flag: string;
  maxLength: number;
}

const countryCodes: CountryCode[] = [
  { code: "+972", name: "Israel", flag: "🇮🇱", maxLength: 9 },
  { code: "+93", name: "Afghanistan", flag: "🇦🇫", maxLength: 9 },
  { code: "+355", name: "Albania", flag: "🇦🇱", maxLength: 9 },
  { code: "+213", name: "Algeria", flag: "🇩🇿", maxLength: 9 },
  { code: "+376", name: "Andorra", flag: "🇦🇩", maxLength: 6 },
  { code: "+244", name: "Angola", flag: "🇦🇴", maxLength: 9 },
  { code: "+54", name: "Argentina", flag: "🇦🇷", maxLength: 10 },
  { code: "+374", name: "Armenia", flag: "🇦🇲", maxLength: 8 },
  { code: "+61", name: "Australia", flag: "🇦🇺", maxLength: 9 },
  { code: "+43", name: "Austria", flag: "🇦🇹", maxLength: 10 },
  { code: "+994", name: "Azerbaijan", flag: "🇦🇿", maxLength: 9 },
  { code: "+973", name: "Bahrain", flag: "🇧🇭", maxLength: 8 },
  { code: "+880", name: "Bangladesh", flag: "🇧🇩", maxLength: 10 },
  { code: "+375", name: "Belarus", flag: "🇧🇾", maxLength: 9 },
  { code: "+32", name: "Belgium", flag: "🇧🇪", maxLength: 9 },
  { code: "+501", name: "Belize", flag: "🇧🇿", maxLength: 7 },
  { code: "+229", name: "Benin", flag: "🇧🇯", maxLength: 8 },
  { code: "+975", name: "Bhutan", flag: "🇧🇹", maxLength: 8 },
  { code: "+591", name: "Bolivia", flag: "🇧🇴", maxLength: 8 },
  { code: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦", maxLength: 8 },
  { code: "+267", name: "Botswana", flag: "🇧🇼", maxLength: 8 },
  { code: "+55", name: "Brazil", flag: "🇧🇷", maxLength: 11 },
  { code: "+673", name: "Brunei", flag: "🇧🇳", maxLength: 7 },
  { code: "+359", name: "Bulgaria", flag: "🇧🇬", maxLength: 9 },
  { code: "+226", name: "Burkina Faso", flag: "🇧🇫", maxLength: 8 },
  { code: "+257", name: "Burundi", flag: "🇧🇮", maxLength: 8 },
  { code: "+855", name: "Cambodia", flag: "🇰🇭", maxLength: 9 },
  { code: "+237", name: "Cameroon", flag: "🇨🇲", maxLength: 9 },
  { code: "+1", name: "Canada", flag: "🇨🇦", maxLength: 10 },
  { code: "+238", name: "Cape Verde", flag: "🇨🇻", maxLength: 7 },
  { code: "+236", name: "Central African Republic", flag: "🇨🇫", maxLength: 8 },
  { code: "+235", name: "Chad", flag: "🇹🇩", maxLength: 8 },
  { code: "+56", name: "Chile", flag: "🇨🇱", maxLength: 9 },
  { code: "+86", name: "China", flag: "🇨🇳", maxLength: 11 },
  { code: "+57", name: "Colombia", flag: "🇨🇴", maxLength: 10 },
  { code: "+269", name: "Comoros", flag: "🇰🇲", maxLength: 7 },
  { code: "+242", name: "Congo", flag: "🇨🇬", maxLength: 9 },
  { code: "+506", name: "Costa Rica", flag: "🇨🇷", maxLength: 8 },
  { code: "+385", name: "Croatia", flag: "🇭🇷", maxLength: 9 },
  { code: "+53", name: "Cuba", flag: "🇨🇺", maxLength: 8 },
  { code: "+357", name: "Cyprus", flag: "🇨🇾", maxLength: 8 },
  { code: "+420", name: "Czech Republic", flag: "🇨🇿", maxLength: 9 },
  { code: "+45", name: "Denmark", flag: "🇩🇰", maxLength: 8 },
  { code: "+253", name: "Djibouti", flag: "🇩🇯", maxLength: 8 },
  { code: "+593", name: "Ecuador", flag: "🇪🇨", maxLength: 9 },
  { code: "+20", name: "Egypt", flag: "🇪🇬", maxLength: 10 },
  { code: "+503", name: "El Salvador", flag: "🇸🇻", maxLength: 8 },
  { code: "+240", name: "Equatorial Guinea", flag: "🇬🇶", maxLength: 9 },
  { code: "+291", name: "Eritrea", flag: "🇪🇷", maxLength: 7 },
  { code: "+372", name: "Estonia", flag: "🇪🇪", maxLength: 8 },
  { code: "+251", name: "Ethiopia", flag: "🇪🇹", maxLength: 9 },
  { code: "+679", name: "Fiji", flag: "🇫🇯", maxLength: 7 },
  { code: "+358", name: "Finland", flag: "🇫🇮", maxLength: 10 },
  { code: "+33", name: "France", flag: "🇫🇷", maxLength: 9 },
  { code: "+241", name: "Gabon", flag: "🇬🇦", maxLength: 7 },
  { code: "+220", name: "Gambia", flag: "🇬🇲", maxLength: 7 },
  { code: "+995", name: "Georgia", flag: "🇬🇪", maxLength: 9 },
  { code: "+49", name: "Germany", flag: "🇩🇪", maxLength: 11 },
  { code: "+233", name: "Ghana", flag: "🇬🇭", maxLength: 9 },
  { code: "+30", name: "Greece", flag: "🇬🇷", maxLength: 10 },
  { code: "+502", name: "Guatemala", flag: "🇬🇹", maxLength: 8 },
  { code: "+224", name: "Guinea", flag: "🇬🇳", maxLength: 9 },
  { code: "+245", name: "Guinea-Bissau", flag: "🇬🇼", maxLength: 7 },
  { code: "+592", name: "Guyana", flag: "🇬🇾", maxLength: 7 },
  { code: "+509", name: "Haiti", flag: "🇭🇹", maxLength: 8 },
  { code: "+504", name: "Honduras", flag: "🇭🇳", maxLength: 8 },
  { code: "+852", name: "Hong Kong", flag: "🇭🇰", maxLength: 8 },
  { code: "+36", name: "Hungary", flag: "🇭🇺", maxLength: 9 },
  { code: "+354", name: "Iceland", flag: "🇮🇸", maxLength: 7 },
  { code: "+91", name: "India", flag: "🇮🇳", maxLength: 10 },
  { code: "+62", name: "Indonesia", flag: "🇮🇩", maxLength: 11 },
  { code: "+98", name: "Iran", flag: "🇮🇷", maxLength: 10 },
  { code: "+964", name: "Iraq", flag: "🇮🇶", maxLength: 10 },
  { code: "+353", name: "Ireland", flag: "🇮🇪", maxLength: 9 },
  { code: "+39", name: "Italy", flag: "🇮🇹", maxLength: 10 },
  { code: "+225", name: "Ivory Coast", flag: "🇨🇮", maxLength: 8 },
  { code: "+81", name: "Japan", flag: "🇯🇵", maxLength: 10 },
  { code: "+962", name: "Jordan", flag: "🇯🇴", maxLength: 9 },
  { code: "+7", name: "Kazakhstan", flag: "🇰🇿", maxLength: 10 },
  { code: "+254", name: "Kenya", flag: "🇰🇪", maxLength: 10 },
  { code: "+965", name: "Kuwait", flag: "🇰🇼", maxLength: 8 },
  { code: "+996", name: "Kyrgyzstan", flag: "🇰🇬", maxLength: 9 },
  { code: "+856", name: "Laos", flag: "🇱🇦", maxLength: 9 },
  { code: "+371", name: "Latvia", flag: "🇱🇻", maxLength: 8 },
  { code: "+961", name: "Lebanon", flag: "🇱🇧", maxLength: 8 },
  { code: "+266", name: "Lesotho", flag: "🇱🇸", maxLength: 8 },
  { code: "+231", name: "Liberia", flag: "🇱🇷", maxLength: 8 },
  { code: "+218", name: "Libya", flag: "🇱🇾", maxLength: 10 },
  { code: "+423", name: "Liechtenstein", flag: "🇱🇮", maxLength: 7 },
  { code: "+370", name: "Lithuania", flag: "🇱🇹", maxLength: 8 },
  { code: "+352", name: "Luxembourg", flag: "🇱🇺", maxLength: 9 },
  { code: "+853", name: "Macau", flag: "🇲🇴", maxLength: 8 },
  { code: "+389", name: "North Macedonia", flag: "🇲🇰", maxLength: 8 },
  { code: "+261", name: "Madagascar", flag: "🇲🇬", maxLength: 9 },
  { code: "+265", name: "Malawi", flag: "🇲🇼", maxLength: 9 },
  { code: "+60", name: "Malaysia", flag: "🇲🇾", maxLength: 10 },
  { code: "+960", name: "Maldives", flag: "🇲🇻", maxLength: 7 },
  { code: "+223", name: "Mali", flag: "🇲🇱", maxLength: 8 },
  { code: "+356", name: "Malta", flag: "🇲🇹", maxLength: 8 },
  { code: "+222", name: "Mauritania", flag: "🇲🇷", maxLength: 8 },
  { code: "+230", name: "Mauritius", flag: "🇲🇺", maxLength: 8 },
  { code: "+52", name: "Mexico", flag: "🇲🇽", maxLength: 10 },
  { code: "+373", name: "Moldova", flag: "🇲🇩", maxLength: 8 },
  { code: "+377", name: "Monaco", flag: "🇲🇨", maxLength: 8 },
  { code: "+976", name: "Mongolia", flag: "🇲🇳", maxLength: 8 },
  { code: "+382", name: "Montenegro", flag: "🇲🇪", maxLength: 8 },
  { code: "+212", name: "Morocco", flag: "🇲🇦", maxLength: 9 },
  { code: "+258", name: "Mozambique", flag: "🇲🇿", maxLength: 9 },
  { code: "+95", name: "Myanmar", flag: "🇲🇲", maxLength: 9 },
  { code: "+264", name: "Namibia", flag: "🇳🇦", maxLength: 9 },
  { code: "+977", name: "Nepal", flag: "🇳🇵", maxLength: 10 },
  { code: "+31", name: "Netherlands", flag: "🇳🇱", maxLength: 9 },
  { code: "+64", name: "New Zealand", flag: "🇳🇿", maxLength: 9 },
  { code: "+505", name: "Nicaragua", flag: "🇳🇮", maxLength: 8 },
  { code: "+227", name: "Niger", flag: "🇳🇪", maxLength: 8 },
  { code: "+234", name: "Nigeria", flag: "🇳🇬", maxLength: 10 },
  { code: "+47", name: "Norway", flag: "🇳🇴", maxLength: 8 },
  { code: "+968", name: "Oman", flag: "🇴🇲", maxLength: 8 },
  { code: "+92", name: "Pakistan", flag: "🇵🇰", maxLength: 10 },
  { code: "+970", name: "Palestine", flag: "🇵🇸", maxLength: 9 },
  { code: "+507", name: "Panama", flag: "🇵🇦", maxLength: 8 },
  { code: "+675", name: "Papua New Guinea", flag: "🇵🇬", maxLength: 8 },
  { code: "+595", name: "Paraguay", flag: "🇵🇾", maxLength: 9 },
  { code: "+51", name: "Peru", flag: "🇵🇪", maxLength: 9 },
  { code: "+63", name: "Philippines", flag: "🇵🇭", maxLength: 10 },
  { code: "+48", name: "Poland", flag: "🇵🇱", maxLength: 9 },
  { code: "+351", name: "Portugal", flag: "🇵🇹", maxLength: 9 },
  { code: "+974", name: "Qatar", flag: "🇶🇦", maxLength: 8 },
  { code: "+40", name: "Romania", flag: "🇷🇴", maxLength: 10 },
  { code: "+7", name: "Russia", flag: "🇷🇺", maxLength: 10 },
  { code: "+250", name: "Rwanda", flag: "🇷🇼", maxLength: 9 },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", maxLength: 9 },
  { code: "+221", name: "Senegal", flag: "🇸🇳", maxLength: 9 },
  { code: "+381", name: "Serbia", flag: "🇷🇸", maxLength: 9 },
  { code: "+248", name: "Seychelles", flag: "🇸🇨", maxLength: 7 },
  { code: "+232", name: "Sierra Leone", flag: "🇸🇱", maxLength: 8 },
  { code: "+65", name: "Singapore", flag: "🇸🇬", maxLength: 8 },
  { code: "+421", name: "Slovakia", flag: "🇸🇰", maxLength: 9 },
  { code: "+386", name: "Slovenia", flag: "🇸🇮", maxLength: 9 },
  { code: "+252", name: "Somalia", flag: "🇸🇴", maxLength: 8 },
  { code: "+27", name: "South Africa", flag: "🇿🇦", maxLength: 9 },
  { code: "+82", name: "South Korea", flag: "🇰🇷", maxLength: 10 },
  { code: "+211", name: "South Sudan", flag: "🇸🇸", maxLength: 9 },
  { code: "+34", name: "Spain", flag: "🇪🇸", maxLength: 9 },
  { code: "+94", name: "Sri Lanka", flag: "🇱🇰", maxLength: 9 },
  { code: "+249", name: "Sudan", flag: "🇸🇩", maxLength: 9 },
  { code: "+597", name: "Suriname", flag: "🇸🇷", maxLength: 7 },
  { code: "+268", name: "Eswatini", flag: "🇸🇿", maxLength: 8 },
  { code: "+46", name: "Sweden", flag: "🇸🇪", maxLength: 9 },
  { code: "+41", name: "Switzerland", flag: "🇨🇭", maxLength: 9 },
  { code: "+963", name: "Syria", flag: "🇸🇾", maxLength: 9 },
  { code: "+886", name: "Taiwan", flag: "🇹🇼", maxLength: 9 },
  { code: "+992", name: "Tajikistan", flag: "🇹🇯", maxLength: 9 },
  { code: "+255", name: "Tanzania", flag: "🇹🇿", maxLength: 9 },
  { code: "+66", name: "Thailand", flag: "🇹🇭", maxLength: 9 },
  { code: "+228", name: "Togo", flag: "🇹🇬", maxLength: 8 },
  { code: "+216", name: "Tunisia", flag: "🇹🇳", maxLength: 8 },
  { code: "+90", name: "Turkey", flag: "🇹🇷", maxLength: 10 },
  { code: "+993", name: "Turkmenistan", flag: "🇹🇲", maxLength: 8 },
  { code: "+256", name: "Uganda", flag: "🇺🇬", maxLength: 9 },
  { code: "+380", name: "Ukraine", flag: "🇺🇦", maxLength: 9 },
  { code: "+971", name: "United Arab Emirates", flag: "🇦🇪", maxLength: 9 },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧", maxLength: 10 },
  { code: "+1", name: "United States", flag: "🇺🇸", maxLength: 10 },
  { code: "+598", name: "Uruguay", flag: "🇺🇾", maxLength: 8 },
  { code: "+998", name: "Uzbekistan", flag: "🇺🇿", maxLength: 9 },
  { code: "+678", name: "Vanuatu", flag: "🇻🇺", maxLength: 7 },
  { code: "+58", name: "Venezuela", flag: "🇻🇪", maxLength: 10 },
  { code: "+84", name: "Vietnam", flag: "🇻🇳", maxLength: 10 },
  { code: "+967", name: "Yemen", flag: "🇾🇪", maxLength: 9 },
  { code: "+260", name: "Zambia", flag: "🇿🇲", maxLength: 9 },
  { code: "+263", name: "Zimbabwe", flag: "🇿🇼", maxLength: 9 },
];

export const UserIdModal = ({
  isOpen,
  onClose,
  onSubmit,
  hotelName,
}: UserIdModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(countryCodes[0]); // Default to Israel
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countryCodes.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      let finalNumber: string;
      
      // If Israel is selected, use "0" prefix instead of "+972"
      if (selectedCountry.code === "+972") {
        finalNumber = "0" + phoneNumber.trim();
      } else {
        // For other countries, remove the "+" and concatenate
        finalNumber = selectedCountry.code.replace("+", "") + phoneNumber.trim();
      }
      
      onSubmit(finalNumber);
      setPhoneNumber("");
      setSelectedCountry(countryCodes[0]); // Reset to Israel
      setSearchQuery("");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to max length
    if (/^\d*$/.test(value) && value.length <= selectedCountry.maxLength) {
      setPhoneNumber(value);
    }
  };

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    setSearchQuery("");
    setPhoneNumber(""); // Clear phone number when changing country
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-[#F9F6F0] rounded-lg shadow-2xl w-full max-w-[95vw] sm:max-w-md md:max-w-lg p-4 sm:p-6 md:p-8 lg:p-10 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-[#3E617F] hover:text-[#D46737] transition-colors z-10"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              {/* Content */}
              <div className="text-center mb-4 sm:mb-6">
                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#3E617F] mb-1 sm:mb-2 pr-8"
                  style={{
                    fontFamily: "Love, serif",
                    fontWeight: 400,
                  }}
                >
                  {hotelName}
                </h2>
                <p
                  className="text-[#3E617F] text-xs sm:text-sm md:text-base"
                  style={{
                    fontFamily: "'Assistant', sans-serif",
                    fontWeight: 200,
                  }}
                  dir="rtl"
                >
                  נא להזין מספר טלפון
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label
                    htmlFor="userId"
                    className="block text-[#3E617F] mb-2 text-xs sm:text-sm"
                    style={{
                      fontFamily: "Love, serif",
                      fontWeight: 400,
                    }}
                  >
                    Phone Number
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2">
                    {/* Custom Searchable Dropdown */}
                    <div className="relative w-full sm:min-w-[140px] sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full px-3 py-2.5 sm:py-3 bg-[#f8f5f0] border-2 border-[#3E617F]/20 rounded-md focus:outline-none focus:border-[#D46737] transition-colors text-[#3E617F] flex items-center justify-between text-sm sm:text-base"
                        style={{
                          fontFamily: "Love, serif",
                          fontWeight: 400,
                        }}
                      >
                        <span>
                          {selectedCountry.flag} {selectedCountry.code}
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {dropdownOpen && (
                        <div className="absolute top-full left-0 right-0 sm:min-w-[250px] mt-1 bg-[#F9F6F0] border-2 border-[#3E617F]/20 rounded-md shadow-xl z-50 max-h-60 sm:max-h-64 overflow-hidden flex flex-col">
                          {/* Search Input */}
                          <div className="p-2 border-b border-[#3E617F]/20 sticky top-0 bg-[#F9F6F0]">
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#3E617F]/60" />
                              <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                                className="w-full pl-9 pr-3 py-2 bg-[#f8f5f0] border border-[#3E617F]/20 rounded-md focus:outline-none focus:border-[#D46737] transition-colors text-[#3E617F] text-sm"
                                style={{
                                  fontFamily: "Love, serif",
                                  fontWeight: 400,
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                            </div>
                          </div>

                          {/* Country List */}
                          <div className="overflow-y-auto">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <button
                                  key={country.code + country.name}
                                  type="button"
                                  onClick={() => handleCountrySelect(country)}
                                  className={`w-full px-3 py-2 text-left hover:bg-[#3E617F]/10 transition-colors flex items-center gap-2 ${
                                    selectedCountry.code === country.code
                                      ? "bg-[#D46737]/10"
                                      : ""
                                  }`}
                                  style={{
                                    fontFamily: "Love, serif",
                                    fontWeight: 400,
                                  }}
                                >
                                  <span className="text-base sm:text-lg">{country.flag}</span>
                                  <span className="text-[#3E617F] text-xs sm:text-sm">
                                    {country.name} ({country.code})
                                  </span>
                                </button>
                              ))
                            ) : (
                              <div className="px-3 py-4 text-center text-[#3E617F]/60 text-sm">
                                No countries found
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <input
                      type="text"
                      id="userId"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="flex-1 w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-[#f8f5f0] border-2 border-[#3E617F]/20 rounded-md focus:outline-none focus:border-[#D46737] transition-colors text-[#3E617F] text-sm sm:text-base"
                      placeholder={`Enter ${selectedCountry.maxLength} digits`}
                      style={{
                        fontFamily: "Love, serif",
                        fontWeight: 400,
                      }}
                      required
                    />
                  </div>
                  <p
                    className="mt-2 text-xs text-[#3E617F]/60"
                    style={{
                      fontFamily: "Love, serif",
                      fontWeight: 400,
                    }}
                  >
                    {selectedCountry.code === "+972" 
                      ? "Will be saved as: 0xxxxxxxxx" 
                      : `Will be saved as: ${selectedCountry.code.replace('+', '')}xxxxxxxxx`}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 sm:py-4 bg-[#D46737] text-white rounded-md hover:bg-[#D46737]/90 transition-colors shadow-md text-base sm:text-lg"
                  style={{
                    fontFamily: "Love, serif",
                    fontWeight: 400,
                  }}
                >
                  Continue
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
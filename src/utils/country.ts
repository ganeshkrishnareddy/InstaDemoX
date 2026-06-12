export interface CountryData {
  code: string;
  name: string;
  flag: string;
  currencySymbol: string;
  cities: string[];
  pricing: {
    starter: string;
    business: string;
    agency: string;
  };
}

export const COUNTRIES: CountryData[] = [
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    currencySymbol: "₹",
    cities: ["Tirupati", "Hyderabad", "Chennai", "Noida", "Bangalore", "Mumbai", "Pune"],
    pricing: { starter: "₹499", business: "₹999", agency: "₹2,499" }
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    currencySymbol: "$",
    cities: ["New York", "Los Angeles", "Chicago", "San Francisco", "Miami", "Seattle", "Austin"],
    pricing: { starter: "$19", business: "$39", agency: "$79" }
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    currencySymbol: "£",
    cities: ["London", "Manchester", "Birmingham", "Edinburgh", "Leeds", "Bristol"],
    pricing: { starter: "£15", business: "£29", agency: "£69" }
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    currencySymbol: "AED ",
    cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
    pricing: { starter: "DH 69", business: "DH 149", agency: "DH 299" }
  }
];

export function getLeadCountryInfo(city: string = ""): CountryInfo {
  const normCity = city ? city.toLowerCase() : "";
  
  // USA cities
  if (["new york", "los angeles", "chicago", "san francisco", "miami", "seattle", "austin"].some(c => normCity.includes(c))) {
    return { code: "US", name: "United States", currencySymbol: "$", priceFactor: 0.12 };
  }
  
  // UK cities
  if (["london", "manchester", "birmingham", "edinburgh", "leeds", "bristol"].some(c => normCity.includes(c))) {
    return { code: "GB", name: "United Kingdom", currencySymbol: "£", priceFactor: 0.1 };
  }
  
  // UAE cities
  if (["dubai", "abu dhabi", "sharjah", "ajman"].some(c => normCity.includes(c))) {
    return { code: "AE", name: "United Arab Emirates", currencySymbol: "AED ", priceFactor: 0.45 };
  }
  
  // Default to India
  return { code: "IN", name: "India", currencySymbol: "₹", priceFactor: 1.0 };
}

interface CountryInfo {
  code: string;
  name: string;
  currencySymbol: string;
  priceFactor: number;
}

export function convertPrice(rupeeValue: string | number, city: string = ""): string {
  const normCity = city ? city.toLowerCase() : "";
  
  let numericVal = 0;
  if (typeof rupeeValue === "number") {
    numericVal = rupeeValue;
  } else {
    const cleaned = rupeeValue.replace(/[^0-9]/g, "");
    numericVal = parseInt(cleaned, 10) || 0;
  }

  // USA
  if (["new york", "los angeles", "chicago", "san francisco", "miami", "seattle", "austin"].some(c => normCity.includes(c))) {
    if (typeof rupeeValue === "string" && rupeeValue.toLowerCase().includes("lakh")) {
      const lakhs = numericVal < 100 ? numericVal : numericVal / 100000;
      const dollarsVal = Math.round(lakhs * 1200);
      return `$${dollarsVal.toLocaleString()}k`;
    }
    
    if (numericVal === 180) return "$12.99";
    if (numericVal === 220) return "$15.49";
    if (numericVal === 280) return "$18.99";
    if (numericVal === 120) return "$8.99";
    if (numericVal === 160) return "$11.49";
    if (numericVal === 60) return "$4.99";
    
    if (numericVal === 1800) return "$129/night";
    if (numericVal === 2800) return "$199/night";
    if (numericVal === 4500) return "$329/night";
    
    if (numericVal === 200) return "$25";
    if (numericVal === 500) return "$59";
    if (numericVal === 1200) return "$120";
    if (numericVal === 5000) return "$499";
    
    if (numericVal === 699) return "$49/mo";
    if (numericVal === 999) return "$69/mo";
    if (numericVal === 1499) return "$99/mo";

    const dollars = Math.round(numericVal * 0.12);
    return `$${dollars}`;
  }
  
  // UK
  if (["london", "manchester", "birmingham", "edinburgh", "leeds", "bristol"].some(c => normCity.includes(c))) {
    if (typeof rupeeValue === "string" && rupeeValue.toLowerCase().includes("lakh")) {
      const lakhs = numericVal < 100 ? numericVal : numericVal / 100000;
      const poundsVal = Math.round(lakhs * 1000);
      return `£${poundsVal.toLocaleString()}k`;
    }
    
    if (numericVal === 180) return "£9.99";
    if (numericVal === 220) return "£12.49";
    if (numericVal === 280) return "£15.99";
    if (numericVal === 120) return "£6.99";
    if (numericVal === 160) return "£8.99";
    if (numericVal === 60) return "£3.99";
    
    if (numericVal === 1800) return "£99/night";
    if (numericVal === 2800) return "£149/night";
    if (numericVal === 4500) return "£249/night";
    
    if (numericVal === 200) return "£20";
    if (numericVal === 500) return "£45";
    if (numericVal === 1200) return "£95";
    if (numericVal === 5000) return "£399";
    
    if (numericVal === 699) return "£39/mo";
    if (numericVal === 999) return "£59/mo";
    if (numericVal === 1499) return "£89/mo";

    const pounds = Math.round(numericVal * 0.1);
    return `£${pounds}`;
  }
  
  // UAE
  if (["dubai", "abu dhabi", "sharjah", "ajman"].some(c => normCity.includes(c))) {
    if (typeof rupeeValue === "string" && rupeeValue.toLowerCase().includes("lakh")) {
      const lakhs = numericVal < 100 ? numericVal : numericVal / 100000;
      const aedVal = Math.round(lakhs * 4500);
      return `${aedVal.toLocaleString()} AED`;
    }
    
    if (numericVal === 180) return "45 AED";
    if (numericVal === 220) return "55 AED";
    if (numericVal === 280) return "69 AED";
    if (numericVal === 120) return "29 AED";
    if (numericVal === 160) return "39 AED";
    if (numericVal === 60) return "15 AED";
    
    if (numericVal === 1800) return "399 AED/night";
    if (numericVal === 2800) return "599 AED/night";
    if (numericVal === 4500) return "999 AED/night";
    
    if (numericVal === 200) return "89 AED";
    if (numericVal === 500) return "199 AED";
    if (numericVal === 1200) return "450 AED";
    if (numericVal === 5000) return "1,999 AED";
    
    if (numericVal === 699) return "149 AED/mo";
    if (numericVal === 999) return "219 AED/mo";
    if (numericVal === 1499) return "329 AED/mo";

    const aed = Math.round(numericVal * 0.45);
    return `${aed} AED`;
  }
  
  // Defaults to Rupees (India)
  if (typeof rupeeValue === "string") {
    // Add /mo or /night tag if appropriate
    if (rupeeValue === "₹1,800" || rupeeValue === "₹2,800" || rupeeValue === "₹4,500") {
      return `${rupeeValue}/night`;
    }
    if (rupeeValue === "₹699" || rupeeValue === "₹999" || rupeeValue === "₹1,499") {
      return `${rupeeValue}/month`;
    }
    return rupeeValue;
  }
  return `₹${rupeeValue}`;
}

export function convertPriceRange(rangeStr: string, city: string = ""): string {
  const normCity = city ? city.toLowerCase() : "";
  const isUS = ["new york", "los angeles", "chicago", "san francisco", "miami", "seattle", "austin"].some(c => normCity.includes(c));
  const isUK = ["london", "manchester", "birmingham", "edinburgh", "leeds", "bristol"].some(c => normCity.includes(c));
  const isUAE = ["dubai", "abu dhabi", "sharjah", "ajman"].some(c => normCity.includes(c));

  if (isUS) {
    if (rangeStr.includes("Below ₹30 Lakhs")) return "Below $300k";
    if (rangeStr.includes("30-60") || rangeStr.includes("₹30 Lakhs - ₹60 Lakhs")) return "$300k - $600k";
    if (rangeStr.includes("₹60 Lakhs - ₹1 Crore")) return "$600k - $1.2M";
    if (rangeStr.includes("Above ₹1 Crore")) return "Above $1.2M";
    return rangeStr.replace("₹", "$").replace("Lakhs", "k").replace("Crore", "M");
  }
  if (isUK) {
    if (rangeStr.includes("Below ₹30 Lakhs")) return "Below £250k";
    if (rangeStr.includes("30-60") || rangeStr.includes("₹30 Lakhs - ₹60 Lakhs")) return "£250k - £500k";
    if (rangeStr.includes("₹60 Lakhs - ₹1 Crore")) return "£500k - £1M";
    if (rangeStr.includes("Above ₹1 Crore")) return "Above £1M";
    return rangeStr.replace("₹", "£").replace("Lakhs", "k").replace("Crore", "M");
  }
  if (isUAE) {
    if (rangeStr.includes("Below ₹30 Lakhs")) return "Below 1.2M AED";
    if (rangeStr.includes("30-60") || rangeStr.includes("₹30 Lakhs - ₹60 Lakhs")) return "1.2M AED - 2.5M AED";
    if (rangeStr.includes("₹60 Lakhs - ₹1 Crore")) return "2.5M AED - 5M AED";
    if (rangeStr.includes("Above ₹1 Crore")) return "Above 5M AED";
    return rangeStr.replace("₹", "").replace("Lakhs", "").replace("Crore", "").trim() + " AED";
  }
  return rangeStr;
}

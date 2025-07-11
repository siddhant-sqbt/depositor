const CWCLogo = () => {
  return (
    // <div className="flex items-center justify-between border-b border-gray-300 py-2 px-4 bg-white">
    //   {/* Left: Logo and Organization Info */}
    //   <div className="flex items-center space-x-4">
    //     {/* Logo */}
    //     <img src="/cwc-logo.png" alt="CWC Logo" className="w-24 h-20 object-contain" />

    //     {/* Organization Name */}
    //     <div className="leading-tight">
    //       <div className="text-lg font-semibold text-black">केंद्रीय भण्डारण निगम</div>
    //       <div className="text-sm text-gray-800">(भारत सरकार का उपक्रम)</div>
    //       <div className="text-base font-bold text-black uppercase">CENTRAL WAREHOUSING CORPORATION</div>
    //       <div className="text-xs text-gray-700">(A GOVERNMENT OF INDIA UNDERTAKING)</div>
    //     </div>
    //   </div>

    //   {/* Right: Slogan */}
    //   <div className="text-right leading-tight">
    //     <div className="text-xs font-medium uppercase text-gray-800">WAREHOUSING FOR EVERYONE</div>
    //     <div className="text-sm font-semibold text-blue-900">जन जन के लिए भण्डारण</div>
    //   </div>
    // </div>
    <div className="flex items-center justify-start max-w-fit gap-2 bg-white">
      <div className="hidden md:block">
        <img src="/cwc-logo.png" alt="Central Warehousing Corporation logo" className="w-25 h-20 object-cover" style={{ width: "6.25rem" }} />
      </div>

      <div className="leading-tight text-center mx-auto">
        <div className="devanagari font-bold text-lg">केंद्रीय भण्डारण निगम</div>
        <div className="devanagari -mt-2">( भारत सरकार का उपक्रम )</div>
        <div className="font-bold">CENTRAL WAREHOUSING CORPORATION</div>
        <div className="-mt-1">(A GOVERNMENT OF INDIA UNDERTAKING)</div>
      </div>

      <div className="hidden md:block leading-tight pl-2 ml-2 border-l-2 border-current max-h-fit">
        <div className="font-bold">WAREHOUSING FOR EVERYONE</div>
        <div className="devanagari -mt-1">जन जन के लिए भण्डारण</div>
      </div>
    </div>
  );
};

export default CWCLogo;

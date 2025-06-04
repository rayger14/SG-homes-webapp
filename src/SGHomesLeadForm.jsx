
import { useState } from "react";

export default function SGHomesLeadForm() {
  const [formData, setFormData] = useState({
    ownerName: "",
    address: "",
    phone: "",
    email: "",
    homeCondition: "",
    partnershipType: "sell",
    notes: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbyRWPMpHJyldLBsZOPuAFgmhSCS0SrCFwIyWt51nx9uK4WYAxuarkxJcqJswq_BiI67Bg/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.text();
      console.log("Response:", result);
      setSubmitted(true);
      setFormData({
        ownerName: "",
        address: "",
        phone: "",
        email: "",
        homeCondition: "",
        partnershipType: "sell",
        notes: ""
      });
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <header style={{ backgroundColor: '#1f2937', color: 'white', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '5px' }}>SG Homes</h1>
        <p style={{ fontSize: '16px' }}>Helping Homeowners Sell or Partner With Confidence</p>
      </header>

      <div style={{ maxWidth: '1000px', margin: '20px auto' }}>
        <img
          src="https://images.unsplash.com/photo-1572120360610-d971b9b63968?auto=format&fit=crop&w=1350&q=80"
          alt="Beautiful home"
          style={{ width: '100%', borderRadius: '8px', maxHeight: '400px', objectFit: 'cover' }}
        />
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Choose Your Partnership</h2>
        <div style={{ background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          {submitted && <p style={{ color: 'green' }}>Thank you! Your info has been submitted.</p>}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input placeholder="Owner Name" name="ownerName" value={formData.ownerName} onChange={handleChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input placeholder="Property Address" name="address" value={formData.address} onChange={handleChange} required style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <input placeholder="Email Address" name="email" value={formData.email} onChange={handleChange} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <textarea placeholder="Describe the home's condition..." name="homeCondition" value={formData.homeCondition} onChange={handleChange} rows={3} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <div>
              <label style={{ fontWeight: 'bold' }}>Select Partnership Type:</label><br />
              <label><input type="radio" name="partnershipType" value="sell" checked={formData.partnershipType === "sell"} onChange={handleChange} /> Sell My House (Fast Cash Offer, As-Is, No Fees)</label><br />
              <label><input type="radio" name="partnershipType" value="partner" checked={formData.partnershipType === "partner"} onChange={handleChange} /> Partner with SG Homes (We Renovate, Split Profits)</label>
            </div>
            <textarea placeholder="Additional Notes (optional)" name="notes" value={formData.notes} onChange={handleChange} rows={2} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            <button type="submit" style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

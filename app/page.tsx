'use client';
import React, { useState } from 'react';
import jsPDF from 'jspdf';

export default function Page() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("KAHELISZTO KFT.", 105, 20, { align: "center" });
    doc.setFontSize(16);
    doc.text("FELUJITASI CSEKKLISTA", 105, 35, { align: "center" });
    
    doc.setFontSize(12);
    const pontok = [
      "1. Statikai szakvelemeny (Fofalak elott)",
      "2. Elektromos halozat felmerese",
      "3. Vizesedes vizsgalata",
      "4. CSOK es tamogatasok ellenorzese",
      "5. Irasos vallalkozoi szerzodes",
      "6. Sittszallitas es kontener",
      "7. Burkolatok rendelési ideje",
      "8. Szaradasi idok betartasa",
      "9. Szomszedok tajekoztatasa",
      "10. 15% tartalekkeret kepzese"
    ];

    pontok.forEach((pont, i) => {
      doc.text(pont, 20, 55 + (i * 12));
    });

    doc.save("Kaheliszto_Csekklista.pdf");
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      downloadPDF();
    }, 1500);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#0f172a',
      fontFamily: 'sans-serif',
      color: 'white'
    }}>
      <div style={{ 
        backgroundColor: '#1e293b', 
        padding: '40px', 
        borderRadius: '24px', 
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        maxWidth: '400px',
        width: '90%'
      }}>
        <h1 style={{ marginBottom: '10px' }}>KAHELISZTO KFT.</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Ingyenes Lakásfelújítási Segédlet</p>
        
        {!success ? (
          <form onSubmit={onSubmit}>
            <input
              type="email"
              placeholder="Email címed"
              required
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '12px',
                border: 'none',
                marginBottom: '20px',
                boxSizing: 'border-box'
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#3b82f6',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {loading ? 'KÜLDÉS...' : 'KÉREM A LISTÁT'}
            </button>
          </form>
        ) : (
          <div style={{ color: '#4ade80', fontWeight: 'bold' }}>
            Sikeres! A letöltés elindult.
          </div>
        )}
      </div>
    </div>
  );
}

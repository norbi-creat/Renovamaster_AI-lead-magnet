'use client';
import React, { useState } from 'react';
import { Download, CheckCircle } from 'lucide-react';
import jsPDF from 'jspdf';

export default function Page() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleDownload = (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFontSize(22);
      doc.text("KAHELISZTO KFT.", 105, 20, { align: "center" });
      doc.setFontSize(14);
      doc.text("10 PONTOS FELUJITASI CSEKKLISTA", 105, 35, { align: "center" });
      
      const lista = [
        "1. Statikai szakvelemeny", "2. Elektromos halozat", "3. Vizesedes vizsgalat",
        "4. CSOK szabalyok", "5. Irasos szerzodes", "6. Sittszallitas",
        "7. Anyagrendeles", "8. Szaradasi idok", "9. Szomszedok", "10. Tartalekkeret"
      ];

      lista.forEach((item, i) => doc.text(item, 20, 55 + (i * 12)));
      doc.save("Kaheliszto_Csekklista.pdf");
      
      setLoading(false);
      setDone(true);
    }, 1000);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: 'white' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '30px', textAlign: 'center', maxWidth: '400px', width: '90%' }}>
        <h1 style={{ margin: '0 0 10px 0' }}>KAHELISZTO KFT.</h1>
        <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Ingyenes Segédlet Felújítóknak</p>
        
        {!done ? (
          <form onSubmit={handleDownload}>
            <input 
              type="email" required placeholder="Email címed" 
              style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', marginBottom: '15px', boxSizing: 'border-box' }}
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <button style={{ width: '100%', padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
              {loading ? 'KÜLDÉS...' : 'LETÖLTÉS MOST'}
            </button>
          </form>
        ) : (
          <div>
            <CheckCircle size={50} color="#10b981" style={{ margin: 'auto' }} />
            <h2 style={{ marginTop: '20px' }}>Köszönjük!</h2>
            <p>A letöltés elindult.</p>
          </div>
        )}
      </div>
    </div>
  );
}

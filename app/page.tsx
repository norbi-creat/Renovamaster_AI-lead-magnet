'use client';
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { ShieldCheck, CheckCircle } from 'lucide-react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const img = new Image();
    
    // Itt a te képed neve legyen, ami a public mappában van!
    img.src = '/kezikonyv.png'; 

    // Megvárjuk, amíg a kép TELJESEN betöltődik
    img.onload = () => {
      try {
        doc.addImage(img, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
        doc.save("RenovaMaster_AI_Kezikonyv.pdf");
        // Csak a mentés UTÁN írjuk ki, hogy sikerült
        setSuccess(true);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Hiba a kép feldolgozása közben.");
        setLoading(false);
      }
    };

    img.onerror = () => {
      alert("Nem találom a 'kezikonyv.png' fájlt a public mappában!");
      setLoading(false);
    };
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    generatePDF(); // Itt indítjuk el a folyamatot
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      generatePDF();
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', fontFamily: 'sans-serif', color: 'white' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '32px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', maxWidth: '550px', width: '90%', border: '1px solid #334155' }}>
        
        <div style={{ marginBottom: '24px', color: '#10b981' }}>
            <ShieldCheck size={64} style={{margin: 'auto'}} />
        </div>
        
        <h1 style={{ marginBottom: '8px', fontSize: '32px' }}>RenovaMaster AI</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px', fontSize: '18px' }}>
          A Nyugodt Felújítás Kézikönyve
        </p>
        
        {!success ? (
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input
              type="email" placeholder="E-mail címed" required
              style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white' }}
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={loading} style={{ width: '100%', padding: '18px', borderRadius: '12px', border: 'none', backgroundColor: '#10b981', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
              {loading ? 'GENERÁLÁS...' : 'INGYENES LETÖLTÉS'}
            </button>
          </form>
        ) : (
          <div style={{ padding: '20px', border: '2px solid #10b981', borderRadius: '15px' }}>
            <CheckCircle size={40} color="#10b981" style={{ margin: 'auto', marginBottom: '10px' }} />
            <p>Sikeres letöltés!</p>
          </div>
        )}
      </div>
    </div>
  );
}

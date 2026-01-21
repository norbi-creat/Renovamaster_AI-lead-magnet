'use client';
import React, { useState } from 'react';
import { Mail, CheckCircle, Download, ShieldCheck, HardHat, Phone } from 'lucide-react';
import jsPDF from 'jspdf';

export default function Page() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("KAHELISZTO KFT. - FELUJITASI CSEKKLISTA", 10, 10);
    doc.text("1. Statikai szakvelemeny", 10, 20);
    doc.text("2. Elektromos halozat", 10, 30);
    doc.text("3. Vizesedes vizsgalat", 10, 40);
    doc.text("4. CSOK szabalyok", 10, 50);
    doc.text("5. Irasos szerzodes", 10, 60);
    doc.save("csekklista.pdf");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      generatePDF();
    }, 1000);
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ maxWidth: '400px', margin: 'auto', border: '1px solid #ccc', padding: '20px', borderRadius: '20px' }}>
        <h1 style={{ fontSize: '20px' }}>Kaheliszto Kft.</h1>
        <p>Ingyenes Felújítási Csekklista</p>
        {status !== 'success' ? (
          <form onSubmit={handleSubmit}>
            <input 
              type="email" 
              required 
              placeholder="Email címed" 
              style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '10px', border: '1px solid #ddd' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>
              LETÖLTÉS
            </button>
          </form>
        ) : (
          <p style={{ color: 'green' }}>Sikeres letöltés!</p>
        )}
      </div>
    </div>
  );
}

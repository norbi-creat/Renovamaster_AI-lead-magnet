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
    
    // FIGYELEM: A képnek a public mappában kell lennie kezikonyv.png néven!
    img.src = '/kezikonyv.png'; 

    img.onload = () => {
      try {
        // A képet rárakjuk a PDF-re (A4 méret: 210x297mm)
        doc.addImage(img, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
        doc.save("RenovaMaster_AI_Kezikonyv.pdf");
        
        // Csak ha a PDF mentése elindult, akkor mutatjuk a sikeres üzenetet
        setSuccess(true);
        setLoading(false);
      } catch (err) {
        console.error("PDF hiba:", err);
        alert("Hiba történt a PDF generálása közben.");
        setLoading(false);
      }
    };

    img.onerror = () => {
      console.error("Kép betöltési hiba. Ellenőrizd a public mappát!");
      alert("Hiba: Nem sikerült betölteni a képet a szerverről.");
      setLoading(false);
    };
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Elindítjuk a PDF generálást
    generatePDF();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', fontFamily: 'sans-serif', color: 'white' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '32px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', maxWidth: '550px', width: '90%', border: '1px solid #334155' }}>
        
        <div style={{ marginBottom: '24px', color: '#10b981' }}>
            <ShieldCheck size={64} style={{margin: 'auto'}} />
        </div>
        
        <h1 style={{ marginBottom: '8px', fontSize: '32px', fontWeight: 'bold' }}>RenovaMaster AI</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px', fontSize: '18px' }}>
          A Nyugodt Felújítás Kézikönyve
        </p>
        
        {!success ? (
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'left', fontSize: '14px', color: '#cbd5e1', marginBottom: '-8px' }}>E-mail címed a letöltéshez:</div>
            <input
              type="email" 
              placeholder="pelda@email.hu" 
              required
              style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '1px solid #334155', backgroundColor: '#0f172a', color: 'white', fontSize: '16px' }}
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <button 
              disabled={loading} 
              type="submit"
              style={{ width: '100%', padding: '18px', borderRadius: '12px', border: 'none', backgroundColor: loading ? '#334155' : '#10b981', color: 'white', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '16px' }}
            >
              {loading ? 'GENERÁLÁS ÉS LETÖLTÉS...' : 'INGYENES LETÖLTÉS'}
            </button>
          </form>
        ) : (
          <div style={{ padding: '30px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', borderRadius: '24px' }}>
            <CheckCircle size={48} color="#10b981" style={{ margin: 'auto', marginBottom: '16px' }} />
            <p style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>Sikeres letöltés!</p>
            <p style={{ fontSize: '15px', color: '#94a3b8' }}>A PDF fájlt a böngésződ elmentette.</p>
            <button onClick={() => setSuccess(false)} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', textDecoration: 'underline' }}>Új letöltés</button>
          </div>
        )}
      </div>
    </div>
  );
}

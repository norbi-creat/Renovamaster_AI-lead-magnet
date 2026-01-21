'use client';
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { ShieldCheck, CheckCircle } from 'lucide-react';

export default function Page() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Modern sötét fejléc (a logó színeihez igazodva)
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 50, 'F');
    
    // Feliratok a fejlécben
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.text("RenovaMaster AI", 105, 25, { align: "center" });
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("A NYUGODT FELÚJÍTÁS KÉZIKÖNYVE", 105, 38, { align: "center" });

    // Tartalom szakasz
    doc.setTextColor(30, 41, 59);
    const points = [
      { t: "1. Mérés pontossága (LiDAR alapok):", d: "Ne fogadja el a szemmértéket! Kérdezzen rá a LiDAR szkennelésre." },
      { t: "2. Részletes, tételre bontott árajánlat:", d: "Kerülje az egyösszegű ajánlatokat. Lássa a munkanemeket és anyagnormákat." },
      { t: "3. Digitális szerződés és jogbiztonság:", d: "Soha ne kezdjen írásos szerződés nélkül! Rögzítsék a határidőket." },
      { t: "4. Anyagszükséglet-számítás transzparenciája:", d: "Technológiával elkerülhető a pazarlás és a felesleges plusz költség." },
      { t: "5. Napi riportálás és fotódokumentáció:", d: "Ez a bizalom alapja. Kérjen minden nap végén jelentést fotókkal." },
      { t: "6. Rejtett költségek minimalizálása (Receptek):", d: "A profi receptekkel dolgozik, nincsenek utólagos meglepetések." },
      { t: "7. Szakmai háttér és referencia:", d: "Aki érti a dolgát, meg tudja magyarázni a gyémánttárcsás csiszolást is." },
      { t: "8. Határidők és ütemterv:", d: "A digitális támogatás segít a párhuzamos munkák összehangolásában." },
      { t: "9. Garancia és felelősségvállalás:", d: "Legyen minden fázisnak felelőse és digitális nyoma a dokumentációban." },
      { t: "10. A 'legolcsóbb' csapdája:", d: "Az a legolcsóbb, ami elsőre jól sikerül. Ne fizessen a javításért!" }
    ];

    let y = 70;
    points.forEach((p) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(p.t, 20, y);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(p.d, 22, y + 6);
      y += 20;
    });

    // Lábléc
    doc.setFontSize(9);
    doc.setTextColor(148, 163, 184);
    doc.text("© 2026 RenovaMaster AI - Minden jog fenntartva", 105, 285, { align: "center" });

    doc.save("RenovaMaster_AI_Kezikonyv.pdf");
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      generatePDF();
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a', fontFamily: 'sans-serif', color: 'white' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '32px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', maxWidth: '550px', width: '90%', border: '1px solid #334155' }}>
        
        {/* Ikon a weboldalon (a logó hangulatában) */}
        <div style={{ marginBottom: '24px', color: '#10b981' }}>
            <ShieldCheck size={64} style={{margin: 'auto'}} />
        </div>
        
        <h1 style={{ marginBottom: '8px', fontSize: '32px', letterSpacing: '-0.025em' }}>RenovaMaster AI</h1>
        <p style={{ color: '#94a3b8', marginBottom: '32px', fontSize: '18px' }}>
          A Nyugodt Felújítás Kézikönyve
        </p>
        
        {!success ? (
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'left', fontSize: '14px', color: '#cbd5e1', marginBottom: '-8px', marginLeft: '4px' }}>Küldjük a PDF-et:</div>
            <input
              type="email" placeholder="E-mail címed" required
              style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid #334155', backgroundColor: '#0f172a', color: 'white', boxSizing: 'border-box', fontSize: '16px', outline: 'none' }}
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
            <button disabled={loading} style={{ width: '100%', padding: '18px', borderRadius: '16px', border: 'none', backgroundColor: '#10b981', color: 'white', fontWeight: '800', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' }}>
              {loading ? 'GENERÁLÁS...' : 'INGYENES LETÖLTÉS MOST'}
            </button>
          </form>
        ) : (
          <div style={{ padding: '30px', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', borderRadius: '24px' }}>
            <CheckCircle size={48} color="#10b981" style={{ margin: 'auto', marginBottom: '16px' }} />
            <p style={{ fontWeight: 'bold', fontSize: '20px', marginBottom: '8px' }}>Sikeres letöltés!</p>
            <p style={{ fontSize: '15px', color: '#94a3b8' }}>A RenovaMaster AI kézikönyve elmentve.</p>
          </div>
        )}
      </div>
    </div>
  );
}

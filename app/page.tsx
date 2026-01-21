'use client';
import React, { useState } from 'react';
import { Mail, CheckCircle, Download, ShieldCheck, HardHat, Phone, Globe } from 'lucide-react';
import jsPDF from 'jspdf';

export default function LeadMagnetPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const provider = {
    name: 'Kaheliszto Építőipari Kft.',
    phone: '+36 30 123 4567',
    email: 'info@kaheliszto.hu',
    address: '3561 Felsőzsolca, Nagyszilvás u. 26.',
    regId: '05-09-035703',
    taxId: '32020162-2-05'
  };

  const generateChecklistPDF = () => {
    const doc = new jsPDF();
    doc.setFont("times", "normal");
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, 210, 45, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text("KAHELISZTO KFT.", 105, 18, { align: "center" });
    doc.setFontSize(14);
    doc.text("LAKÁSFELÚJÍTÁSI CSEKKLISTA", 105, 28, { align: "center" });
    doc.setTextColor(30, 41, 59);
    
    const points = [
      { t: "1. Statikai szakvélemény", d: "Főfalak bontása előtt kötelező!" },
      { t: "2. Elektromos hálózat", d: "Új gépekhez hálózatbővítés kell." },
      { t: "3. Vizesedés vizsgálat", d: "A penész ellen az okot kell megszüntetni." },
      { t: "4. CSOK szabályok", d: "A számláknak meg kell felelniük a szabályoknak." },
      { t: "5. Írásos szerződés", d: "Soha ne kezdj munkafolyamatot írásos rögzítés nélkül." },
      { t: "6. Sittszállítás", d: "Tervezd be a konténer költségét." },
      { t: "7. Anyagrendelés", d: "Bizonyos burkolatokra heteket kell várni." },
      { t: "8. Száradási idők", d: "A technológiai időt nem szabad siettetni." },
      { t: "9. Szomszédok", d: "Tájékoztasd őket a zajos munkák előtt." },
      { t: "10. Tartalékkeret", d: "Mindig különíts el +15%-ot váratlan hibákra." }
    ];

    let y = 65;
    points.forEach((p) => {
      doc.setFont("times", "bold");
      doc.text(p.t, 20, y);
      doc.setFont("times", "normal");
      doc.text(p.d, 25, y + 6);
      y += 18;
    });

    doc.setFillColor(241, 245, 249);
    doc.rect(20, 245, 170, 35, 'F');
    doc.text(`Hívj minket: ${provider.phone}`, 105, 260, { align: "center" });
    doc.save("Kaheliszto_Csekklista.pdf");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      generateChecklistPDF();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="bg-[#0f172a] p-10 text-center">
          <h1 className="text-2xl font-black text-white uppercase">Ingyenes Segédlet</h1>
          <p className="text-blue-400 font-bold mt-2">Kaheliszto Kft. Építőipari Szakértőktől</p>
        </div>
        <div className="p-10 text-center">
          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="email" 
                required 
                placeholder="Email címed" 
                className="w-full p-4 bg-slate-50 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3">
                <Download size={20} /> KÉREM A CSEKKLISTÁT
              </button>
            </form>
          ) : (
            <div className="py-6">
              <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Sikeres regisztráció!</h3>
              <p className="text-slate-500 text-sm mt-2">A letöltés elindult.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

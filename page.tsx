'use client';
import React, { useState } from 'react';
import { Mail, CheckCircle, Download, ShieldCheck, HardHat, Phone, Globe } from 'lucide-react';
import jsPDF from 'jspdf';

export default function LeadMagnetPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  // FIX CÉGADATOK A KAPCSOLATFELVÉTELHEZ
  const provider = {
    name: 'Kaheliszto Építőipari Kft.',
    phone: '+36 30 123 4567', // Cseréld ki a saját számodra!
    email: 'info@kaheliszto.hu', // Cseréld ki a saját email címedre!
    address: '3561 Felsőzsolca, Nagyszilvás u. 26.'
  };

  const generateChecklistPDF = () => {
    const doc = new jsPDF();
    
    // Modern magyar ékezetbarát betűtípus beállítása
    doc.setFont("times", "normal");

    // Sötétkék fejléc dekoráció
    doc.setFillColor(15, 23, 42); 
    doc.rect(0, 0, 210, 45, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text("KAHELISZTO KFT.", 105, 18, { align: "center" });
    
    doc.setFontSize(14);
    doc.text("LAKÁSFELÚJÍTÁSI CSEKKLISTA", 105, 28, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("times", "italic");
    doc.text("10 kritikus pont, amit ellenőrizned kell a felújítás előtt", 105, 36, { align: "center" });

    // Tartalom
    doc.setTextColor(30, 41, 59);
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    
    const points = [
      { t: "1. Statikai szakvélemény", d: "Főfalak bontása előtt kötelező, ne kockáztasd a ház épségét!" },
      { t: "2. Elektromos hálózat felmérése", d: "Az új konyhagépek és klímák miatt szinte mindig kell hálózatbővítés." },
      { t: "3. Vizesedés és penész vizsgálat", d: "A festés csak elfed, a problémát a gyökerénél kell kezelni." },
      { t: "4. CSOK és állami támogatások", d: "A számlák tartalmának meg kell felelnie a szigorú elszámolási szabályoknak." },
      { t: "5. Írásos vállalkozási szerződés", d: "Soha ne kezdj bele munkafolyamatba rögzített árak és határidők nélkül!" },
      { t: "6. Sittszállítás és konténer", d: "Tervezd be a logisztikát, a törmelék elszállítása jelentős költség." },
      { t: "7. Burkolatok rendelési ideje", d: "Sok prémium anyag szállítási ideje 4-8 hét, rendelj időben!" },
      { t: "8. Technológiai száradási idők", d: "Az aljzatbeton és a vakolat száradását nem szabad siettetni." },
      { t: "9. Kommunikáció a szomszédokkal", d: "A zajos munkák előtt tájékoztasd a lakóközösséget a béke érdekében." },
      { t: "10. Biztonsági tartalékkeret", d: "A bontás utáni váratlan hibákra mindig különíts el +15% összeget." }
    ];

    let y = 65;
    points.forEach((p, i) => {
      doc.setFont("times", "bold");
      doc.setFontSize(11);
      doc.text(p.t, 20, y);
      doc.setFont("times", "normal");
      doc.setFontSize(10);
      doc.text(p.d, 25, y + 6);
      y += 18;
    });

    // Kapcsolatfelvételi blokk a PDF alján
    doc.setFillColor(241, 245, 249);
    doc.rect(20, 245, 170, 35, 'F');
    doc.setTextColor(30, 41, 59);
    doc.setFont("times", "bold");
    doc.text("Ingyenes szaktanácsadásra van szükséged?", 105, 255, { align: "center" });
    doc.setFont("times", "normal");
    doc.setFontSize(10);
    doc.text(`Hívj minket bizalommal: ${provider.phone}`, 105, 262, { align: "center" });
    doc.text(`Email: ${provider.email} | Web: www.kaheliszto.hu`, 105, 268, { align: "center" });

    doc.save("Kaheliszto_Felujitasi_Csekklista.pdf");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    // Itt szimuláljuk a beküldést - Ide jöhet később a Formspree vagy Resend API
    setTimeout(() => {
      setStatus('success');
      generateChecklistPDF();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        
        {/* FEJLÉC */}
        <div className="bg-[#0f172a] p-10 text-center relative">
          <div className="absolute top-4 right-4 text-emerald-400 opacity-10">
            <HardHat size={100} />
          </div>
          <div className="inline-flex p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/40">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-black text-white leading-tight">
            INGYENES SEGÉDLET <br/>
            <span className="text-blue-400">FELÚJÍTÁSHOZ</span>
          </h1>
          <p className="text-slate-400 text-sm mt-4 leading-relaxed font-medium">
            Tudd meg, mire figyelj, mielőtt elköltesz <br/>
            egy forintot is a felújításra!
          </p>
        </div>

        {/* ŰRLAP */}
        <div className="p-10">
          {status !== 'success' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="email"
                  required
                  placeholder="Hová küldjük a listát?"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-semibold text-slate-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <button
                disabled={status === 'loading'}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <span className="animate-pulse">Küldés...</span>
                ) : (
                  <>
                    <Download size={20} /> KÉREM A CSEKKLISTÁT
                  </>
                )}
              </button>
              
              <div className="flex flex-col gap-2 pt-4">
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest justify-center">
                  <Phone size={12} className="text-blue-500" /> {provider.phone}
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Köszönjük!</h3>
              <p className="text-slate-500 text-sm mb-6 font-medium">
                A PDF letöltése automatikusan elindult. <br/>
                Kérdés esetén keress minket bizalommal!
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-blue-600 font-bold text-sm hover:underline"
              >
                Újra letöltöm
              </button>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-center gap-6">
           <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
             <ShieldCheck size={14} className="text-emerald-500" /> Hivatalos Vállalkozó
           </div>
           <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-tighter">
             <Globe size={14} className="text-blue-500" /> Borsod Megye
           </div>
        </div>
      </div>
    </div>
  );
}
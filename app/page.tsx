const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const img = new Image();
    
    // TESZT: Egy biztosan létező kép az internetről
    img.crossOrigin = "anonymous";
    img.src = 'https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png'; 

    img.onload = () => {
      try {
        doc.addImage(img, 'PNG', 10, 10, 50, 50);
        doc.text("A rendszer mukodik, a kep volt a hiba!", 10, 70);
        doc.save("Teszt_PDF.pdf");
        setSuccess(true);
        setLoading(false);
      } catch (err) {
        alert("Kép feldolgozási hiba: " + err);
        setLoading(false);
      }
    };

    img.onerror = () => {
      alert("Még a teszt képet sem tudom betölteni. Internet vagy böngésző hiba.");
      setLoading(false);
    };
  };

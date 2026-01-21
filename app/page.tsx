const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    
    // 1. Ráírunk egy teszt szöveget, hogy lássuk, működik-e a generálás
    doc.text("RenovaMaster Teszt PDF", 10, 10);
    
    const img = new Image();
    img.src = '/kezikonyv.png'; 

    img.onload = () => {
      try {
        doc.addImage(img, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
        doc.save("RenovaMaster_AI_Kezikonyv.pdf");
        setSuccess(true);
        setLoading(false);
      } catch (err) {
        // Ha a kép nem jó, de a szöveget rá tudta tenni, akkor is mentse le!
        doc.save("RenovaMaster_HIBAS_KEP.pdf");
        setLoading(false);
      }
    };

    img.onerror = () => {
      // Ha nem találja a képet, akkor is mentsen el egy PDF-et a szöveggel!
      doc.save("Csak_Szoveg_Kep_Nincs.pdf");
      alert("A képet nem találom, de a PDF-et legeneráltam kép nélkül!");
      setSuccess(true);
      setLoading(false);
    };
  };

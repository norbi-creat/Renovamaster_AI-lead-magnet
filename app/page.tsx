const generatePDF = () => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const img = new Image();
    
    // A crossOrigin segít, ha a böngésző blokkolná a kép betöltését
    img.crossOrigin = "Anonymous";
    img.src = '/kezikonyv.png?v=1'; // A ?v=1 kényszeríti a frissítést

    img.onload = () => {
      try {
        doc.addImage(img, 'PNG', 0, 0, 210, 297, undefined, 'FAST');
        doc.save("RenovaMaster_AI_Kezikonyv.pdf");
        setSuccess(true);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    img.onerror = () => {
      alert("Hiba: Nem sikerült betölteni a képet a szerverről.");
      setLoading(false);
    };
  };

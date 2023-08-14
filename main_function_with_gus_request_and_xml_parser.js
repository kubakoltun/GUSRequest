const request = require("request");

exports.main = (event, callback) => {
  const nip = event.inputFields['nip'];
	
  let klucz = 'abcde12345abcde12345';
  let api = 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc';
  let idArray = "";
  let id = "";
  let parser = "";

  let regon = "";
  let nazwaFirmy = "";
  let wojewodztwo = "";
  let powiat = "";
  let gmina = "";
  let miejscowosc = "";
  let kodPocztowy = "";
  let ulica = "";
  let nrNieruchomosci = "";
  let nrLokalu = "";
  let dataZakonczeniaDzialanosci = "";
  let miejscowoscPoczty = "";

  let zapytaniePortal = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
                  <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
                  <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action>
                      <wsa:To>${api}</wsa:To>
                  </soap:Header>
                  <soap:Body>
                  <ns:Zaloguj>
                      <ns:pKluczUzytkownika>${klucz}</ns:pKluczUzytkownika>
                  </ns:Zaloguj>
                  </soap:Body>
                  </soap:Envelope>`;

  let zapytanieNIP = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">
                      <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">
                          <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukajPodmioty</wsa:Action>
                          <wsa:To>${api}</wsa:To>
                      </soap:Header>
                      <soap:Body>
                      <ns:DaneSzukajPodmioty>
                      <ns:pParametryWyszukiwania>
                          <dat:Nip>${nip}</dat:Nip>
                      </ns:pParametryWyszukiwania>
                      </ns:DaneSzukajPodmioty>
                      </soap:Body>
                      </soap:Envelope>`;

  let zapytanieWyloguj = `<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">
                          <soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing"> 
                              <wsa:To>${api}</wsa:To> 
                          <wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj</wsa:Action> 
                          </soap:Header> 
                          <soap:Body> 
                          <ns:Wyloguj> 
                              <ns:pIdentyfikatorSesji>${id}</ns:pIdentyfikatorSesji> 
                          </ns:Wyloguj> 
                          </soap:Body>
                          </soap:Envelope>`;

  // login
  request.post({
      url:api,
      method:"POST",
      headers:{
          'Content-Type': 'application/soap+xml; charset=UTF-8;',
      },
       body: zapytaniePortal
  },
	       
  function(error, response, body) {
    idArray = body.split("ZalogujResult>");
    id = idArray[1].substring(0, idArray[1].length-2);
    console.log(`zaloguj id przed substring ${idArray[1]}`);
    console.log(id);

    // get data
    request.post({
        url:api,
        method:"POST",
        headers:{
            'Content-Type': 'application/soap+xml; charset=UTF-8;',
            'sid': id,
        },
         body: zapytanieNIP
    },
		 
    function(error, response, body) {      
	parser = body.split("Regon&gt;");
        if (parser[1] != undefined) {
          regon = parser[1].substring(0, parser[1].length-5);
        }
        console.log(regon);
      
        parser = body.split("Nazwa&gt;");
        if (parser[1] != undefined) {
          nazwaFirmy = parser[1].substring(0, parser[1].length-5);
        }
        console.log(nazwaFirmy);
        
        parser = body.split("Wojewodztwo&gt;");
        if (parser[1] != undefined) {
          wojewodztwo = parser[1].substring(0, parser[1].length-5);
        }
        console.log(wojewodztwo);
      
        parser = body.split("Powiat&gt;");
        if (parser[1] != undefined) {
          powiat = parser[1].substring(0, parser[1].length-5);
        }
        console.log(powiat);
      
        parser = body.split("Gmina&gt;");
        if (parser[1] != undefined) {
          gmina = parser[1].substring(0, parser[1].length-5);
        }
        console.log(gmina);
      
        parser = body.split("Miejscowosc&gt;");
        if (parser[1] != undefined) {
          miejscowosc = parser[1].substring(0, parser[1].length-5);
        }
        console.log(miejscowosc);
      
        parser = body.split("KodPocztowy&gt;");
        if (parser[1] != undefined) {
          kodPocztowy = parser[1].substring(0, parser[1].length-5);
        }
        console.log(kodPocztowy);
      
        parser = body.split("Ulica&gt;");
        if (parser[1] != undefined) {
          ulica = parser[1].substring(0, parser[1].length-5);
        }
        console.log(ulica);
      
        parser = body.split("NrNieruchomosci&gt;");
        if (parser[1] != undefined) {
          nrNieruchomosci = parser[1].substring(0, parser[1].length-5);
        }
        console.log(nrNieruchomosci);
      
        parser = body.split("NrLokalu&gt;");
	if (parser[1] != undefined) {
          nrLokalu = parser[1].substring(0, parser[1].length-5);
        }
        console.log(nrLokalu);
      
        parser = body.split("DataZakonczeniaDzialalnosci&gt;");
        if (parser[1] != undefined) {
            dataZakonczeniaDzialanosci = parser[1].substring(0, parser[1].length-5);
        }
        console.log(dataZakonczeniaDzialanosci);
      
        parser = body.split("MiejscowoscPoczty&gt;");
        if (parser[1] != undefined) {
            miejscowoscPoczty = parser[1].substring(0, parser[1].length-5);
        }
        console.log(miejscowoscPoczty);

        callback({
          outputFields: {
            regon: regon,
            nazwaFirmy: nazwaFirmy,
            wojewodztwo: wojewodztwo,
            powiat: powiat,
            gmina: gmina,
            miejscowosc: miejscowosc,
            kodPocztowy: kodPocztowy,
            ulica: ulica,
            nrNieruchomosci: nrNieruchomosci,
            nrLokalu: nrLokalu,
            dataZakonczeniaDzialanosci: dataZakonczeniaDzialanosci,
            miejscowoscPoczty: miejscowoscPoczty
          }
        });
      });

      // logout
      request.post({
        url:api,
        method:"POST",
        headers:{
            'Content-Type': 'application/soap+xml; charset=UTF-8;',
        },
        body: zapytanieWyloguj
    },
		   
    function(error, response, body) {
        console.log(`logout response code ${response.statusCode}`);
    });
  });
}

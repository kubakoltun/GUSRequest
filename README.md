# GUS-Request

GUS - Główny Urząd Statystyczny
Funkcja służy do wyciągania informacji na temat wprowadzonej spółki.
Podany numer NIP jest podstawą do zapytania wysyłanego do GUSu, który w odpowiedzi zwróci zestaw danych w formacie XML.
Funkcja po otrzymaniu odpowiedzi przypisze do utworzonych zmiennych odpowiednie informacje dotyczące spółki.
Informacje są parsowane poprzez szukanie odpowiednich tagów w odpowiedzi XML.
Uzupełnione zmienne są przekazywane w callback'u w taki sposób, aby można było ich użyć w zależności od wybranego scenariusza. 

Kod powstał z intencją funckjonowania na środowisku HubSpot, Node.js.
W tym wypadku jest to uzupełnienie workflow o podane zmienne. 
Celem workflow'u jest automatyczne uzupełnienie kontaktu o brakujące informacje.

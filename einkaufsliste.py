# :=)
  
print('Wilkommen in deiner Einkaufsliste!')

menü = ('\nWas möchtest du tun?\n\n1. Produkt hinzufügen\n2. Produkt entfernen\n3. Liste anzeigen\n4. Programm beenden')

einkaufsliste = []

while True:
    print(f'{menü}')
    
    try:
        wahl = int(input('Wähle eine Option (1-4): '))
        if wahl not in [1, 2, 3, 4]:
            print('Ungültige Eingabe. Bitte wähle eine Zahl zwischen 1 und 5.')
            continue
    except ValueError:
        print('Ungültige eingabe. Bitte gib eine Zahl ein.')
        continue
    
    if wahl == 1:
        produkt = input('Welches Produkt möchtest du hinzufügen?: ')
        einkaufsliste.append(produkt)
        print(f'{produkt} wurde hinzugefügt.')
    
    elif wahl == 2:
        produkt = input('Welches Produkt möchtest du entfernen?: ')
        if produkt in einkaufsliste:
            einkaufsliste.remove(produkt)
            print(f'{produkt} wurde entfernt.')
        else:
            print(f'{produkt} ist nicht in deiner Einakufsliste.')
        
    if wahl == 3:
        if einkaufsliste:
            print(f'Deine Einkaufsliste:')
            for produkt in einkaufsliste:
                print(f'- {produkt}')
        else:
            print('Deine Einkaufsliste ist leer.')
            
        
    elif wahl == 4:
        print('Programm beendet')
        break
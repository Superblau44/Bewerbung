# :=)

menü = ('\nWas möchtest du tun?\n\n1. Benutzer hinzufügen\n2. Benutzer löschen\n3. Benutzer anmelden\n4. Alle Benutzer anzeigen\n5. Programm beenden')


benutzer = {}    

while True:
    print(menü)
    
    try:
        wahl = int(input('Wähle eine Option (1-5): '))
        if wahl not in [1, 2, 3, 4, 5]:
            print('Ungültige Eingabe. Bitte wähle eine Zahl zwischen 1 und 5.')
            continue
    except ValueError:
        print('Ungültige eingabe. Bitte gib eine Zahl ein.')
        continue
            
    if wahl == 1:
        print('Benutzer hinzufügen')
        benutzername = input('Gebe deinen Benutzernamen ein: ')
        if benutzername in benutzer:
            print('Benutzername exestiert bereits.')
        else:
            passwort = input('Gebe dein Passwort ein: ')
            benutzer[benutzername] = passwort
            print('Benutzer wurde gespeichert.')
                
    elif wahl == 2:
        print('Benutzer löschen')
        benutzername = input('Welchen Benutzer möchtest du löschen?: ')
        if benutzername in benutzer:
            del benutzer[benutzername]
            print(f'Der Benuzter: {benutzername} wurde gelöscht.')
        else:
            print('Benutzer exestiert nicht.')
            
                
    elif wahl == 3:
        print('Benutzer anmelden')
        benutzername = input('Gebe deinen Benutzernamen ein: ')
        if benutzername in benutzer:
            passwort_eingeben = input('Gebe dein Passwort ein: ')
            if passwort_eingeben == passwort:
                benutzer[benutzername] == passwort
                print('Erfolgreich angemeldet.')
            else:
                print('Falsches Passwort.')
        else:
            print('Benuztername nicht gefunden.')
        
                
    elif wahl == 4:
        print('Alle Benutzer anzeigen')
        print('Gespeicherte Benutzer: ')
        if benutzer:
            for name in benutzer:
                print(name)
        else:
            print('Es gibt keine Benutzer.')            
    elif wahl == 5:
        print('Programm beendet.')
        break
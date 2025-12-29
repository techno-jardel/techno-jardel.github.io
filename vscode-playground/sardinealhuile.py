def sardinealhuile(n):
    if n <= 0:
        return 0
    else:
        n = n + 2
        return n

def main():
    try:
        valeur = float(input("Entrez un nombre : "))
        resultat = sardinealhuile(valeur)
        print("Résultat :", resultat)
    except ValueError:
        print("Veuillez entrer un nombre valide.")


if __name__ == "__main__":
    main()

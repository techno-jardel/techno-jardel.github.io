# Créé par Bruno, le 01/09/2025 en Python 3.7
from PIL import Image

def bin2dec(binaire):
    longueur = len(binaire)
    res = 0
    for i in range(longueur):
        res += int(binaire[i]) * 2 ** (longueur - i - 1)
    return res

# Charger l'image
mabelleimage = Image.open("nomdufichierimagequelonveuttraiter.png")
mesbeauxpixels = mabelleimage.getdata()

# Extraire les bits de parité
liste_bits = []
for rgb in mesbeauxpixels:
    liste_bits.append(rgb[0] % 2)
    liste_bits.append(rgb[1] % 2)
    liste_bits.append(rgb[2] % 2)

# Lire les caractères jusqu'à '\0'
for i in range(0, len(liste_bits), 8):
    byte = liste_bits[i:i+8]
    if len(byte) < 8:
        break
    caractere = chr(bin2dec(byte))
    if caractere == '\0':
        break
    print(caractere, end="")


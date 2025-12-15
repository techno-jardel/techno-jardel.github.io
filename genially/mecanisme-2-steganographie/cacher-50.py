from PIL import Image

mabelleimage = Image.open("joyeux-anniversaire.png")
mesbeauxpixels = mabelleimage.getdata()
larg, haut = mabelleimage.size

monjolitexte = "Bonjour les gens ! Je suis le code invisible, aujourd'hui je suis un texte, mais demain je pourrais être un code malveillant ! Mais, pour aujourd'hui, ça sera simplement une fable : LE CORBEAU ET LE RENARD. Maître Corbeau, sur un arbre perché, Tenait en son bec un fromage. Maître Renard, par l'odeur alléché, Lui tint à peu près ce langage : Et bonjour, Monsieur du Corbeau, Que vous êtes joli ! que vous me semblez beau ! Sans mentir, si votre ramage Se rapporte à votre plumage, Vous êtes le Phénix des hôtes de ces bois. À ces mots le Corbeau ne se sent pas de joie, Et pour montrer sa belle voix, Il ouvre un large bec, laisse tomber sa proie. Le Renard s'en saisit, et dit : Mon bon Monsieur, Apprenez que tout flatteur Vit aux dépens de celui qui l'écoute. Cette leçon vaut bien un fromage sans doute. Le Corbeau honteux et confus Jura, mais un peu tard, qu'on ne l'y prendrait plus. Jean de la Fontaine."

monjolitexte_bin = ""
for car in monjolitexte:
    monjolitexte_bin += '{0:08b}'.format(ord(car))

monjolitexte_bin += '{0:08b}'.format(0)
monjolitexte_bin += "111"

longueur = len(monjolitexte_bin)
index = 0
i = 0

for k in range(longueur // 3):
    v = [mesbeauxpixels[k][0], mesbeauxpixels[k][1], mesbeauxpixels[k][2]]
    for j in range(3):
        if (v[j] % 2 == 0 and int(monjolitexte_bin[i]) == 1) or (v[j] % 2 == 1 and int(monjolitexte_bin[i]) == 0):
            v[j] = v[j] - 1 if v[j] >= 255 else v[j] + 1
        i += 1
    col = index % larg
    row = index // larg
    mabelleimage.putpixel((col, row), tuple(v))
    index += 1

mabelleimage.save('joyeux-anniversaire-stegano.png')
print("Nouvelle image : joyeux-anniversaire-stegano.png")
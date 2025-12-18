from PIL import Image
from PIL.ExifTags import TAGS, GPSTAGS

def get_exif_data(image_path):
    image = Image.open(image_path)
    exif_data = {}
    info = image._getexif()
    if not info:
        return None

    for tag, value in info.items():
        decoded = TAGS.get(tag, tag)
        if decoded == "GPSInfo":
            gps_data = {}
            for t in value:
                sub_decoded = GPSTAGS.get(t, t)
                gps_data[sub_decoded] = value[t]
            exif_data["GPSInfo"] = gps_data
    return exif_data.get("GPSInfo")

def convert_to_degrees(value):
    d, m, s = value
    return float(d) + float(m)/60.0 + float(s)/3600.0

def get_coordinates(gps_info):
    if not gps_info:
        return None

    lat = convert_to_degrees(gps_info["GPSLatitude"])
    if gps_info["GPSLatitudeRef"] != "N":
        lat = -lat

    lon = convert_to_degrees(gps_info["GPSLongitude"])
    if gps_info["GPSLongitudeRef"] != "E":
        lon = -lon

    return lat, lon

def main():
    image_path = "Professeur_A2.jpg"   # mets ici le nom de ton fichier
    gps_info = get_exif_data(image_path)
    coords = get_coordinates(gps_info)

    if coords:
        lat, lon = coords
        print(f"Latitude: {lat}, Longitude: {lon}")
        print(f"Google Maps: https://www.google.com/maps?q={lat},{lon}")
    else:
        print("Aucune donnée GPS trouvée dans l'image.")

if __name__ == "__main__":
    main()
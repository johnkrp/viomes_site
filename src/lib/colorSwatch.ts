const hashColor = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${Math.abs(hash) % 360} 38% 54%)`;
};

const normalizeColorKey = (value: string) =>
  (value || "")
    .toUpperCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

type ColorMeta = {
  hex?: string;
  english: string;
  greek: string;
  code: string;
};

const colorMap: Record<string, ColorMeta> = {
  "ΣΚΟΎΡΟ ΠΡΆΣΙΝΟ ΕΛΙΆΣ": { hex: "#5E6738", english: "Dark Olive", greek: "Σκούρο Πράσινο Ελιάς", code: "143" },
  "ΔΙΆΦΑΝΟ ΠΟΡΤΟΚΑΛΊ": { hex: "#FF8000", english: "Clear Orange", greek: "Διάφανο Πορτοκαλί", code: "46" },
  "ΔΙΑΦΑΝΟ ΠΟΡΤΟΚΑΛΙ": { hex: "#FF8000", english: "Clear Orange", greek: "Διάφανο Πορτοκαλί", code: "46" },
  "ΣΚΟΎΡΟ ΚΥΠΑΡΙΣΣΊ": { hex: "#205C40", english: "Dark Cypress", greek: "Σκούρο Κυπαρισσί", code: "55" },
  "ΔΙΆΦΑΝΟ ΚΊΤΡΙΝΟ": { hex: "#FFE600", english: "Clear Yellow", greek: "Διάφανο Κίτρινο", code: "45" },
  "ΔΙΆΦΑΝΟ ΠΡΆΣΙΝΟ": { hex: "#B7DD79", english: "Clear Green", greek: "Διάφανο Πράσινο", code: "47" },
  "ΔΙΑΦΑΝΟ ΚΙΤΡΙΝΟ": { hex: "#FFE600", english: "Clear Yellow", greek: "Διάφανο Κίτρινο", code: "45" },
  "ΔΙΑΦΑΝΟ ΠΡΑΣΙΝΟ": { hex: "#B7DD79", english: "Clear Green", greek: "Διάφανο Πράσινο", code: "47" },
  "ΓΑΛΆΖΙΟ ΣΚΟΎΡΟ": { hex: "#407EC9", english: "Deep Azure", greek: "Γαλάζιο Σκούρο", code: "24" },
  "ΚΙΤΡΙΝΟΠΡΆΣΙΝΟ": { hex: "#A8AD00", english: "Chartreuse", greek: "Κιτρινοπράσινο", code: "12" },
  "ΠΡΆΣΙΝΟ ΣΚΟΎΡΟ": { hex: "#009A44", english: "Dark Green", greek: "Πράσινο Σκούρο", code: "36" },
  "??????? ?????": { english: "Clear White", greek: "Διάφανο Λευκό", code: "31" },
  "MIDNIGHT BLUE": { hex: "#425563", english: "Midnight Blue", greek: "Γκρι Μπλε", code: "18" },
  "MΑΡΜΑΡΊ ΤΡΊΧΑ": { english: "Marble White", greek: "Mαρμαρί Τρίχα", code: "90" },
  "TITANIUM GREY": { hex: "#5B6770", english: "Titanium Grey", greek: "Γκρι Τιτανίου", code: "58" },
  "ΓΚΡΙ ΤΙΤΑΝΊΟΥ": { hex: "#5B6770", english: "Titanium Grey", greek: "Γκρι Τιτανίου", code: "58" },
  "ΓΚΡΙ ΤΙΤΑΝΙΟΥ": { hex: "#5B6770", english: "Titanium Grey", greek: "Γκρι Τιτανίου", code: "58" },
  "ΔΙΆΦΑΝΟ ΒΙΟΛΈ": { hex: "#B884CB", english: "Clear Violet", greek: "Διάφανο Βιολέ", code: "49" },
  "ΔΙΆΦΑΝΟ ΛΕΥΚΌ": { english: "Clear White", greek: "Διάφανο Λευκό", code: "31" },
  "ΔΙΑΦΑΝΟ ΒΙΟΛΕ": { hex: "#B884CB", english: "Clear Violet", greek: "Διάφανο Βιολέ", code: "49" },
  "ΕLEPHANT GREY": { hex: "#5E514D", english: "Εlephant Grey", greek: "Ελεφαντί", code: "80" },
  "ΠΑΣΤΈΛ ΟΥΡΑΝΊ": { hex: "#D1DDE6", english: "Sky Pastel", greek: "Παστέλ Ουρανί", code: "70" },
  "ΠΡΆΣΙΝΟ ΕΛΙΆΣ": { hex: "#9CAF88", english: "Olive Green", greek: "Πράσινο Ελιάς", code: "27" },
  "ΠΡΑΣΙΝΟ ΕΛΙΑΣ": { hex: "#9CAF88", english: "Olive Green", greek: "Πράσινο Ελιάς", code: "27" },
  "AΝΟΙΚΤΌ ΓΚΡΙ": { hex: "#888B8D", english: "Light Grey", greek: "Aνοικτό Γκρι", code: "06" },
  "CLEAR ORANGE": { hex: "#FF8000", english: "Clear Orange", greek: "Διάφανο Πορτοκαλί", code: "46" },
  "CLEAR VIOLET": { hex: "#B884CB", english: "Clear Violet", greek: "Διάφανο Βιολέ", code: "49" },
  "CLEAR YELLOW": { hex: "#FFE600", english: "Clear Yellow", greek: "Διάφανο Κίτρινο", code: "45" },
  "DARK CYPRESS": { hex: "#205C40", english: "Dark Cypress", greek: "Σκούρο Κυπαρισσί", code: "55" },
  "MARBLE WHITE": { english: "Marble White", greek: "Mαρμαρί Τρίχα", code: "90" },
  "SILVER PERLE": { hex: "#8A8D8F", english: "Silver Perle", greek: "Ασημί Περλέ", code: "51" },
  "ΓΚΡΙ ΣΤΆΧΤΗΣ": { hex: "#B1B3B3", english: "Ash Grey", greek: "Γκρι Στάχτης", code: "79" },
  "ΓΚΡΙ ΣΤΑΧΤΗΣ": { hex: "#B1B3B3", english: "Ash Grey", greek: "Γκρι Στάχτης", code: "79" },
  "ΔΙΆΦΑΝΟ ΜΠΛΕ": { hex: "#7BAFD4", english: "Clear Blue", greek: "Διάφανο Μπλε", code: "48" },
  "ΔΙΑΦΑΝΟ ΜΠΛΕ": { hex: "#7BAFD4", english: "Clear Blue", greek: "Διάφανο Μπλε", code: "48" },
  "ΜΠΛΕ ΑΙΓΑΊΟΥ": { hex: "#00558C", english: "Aegean Blue", greek: "Μπλε Αιγαίου", code: "62" },
  "ΜΠΛΕ ΑΙΓΑΙΟΥ": { hex: "#00558C", english: "Aegean Blue", greek: "Μπλε Αιγαίου", code: "62" },
  "ΠΑΣΤΈΛ ΜΈΝΤΑ": { hex: "#B5E3D8", english: "Mint Pastel", greek: "Παστέλ Μέντα", code: "72" },
  "ΤΡΙΑΝΤΑΦΥΛΛΊ": { hex: "#E0457B", english: "Rose", greek: "Τριανταφυλλί", code: "17" },
  "ΤΡΙΑΝΤΑΦΥΛΛΙ": { hex: "#E0457B", english: "Rose", greek: "Τριανταφυλλί", code: "17" },
  "AEGEAN BLUE": { hex: "#00558C", english: "Aegean Blue", greek: "Μπλε Αιγαίου", code: "62" },
  "BEIGE IVORY": { hex: "#C2AEAA", english: "Beige Ivory", greek: "Μπεζ Ιβουάρ", code: "04" },
  "BLUE PURPLE": { hex: "#012169", english: "Blue Purple", greek: "Μπλε Μωβ", code: "39" },
  "BLUE ΜARINE": { hex: "#003087", english: "Blue Μarine", greek: "Μπλε Μαρίν", code: "52" },
  "CLEAR GREEN": { hex: "#B7DD79", english: "Clear Green", greek: "Διάφανο Πράσινο", code: "47" },
  "CLEAR WHITE": { english: "Clear White", greek: "Διάφανο Λευκό", code: "31" },
  "DEEP PURPLE": { hex: "#6D2077", english: "Deep Purple", greek: "Μωβ Σκούρο", code: "22" },
  "DESERT PINK": { hex: "#936D73", english: "Desert Pink", greek: "Σάπιο Μήλο", code: "82" },
  "GREY PASTEL": { hex: "#A7A8AA", english: "Grey Pastel", greek: "Παστέλ Γκρι", code: "74" },
  "LIGHT GREEN": { hex: "#A4D65E", english: "Light Green", greek: "Λαχανί", code: "32" },
  "LILA PASTEL": { hex: "#D6BFDD", english: "Lila Pastel", greek: "Παστέλ Λιλά", code: "71" },
  "MINT PASTEL": { hex: "#B5E3D8", english: "Mint Pastel", greek: "Παστέλ Μέντα", code: "72" },
  "OLIVE GREEN": { hex: "#9CAF88", english: "Olive Green", greek: "Πράσινο Ελιάς", code: "27" },
  "PEBBLE GREY": { hex: "#B7B09C", english: "Pebble Grey", greek: "Βότσαλο", code: "65" },
  "SUGAR WHITE": { hex: "#D4E0D4", english: "Sugar white", greek: "Ζαχαρί", code: "87" },
  "TRANSPARENT": { english: "Clear White", greek: "Διάφανο Λευκό", code: "31" },
  "ΑΣΗΜΊ ΠΕΡΛΈ": { hex: "#8A8D8F", english: "Silver Perle", greek: "Ασημί Περλέ", code: "51" },
  "ΓΚΡΙ ΣΚΟΎΡΟ": { hex: "#212E2B", english: "Deep Grey", greek: "Γκρι Σκούρο", code: "69" },
  "ΓΚΡΙ ΣΚΟΥΡΟ": { hex: "#212E2B", english: "Deep Grey", greek: "Γκρι Σκούρο", code: "69" },
  "ΓΚΡΙ ΣΤΑΧΤΙ": { hex: "#B1B3B3", english: "Ash Grey", greek: "Γκρι Στάχτης", code: "79" },
  "ΚΑΦΈ ΣΚΟΎΡΟ": { hex: "#4F2C1D", english: "Dark Brown", greek: "Καφέ Σκούρο", code: "40" },
  "ΚΑΦΕ ΣΚΟΥΡΟ": { hex: "#4F2C1D", english: "Dark Brown", greek: "Καφέ Σκούρο", code: "40" },
  "ΜΠΕΖ ΙΒΟΥΆΡ": { hex: "#C2AEAA", english: "Beige Ivory", greek: "Μπεζ Ιβουάρ", code: "04" },
  "ΜΠΕΖ ΙΒΟΥΑΡ": { hex: "#C2AEAA", english: "Beige Ivory", greek: "Μπεζ Ιβουάρ", code: "04" },
  "ΜΠΕΖ ΣΚΟΎΡΟ": { hex: "#CDA077", english: "Camel", greek: "Μπεζ Σκούρο", code: "41" },
  "ΠΑΣΤΈΛ ΓΚΡΙ": { hex: "#A7A8AA", english: "Grey Pastel", greek: "Παστέλ Γκρι", code: "74" },
  "ΠΑΣΤΈΛ ΛΙΛΆ": { hex: "#D6BFDD", english: "Lila Pastel", greek: "Παστέλ Λιλά", code: "71" },
  "ANTHRACITE": { hex: "#A7A8AA", english: "Anthracite", greek: "Μολυβί", code: "25" },
  "BLUE BLACK": { hex: "#1B365D", english: "Blue Black", greek: "Μπλε Μαύρο", code: "44" },
  "CHARTREUSE": { hex: "#A8AD00", english: "Chartreuse", greek: "Κιτρινοπράσινο", code: "12" },
  "CLEAR BLUE": { hex: "#7BAFD4", english: "Clear Blue", greek: "Διάφανο Μπλε", code: "48" },
  "DARK BROWN": { hex: "#4F2C1D", english: "Dark Brown", greek: "Καφέ Σκούρο", code: "40" },
  "DARK GREEN": { hex: "#009A44", english: "Dark Green", greek: "Πράσινο Σκούρο", code: "36" },
  "DARK OLIVE": { hex: "#5E6738", english: "Dark Olive", greek: "Σκούρο Πράσινο Ελιάς", code: "143" },
  "DEEP AZURE": { hex: "#407EC9", english: "Deep Azure", greek: "Γαλάζιο Σκούρο", code: "24" },
  "DUSTY PINK": { hex: "#D7A3AB", english: "Dusty Pink", greek: "Σκούρο ροζ", code: "76" },
  "GREY BEIGE": { hex: "#C7C9C7", english: "Grey Beige", greek: "Γκρι Μπεζ", code: "50" },
  "LIGHT BLUE": { hex: "#99D6EA", english: "Light Blue", greek: "Σιέλ", code: "08" },
  "LIGHT GREY": { hex: "#888B8D", english: "Light Grey", greek: "Aνοικτό Γκρι", code: "06" },
  "OCEAN BLUE": { hex: "#0093B2", english: "Ocean Blue", greek: "Ωκεανί", code: "38" },
  "PEARL BLUE": { hex: "#6BA4B8", english: "Pearl Blue", greek: "Σιέλ Μπλε", code: "73" },
  "SAND BEIGE": { hex: "#D1BAB3", english: "Sand Beige", greek: "Μπεζ Άμμου", code: "56" },
  "SKY PASTEL": { hex: "#D1DDE6", english: "Sky Pastel", greek: "Παστέλ Ουρανί", code: "70" },
  "TERRACOTTA": { hex: "#A65523", english: "Terracotta", greek: "Τερακότα", code: "03" },
  "TILE BROWN": { hex: "#9A3324", english: "Tile Brown", greek: "Κεραμιδί", code: "09" },
  "ΓΚΡΙ ΨΥΧΡΌ": { hex: "#9D968D", english: "Cool Grey", greek: "Γκρι Ψυχρό", code: "63" },
  "ΜΠΕΖ ΆΜΜΟΥ": { hex: "#D1BAB3", english: "Sand Beige", greek: "Μπεζ Άμμου", code: "56" },
  "ΜΠΕΖ ΑΜΜΟΥ": { hex: "#D1BAB3", english: "Sand Beige", greek: "Μπεζ Άμμου", code: "56" },
  "ΜΠΛΕ ΜΑΎΡΟ": { hex: "#1B365D", english: "Blue Black", greek: "Μπλε Μαύρο", code: "44" },
  "ΜΠΛΕ ΜΑΡΊΝ": { hex: "#003087", english: "Blue Μarine", greek: "Μπλε Μαρίν", code: "52" },
  "ΜΠΛΕ ΜΑΡΙΝ": { hex: "#003087", english: "Blue Μarine", greek: "Μπλε Μαρίν", code: "52" },
  "ΜΩΒ ΣΚΟΎΡΟ": { hex: "#6D2077", english: "Deep Purple", greek: "Μωβ Σκούρο", code: "22" },
  "ΜΩΒ ΣΚΟΥΡΟ": { hex: "#6D2077", english: "Deep Purple", greek: "Μωβ Σκούρο", code: "22" },
  "ΡΟΖ ΣΚΟΥΡΟ": { hex: "#D7A3AB", english: "Dusty Pink", greek: "Σκούρο ροζ", code: "76" },
  "ΣΆΠΙΟ ΜΉΛΟ": { hex: "#936D73", english: "Desert Pink", greek: "Σάπιο Μήλο", code: "82" },
  "ΣΚΟΎΡΟ ΡΟΖ": { hex: "#D7A3AB", english: "Dusty Pink", greek: "Σκούρο ροζ", code: "76" },
  "COOL GREY": { hex: "#9D968D", english: "Cool Grey", greek: "Γκρι Ψυχρό", code: "63" },
  "DEEP GREY": { hex: "#212E2B", english: "Deep Grey", greek: "Γκρι Σκούρο", code: "69" },
  "MAYA BLUE": { hex: "#A4DBE8", english: "Maya Blue", greek: "Maya Μπλε", code: "57" },
  "MAYA ΜΠΛΕ": { hex: "#A4DBE8", english: "Maya Blue", greek: "Maya Μπλε", code: "57" },
  "NAVY BLUE": { hex: "#236192", english: "Navy Blue", greek: "Μπλε Ραφ", code: "33" },
  "TURQUOISE": { hex: "#0093B2", english: "Turquoise", greek: "Τιρκουάζ", code: "34" },
  "ΑΜΈΘΥΣΤΟΣ": { hex: "#5C068C", english: "Amethyst", greek: "Αμέθυστος", code: "59" },
  "ΑΜΕΘΥΣΤΟΣ": { hex: "#5C068C", english: "Amethyst", greek: "Αμέθυστος", code: "59" },
  "ΒΑΣΙΛΙΚΌΣ": { hex: "#949300", english: "Basil", greek: "Βασιλικός", code: "84" },
  "ΒΑΣΙΛΙΚΟΣ": { hex: "#949300", english: "Basil", greek: "Βασιλικός", code: "84" },
  "ΓΚΡΙ ΚΑΦΈ": { hex: "#776E64", english: "Taupe", greek: "Γκρι Καφέ", code: "26" },
  "ΓΚΡΙ ΚΑΦΕ": { hex: "#776E64", english: "Taupe", greek: "Γκρι Καφέ", code: "26" },
  "ΓΚΡΙ ΜΠΕΖ": { hex: "#C7C9C7", english: "Grey Beige", greek: "Γκρι Μπεζ", code: "50" },
  "ΓΚΡΙ ΜΠΛΕ": { hex: "#425563", english: "Midnight Blue", greek: "Γκρι Μπλε", code: "18" },
  "ΚΥΠΑΡΙΣΣΊ": { hex: "#43695B", english: "Cypress", greek: "Κυπαρισσί", code: "43" },
  "ΠΟΡΤΟΚΑΛΊ": { hex: "#FE5000", english: "Orange", greek: "Πορτοκαλί", code: "19" },
  "ΠΟΡΤΟΚΑΛΙ": { hex: "#FE5000", english: "Orange", greek: "Πορτοκαλί", code: "19" },
  "ΣΙΈΛ ΜΠΛΕ": { hex: "#6BA4B8", english: "Pearl Blue", greek: "Σιέλ Μπλε", code: "73" },
  "ΣΙΕΛ ΜΠΛΕ": { hex: "#6BA4B8", english: "Pearl Blue", greek: "Σιέλ Μπλε", code: "73" },
  "AMETHYST": { hex: "#5C068C", english: "Amethyst", greek: "Αμέθυστος", code: "59" },
  "ASH GREY": { hex: "#B1B3B3", english: "Ash Grey", greek: "Γκρι Στάχτης", code: "79" },
  "BORDEAUX": { hex: "#BA0C2F", english: "Bordeaux", greek: "Μπορντώ", code: "14" },
  "CINNAMON": { hex: "#BE531C", english: "Cinnamon", greek: "Kανελί", code: "64" },
  "GRAPHITE": { hex: "#1B282D", english: "Graphite", greek: "Γραφίτης", code: "145" },
  "LAVENDER": { hex: "#9678D3", english: "Lavender", greek: "Λεβάντα", code: "29" },
  "SKY BLUE": { hex: "#C3D7EE", english: "Sky Blue", greek: "Ουρανί", code: "10" },
  "ΒΑΣΙΛΙΚΟ": { hex: "#949300", english: "Basil", greek: "Βασιλικός", code: "84" },
  "ΓΡΑΝΊΤΗΣ": { english: "Granite", greek: "Γρανίτης", code: "60" },
  "ΓΡΑΦΊΤΗΣ": { hex: "#1B282D", english: "Graphite", greek: "Γραφίτης", code: "145" },
  "ΕΛΕΦΑΝΤΊ": { hex: "#5E514D", english: "Εlephant Grey", greek: "Ελεφαντί", code: "80" },
  "ΚΕΡΑΜΙΔΊ": { hex: "#9A3324", english: "Tile Brown", greek: "Κεραμιδί", code: "09" },
  "ΜΕΝΕΗΕΔΊ": { hex: "#D12B92", english: "Fuchsia", greek: "Μενεηεδί", code: "68" },
  "ΜΕΝΕΞΕΔΙ": { hex: "#D12B92", english: "Fuchsia", greek: "Μενεηεδί", code: "68" },
  "ΜΠΛΕ ΜΩΒ": { hex: "#012169", english: "Blue Purple", greek: "Μπλε Μωβ", code: "39" },
  "ΜΠΛΕ ΡΑΦ": { hex: "#236192", english: "Navy Blue", greek: "Μπλε Ραφ", code: "33" },
  "ΣΙΈΛ ΡΑΦ": { hex: "#5E8AB4", english: "Ciel", greek: "Σιέλ Ραφ", code: "42" },
  "ΤΕΡΑΚΌΤΑ": { hex: "#A65523", english: "Terracotta", greek: "Τερακότα", code: "03" },
  "ΤΕΡΑΚΟΤΑ": { hex: "#A65523", english: "Terracotta", greek: "Τερακότα", code: "03" },
  "ΤΙΡΚΟΥΆΖ": { hex: "#0093B2", english: "Turquoise", greek: "Τιρκουάζ", code: "34" },
  "???????": { english: "Clear White", greek: "Διάφανο Λευκό", code: "31" },
  "CITRINE": { english: "Citrine", greek: "Κίτρο", code: "95" },
  "CYPRESS": { hex: "#43695B", english: "Cypress", greek: "Κυπαρισσί", code: "43" },
  "FUCHSIA": { hex: "#D12B92", english: "Fuchsia", greek: "Μενεηεδί", code: "68" },
  "GRANITE": { english: "Granite", greek: "Γρανίτης", code: "60" },
  "KOKKINO": { hex: "#C8102E", english: "Red", greek: "Κόκκινο", code: "05" },
  "MAPMAPI": { english: "Marble White", greek: "Mαρμαρί Τρίχα", code: "90" },
  "PLANETS": { english: "Planets", greek: "", code: "330" },
  "TITANIO": { hex: "#5B6770", english: "Titanium Grey", greek: "Γκρι Τιτανίου", code: "58" },
  "VERAMAN": { hex: "#77C5D5", english: "Veraman", greek: "Βεραμάν", code: "75" },
  "ΒΌΤΣΑΛΟ": { hex: "#B7B09C", english: "Pebble Grey", greek: "Βότσαλο", code: "65" },
  "ΒΕΡΑΜΆΝ": { hex: "#77C5D5", english: "Veraman", greek: "Βεραμάν", code: "75" },
  "ΓΑΛΆΖΙΟ": { hex: "#7BA4DB", english: "Azure", greek: "Γαλάζιο", code: "28" },
  "ΓΑΛΑΖΙΟ": { hex: "#7BA4DB", english: "Azure", greek: "Γαλάζιο", code: "28" },
  "ΓΡΑΝΙΤΗ": { english: "Granite", greek: "Γρανίτης", code: "60" },
  "ΔΙΑΦΑΝΟ": { english: "Clear White", greek: "Διάφανο Λευκό", code: "31" },
  "ΚΌΚΚΙΝΟ": { hex: "#C8102E", english: "Red", greek: "Κόκκινο", code: "05" },
  "ΚΑΝΕΛΛΙ": { hex: "#BE531C", english: "Cinnamon", greek: "Kανελί", code: "64" },
  "ΚΙΤΡΙΝΟ": { hex: "#A8AD00", english: "Chartreuse", greek: "Κιτρινοπράσινο", code: "12" },
  "ΚΟΚΚΙΝΟ": { hex: "#C8102E", english: "Red", greek: "Κόκκινο", code: "05" },
  "ΛΕΒΆΝΤΑ": { hex: "#9678D3", english: "Lavender", greek: "Λεβάντα", code: "29" },
  "ΜΠΟΡΝΤΏ": { hex: "#BA0C2F", english: "Bordeaux", greek: "Μπορντώ", code: "14" },
  "ΜΠΟΡΝΤΩ": { hex: "#BA0C2F", english: "Bordeaux", greek: "Μπορντώ", code: "14" },
  "ΜΠΟΡΤΝΩ": { hex: "#BA0C2F", english: "Bordeaux", greek: "Μπορντώ", code: "14" },
  "ΜΠΡΟΝΖΈ": { hex: "#584446", english: "Bronze", greek: "Μπρονζέ", code: "13" },
  "ΜΠΡΟΝΖΕ": { hex: "#584446", english: "Bronze", greek: "Μπρονζέ", code: "13" },
  "ΠΡΆΣΙΝΟ": { hex: "#43B02A", english: "Green", greek: "Πράσινο", code: "23" },
  "ΤΙΤΑΝΙΟ": { hex: "#5B6770", english: "Titanium Grey", greek: "Γκρι Τιτανίου", code: "58" },
  "BRONZE": { hex: "#584446", english: "Bronze", greek: "Μπρονζέ", code: "13" },
  "CAMERA": { english: "Camera", greek: "", code: "350" },
  "CHERRY": { hex: "#9B2743", english: "Cherry", greek: "Κερασί", code: "11" },
  "GREIGE": { hex: "#8C857B", english: "Greige", greek: "Γκρέιζ", code: "30" },
  "KΑΝΕΛΊ": { hex: "#BE531C", english: "Cinnamon", greek: "Kανελί", code: "64" },
  "MAROON": { hex: "#6D3332", english: "Maroon", greek: "Μαρόν", code: "67" },
  "ORANGE": { hex: "#FE5000", english: "Orange", greek: "Πορτοκαλί", code: "19" },
  "PURPLE": { hex: "#A77BCA", english: "Purple", greek: "Μωβ", code: "16" },
  "SILVER": { hex: "#8A8D8F", english: "Silver", greek: "Ασημί", code: "37" },
  "VIOLET": { hex: "#C6579A", english: "Violet", greek: "Βιολέ", code: "21" },
  "YELLOW": { hex: "#FFA300", english: "Yellow", greek: "Κροκί", code: "20" },
  "ΌΝΥΧΑΣ": { english: "Onyx", greek: "Όνυχας", code: "92" },
  "ΑΧΆΤΗΣ": { english: "Agate", greek: "Αχάτης", code: "98" },
  "ΓΚΡΈΙΖ": { hex: "#8C857B", english: "Greige", greek: "Γκρέιζ", code: "30" },
  "ΓΚΡΕΪΖ": { hex: "#8C857B", english: "Greige", greek: "Γκρέιζ", code: "30" },
  "ΖΑΧΑΡΊ": { hex: "#D4E0D4", english: "Sugar white", greek: "Ζαχαρί", code: "87" },
  "ΖΑΧΑΡΙ": { hex: "#D4E0D4", english: "Sugar white", greek: "Ζαχαρί", code: "87" },
  "ΙΒΟΥΆΡ": { hex: "#C4BFB6", english: "Ivory", greek: "Ιβουάρ", code: "77" },
  "ΚΕΡΑΣΊ": { hex: "#9B2743", english: "Cherry", greek: "Κερασί", code: "11" },
  "ΛΑΧΑΝΊ": { hex: "#A4D65E", english: "Light Green", greek: "Λαχανί", code: "32" },
  "ΛΑΧΑΝΙ": { hex: "#A4D65E", english: "Light Green", greek: "Λαχανί", code: "32" },
  "ΜΆΝΓΚΟ": { hex: "#F2C75C", english: "Μango", greek: "Μάνγκο", code: "89" },
  "ΜΑΝΓΚΟ": { hex: "#F2C75C", english: "Μango", greek: "Μάνγκο", code: "89" },
  "ΜΟΛΥΒΊ": { hex: "#A7A8AA", english: "Anthracite", greek: "Μολυβί", code: "25" },
  "ΜΟΛΥΒΙ": { hex: "#A7A8AA", english: "Anthracite", greek: "Μολυβί", code: "25" },
  "ΟΝΥΧΑΣ": { english: "Onyx", greek: "Όνυχας", code: "92" },
  "ΟΥΡΑΝΊ": { hex: "#C3D7EE", english: "Sky Blue", greek: "Ουρανί", code: "10" },
  "ΣΤΑΧΤΊ": { english: "Smoke", greek: "Σταχτί", code: "93" },
  "ΩΚΕΑΝΊ": { hex: "#0093B2", english: "Ocean Blue", greek: "Ωκεανί", code: "38" },
  "?????": { hex: "#FFFFFF", english: "White", greek: "Λευκό", code: "01" },
  "AGATE": { english: "Agate", greek: "Αχάτης", code: "98" },
  "AZURE": { hex: "#7BA4DB", english: "Azure", greek: "Γαλάζιο", code: "28" },
  "BASIL": { hex: "#949300", english: "Basil", greek: "Βασιλικός", code: "84" },
  "BETON": { english: "Beton", greek: "", code: "310" },
  "BLACK": { hex: "#2D2926", english: "Black", greek: "Μαύρο", code: "02" },
  "CAMEL": { hex: "#CDA077", english: "Camel", greek: "Μπεζ Σκούρο", code: "41" },
  "CREAM": { hex: "#ECD898", english: "Cream", greek: "Κρεμ", code: "78" },
  "DAISY": { english: "Daisy", greek: "", code: "340" },
  "GREEN": { hex: "#43B02A", english: "Green", greek: "Πράσινο", code: "23" },
  "IVORY": { hex: "#C4BFB6", english: "Ivory", greek: "Ιβουάρ", code: "77" },
  "KPOKI": { hex: "#FFA300", english: "Yellow", greek: "Κροκί", code: "20" },
  "LINEN": { english: "Linen", greek: "", code: "320" },
  "MAONI": { english: "Maoni", greek: "Μαόνι", code: "94" },
  "MAUVE": { hex: "#595478", english: "Mauve", greek: "Μαβί", code: "83" },
  "MAYPO": { hex: "#2D2926", english: "Black", greek: "Μαύρο", code: "02" },
  "OCHRA": { hex: "#D4CFC1", english: "Ochra", greek: "Ώχρα", code: "81" },
  "PETRA": { english: "Petra", greek: "Πέτρα", code: "97" },
  "PILOS": { hex: "#A45A2A", english: "Pilos", greek: "Πηλός", code: "91" },
  "SMOKE": { english: "Smoke", greek: "Σταχτί", code: "93" },
  "TAUPE": { hex: "#776E64", english: "Taupe", greek: "Γκρι Καφέ", code: "26" },
  "WHITE": { hex: "#FFFFFF", english: "White", greek: "Λευκό", code: "01" },
  "ΑΣΗΜΊ": { hex: "#8A8D8F", english: "Silver", greek: "Ασημί", code: "37" },
  "ΑΣΗΜΙ": { hex: "#8A8D8F", english: "Silver", greek: "Ασημί", code: "37" },
  "ΒΙΟΛΈ": { hex: "#C6579A", english: "Violet", greek: "Βιολέ", code: "21" },
  "ΒΙΟΛΕ": { hex: "#C6579A", english: "Violet", greek: "Βιολέ", code: "21" },
  "ΕΚΡΟΎ": { hex: "#EDEDE6", english: "Ecru", greek: "Εκρού", code: "53" },
  "ΕΚΡΟΥ": { hex: "#EDEDE6", english: "Ecru", greek: "Εκρού", code: "53" },
  "ΕΛΙΑΣ": { hex: "#9CAF88", english: "Olive Green", greek: "Πράσινο Ελιάς", code: "27" },
  "ΚΊΤΡΟ": { english: "Citrine", greek: "Κίτρο", code: "95" },
  "ΚΡΟΚΊ": { hex: "#FFA300", english: "Yellow", greek: "Κροκί", code: "20" },
  "ΚΥΑΝΌ": { hex: "#00AEEF", english: "Cyan", greek: "Κυανό", code: "15" },
  "ΛΕΥΚΌ": { hex: "#FFFFFF", english: "White", greek: "Λευκό", code: "01" },
  "ΛΕΥΚΟ": { hex: "#FFFFFF", english: "White", greek: "Λευκό", code: "01" },
  "ΜANGO": { hex: "#F2C75C", english: "Μango", greek: "Μάνγκο", code: "89" },
  "ΜΑΌΝΙ": { english: "Maoni", greek: "Μαόνι", code: "94" },
  "ΜΑΎΡΟ": { hex: "#2D2926", english: "Black", greek: "Μαύρο", code: "02" },
  "ΜΑΟΝΙ": { english: "Maoni", greek: "Μαόνι", code: "94" },
  "ΜΑΡΌΝ": { hex: "#6D3332", english: "Maroon", greek: "Μαρόν", code: "67" },
  "ΜΑΡΟΝ": { hex: "#6D3332", english: "Maroon", greek: "Μαρόν", code: "67" },
  "ΜΑΥΡΟ": { hex: "#2D2926", english: "Black", greek: "Μαύρο", code: "02" },
  "ΠΈΤΡΑ": { english: "Petra", greek: "Πέτρα", code: "97" },
  "ΠΗΛΌΣ": { hex: "#A45A2A", english: "Pilos", greek: "Πηλός", code: "91" },
  "ΠΗΛΟΣ": { hex: "#A45A2A", english: "Pilos", greek: "Πηλός", code: "91" },
  "ΧΡΥΣΌ": { hex: "#84754E", english: "Gold", greek: "Χρυσό", code: "86" },
  "????": { hex: "#989A98", english: "Grey", greek: "Γκρι", code: "66" },
  "BLUE": { hex: "#005EB8", english: "Blue", greek: "Μπλε", code: "35" },
  "CIEL": { hex: "#5E8AB4", english: "Ciel", greek: "Σιέλ Ραφ", code: "42" },
  "CYAN": { hex: "#00AEEF", english: "Cyan", greek: "Κυανό", code: "15" },
  "ECRU": { hex: "#EDEDE6", english: "Ecru", greek: "Εκρού", code: "53" },
  "GOLD": { hex: "#84754E", english: "Gold", greek: "Χρυσό", code: "86" },
  "GREY": { hex: "#989A98", english: "Grey", greek: "Γκρι", code: "66" },
  "INOX": { english: "Inox", greek: "", code: "200" },
  "KPEM": { hex: "#ECD898", english: "Cream", greek: "Κρεμ", code: "78" },
  "LAVA": { english: "Lava", greek: "Λάβα", code: "96" },
  "LIME": { hex: "#84BD00", english: "Lime", greek: "Λάιμ", code: "88" },
  "MABI": { hex: "#595478", english: "Mauve", greek: "Μαβί", code: "83" },
  "ONYX": { english: "Onyx", greek: "Όνυχας", code: "92" },
  "PINK": { hex: "#E5CEDB", english: "Pink", greek: "Ροζ", code: "07" },
  "ROSE": { hex: "#E0457B", english: "Rose", greek: "Τριανταφυλλί", code: "17" },
  "WOOD": { english: "Wood", greek: "", code: "300" },
  "ΏΧΡΑ": { hex: "#D4CFC1", english: "Ochra", greek: "Ώχρα", code: "81" },
  "ΓΚΡΙ": { hex: "#989A98", english: "Grey", greek: "Γκρι", code: "66" },
  "ΚΡΕΜ": { hex: "#ECD898", english: "Cream", greek: "Κρεμ", code: "78" },
  "ΛΆΒΑ": { english: "Lava", greek: "Λάβα", code: "96" },
  "ΛΆΙΜ": { hex: "#84BD00", english: "Lime", greek: "Λάιμ", code: "88" },
  "ΛΑΪΜ": { hex: "#84BD00", english: "Lime", greek: "Λάιμ", code: "88" },
  "ΜΑΒΊ": { hex: "#595478", english: "Mauve", greek: "Μαβί", code: "83" },
  "ΜΑΒΙ": { hex: "#595478", english: "Mauve", greek: "Μαβί", code: "83" },
  "ΜΠΛΕ": { hex: "#005EB8", english: "Blue", greek: "Μπλε", code: "35" },
  "ΠΡΑΣ": { hex: "#A8AD00", english: "Chartreuse", greek: "Κιτρινοπράσινο", code: "12" },
  "ΣΙΈΛ": { hex: "#99D6EA", english: "Light Blue", greek: "Σιέλ", code: "08" },
  "ΣΙΕΛ": { hex: "#99D6EA", english: "Light Blue", greek: "Σιέλ", code: "08" },
  "143": { hex: "#5E6738", english: "Dark Olive", greek: "Σκούρο Πράσινο Ελιάς", code: "143" },
  "145": { hex: "#1B282D", english: "Graphite", greek: "Γραφίτης", code: "145" },
  "200": { english: "Inox", greek: "", code: "200" },
  "300": { english: "Wood", greek: "", code: "300" },
  "310": { english: "Beton", greek: "", code: "310" },
  "320": { english: "Linen", greek: "", code: "320" },
  "330": { english: "Planets", greek: "", code: "330" },
  "340": { english: "Daisy", greek: "", code: "340" },
  "350": { english: "Camera", greek: "", code: "350" },
  "RED": { hex: "#C8102E", english: "Red", greek: "Κόκκινο", code: "05" },
  "ΜΩΒ": { hex: "#A77BCA", english: "Purple", greek: "Μωβ", code: "16" },
  "ΡΑΦ": { hex: "#236192", english: "Navy Blue", greek: "Μπλε Ραφ", code: "33" },
  "ΡΟΖ": { hex: "#E5CEDB", english: "Pink", greek: "Ροζ", code: "07" },
  "01": { hex: "#FFFFFF", english: "White", greek: "Λευκό", code: "01" },
  "02": { hex: "#2D2926", english: "Black", greek: "Μαύρο", code: "02" },
  "03": { hex: "#A65523", english: "Terracotta", greek: "Τερακότα", code: "03" },
  "04": { hex: "#C2AEAA", english: "Beige Ivory", greek: "Μπεζ Ιβουάρ", code: "04" },
  "05": { hex: "#C8102E", english: "Red", greek: "Κόκκινο", code: "05" },
  "06": { hex: "#888B8D", english: "Light Grey", greek: "Aνοικτό Γκρι", code: "06" },
  "07": { hex: "#E5CEDB", english: "Pink", greek: "Ροζ", code: "07" },
  "08": { hex: "#99D6EA", english: "Light Blue", greek: "Σιέλ", code: "08" },
  "09": { hex: "#9A3324", english: "Tile Brown", greek: "Κεραμιδί", code: "09" },
  "10": { hex: "#C3D7EE", english: "Sky Blue", greek: "Ουρανί", code: "10" },
  "11": { hex: "#9B2743", english: "Cherry", greek: "Κερασί", code: "11" },
  "12": { hex: "#A8AD00", english: "Chartreuse", greek: "Κιτρινοπράσινο", code: "12" },
  "13": { hex: "#584446", english: "Bronze", greek: "Μπρονζέ", code: "13" },
  "14": { hex: "#BA0C2F", english: "Bordeaux", greek: "Μπορντώ", code: "14" },
  "15": { hex: "#00AEEF", english: "Cyan", greek: "Κυανό", code: "15" },
  "16": { hex: "#A77BCA", english: "Purple", greek: "Μωβ", code: "16" },
  "17": { hex: "#E0457B", english: "Rose", greek: "Τριανταφυλλί", code: "17" },
  "18": { hex: "#425563", english: "Midnight Blue", greek: "Γκρι Μπλε", code: "18" },
  "19": { hex: "#FE5000", english: "Orange", greek: "Πορτοκαλί", code: "19" },
  "20": { hex: "#FFA300", english: "Yellow", greek: "Κροκί", code: "20" },
  "21": { hex: "#C6579A", english: "Violet", greek: "Βιολέ", code: "21" },
  "22": { hex: "#6D2077", english: "Deep Purple", greek: "Μωβ Σκούρο", code: "22" },
  "23": { hex: "#43B02A", english: "Green", greek: "Πράσινο", code: "23" },
  "24": { hex: "#407EC9", english: "Deep Azure", greek: "Γαλάζιο Σκούρο", code: "24" },
  "25": { hex: "#A7A8AA", english: "Anthracite", greek: "Μολυβί", code: "25" },
  "26": { hex: "#776E64", english: "Taupe", greek: "Γκρι Καφέ", code: "26" },
  "27": { hex: "#9CAF88", english: "Olive Green", greek: "Πράσινο Ελιάς", code: "27" },
  "28": { hex: "#7BA4DB", english: "Azure", greek: "Γαλάζιο", code: "28" },
  "29": { hex: "#9678D3", english: "Lavender", greek: "Λεβάντα", code: "29" },
  "30": { hex: "#8C857B", english: "Greige", greek: "Γκρέιζ", code: "30" },
  "31": { english: "Clear White", greek: "Διάφανο Λευκό", code: "31" },
  "32": { hex: "#A4D65E", english: "Light Green", greek: "Λαχανί", code: "32" },
  "33": { hex: "#236192", english: "Navy Blue", greek: "Μπλε Ραφ", code: "33" },
  "34": { hex: "#0093B2", english: "Turquoise", greek: "Τιρκουάζ", code: "34" },
  "35": { hex: "#005EB8", english: "Blue", greek: "Μπλε", code: "35" },
  "36": { hex: "#009A44", english: "Dark Green", greek: "Πράσινο Σκούρο", code: "36" },
  "37": { hex: "#8A8D8F", english: "Silver", greek: "Ασημί", code: "37" },
  "38": { hex: "#0093B2", english: "Ocean Blue", greek: "Ωκεανί", code: "38" },
  "39": { hex: "#012169", english: "Blue Purple", greek: "Μπλε Μωβ", code: "39" },
  "40": { hex: "#4F2C1D", english: "Dark Brown", greek: "Καφέ Σκούρο", code: "40" },
  "41": { hex: "#CDA077", english: "Camel", greek: "Μπεζ Σκούρο", code: "41" },
  "42": { hex: "#5E8AB4", english: "Ciel", greek: "Σιέλ Ραφ", code: "42" },
  "43": { hex: "#43695B", english: "Cypress", greek: "Κυπαρισσί", code: "43" },
  "44": { hex: "#1B365D", english: "Blue Black", greek: "Μπλε Μαύρο", code: "44" },
  "45": { hex: "#FFE600", english: "Clear Yellow", greek: "Διάφανο Κίτρινο", code: "45" },
  "46": { hex: "#FF8000", english: "Clear Orange", greek: "Διάφανο Πορτοκαλί", code: "46" },
  "47": { hex: "#B7DD79", english: "Clear Green", greek: "Διάφανο Πράσινο", code: "47" },
  "48": { hex: "#7BAFD4", english: "Clear Blue", greek: "Διάφανο Μπλε", code: "48" },
  "49": { hex: "#B884CB", english: "Clear Violet", greek: "Διάφανο Βιολέ", code: "49" },
  "50": { hex: "#C7C9C7", english: "Grey Beige", greek: "Γκρι Μπεζ", code: "50" },
  "51": { hex: "#8A8D8F", english: "Silver Perle", greek: "Ασημί Περλέ", code: "51" },
  "52": { hex: "#003087", english: "Blue Μarine", greek: "Μπλε Μαρίν", code: "52" },
  "53": { hex: "#EDEDE6", english: "Ecru", greek: "Εκρού", code: "53" },
  "55": { hex: "#205C40", english: "Dark Cypress", greek: "Σκούρο Κυπαρισσί", code: "55" },
  "56": { hex: "#D1BAB3", english: "Sand Beige", greek: "Μπεζ Άμμου", code: "56" },
  "57": { hex: "#A4DBE8", english: "Maya Blue", greek: "Maya Μπλε", code: "57" },
  "58": { hex: "#5B6770", english: "Titanium Grey", greek: "Γκρι Τιτανίου", code: "58" },
  "59": { hex: "#5C068C", english: "Amethyst", greek: "Αμέθυστος", code: "59" },
  "60": { english: "Granite", greek: "Γρανίτης", code: "60" },
  "62": { hex: "#00558C", english: "Aegean Blue", greek: "Μπλε Αιγαίου", code: "62" },
  "63": { hex: "#9D968D", english: "Cool Grey", greek: "Γκρι Ψυχρό", code: "63" },
  "64": { hex: "#BE531C", english: "Cinnamon", greek: "Kανελί", code: "64" },
  "65": { hex: "#B7B09C", english: "Pebble Grey", greek: "Βότσαλο", code: "65" },
  "66": { hex: "#989A98", english: "Grey", greek: "Γκρι", code: "66" },
  "67": { hex: "#6D3332", english: "Maroon", greek: "Μαρόν", code: "67" },
  "68": { hex: "#D12B92", english: "Fuchsia", greek: "Μενεηεδί", code: "68" },
  "69": { hex: "#212E2B", english: "Deep Grey", greek: "Γκρι Σκούρο", code: "69" },
  "70": { hex: "#D1DDE6", english: "Sky Pastel", greek: "Παστέλ Ουρανί", code: "70" },
  "71": { hex: "#D6BFDD", english: "Lila Pastel", greek: "Παστέλ Λιλά", code: "71" },
  "72": { hex: "#B5E3D8", english: "Mint Pastel", greek: "Παστέλ Μέντα", code: "72" },
  "73": { hex: "#6BA4B8", english: "Pearl Blue", greek: "Σιέλ Μπλε", code: "73" },
  "74": { hex: "#A7A8AA", english: "Grey Pastel", greek: "Παστέλ Γκρι", code: "74" },
  "75": { hex: "#77C5D5", english: "Veraman", greek: "Βεραμάν", code: "75" },
  "76": { hex: "#D7A3AB", english: "Dusty Pink", greek: "Σκούρο ροζ", code: "76" },
  "77": { hex: "#C4BFB6", english: "Ivory", greek: "Ιβουάρ", code: "77" },
  "78": { hex: "#ECD898", english: "Cream", greek: "Κρεμ", code: "78" },
  "79": { hex: "#B1B3B3", english: "Ash Grey", greek: "Γκρι Στάχτης", code: "79" },
  "80": { hex: "#5E514D", english: "Εlephant Grey", greek: "Ελεφαντί", code: "80" },
  "81": { hex: "#D4CFC1", english: "Ochra", greek: "Ώχρα", code: "81" },
  "82": { hex: "#936D73", english: "Desert Pink", greek: "Σάπιο Μήλο", code: "82" },
  "83": { hex: "#595478", english: "Mauve", greek: "Μαβί", code: "83" },
  "84": { hex: "#949300", english: "Basil", greek: "Βασιλικός", code: "84" },
  "86": { hex: "#84754E", english: "Gold", greek: "Χρυσό", code: "86" },
  "87": { hex: "#D4E0D4", english: "Sugar white", greek: "Ζαχαρί", code: "87" },
  "88": { hex: "#84BD00", english: "Lime", greek: "Λάιμ", code: "88" },
  "89": { hex: "#F2C75C", english: "Μango", greek: "Μάνγκο", code: "89" },
  "90": { english: "Marble White", greek: "Mαρμαρί Τρίχα", code: "90" },
  "91": { hex: "#A45A2A", english: "Pilos", greek: "Πηλός", code: "91" },
  "92": { english: "Onyx", greek: "Όνυχας", code: "92" },
  "93": { english: "Smoke", greek: "Σταχτί", code: "93" },
  "94": { english: "Maoni", greek: "Μαόνι", code: "94" },
  "95": { english: "Citrine", greek: "Κίτρο", code: "95" },
  "96": { english: "Lava", greek: "Λάβα", code: "96" },
  "97": { english: "Petra", greek: "Πέτρα", code: "97" },
  "98": { english: "Agate", greek: "Αχάτης", code: "98" },
};

const orderedColorKeys = Object.keys(colorMap).sort((a, b) => b.length - a.length);

const isNoiseToken = (token: string) => {
  const normalized = normalizeColorKey(token);
  return (
    normalized === "" ||
    normalized === "MIX" ||
    normalized === "CUSTOM" ||
    normalized === "GR" ||
    normalized === "EN" ||
    normalized === "GR/EN"
  );
};

const splitMixedColorTokens = (raw: string) =>
  (raw || "")
    .split("/")
    .map((token) => token.replace(/-(GR\/EN|GR|EN)$/i, "").trim())
    .filter((token) => !isNoiseToken(token));

const resolveSingleMeta = (raw: string): ColorMeta => {
  const normalized = normalizeColorKey(raw);
  const match = orderedColorKeys.find((key) => normalized.includes(key));
  if (!match) {
    return {
      hex: hashColor(raw),
      english: (raw || "").trim() || "Unknown",
      greek: (raw || "").trim() || "???????",
      code: "",
    };
  }

  const meta = colorMap[match];
  return {
    hex: meta.hex || hashColor(raw),
    english: meta.english,
    greek: meta.greek,
    code: meta.code,
  };
};

export const matchesColorSelection = (variantColor: string, selectedColor: string) => {
  const selectedNorm = normalizeColorKey(selectedColor);
  if (!selectedNorm) return false;

  const variantNorm = normalizeColorKey(variantColor);
  if (variantNorm === selectedNorm) return true;

  const variantTokens = splitMixedColorTokens(variantColor).map(normalizeColorKey);
  const selectedTokens = splitMixedColorTokens(selectedColor).map(normalizeColorKey);

  if (variantTokens.includes(selectedNorm)) return true;
  if (selectedTokens.length > 0 && selectedTokens.every((token) => variantTokens.includes(token))) {
    return true;
  }

  return false;
};

export const resolveColor = (raw: string) => resolveSingleMeta(raw).hex || hashColor(raw);

export const resolveColorTitle = (raw: string, language: "el" | "en" = "en") => {
  const pickTitle = (token: string) => {
    const meta = resolveSingleMeta(token);
    const greek = (meta.greek || "").trim();
    const english = (meta.english || "").trim();
    if (language === "el") return greek || english;
    return english || greek;
  };

  const tokens = splitMixedColorTokens(raw);
  if (tokens.length === 0) return pickTitle(raw);
  const resolved = tokens.map((token) => pickTitle(token));
  return Array.from(new Set(resolved)).join(" / ");
};

export const resolveSwatchBackground = (raw: string) => {
  const tokens = splitMixedColorTokens(raw);
  if (tokens.length <= 1) return resolveSingleMeta(raw).hex || hashColor(raw);

  const colors = tokens.map((token) => resolveSingleMeta(token).hex || hashColor(token));
  if (colors.length === 2) {
    return `linear-gradient(135deg, ${colors[0]} 0%, ${colors[0]} 50%, ${colors[1]} 50%, ${colors[1]} 100%)`;
  }

  return `linear-gradient(135deg, ${colors.join(", ")})`;
};

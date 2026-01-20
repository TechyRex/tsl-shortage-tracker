// script.js - Main Form Logic

// Configuration
const SHEETDB_URL = 'https://sheetdb.io/api/v1/ky6mzl5sav83s';
const CODES_SHEET_URL = 'https://sheetdb.io/api/v1/ky6mzl5sav83s?sheet=codes'; // Separate sheet for codes

// Data Arrays
const truckData = [
    // Anthony's Trucks
    { tno: "T1020", truckNo: "FKJ20YA", lc: "ANTHONY" },
    { tno: "T1021", truckNo: "FKJ21YA", lc: "ANTHONY" },
    { tno: "T1022", truckNo: "FKJ22YA", lc: "ANTHONY" },
    { tno: "T1023", truckNo: "FKJ23YA", lc: "ANTHONY" },
    { tno: "T1024", truckNo: "BDG24XZ", lc: "ANTHONY" },
    { tno: "T1025", truckNo: "BDG25XZ", lc: "ANTHONY" },
    { tno: "T1026", truckNo: "BDG26XZ", lc: "ANTHONY" },
    { tno: "T1027", truckNo: "BDG27XZ", lc: "ANTHONY" },
    { tno: "T1028", truckNo: "BDG28XZ", lc: "ANTHONY" },
    { tno: "T1029", truckNo: "BDG29XZ", lc: "ANTHONY" },
    { tno: "T1030", truckNo: "BDG30XZ", lc: "ANTHONY" },
    { tno: "T1031", truckNo: "BDG31XZ", lc: "ANTHONY" },
    { tno: "T1032", truckNo: "BDG32XZ", lc: "ANTHONY" },
    { tno: "T1033", truckNo: "BDG33XZ", lc: "ANTHONY" },
    { tno: "T1034", truckNo: "BDG34XZ", lc: "ANTHONY" },
    { tno: "T1035", truckNo: "BDG35XZ", lc: "ANTHONY" },
    { tno: "T843", truckNo: "APP843XW", lc: "ANTHONY" },
    { tno: "T956", truckNo: "KSF956XZ", lc: "ANTHONY" },
    { tno: "T958", truckNo: "KSF958XZ", lc: "ANTHONY" },
    { tno: "T870", truckNo: "APP870XW", lc: "ANTHONY" },
    { tno: "T800", truckNo: "LSD800XW", lc: "ANTHONY" },
    { tno: "T891", truckNo: "LSD891XW", lc: "ANTHONY" },
    { tno: "T957", truckNo: "KSF957XZ", lc: "ANTHONY" },
    { tno: "T959", truckNo: "KSF959XZ", lc: "ANTHONY" },
    { tno: "T923", truckNo: "LSD923XW", lc: "ANTHONY" },
    // Samson's Trucks
    { tno: "T846", truckNo: "APP846XW", lc: "SAMSON" },
    { tno: "T892", truckNo: "LSD892XW", lc: "SAMSON" },
    { tno: "T949", truckNo: "LSD949XW", lc: "SAMSON" },
    { tno: "T1000", truckNo: "AKD100XZ", lc: "SAMSON" },
    { tno: "T1001", truckNo: "APP01YA", lc: "SAMSON" },
    { tno: "T1002", truckNo: "APP02YA", lc: "SAMSON" },
    { tno: "T1004", truckNo: "APP04YA", lc: "SAMSON" },
    { tno: "T1005", truckNo: "APP05YA", lc: "SAMSON" },
    { tno: "T832", truckNo: "APP832XZ", lc: "SAMSON" },
    { tno: "T1008", truckNo: "FKJ08YA", lc: "SAMSON" },
    { tno: "T1009", truckNo: "FKJ09YA", lc: "SAMSON" },
    { tno: "T1010", truckNo: "FKJ10YA", lc: "SAMSON" },
    { tno: "T1012", truckNo: "FKJ12YA", lc: "SAMSON" },
    { tno: "T1013", truckNo: "FKJ13YA", lc: "SAMSON" },
    { tno: "T1014", truckNo: "FKJ14YA", lc: "SAMSON" },
    { tno: "T1015", truckNo: "FKJ15YA", lc: "SAMSON" },
    { tno: "T1016", truckNo: "FKJ16YA", lc: "SAMSON" },
    { tno: "T860", truckNo: "APP860XW", lc: "SAMSON" },
    { tno: "T1018", truckNo: "FKJ18YA", lc: "SAMSON" },
    { tno: "T1019", truckNo: "FKJ19YA", lc: "SAMSON" },
    { tno: "T841", truckNo: "APP841XW", lc: "SAMSON" },
    { tno: "T1007", truckNo: "FKJ07YA", lc: "SAMSON" },
    { tno: "T1011", truckNo: "FKJ11YA", lc: "SAMSON" },
    { tno: "T1026", truckNo: "BDG26XZ", lc: "SAMSON" },
    { tno: "T908", truckNo: "LSD908XW", lc: "SAMSON" },
    // Boluwatife's Trucks
    { tno: "T453", truckNo: "KRD453XM", lc: "BOLUWATIFE" },
    { tno: "T813", truckNo: "LSD813XW", lc: "BOLUWATIFE" },
    { tno: "T866", truckNo: "APP866XW", lc: "BOLUWATIFE" },
    { tno: "T858", truckNo: "APP858XW", lc: "BOLUWATIFE" },
    { tno: "T960", truckNo: "KSF960XZ", lc: "BOLUWATIFE" },
    { tno: "T961", truckNo: "KSF961XZ", lc: "BOLUWATIFE" },
    { tno: "T962", truckNo: "KSF962XZ", lc: "BOLUWATIFE" },
    { tno: "T963", truckNo: "KSF963XZ", lc: "BOLUWATIFE" },
    { tno: "T964", truckNo: "KSF964XZ", lc: "BOLUWATIFE" },
    { tno: "T965", truckNo: "KSF965XZ", lc: "BOLUWATIFE" },
    { tno: "T966", truckNo: "KSF966XZ", lc: "BOLUWATIFE" },
    { tno: "T967", truckNo: "KSF967XZ", lc: "BOLUWATIFE" },
    { tno: "T968", truckNo: "KSF968XZ", lc: "BOLUWATIFE" },
    { tno: "T969", truckNo: "KSF969XZ", lc: "BOLUWATIFE" },
    { tno: "T970", truckNo: "KSF970XZ", lc: "BOLUWATIFE" },
    { tno: "T971", truckNo: "KSF971XZ", lc: "BOLUWATIFE" },
    { tno: "T972", truckNo: "KSF972XZ", lc: "BOLUWATIFE" },
    { tno: "T973", truckNo: "KSF973XZ", lc: "BOLUWATIFE" },
    { tno: "T974", truckNo: "FKJ974XZ", lc: "BOLUWATIFE" },
    { tno: "T975", truckNo: "APP975XZ", lc: "BOLUWATIFE" },
    { tno: "T976", truckNo: "APP976XZ", lc: "BOLUWATIFE" },
    { tno: "T977", truckNo: "APP977XZ", lc: "BOLUWATIFE" },
    { tno: "T978", truckNo: "APP978XZ", lc: "BOLUWATIFE" },
    { tno: "T979", truckNo: "APP979XZ", lc: "BOLUWATIFE" },
    { tno: "T888", truckNo: "LSD888XW", lc: "BOLUWATIFE" },
    // Tobi's Trucks
    { tno: "T826", truckNo: "APP826XW", lc: "TOBI" },
    { tno: "T853", truckNo: "APP853XZ", lc: "TOBI" },
    { tno: "T802", truckNo: "LSD802XW", lc: "TOBI" },
    { tno: "T450", truckNo: "KRD450XM", lc: "TOBI" },
    { tno: "T910", truckNo: "", lc: "TOBI" },
    { tno: "T980", truckNo: "APP980XZ", lc: "TOBI" },
    { tno: "T981", truckNo: "APP981XZ", lc: "TOBI" },
    { tno: "T982", truckNo: "APP982XZ", lc: "TOBI" },
    { tno: "T983", truckNo: "APP983XZ", lc: "TOBI" },
    { tno: "T984", truckNo: "APP984XZ", lc: "TOBI" },
    { tno: "T985", truckNo: "APP985XZ", lc: "TOBI" },
    { tno: "T986", truckNo: "APP986XZ", lc: "TOBI" },
    { tno: "T987", truckNo: "APP987XZ", lc: "TOBI" },
    { tno: "T988", truckNo: "APP988XZ", lc: "TOBI" },
    { tno: "T989", truckNo: "APP989XZ", lc: "TOBI" },
    { tno: "T990", truckNo: "APP990XZ", lc: "TOBI" },
    { tno: "T991", truckNo: "APP991XZ", lc: "TOBI" },
    { tno: "T992", truckNo: "APP992XZ", lc: "TOBI" },
    { tno: "T993", truckNo: "APP993XZ", lc: "TOBI" },
    { tno: "T994", truckNo: "APP994XZ", lc: "TOBI" },
    { tno: "T995", truckNo: "APP995XZ", lc: "TOBI" },
    { tno: "T996", truckNo: "APP996XZ", lc: "TOBI" },
    { tno: "T997", truckNo: "APP997XZ", lc: "TOBI" },
    { tno: "T998", truckNo: "APP998XZ", lc: "TOBI" },
    { tno: "T999", truckNo: "APP999XZ", lc: "TOBI" }
];

const staffData = [
    { staffId: "11084", name: "ADEREMI ADEGBOYE EZEKIEL" },
    { staffId: "11411", name: "EBUBE EMMANUEL SAMSON" },
    { staffId: "11416", name: "ALIDU MUHAMMED" },
    { staffId: "11424", name: "TAIWO ORIYOMI ADEBAYO" },
    { staffId: "11643", name: "JULIUS OYETUNJI ADEREMI" },
    { staffId: "11724", name: "WASIU BAYONLE BILEWUMI" },
    { staffId: "11766", name: "KEHINDE MONSURU AJAYI" },
    { staffId: "11787", name: "MUHAMMED SULAIMON" },
    { staffId: "11832", name: "IFEDAYO TEMIDAYO" },
    { staffId: "11977", name: "LATEEF ABDUL RAHMAN" },
    { staffId: "12009", name: "OLUWASEGUN AKINOLA" },
    { staffId: "12010", name: "IBRAHIM DAHUNSI" },
    { staffId: "12067", name: "OLUSOLA BENJAMIN OGUNYOMI" },
    { staffId: "12107", name: "OBAZE  JULIUS MIKE" },
    { staffId: "12177", name: "AKINWARE BENJAMIN ODUN" },
    { staffId: "12250", name: "ENEKO FAMOUS THOMAS" },
    { staffId: "12279", name: "SAMSON OLUMIDE AYANTUNDE" },
    { staffId: "12300", name: "JUDE GOODLUCK EYERUROMA" },
    { staffId: "12357", name: "MARTINS ADEGOKE" },
    { staffId: "12398", name: "GANIYU ALONGBIJA ADEKOLA" },
    { staffId: "12440", name: "OLUWATOSIN KOLAWOLE" },
    { staffId: "12475", name: "SUNMONU AKEEM OGUNTOLA" },
    { staffId: "12503", name: "OYEKANMI OYETUNDE OYEKANMI" },
    { staffId: "12530", name: "IDRIS ABDULAZEEZ" },
    { staffId: "12622", name: "KADEDE GODWIN" },
    { staffId: "12623", name: "ADEBIMPE TAIWO IDRISU" },
    { staffId: "12627", name: "OYINLOLA ABIOLA KAZEEM" },
    { staffId: "12640", name: "OGUGUA CHINONSO GOODLUCK" },
    { staffId: "12669", name: "AKINGBULUGBE AKIN" },
    { staffId: "12761", name: "OLAMILEKAN HAMMED NURUDEEN" },
    { staffId: "12847", name: "MUSEDIQ ADEKUNLE ADEGBENGA" },
    { staffId: "12904", name: "OLUGBEMIGA OLAYINKA AMOS" },
    { staffId: "12993", name: "ODEDARE SAHEED ADEWOLE" },
    { staffId: "13172", name: "JEFF ALEX" },
    { staffId: "13242", name: "JIMMY MARK ISAAC" },
    { staffId: "13275", name: "BABALOLA MICHAEL JIMOH" },
    { staffId: "13376", name: "OLADIMEJI TAOFEEQ OLAJIDE" },
    { staffId: "13416", name: "SAHEED  OLAWALE ADISA" },
    { staffId: "13460", name: "MUKAILA AZEEZ" },
    { staffId: "13521", name: "SOLA JOSEPH SAMUEL" },
    { staffId: "13591", name: "ADEWALE TITUS ADEKUNLE" },
    { staffId: "13597", name: "MUYIWA  OLUWADAYO AYODEJI" },
    { staffId: "13655", name: "SYLVESTER" },
    { staffId: "13660", name: "DADA SEGUN MOSES" },
    { staffId: "13717", name: "KEHINDE SOKUNBI" },
    { staffId: "13718", name: "MOJEED OLAWALE HAMMED" },
    { staffId: "13719", name: "OLA IDRIS ADEBAYO" },
    { staffId: "13733", name: "AZEEZ  ABASS  OLAWALE" },
    { staffId: "13737", name: "ABIDEEN ADEOLA ABUBAKAR" },
    { staffId: "13754", name: "SAMUEL MOSIKO DARE" },
    { staffId: "13756", name: "BADMUS" },
    { staffId: "13758", name: "ABIODUN  SANUSI" },
    { staffId: "13803", name: "TAOREED ALABI AKINBAMI" },
    { staffId: "13813", name: "JOHN PHILLIP IGWE" },
    { staffId: "13926", name: "ADEBAYO SODIQ HAMZAT" },
    { staffId: "13967", name: "SALAWU KEHINDE KAMORUDEEN" },
    { staffId: "14015", name: "OSABUOHEN BENARD ONYEMA" },
    { staffId: "14029", name: "SAMUEL SEGUN ASIMOLOWO" },
    { staffId: "14049", name: "AUGUSTINE ONYEMBU" },
    { staffId: "14054", name: "JULIUS OLADAPO ORIOKE" },
    { staffId: "14063", name: "JOHN CHINEDU UBAKA" },
    { staffId: "14120", name: "IFEANYI MOSES NWALI" },
    { staffId: "14124", name: "AKEEM OPEYEMI ADEBAYO" },
    { staffId: "14181", name: "OLUWAGBEMIGA EZEKIEL ADEWOLE" },
    { staffId: "14208", name: "AYO KINGSLEY OVAT" },
    { staffId: "14219", name: "AYENI EMMANUEL AINA" },
    { staffId: "14225", name: "ARTHUR EKENE OSHILONYA" },
    { staffId: "14310", name: "JACKSON AMOS SUNDAY" },
    { staffId: "14312", name: "RASHEED MUTIU ADEBAYO" },
    { staffId: "14471", name: "KUDUS MUGHAN ALHAJI" },
    { staffId: "14502", name: "MIRACLE  OLUWATOSIN  JOHNSON" },
    { staffId: "14554", name: "RIDWAN AYOBAMI  GBADEYANKA" },
    { staffId: "14602", name: "OGUNDELE OLALEKAN KOYUM" },
    { staffId: "14671", name: "ABIMBOLA ADEOLUWA ADEKOYA" },
    { staffId: "14678", name: "BUHARI ABDULHAKEEM AYODELE" },
    { staffId: "14692", name: "EGBEDEYI SODIQ OLUWAFEMI" },
    { staffId: "14726", name: "KINGDOM  EDET AKPAN" },
    { staffId: "14754", name: "AKOREDE OGUNMEFUN HAMID" },
    { staffId: "14771", name: "ISHOLA STEPHEN OLUKUNLE" },
    { staffId: "14816", name: "OPEYEMI ABDULAZEEZ" },
    { staffId: "14826", name: "DICKSON MICHAEL HENRY" },
    { staffId: "14829", name: "ADEWUNMI ISA ADEGBOYEGA" },
    { staffId: "14835", name: "TAOFEEQ AJIBOLA HABEEB" },
    { staffId: "14841", name: "DAVID MATHEW OLUFEMI" },
    { staffId: "14907", name: "NURENI AFEEZ ABIOLA" },
    { staffId: "14915", name: "JOSEPH ODEY INAKU" },
    { staffId: "14922", name: "OBOH EDU SUNDAY" },
    { staffId: "14924", name: "YEKINNI NURUDEEN OLUWASEUN" },
    { staffId: "14926", name: "WILLIAM JOSHUA ARCHIBONG" },
    { staffId: "14932", name: "AGBOOLA SUNDAY" },
    { staffId: "14941", name: "AKINDURO BABATUNDE GODSTIME" },
    { staffId: "14943", name: "OBADELE SUNDAY SAMUEL" },
    { staffId: "14962", name: "LAWAL AJIBOLA" },
    { staffId: "15016", name: "ANTHONY OKON EDET" },
    { staffId: "15034", name: "ONIFADE DAMILARE EMMANUEL" },
    { staffId: "15048", name: "YAKUBU ABDULLAHI ADEIZA" },
    { staffId: "15060", name: "OLASUNKANMI IBRAHAM HAMMED" },
    { staffId: "15065", name: "ODEJINMI AKINKUNMI DAMILARE" },
    { staffId: "15076", name: "IBRAHIM ADEYINKA JELILI" },
    { staffId: "15084", name: "RAUF HAKEEM KEHINDE" },
    { staffId: "15112", name: "OPEYEMI ANWO BABATUNDE" },
    { staffId: "15114", name: "GOSPEL JOHN ETIM" },
    { staffId: "15163", name: "SULEIMAN ABRAHIM OLAYEMI" },
    { staffId: "15172", name: "ROBINSON SAMSON ALUNA" },
    { staffId: "15205", name: "IBRAHIM DADA MOSHOOD" },
    { staffId: "15231", name: "JOSHUA OLUWARANTI" }
];

const skuData = [
    { sku: "33 Export Bottle 60cl", price: 8990 },
    { sku: "33 Export Can 33cl", price: 10485 },
    { sku: "33 Export Can 50cl", price: 14250 },
    { sku: "Amstel Malta Bottle 33cl", price: 12920 },
    { sku: "Amstel Malta Can 33cl", price: 13095 },
    { sku: "Amstel Malta PET 33cl", price: 5520 },
    { sku: "Amstel Ultra Sleek Can 33cl", price: 13100 },
    { sku: "Climax PET 50cl", price: 5335 },
    { sku: "Climax Red PET 50cl", price: 5335 },
    { sku: "Climax Sleek Can 33cl", price: 12290 },
    { sku: "Desperado Bottle 45cl", price: 17715 },
    { sku: "Desperado Can 44cl", price: 19010 },
    { sku: "Fayrouz Apple Watermelon Pet 33cl", price: 4490 },
    { sku: "Fayrouz Apple Watermelon Sleek Can 33cl", price: 11940 },
    { sku: "Fayrouz Pineapple Bottle 33cl", price: 8795 },
    { sku: "Fayrouz Pineapple PET 33cl", price: 4490 },
    { sku: "Fayrouz Pineapple Sleek Can 33cl", price: 11940 },
    { sku: "Goldberg Black Bottle 60cl", price: 12780 },
    { sku: "Goldberg Black Can 44cl", price: 15510 },
    { sku: "Goldberg Bottle 60cl", price: 8990 },
    { sku: "Goldberg Can 50cl", price: 14240 },
    { sku: "Goldberg Black Bottle 45cl", price: 12780 },
    { sku: "Gulder Bottle 60cl", price: 10800 },
    { sku: "Gulder Can 44cl", price: 16260 },
    { sku: "Heineken Bottle 60cl", price: 12370 },
    { sku: "Heineken Bottle 45cl", price: 16515 },
    { sku: "Heineken Sleek Can 33cl", price: 15030 },
    { sku: "Hi-Malt PET 33cl", price: 5015 },
    { sku: "Hi-Malt Classice Can 33Cl", price: 11080 },
    { sku: "Legend Bottle 60cl", price: 10915 },
    { sku: "Legend Bottle 45cl", price: 15375 },
    { sku: "Legend Can 44cl", price: 19000 },
    { sku: "Legend Twist Ginger Sleek Can 33cl", price: 16725 },
    { sku: "Legend Twist Lemon Bottle 33cl", price: 14665 },
    { sku: "Legend Twist Lemon Sleek Can 33cl", price: 16725 },
    { sku: "Legend Twist Pineapple Sleek Can 33cl", price: 16725 },
    { sku: "Life Bottle 60cl", price: 8990 },
    { sku: "Life Can 50cl", price: 14240 },
    { sku: "Maltina Bottle 33cl", price: 12920 },
    { sku: "Maltina Can 33cl", price: 13095 },
    { sku: "Maltina PET 33cl", price: 5520 },
    { sku: "Maltina Pineapple Bottle 33cl", price: 12920 },
    { sku: "Maltina Pineapple Can 33cl", price: 13095 },
    { sku: "Maltina Pineapple Pet 33cl", price: 5520 },
    { sku: "Maltina Vanilla Bottle 33cl", price: 12920 },
    { sku: "Maltina Vanilla Can 33cl", price: 13095 },
    { sku: "Maltina Vanilla Pet 33cl", price: 5520 },
    { sku: "Star Bottle 45cl", price: 9755 },
    { sku: "Star Bottle 60cl", price: 10330 },
    { sku: "Star Can 33cl", price: 11495 },
    { sku: "Star Can 50cl", price: 11880 },
    { sku: "Star Lite Bottle 45cl", price: 9775 },
    { sku: "Star Lite Bottle 60cl", price: 7900 },
    { sku: "Star Radler Citrus Bottle 45cl", price: 13115 },
    { sku: "Star Radler Citrus Sleek Can 33cl", price: 13825 },
    { sku: "Star Radler Red Fruits Bottle 45cl", price: 13115 },
    { sku: "Star Radler Red Fruits Sleek Can 33cl", price: 13825 },
    { sku: "Tiger Bottle 45cl", price: 14900 },
    { sku: "Tiger Can 44cl", price: 13470 },
    { sku: "Turbo King Bottle 60cl", price: 6990 },
    { sku: "Turbo King Bottle 33cl", price: 9085 },
    { sku: "Williams Bottle 60cl", price: 6990 },
    { sku: "Williams Bottle 33cl", price: 9085 },
    { sku: "Empties", price: 0 },
    { sku: "Pallets", price: 0 },
    { sku: "Sugar", price: 0 },
    { sku: "GZI Cans", price: 0 },
    { sku: "Zagg Energy PET 50cl", price: 5305 },
    { sku: "Zagg Energy Sleek Can 33cl", price: 10150 }
];

// State Management
let products = [];
let currentRecordId = null;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Set default dates
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dateCaptured').value = today;
    document.getElementById('loadingDate').value = today;
    
    // Add first product row
    addProductRow();
    
    // Event Listeners
    document.getElementById('tNo').addEventListener('input', handleTNoInput);
    document.getElementById('staffId').addEventListener('input', handleStaffIdInput);
    document.getElementById('addProductBtn').addEventListener('click', addProductRow);
    document.getElementById('submitFormBtn').addEventListener('click', submitForm);
    document.getElementById('saveDraftBtn').addEventListener('click', saveAsDraft);
    document.getElementById('clearFormBtn').addEventListener('click', clearForm);
    
    // Update summary
    updateSummary();
});

// Auto-populate Truck No and LC based on T.No
function handleTNoInput() {
    const tNoInput = document.getElementById('tNo').value.trim().toUpperCase();
    const truckNoInput = document.getElementById('truckNo');
    const lcInput = document.getElementById('lcIncharge');
    
    const truck = truckData.find(t => t.tno === tNoInput);
    
    if (truck) {
        truckNoInput.value = truck.truckNo;
        lcInput.value = truck.lc;
    } else {
        truckNoInput.value = '';
        lcInput.value = '';
    }
}

// Auto-populate Delivery Officer based on Staff ID
function handleStaffIdInput() {
    const staffIdInput = document.getElementById('staffId').value.trim();
    const deliveryOfficerInput = document.getElementById('deliveryOfficer');
    
    const staff = staffData.find(s => s.staffId === staffIdInput);
    
    if (staff) {
        deliveryOfficerInput.value = staff.name;
    } else {
        deliveryOfficerInput.value = '';
    }
}

// Add new product row
function addProductRow() {
    const rowIndex = products.length;
    const product = {
        id: Date.now() + rowIndex,
        productLoaded: '',
        skuPrice: 0,
        qtyLoaded: 0,
        qtyDelivered: 0,
        qtyRejected: 0,
        qtyReturned: 0,
        shortageQtyPre: 0,
        shortageValuePre: 0,
        afterAnalysis: 0,
        actualQty: 0,
        totalShortage: 0,
        actualValue: 0
    };
    
    products.push(product);
    renderProductsTable();
    return product.id;
}

// Remove product row
function removeProductRow(id) {
    products = products.filter(p => p.id !== id);
    renderProductsTable();
}

// Render products table
function renderProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        
        // Product Loaded Dropdown
        const productCell = document.createElement('td');
        const productSelect = document.createElement('select');
        productSelect.className = 'form-select';
        productSelect.innerHTML = `
            <option value="">Select Product</option>
            ${skuData.map(sku => `
                <option value="${sku.sku}" ${product.productLoaded === sku.sku ? 'selected' : ''}>
                    ${sku.sku}
                </option>
            `).join('')}
        `;
        productSelect.addEventListener('change', (e) => {
            product.productLoaded = e.target.value;
            const selectedSku = skuData.find(s => s.sku === e.target.value);
            product.skuPrice = selectedSku ? selectedSku.price : 0;
            calculateProductValues(product.id);
        });
        productCell.appendChild(productSelect);
        
        // SKU Price (readonly)
        const skuCell = document.createElement('td');
        const skuInput = document.createElement('input');
        skuInput.type = 'text';
        skuInput.className = 'form-input readonly-input';
        skuInput.value = formatCurrency(product.skuPrice);
        skuInput.readOnly = true;
        skuCell.appendChild(skuInput);
        
        // QTY Loaded
        const qtyLoadedCell = document.createElement('td');
        const qtyLoadedInput = document.createElement('input');
        qtyLoadedInput.type = 'number';
        qtyLoadedInput.className = 'form-input';
        qtyLoadedInput.value = product.qtyLoaded;
        qtyLoadedInput.min = 0;
        qtyLoadedInput.addEventListener('input', (e) => {
            product.qtyLoaded = parseFloat(e.target.value) || 0;
            calculateProductValues(product.id);
        });
        qtyLoadedCell.appendChild(qtyLoadedInput);
        
        // QTY Delivered
        const qtyDeliveredCell = document.createElement('td');
        const qtyDeliveredInput = document.createElement('input');
        qtyDeliveredInput.type = 'number';
        qtyDeliveredInput.className = 'form-input';
        qtyDeliveredInput.value = product.qtyDelivered;
        qtyDeliveredInput.min = 0;
        qtyDeliveredInput.addEventListener('input', (e) => {
            product.qtyDelivered = parseFloat(e.target.value) || 0;
            calculateProductValues(product.id);
        });
        qtyDeliveredCell.appendChild(qtyDeliveredInput);
        
        // QTY Rejected (auto-calculated)
        const qtyRejectedCell = document.createElement('td');
        const qtyRejectedInput = document.createElement('input');
        qtyRejectedInput.type = 'text';
        qtyRejectedInput.className = 'form-input readonly-input';
        qtyRejectedInput.value = product.qtyRejected;
        qtyRejectedInput.readOnly = true;
        qtyRejectedCell.appendChild(qtyRejectedInput);
        
        // QTY Returned
        const qtyReturnedCell = document.createElement('td');
        const qtyReturnedInput = document.createElement('input');
        qtyReturnedInput.type = 'number';
        qtyReturnedInput.className = 'form-input';
        qtyReturnedInput.value = product.qtyReturned;
        qtyReturnedInput.min = 0;
        qtyReturnedInput.addEventListener('input', (e) => {
            product.qtyReturned = parseFloat(e.target.value) || 0;
            calculateProductValues(product.id);
        });
        qtyReturnedCell.appendChild(qtyReturnedInput);
        
        // Shortage QTY-PRE (auto-calculated)
        const shortageQtyPreCell = document.createElement('td');
        const shortageQtyPreInput = document.createElement('input');
        shortageQtyPreInput.type = 'text';
        shortageQtyPreInput.className = 'form-input readonly-input';
        shortageQtyPreInput.value = product.shortageQtyPre;
        shortageQtyPreInput.readOnly = true;
        shortageQtyPreCell.appendChild(shortageQtyPreInput);
        
        // Shortage Value-PRE (auto-calculated)
        const shortageValuePreCell = document.createElement('td');
        const shortageValuePreInput = document.createElement('input');
        shortageValuePreInput.type = 'text';
        shortageValuePreInput.className = 'form-input readonly-input';
        shortageValuePreInput.value = formatCurrency(product.shortageValuePre);
        shortageValuePreInput.readOnly = true;
        shortageValuePreCell.appendChild(shortageValuePreInput);
        
        // After Analysis
        const afterAnalysisCell = document.createElement('td');
        const afterAnalysisInput = document.createElement('input');
        afterAnalysisInput.type = 'number';
        afterAnalysisInput.className = 'form-input';
        afterAnalysisInput.value = product.afterAnalysis;
        afterAnalysisInput.min = 0;
        afterAnalysisInput.addEventListener('input', (e) => {
            product.afterAnalysis = parseFloat(e.target.value) || 0;
            calculateProductValues(product.id);
        });
        afterAnalysisCell.appendChild(afterAnalysisInput);
        
        // Actual QTY (auto-calculated)
        const actualQtyCell = document.createElement('td');
        const actualQtyInput = document.createElement('input');
        actualQtyInput.type = 'text';
        actualQtyInput.className = 'form-input readonly-input';
        actualQtyInput.value = product.actualQty;
        actualQtyInput.readOnly = true;
        actualQtyCell.appendChild(actualQtyInput);
        
        // Total Shortage (auto-calculated)
        const totalShortageCell = document.createElement('td');
        const totalShortageInput = document.createElement('input');
        totalShortageInput.type = 'text';
        totalShortageInput.className = 'form-input readonly-input';
        totalShortageInput.value = product.totalShortage;
        totalShortageInput.readOnly = true;
        totalShortageCell.appendChild(totalShortageInput);
        
        // Actual Value (auto-calculated)
        const actualValueCell = document.createElement('td');
        const actualValueInput = document.createElement('input');
        actualValueInput.type = 'text';
        actualValueInput.className = 'form-input readonly-input';
        actualValueInput.value = formatCurrency(product.actualValue);
        actualValueInput.readOnly = true;
        actualValueCell.appendChild(actualValueInput);
        
        // Actions
        const actionsCell = document.createElement('td');
        const removeBtn = document.createElement('button');
        removeBtn.className = 'action-btn remove-btn';
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        removeBtn.addEventListener('click', () => removeProductRow(product.id));
        actionsCell.appendChild(removeBtn);
        
        // Append all cells to row
        const cells = [
            productCell, skuCell, qtyLoadedCell, qtyDeliveredCell,
            qtyRejectedCell, qtyReturnedCell, shortageQtyPreCell,
            shortageValuePreCell, afterAnalysisCell, actualQtyCell,
            totalShortageCell, actualValueCell, actionsCell
        ];
        
        cells.forEach(cell => row.appendChild(cell));
        tbody.appendChild(row);
    });
    
    updateSummary();
}

// Calculate values for a specific product
function calculateProductValues(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // QTY Rejected = QTY Loaded - QTY Delivered
    product.qtyRejected = product.qtyLoaded - product.qtyDelivered;
    
    // Shortage QTY-PRE = QTY Rejected - QTY Returned
    product.shortageQtyPre = product.qtyRejected - product.qtyReturned;
    
    // Shortage Value-PRE = Shortage QTY-PRE * SKU Price
    product.shortageValuePre = product.shortageQtyPre * product.skuPrice;
    
    // Actual QTY = QTY Returned - After Analysis
    product.actualQty = product.qtyReturned - product.afterAnalysis;
    
    // Total Shortage = Shortage QTY-PRE + Actual QTY
    product.totalShortage = product.shortageQtyPre + product.actualQty;
    
    // Actual Value = Total Shortage * SKU Price
    product.actualValue = product.totalShortage * product.skuPrice;
    
    renderProductsTable();
}

// Update summary card
function updateSummary() {
    const totalProducts = products.length;
    const totalShortageValue = products.reduce((sum, p) => sum + p.shortageValuePre, 0);
    const totalActualValue = products.reduce((sum, p) => sum + p.actualValue, 0);
    
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalShortageValue').textContent = formatCurrency(totalShortageValue);
    document.getElementById('totalActualValue').textContent = formatCurrency(totalActualValue);
    
    // Update overall status based on shortage
    let overallStatus = 'No Shortage';
    if (totalActualValue > 0) {
        overallStatus = 'Shortage Detected';
    } else if (totalActualValue < 0) {
        overallStatus = 'Over Delivery';
    }
    document.getElementById('overallStatus').textContent = overallStatus;
}

// Format currency
function formatCurrency(amount) {
    return '₦' + amount.toLocaleString('en-NG', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

// Show loading overlay
function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

// Hide loading overlay
function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.style.background = type === 'success' ? 'var(--tsl-success)' : 'var(--tsl-danger)';
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Validate form
function validateForm() {
    const requiredFields = [
        'dateCaptured', 'loadingDate', 'loadingPoint', 'contract',
        'tNo', 'staffId', 'shipmentNo'
    ];
    
    for (const fieldId of requiredFields) {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            showToast(`Please fill in ${field.placeholder || fieldId}`, 'error');
            field.focus();
            return false;
        }
    }
    
    if (products.length === 0) {
        showToast('Please add at least one product', 'error');
        return false;
    }
    
    for (const product of products) {
        if (!product.productLoaded) {
            showToast('Please select product for all rows', 'error');
            return false;
        }
    }
    
    return true;
}

// Get form data
function getFormData() {
    const basicInfo = {
        date_captured: document.getElementById('dateCaptured').value,
        loading_date: document.getElementById('loadingDate').value,
        loading_point: document.getElementById('loadingPoint').value,
        contract: document.getElementById('contract').value,
        t_no: document.getElementById('tNo').value,
        truck_no: document.getElementById('truckNo').value,
        lc: document.getElementById('lcIncharge').value,
        staff_id: document.getElementById('staffId').value,
        delivery_officer: document.getElementById('deliveryOfficer').value,
        shipment_no: document.getElementById('shipmentNo').value,
        cash_recovery: document.getElementById('cashRecovery')?.value || '',
        debit_memo: document.getElementById('debitMemo')?.value || '',
        white_slip: document.getElementById('whiteSlip')?.value || 'NO'
    };
    
    // Calculate totals
    const totalShortageValue = products.reduce((sum, p) => sum + p.shortageValuePre, 0);
    const totalActualValue = products.reduce((sum, p) => sum + p.actualValue, 0);
    
    // Combine product data
    const productData = products.map(p => ({
        product_loaded: p.productLoaded,
        sku_price: p.skuPrice,
        qty_loaded: p.qtyLoaded,
        qty_delivered: p.qtyDelivered,
        qty_rejected: p.qtyRejected,
        qty_returned: p.qtyReturned,
        shortage_qty_pre: p.shortageQtyPre,
        shortage_value_pre: p.shortageValuePre,
        after_analysis: p.afterAnalysis,
        actual_qty: p.actualQty,
        total_shortage: p.totalShortage,
        actual_value: p.actualValue
    }));
    
    return {
        ...basicInfo,
        products: JSON.stringify(productData),
        total_shortage_value: totalShortageValue,
        total_actual_value: totalActualValue,
        submission_time: new Date().toISOString(),
        last_edited: new Date().toISOString(),
        status: 'submitted'
    };
}

// Submit form
async function submitForm() {
    if (!validateForm()) return;
    
    showLoading();
    
    try {
        const formData = getFormData();
        
        const response = await fetch(SHEETDB_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [formData] })
        });
        
        if (response.ok) {
            showToast('Record submitted successfully!');
            clearForm();
            // Reset to one product row
            products = [];
            addProductRow();
        } else {
            throw new Error('Failed to submit');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error submitting form. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Save as draft
async function saveAsDraft() {
    if (!validateForm()) return;
    
    showLoading();
    
    try {
        const formData = getFormData();
        formData.status = 'draft';
        
        const response = await fetch(SHEETDB_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: [formData] })
        });
        
        if (response.ok) {
            showToast('Draft saved successfully!');
            currentRecordId = (await response.json()).id;
        } else {
            throw new Error('Failed to save draft');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error saving draft. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Clear form
function clearForm() {
    if (confirm('Are you sure you want to clear the form? All unsaved data will be lost.')) {
        document.querySelectorAll('input, select').forEach(element => {
            if (!element.classList.contains('readonly-input')) {
                element.value = '';
            }
        });
        
        // Reset dates to today
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('dateCaptured').value = today;
        document.getElementById('loadingDate').value = today;
        
        products = [];
        addProductRow();
        currentRecordId = null;
        
        showToast('Form cleared successfully');
    }
}

import { normalizeWarehouseLocation, uppercaseText } from './dataFormat.js';

// Updated from supplied Otpis Excel lists (29 July 2026).
// Shared ART/location source for Otpis, Inventar and Dopuna lookups.
export const PRODUCTION_ARTICLE_LOCATIONS = [
  {
    "art": "ART-006887",
    "location": "RS 30 AB 01",
    "materialType": "tende",
    "description": "V210 Kap Z/Lip 6,0m1 VS716"
  },
  {
    "art": "ART-006884",
    "location": "RS 30 AB 02",
    "materialType": "tende",
    "description": "V210 Kap Z/Lip 6,0m1 Ivoor"
  },
  {
    "art": "ART-006932",
    "location": "RS 30 AB 03",
    "materialType": "tende",
    "description": "V210 Voorlijst 6,0 M1 VS716 Antraciet"
  },
  {
    "art": "ART-006929",
    "location": "RS 30 AB 04",
    "materialType": "tende",
    "description": "V210 Voorlijst 6,0 M1 Ivoor"
  },
  {
    "art": "ART-007008",
    "location": "RS 30 AB 05",
    "materialType": "tende",
    "description": "V255 Bovenkap 5,0m1 Ivoor"
  },
  {
    "art": "ART-007013",
    "location": "RS 30 AB 06",
    "materialType": "tende",
    "description": "V255 Bovenkap 6,0m1 Ivoor"
  },
  {
    "art": "ART-007032",
    "location": "RS 30 AB 07",
    "materialType": "tende",
    "description": "V255 Voorlijst 5,0m1 Ivoor"
  },
  {
    "art": "ART-007037",
    "location": "RS 30 AB 08",
    "materialType": "tende",
    "description": "V255 Voorlijst 6,0m1 Ivoor"
  },
  {
    "art": "ART-007021",
    "location": "RS 30 AB 09",
    "materialType": "tende",
    "description": "V255 Onderkap 5,0m1 Ivoor"
  },
  {
    "art": "ART-007025",
    "location": "RS 30 AB 10",
    "materialType": "tende",
    "description": "V255 Onderkap 6,0m1 Ivoor"
  },
  {
    "art": "ART-044299",
    "location": "RS 30 AB 11",
    "materialType": "tende",
    "description": "V225/V230 Kap 5,5m1 VS905"
  },
  {
    "art": "ART-044303",
    "location": "RS 30 AB 12",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 5,5 M1 VS905"
  },
  {
    "art": "ART-006968",
    "location": "RS 30 AC 01",
    "materialType": "tende",
    "description": "V225/V230 Kap 4,0m1 VS716"
  },
  {
    "art": "ART-006985",
    "location": "RS 30 AC 02",
    "materialType": "tende",
    "description": "V225/V230 Kap 6,0m1 VS716"
  },
  {
    "art": "ART-006990",
    "location": "RS 30 AC 03",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 4,0 M1 VS716 Antra"
  },
  {
    "art": "ART-007003",
    "location": "RS 30 AC 04",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 6,0 M1 VS716 Antra"
  },
  {
    "art": "ART-007015",
    "location": "RS 30 AC 05",
    "materialType": "tende",
    "description": "V255 Bovenkap 6,0m1 VS716"
  },
  {
    "art": "ART-044306",
    "location": "RS 30 AC 06",
    "materialType": "tende",
    "description": "V255 Bovenkap 5,0m1 VS905"
  },
  {
    "art": "ART-007039",
    "location": "RS 30 AC 07",
    "materialType": "tende",
    "description": "V255 Voorlijst 6,0m1 VS716"
  },
  {
    "art": "ART-044313",
    "location": "RS 30 AC 08",
    "materialType": "tende",
    "description": "V255 Voorlijst 5,0m1 VS905"
  },
  {
    "art": "ART-007027",
    "location": "RS 30 AC 09",
    "materialType": "tende",
    "description": "V255 Onderkap 6,0m1 VS716"
  },
  {
    "art": "ART-044311",
    "location": "RS 30 AC 10",
    "materialType": "tende",
    "description": "V255 Onderkap 5,0m1 VS905"
  },
  {
    "art": "ART-044298",
    "location": "RS 30 AC 11",
    "materialType": "tende",
    "description": "V225/V230 Kap 5,0m1 VS905"
  },
  {
    "art": "ART-044302",
    "location": "RS 30 AC 12",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 5,0 M1 VS905"
  },
  {
    "art": "ART-044300",
    "location": "RS 30 AE 01",
    "materialType": "tende",
    "description": "V225/V230 Kap 6,0m1 VS905"
  },
  {
    "art": "ART-006980",
    "location": "RS 30 AE 02",
    "materialType": "tende",
    "description": "V225/V230 Kap 5,5m1 VS716"
  },
  {
    "art": "ART-044304",
    "location": "RS 30 AE 03",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 6,0 M1 VS905"
  },
  {
    "art": "ART-006999",
    "location": "RS 30 AE 04",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 5,5 M1 VS716 Antra"
  },
  {
    "art": "ART-007006",
    "location": "RS 30 AE 05",
    "materialType": "tende",
    "description": "V255 Bovenkap 4,5m1 Ivoor"
  },
  {
    "art": "ART-006982",
    "location": "RS 30 AE 06",
    "materialType": "tende",
    "description": "V225/V230 Kap 6,0m1 Ivoor"
  },
  {
    "art": "ART-007028",
    "location": "RS 30 AE 07",
    "materialType": "tende",
    "description": "V255 Voorlijst 4,0m1 Ivoor"
  },
  {
    "art": "ART-007000",
    "location": "RS 30 AE 08",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 6,0 M1 Ivoor"
  },
  {
    "art": "ART-007018",
    "location": "RS 30 AE 09",
    "materialType": "tende",
    "description": "V255 Onderkap 4,5m1 Ivoor"
  },
  {
    "art": "ART-006978",
    "location": "RS 30 AF 01",
    "materialType": "tende",
    "description": "V225/V230 Kap 5,5m1 Ivoor"
  },
  {
    "art": "ART-006967",
    "location": "RS 30 AF 02",
    "materialType": "tende",
    "description": "V225/V230 Kap 4,0m1 Ivoor"
  },
  {
    "art": "ART-032209",
    "location": "RS 30 AF 03",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 5,5 M1 Ivoor"
  },
  {
    "art": "ART-006989",
    "location": "RS 30 AF 04",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 4,0 M1 Ivoor"
  },
  {
    "art": "ART-007011",
    "location": "RS 30 AF 05",
    "materialType": "tende",
    "description": "V255 Bovenkap 5,5m1 Ivoor"
  },
  {
    "art": "ART-044307",
    "location": "RS 30 AF 06",
    "materialType": "tende",
    "description": "V255 Bovenkap 6,0m1 VS905"
  },
  {
    "art": "ART-007035",
    "location": "RS 30 AF 07",
    "materialType": "tende",
    "description": "V255 Voorlijst 5,5m1 Ivoor"
  },
  {
    "art": "ART-044314",
    "location": "RS 30 AF 08",
    "materialType": "tende",
    "description": "V255 Voorlijst 6,0m1 VS905"
  },
  {
    "art": "ART-007023",
    "location": "RS 30 AF 09",
    "materialType": "tende",
    "description": "V255 Onderkap 5,5m1 Ivoor"
  },
  {
    "art": "ART-044312",
    "location": "RS 30 AF 10",
    "materialType": "tende",
    "description": "V255 Onderkap 6,0m1 VS905"
  },
  {
    "art": "ART-044297",
    "location": "RS 30 AF 11",
    "materialType": "tende",
    "description": "V225/V230 Kap 4,0m1 VS905"
  },
  {
    "art": "ART-044301",
    "location": "RS 30 AF 12",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 4,0 M1 VS905"
  },
  {
    "art": "ART-007033",
    "location": "RS 30 BOX 01",
    "materialType": "tende",
    "description": "V255 Voorlijst 5,0m1 VS716"
  },
  {
    "art": "ART-007009",
    "location": "RS 30 BOX 02",
    "materialType": "tende",
    "description": "V255 Bovenkap 5,0m1 VS716"
  },
  {
    "art": "ART-007022",
    "location": "RS 30 BOX 03",
    "materialType": "tende",
    "description": "V255 Onderkap 5,0m1 VS716"
  },
  {
    "art": "ART-006996",
    "location": "RS 30 BOX 04",
    "materialType": "tende",
    "description": "V225/V230 Voorlijst 5,0 M1 VS716 Antra"
  },
  {
    "art": "ART-006976",
    "location": "RS 30 BOX 05",
    "materialType": "tende",
    "description": "V225/V230 Kap 5,0m1 VS716"
  },
  {
    "art": "ART-035771",
    "location": "LAMEL BOX 01",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V19 Antraciet"
  },
  {
    "art": "ART-035927",
    "location": "LAMEL BOX 02",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V01 Wit"
  },
  {
    "art": "ART-037690",
    "location": "LAMEL BOX 03",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V19 Antraciet"
  },
  {
    "art": "ART-037704",
    "location": "LAMEL BOX 04",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V07 Ivoor"
  },
  {
    "art": "ART-035820",
    "location": "LAMEL BOX 05",
    "materialType": "lamele",
    "description": "V010 Space Lamel M/S V19 Antraciet"
  },
  {
    "art": "ART-035925",
    "location": "LAMEL BOX 06",
    "materialType": "lamele",
    "description": "V010 Space Lamel M/S V07 Ivoor"
  },
  {
    "art": "ART-035896",
    "location": "LAMEL BOX 07",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V07 Ivoor"
  },
  {
    "art": "ART-035819",
    "location": "LAMEL BOX 08",
    "materialType": "lamele",
    "description": "V010 Space Lamel Z/S V19 Antraciet"
  },
  {
    "art": "ART-037706",
    "location": "LAMEL BOX 09",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V01 Wit"
  },
  {
    "art": "ART-035732",
    "location": "LAMEL BOX 10",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V20 Verkeerswit"
  },
  {
    "art": "ART-035770",
    "location": "LAMEL BOX 11",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V19 Antraciet"
  },
  {
    "art": "ART-035587",
    "location": "LAMEL BOX 12",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V11 Zwart"
  },
  {
    "art": "ART-037681",
    "location": "LAMEL BOX 13",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V20 Verkeerswit"
  },
  {
    "art": "ART-035749",
    "location": "LAMEL BOX 14",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V72 Zwartgrijs"
  },
  {
    "art": "ART-035891",
    "location": "LAMEL BOX 15",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V07 Ivoor"
  },
  {
    "art": "ART-037678",
    "location": "LAMEL BOX 16",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V11 Zwart"
  },
  {
    "art": "ART-035926",
    "location": "LAMEL BOX 17",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V01 Wit"
  },
  {
    "art": "ART-037689",
    "location": "LAMEL BOX 18",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V19 Antraciet"
  },
  {
    "art": "ART-035963",
    "location": "RS 20 LA 01",
    "materialType": "lamele",
    "description": "V010 Space Lamel Z/S V01 Wit"
  },
  {
    "art": "ART-035769",
    "location": "RS 20 LA 02",
    "materialType": "lamele",
    "description": "V010 Space Lamel M/S V20 Verkeerswit"
  },
  {
    "art": "ART-037694",
    "location": "RS 20 LA 03",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V14 Naturel"
  },
  {
    "art": "ART-037705",
    "location": "RS 20 LA 04",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V01 Wit"
  },
  {
    "art": "ART-035746",
    "location": "RS 20 LA 05",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V72 Zwartgrijs"
  },
  {
    "art": "ART-035733",
    "location": "RS 20 LA 06",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V73 Ombergrijs"
  },
  {
    "art": "ART-037687",
    "location": "RS 20 LA 07",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V18 Staalblauw"
  },
  {
    "art": "ART-035586",
    "location": "RS 20 LA 08",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V11 Zwart"
  },
  {
    "art": "ART-035892",
    "location": "RS 20 LA 09",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V02 Grijs"
  },
  {
    "art": "ART-037688",
    "location": "RS 20 LA 10",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V72 Zwartgrijs"
  },
  {
    "art": "ART-037699",
    "location": "RS 20 LA 11",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V07 Ivoor"
  },
  {
    "art": "ART-035964",
    "location": "RS 20 LA 12",
    "materialType": "lamele",
    "description": "V010 Space Lamel M/S V01 Wit"
  },
  {
    "art": "ART-037676",
    "location": "RS 20 LA 13",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V69  Antr Str (VS716)"
  },
  {
    "art": "ART-035924",
    "location": "RS 20 LA 14",
    "materialType": "lamele",
    "description": "V010 Space Lamel Z/S V07 Ivoor"
  },
  {
    "art": "ART-035601",
    "location": "RS 20 LA 15",
    "materialType": "lamele",
    "description": "V010 Space Lamel M/S V11 Zwart"
  },
  {
    "art": "ART-035600",
    "location": "RS 20 LA 16",
    "materialType": "lamele",
    "description": "V010 Space Lamel Z/S V11 Zwart"
  },
  {
    "art": "ART-035790",
    "location": "RS 20 LB 01",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V08 Bosgroen"
  },
  {
    "art": "ART-037684",
    "location": "RS 20 LB 02",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V18 Staalblauw"
  },
  {
    "art": "ART-035748",
    "location": "RS 20 LB 03",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V18 Staalblauw"
  },
  {
    "art": "ART-035893",
    "location": "RS 20 LB 04",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V04 Bruin"
  },
  {
    "art": "ART-037685",
    "location": "RS 20 LB 05",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V72 Zwartgrijs"
  },
  {
    "art": "ART-035895",
    "location": "RS 20 LB 06",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V06 Beige"
  },
  {
    "art": "ART-037686",
    "location": "RS 20 LB 07",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V03 Hell-Beige"
  },
  {
    "art": "ART-037703",
    "location": "RS 20 LB 08",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V06 Beige"
  },
  {
    "art": "ART-037679",
    "location": "RS 20 LB 09",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V20 Verkeerswit"
  },
  {
    "art": "ART-035768",
    "location": "RS 20 LB 10",
    "materialType": "lamele",
    "description": "V010 Space Lamel Z/S V20 Verkeerswit"
  },
  {
    "art": "ART-035731",
    "location": "RS 20 LB 11",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V73 Ombergrijs"
  },
  {
    "art": "ART-035791",
    "location": "RS 20 LB 12",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V08 Bosgroen"
  },
  {
    "art": "ART-037675",
    "location": "RS 20 LB 13",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V69  Antr Str (VS716)"
  },
  {
    "art": "ART-035822",
    "location": "RS 20 LB 14",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V14 Naturel"
  },
  {
    "art": "ART-037677",
    "location": "RS 20 LB 15",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V11 Zwart"
  },
  {
    "art": "ART-035887",
    "location": "RS 20 LB 16",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V02 Grijs"
  },
  {
    "art": "ART-035894",
    "location": "RS 20 LB 17",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V05 Creme"
  },
  {
    "art": "ART-037682",
    "location": "RS 20 LB 18",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V73 Ombergrijs"
  },
  {
    "art": "ART-037700",
    "location": "RS 20 LB 19",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V02 Grijs"
  },
  {
    "art": "ART-035730",
    "location": "RS 20 LB 20",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V20 Verkeerswit"
  },
  {
    "art": "ART-037691",
    "location": "RS 20 LC 01",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V08 Bosgroen"
  },
  {
    "art": "ART-037692",
    "location": "RS 20 LC 02",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V08 Bosgroen"
  },
  {
    "art": "ART-037697",
    "location": "RS 20 LC 03",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V05 Creme"
  },
  {
    "art": "ART-037702",
    "location": "RS 20 LC 04",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V05 Crème"
  },
  {
    "art": "ART-037696",
    "location": "RS 20 LC 05",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V04 Bruin"
  },
  {
    "art": "ART-035889",
    "location": "RS 20 LC 06",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V05 Creme"
  },
  {
    "art": "ART-037698",
    "location": "RS 20 LC 07",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V06 Beige"
  },
  {
    "art": "ART-035888",
    "location": "RS 20 LC 08",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V04 Bruin"
  },
  {
    "art": "ART-035745",
    "location": "RS 20 LC 09",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V18 Staalblauw"
  },
  {
    "art": "ART-037680",
    "location": "RS 20 LC 10",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V73 Ombergrijs"
  },
  {
    "art": "ART-037683",
    "location": "RS 20 LC 11",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V03 Hell-Beige"
  },
  {
    "art": "ART-035744",
    "location": "RS 20 LC 12",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V03 Hell-Beige"
  },
  {
    "art": "ART-035890",
    "location": "RS 20 LC 13",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V06 Beige"
  },
  {
    "art": "ART-037701",
    "location": "RS 20 LC 14",
    "materialType": "lamele",
    "description": "V030 Steady Lamel M/S V04 Bruin"
  },
  {
    "art": "ART-037695",
    "location": "RS 20 LC 15",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V02 Grijs"
  },
  {
    "art": "ART-035821",
    "location": "RS 20 LC 16",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V14 Naturel"
  },
  {
    "art": "ART-037693",
    "location": "RS 20 LC 17",
    "materialType": "lamele",
    "description": "V030 Steady Lamel Z/S V14 Naturel"
  },
  {
    "art": "ART-035747",
    "location": "RS 20 LC 18",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V03 Hell-Beige"
  },
  {
    "art": "ART-036238",
    "location": "RS 20 LC 19",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel Z/S V97 Grijs aluminium"
  },
  {
    "art": "ART-036239",
    "location": "RS 20 LC 20",
    "materialType": "lamele",
    "description": "V020 Elegant Lamel M/S V97 Grijs aluminium"
  },
  {
    "art": "ART-035929",
    "location": "RS 20 BA 01",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V04 Bruin"
  },
  {
    "art": "ART-035898",
    "location": "RS 20 BA 02",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V14 Naturel"
  },
  {
    "art": "ART-035781",
    "location": "RS 20 BA 03",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V73 Ombergrijs"
  },
  {
    "art": "ART-035852",
    "location": "RS 20 BA 04",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V08 Bosgroen"
  },
  {
    "art": "ART-035934",
    "location": "RS 20 BA 05",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V04 Bruin"
  },
  {
    "art": "ART-035899",
    "location": "RS 20 BA 06",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V14 Naturel"
  },
  {
    "art": "ART-035783",
    "location": "RS 20 BA 07",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V73 Ombergrijs"
  },
  {
    "art": "ART-035853",
    "location": "RS 20 BA 08",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V08 Bosgroen"
  },
  {
    "art": "ART-035939",
    "location": "RS 20 BA 09",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V04 Bruin"
  },
  {
    "art": "ART-035900",
    "location": "RS 20 BA 10",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V14 Naturel"
  },
  {
    "art": "ART-035785",
    "location": "RS 20 BA 11",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V73 Ombergrijs"
  },
  {
    "art": "ART-035854",
    "location": "RS 20 BA 12",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V08 Bosgroen"
  },
  {
    "art": "ART-035944",
    "location": "RS 20 BA 13",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V04 Bruin"
  },
  {
    "art": "ART-035901",
    "location": "RS 20 BA 14",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V14 Naturel"
  },
  {
    "art": "ART-035787",
    "location": "RS 20 BA 15",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V73 Ombergrijs"
  },
  {
    "art": "ART-035855",
    "location": "RS 20 BA 16",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V08 Bosgroen"
  },
  {
    "art": "ART-035949",
    "location": "RS 20 BA 17",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V04 Bruin"
  },
  {
    "art": "ART-035902",
    "location": "RS 20 BA 18",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V14 Naturel"
  },
  {
    "art": "ART-035965",
    "location": "RS 20 BB 01",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V01 Wit"
  },
  {
    "art": "ART-035825",
    "location": "RS 20 BB 02",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V19 Antraciet"
  },
  {
    "art": "ART-035805",
    "location": "RS 20 BB 03",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V18 Staalblauw"
  },
  {
    "art": "ART-035804",
    "location": "RS 20 BB 04",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V03 Hell-Beige"
  },
  {
    "art": "ART-035966",
    "location": "RS 20 BB 05",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V01 Wit"
  },
  {
    "art": "ART-035808",
    "location": "RS 20 BB 07",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V18 Staalblauw"
  },
  {
    "art": "ART-035807",
    "location": "RS 20 BB 08",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V03 Hell-Beige"
  },
  {
    "art": "ART-035967",
    "location": "RS 20 BB 09",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V01 Wit"
  },
  {
    "art": "ART-035827",
    "location": "RS 20 BB 10",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V19 Antraciet"
  },
  {
    "art": "ART-035811",
    "location": "RS 20 BB 11",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V18 Staalblauw"
  },
  {
    "art": "ART-035810",
    "location": "RS 20 BB 12",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V03 Hell-Beige"
  },
  {
    "art": "ART-035968",
    "location": "RS 20 BB 13",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V01 Wit"
  },
  {
    "art": "ART-035828",
    "location": "RS 20 BB 14",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V19 Antraciet"
  },
  {
    "art": "ART-035814",
    "location": "RS 20 BB 15",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V18 Staalblauw"
  },
  {
    "art": "ART-035813",
    "location": "RS 20 BB 16",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V03 Hell-Beige"
  },
  {
    "art": "ART-035969",
    "location": "RS 20 BB 17",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V01 Wit"
  },
  {
    "art": "ART-035829",
    "location": "RS 20 BB 18",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V19 Antraciet"
  },
  {
    "art": "ART-035780",
    "location": "RS 20 BC 01",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V20 Verkeerswit"
  },
  {
    "art": "ART-035607",
    "location": "RS 20 BC 02",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V95"
  },
  {
    "art": "ART-035932",
    "location": "RS 20 BC 03",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V07 Ivoor"
  },
  {
    "art": "ART-035826",
    "location": "RS 20 BC 04",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V19 Antraciet"
  },
  {
    "art": "ART-035782",
    "location": "RS 20 BC 05",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V20 Verkeerswit"
  },
  {
    "art": "ART-035608",
    "location": "RS 20 BC 06",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V95"
  },
  {
    "art": "ART-035937",
    "location": "RS 20 BC 07",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V07 Ivoor"
  },
  {
    "art": "ART-035784",
    "location": "RS 20 BC 09",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V20 Verkeerswit"
  },
  {
    "art": "ART-035609",
    "location": "RS 20 BC 10",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V95"
  },
  {
    "art": "ART-035942",
    "location": "RS 20 BC 11",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V07 Ivoor"
  },
  {
    "art": "ART-035786",
    "location": "RS 20 BC 13",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V20 Verkeerswit"
  },
  {
    "art": "ART-035610",
    "location": "RS 20 BC 14",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V95"
  },
  {
    "art": "ART-035947",
    "location": "RS 20 BC 15",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V07 Ivoor"
  },
  {
    "art": "ART-035788",
    "location": "RS 20 BC 17",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V20 Verkeerswit"
  },
  {
    "art": "ART-035611",
    "location": "RS 20 BC 18",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V95"
  },
  {
    "art": "ART-035930",
    "location": "RS 20 BD 01",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V05 Creme"
  },
  {
    "art": "ART-035928",
    "location": "RS 20 BD 02",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V02 Grijs"
  },
  {
    "art": "ART-035806",
    "location": "RS 20 BD 03",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V72 Zwartgrijs"
  },
  {
    "art": "ART-035581",
    "location": "RS 20 BD 04",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 137 V69"
  },
  {
    "art": "ART-035935",
    "location": "RS 20 BD 05",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V05 Creme"
  },
  {
    "art": "ART-035933",
    "location": "RS 20 BD 06",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V02 Grijs"
  },
  {
    "art": "ART-035809",
    "location": "RS 20 BD 07",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V72 Zwartgrijs"
  },
  {
    "art": "ART-035582",
    "location": "RS 20 BD 08",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 150 V69"
  },
  {
    "art": "ART-035940",
    "location": "RS 20 BD 09",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V05 Creme"
  },
  {
    "art": "ART-035938",
    "location": "RS 20 BD 10",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V02 Grijs"
  },
  {
    "art": "ART-035812",
    "location": "RS 20 BD 11",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V72 Zwartgrijs"
  },
  {
    "art": "ART-035583",
    "location": "RS 20 BD 12",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 165 V69"
  },
  {
    "art": "ART-035945",
    "location": "RS 20 BD 13",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V05 Creme"
  },
  {
    "art": "ART-035943",
    "location": "RS 20 BD 14",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V02 Grijs"
  },
  {
    "art": "ART-035815",
    "location": "RS 20 BD 15",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V72 Zwartgrijs"
  },
  {
    "art": "ART-035584",
    "location": "RS 20 BD 16",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 180 V69"
  },
  {
    "art": "ART-035950",
    "location": "RS 20 BD 17",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V05 Creme"
  },
  {
    "art": "ART-035948",
    "location": "RS 20 BD 18",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V02 Grijs"
  },
  {
    "art": "ART-035818",
    "location": "RS 20 BE 01",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V72 Zwartgrijs"
  },
  {
    "art": "ART-035585",
    "location": "RS 20 BE 02",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V69"
  },
  {
    "art": "ART-035952",
    "location": "RS 20 BE 03",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V07 Ivoor"
  },
  {
    "art": "ART-035817",
    "location": "RS 20 BE 04",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V18 Staalblauw"
  },
  {
    "art": "ART-035816",
    "location": "RS 20 BE 05",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V03 Hell-Beige"
  },
  {
    "art": "ART-035856",
    "location": "RS 20 BE 06",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V08 Bosgroen"
  },
  {
    "art": "ART-035789",
    "location": "RS 20 BE 07",
    "materialType": "zijkap",
    "description": "V0X0 Zijkap L+R 205 V73 Ombergrijs"
  },
  {
    "art": "ART-000096",
    "location": "RS 20 BE 08",
    "materialType": "zijkap",
    "description": "Zijkap L+R 205-S Afgesl. Rand Alulux"
  },
  {
    "art": "ART-000072",
    "location": "RS 20 BE 09",
    "materialType": "zijkap",
    "description": "Zijkap L+R 165-S Afgesl.Rand Alulux"
  },
  {
    "art": "ART-000084",
    "location": "RS 20 BE 10",
    "materialType": "zijkap",
    "description": "Zijkap L+R 180-S Afgesl.Rand Alulux"
  },
  {
    "art": "ART-001168",
    "location": "RS 20 AA 02",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber verkeerswit"
  },
  {
    "art": "ART-001161",
    "location": "RS 20 AA 04",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber h-beige Disc."
  },
  {
    "art": "ART-035653",
    "location": "RS 20 AA 06",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V72 Zwartgrijs"
  },
  {
    "art": "ART-035659",
    "location": "RS 20 AA 08",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V07 Ivoor"
  },
  {
    "art": "ART-000515",
    "location": "RS 20 AA 10",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber bruin Disc."
  },
  {
    "art": "ART-035688",
    "location": "RS 20 AA 12",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V72 Zwartgrijs"
  },
  {
    "art": "ART-001164",
    "location": "RS 20 AA 14",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber bosgroen"
  },
  {
    "art": "ART-001165",
    "location": "RS 20 AA 16",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber staalblauw"
  },
  {
    "art": "ART-001163",
    "location": "RS 20 AA 18",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber creme"
  },
  {
    "art": "ART-001162",
    "location": "RS 20 AA 20",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber naturel"
  },
  {
    "art": "ART-000606",
    "location": "RS 20 AA 22",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hsl25 Wit Alulux"
  },
  {
    "art": "ART-035726",
    "location": "RS 20 AA 24",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H40 / HTF67 V07 Ivoor"
  },
  {
    "art": "ART-001160",
    "location": "RS 20 AA 26",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber grijs Disc."
  },
  {
    "art": "ART-000568",
    "location": "RS 20 AA 28",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 Naturel Alulux"
  },
  {
    "art": "ART-035683",
    "location": "RS 20 AB 01",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V72 Zwartgrijs"
  },
  {
    "art": "ART-000823",
    "location": "RS 20 AB 02",
    "materialType": "zijgeleider",
    "description": "Onderlijst M/R Bruin Heroal"
  },
  {
    "art": "ART-000829",
    "location": "RS 20 AB 04",
    "materialType": "zijgeleider",
    "description": "Onderlijst M/R St.Blauw Heroal"
  },
  {
    "art": "ART-000531",
    "location": "RS 20 AB 05",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 D-Groen Verano"
  },
  {
    "art": "ART-035740",
    "location": "RS 20 AB 06",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V07 Ivoor"
  },
  {
    "art": "ART-035693",
    "location": "RS 20 AB 08",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V01 Wit"
  },
  {
    "art": "ART-000831",
    "location": "RS 20 AB 09",
    "materialType": "zijgeleider",
    "description": "Onderlijst M/R Ivoor Heroal"
  },
  {
    "art": "ART-000596",
    "location": "RS 20 AB 10",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 Verkeerswit"
  },
  {
    "art": "ART-000830",
    "location": "RS 20 AB 11",
    "materialType": "zijgeleider",
    "description": "Onderlijst M/R Antraciet Heroal"
  },
  {
    "art": "ART-035767",
    "location": "RS 20 AB 12",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V69"
  },
  {
    "art": "ART-000821",
    "location": "RS 20 AB 13",
    "materialType": "zijgeleider",
    "description": "Onderlijst M/R Verkeerswit Heroal"
  },
  {
    "art": "ART-035663",
    "location": "RS 20 AB 14",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V20 Verkeerswit"
  },
  {
    "art": "ART-000826",
    "location": "RS 20 AB 15",
    "materialType": "zijgeleider",
    "description": "Onderlijst M/R Creme Heroal"
  },
  {
    "art": "ART-000828",
    "location": "RS 20 AB 17",
    "materialType": "zijgeleider",
    "description": "Onderlijst M/R D.Groen Heroal"
  },
  {
    "art": "ART-035761",
    "location": "RS 20 AB 18",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V02 Grijs"
  },
  {
    "art": "ART-000825",
    "location": "RS 20 AB 19",
    "materialType": "zijgeleider",
    "description": "Onderlijst M/R Naturel Heroal"
  },
  {
    "art": "ART-035703",
    "location": "RS 20 AB 20",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V08 Bosgroen"
  },
  {
    "art": "ART-000921",
    "location": "RS 20 AB 21",
    "materialType": "zijgeleider",
    "description": "Zijgeleider B-Lhtf Ivoor Heroal"
  },
  {
    "art": "ART-000824",
    "location": "RS 20 AB 23",
    "materialType": "zijgeleider",
    "description": "Onderlijst M/R Hell-Beige Heroal"
  },
  {
    "art": "ART-000822",
    "location": "RS 20 AB 25",
    "materialType": "zijgeleider",
    "description": "Onderlijst M/R Grijs Heroal"
  },
  {
    "art": "ART-000909",
    "location": "RS 20 AB 27",
    "materialType": "zijgeleider",
    "description": "Zijgeleider F-Htf/20 Antraciet Heroal"
  },
  {
    "art": "ART-035729",
    "location": "RS 20 AC 01",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V14 Naturel"
  },
  {
    "art": "ART-035630",
    "location": "RS 20 AC 02",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V20 Verkeerswit"
  },
  {
    "art": "ART-035763",
    "location": "RS 20 AC 03",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V05 Creme"
  },
  {
    "art": "ART-035757",
    "location": "RS 20 AC 04",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V01 Wit"
  },
  {
    "art": "ART-035664",
    "location": "RS 20 AC 05",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V73 Ombergrijs"
  },
  {
    "art": "ART-035643",
    "location": "RS 20 AC 06",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V72 Zwartgrijs"
  },
  {
    "art": "ART-035762",
    "location": "RS 20 AC 07",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V04 Bruin"
  },
  {
    "art": "ART-000535",
    "location": "RS 20 AC 08",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 Verkeerswit Verano"
  },
  {
    "art": "ART-035681",
    "location": "RS 20 AC 09",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V03 Hell-Beige"
  },
  {
    "art": "ART-000560",
    "location": "RS 20 AC 10",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H17 Antraciet Verano"
  },
  {
    "art": "ART-035766",
    "location": "RS 20 AC 11",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V95"
  },
  {
    "art": "ART-000552",
    "location": "RS 20 AC 12",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H17 Wit Verano"
  },
  {
    "art": "ART-035682",
    "location": "RS 20 AC 13",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V18 Staalblauw"
  },
  {
    "art": "ART-000561",
    "location": "RS 20 AC 14",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H17 Ivoor Verano"
  },
  {
    "art": "ART-000528",
    "location": "RS 20 AC 15",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 H-Beige Verano Disc."
  },
  {
    "art": "ART-000562",
    "location": "RS 20 AC 16",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H17 9016 Verano"
  },
  {
    "art": "ART-000526",
    "location": "RS 20 AC 17",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 Grijs Verano Disc."
  },
  {
    "art": "ART-035720",
    "location": "RS 20 AC 18",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V69"
  },
  {
    "art": "ART-000530",
    "location": "RS 20 AC 20",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 Creme Verano"
  },
  {
    "art": "ART-000564",
    "location": "RS 20 AD 01",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 Wit Verano"
  },
  {
    "art": "ART-000545",
    "location": "RS 20 AD 02",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 D-Groen Verano"
  },
  {
    "art": "ART-000572",
    "location": "RS 20 AD 03",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 Antraciet Verano"
  },
  {
    "art": "ART-000544",
    "location": "RS 20 AD 04",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 Creme Verano"
  },
  {
    "art": "ART-000573",
    "location": "RS 20 AD 05",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 Ivoor Verano"
  },
  {
    "art": "ART-000575",
    "location": "RS 20 AD 06",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hw25 Wit Verano"
  },
  {
    "art": "ART-000574",
    "location": "RS 20 AD 07",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 9016 Verano"
  },
  {
    "art": "ART-035710",
    "location": "RS 20 AD 08",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V95"
  },
  {
    "art": "ART-000539",
    "location": "RS 20 AD 09",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 Wit Verano"
  },
  {
    "art": "ART-000584",
    "location": "RS 20 AD 10",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hw25 Ivoor Verano"
  },
  {
    "art": "ART-000547",
    "location": "RS 20 AD 11",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 Antraciet Verano"
  },
  {
    "art": "ART-000585",
    "location": "RS 20 AD 12",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hw25 9016 Verano"
  },
  {
    "art": "ART-035628",
    "location": "RS 20 AD 13",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V20 Verkeerswit"
  },
  {
    "art": "ART-000586",
    "location": "RS 20 AD 14",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 Wit Verano"
  },
  {
    "art": "ART-000549",
    "location": "RS 20 AD 15",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 Verkeerswit Verano"
  },
  {
    "art": "ART-000532",
    "location": "RS 20 AD 17",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 Staal Blauw Verano"
  },
  {
    "art": "ART-000527",
    "location": "RS 20 AD 18",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 Bruin Verano Disc."
  },
  {
    "art": "ART-000542",
    "location": "RS 20 AD 19",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 H-Beige Verano Disc."
  },
  {
    "art": "ART-000540",
    "location": "RS 20 AD 20",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 Grijs Verano Disc."
  },
  {
    "art": "ART-000595",
    "location": "RS 20 AE 01",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 Ivoor Verano"
  },
  {
    "art": "ART-035711",
    "location": "RS 20 AE 02",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V69"
  },
  {
    "art": "ART-035803",
    "location": "RS 20 AE 03",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V01 Wit"
  },
  {
    "art": "ART-000848",
    "location": "RS 20 AE 04",
    "materialType": "zijgeleider",
    "description": "Zijgeleid. Lhtf+Folie Verkeerswit Heroal"
  },
  {
    "art": "ART-000843",
    "location": "RS 20 AE 05",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Htf Antraciet Heroal"
  },
  {
    "art": "ART-000857",
    "location": "RS 20 AE 06",
    "materialType": "zijgeleider",
    "description": "Zijgeleid. Lhtf+Folie Antraciet Heroa"
  },
  {
    "art": "ART-000844",
    "location": "RS 20 AE 07",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Htf Ivoor Heroal"
  },
  {
    "art": "ART-000858",
    "location": "RS 20 AE 08",
    "materialType": "zijgeleider",
    "description": "Zijgeleid. Lhtf+Folie Ivoor Heroal"
  },
  {
    "art": "ART-000834",
    "location": "RS 20 AE 09",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Htf Verkeerswit Heroal"
  },
  {
    "art": "ART-040442",
    "location": "RS 20 AE 10",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V69"
  },
  {
    "art": "ART-000594",
    "location": "RS 20 AE 11",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 Antraciet Verano"
  },
  {
    "art": "ART-040427",
    "location": "RS 20 AE 14",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V19 Antraciet"
  },
  {
    "art": "ART-035636",
    "location": "RS 20 AE 18",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V03 Hell-Beige"
  },
  {
    "art": "ART-035704",
    "location": "RS 20 AE 19",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V14 Naturel"
  },
  {
    "art": "ART-035752",
    "location": "RS 20 AE 20",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V05 Creme"
  },
  {
    "art": "ART-035669",
    "location": "RS 20 AF 01",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V20 Verkeerswit"
  },
  {
    "art": "ART-035754",
    "location": "RS 20 AF 02",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V07 Ivoor"
  },
  {
    "art": "ART-000513",
    "location": "RS 20 AF 03",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber wit"
  },
  {
    "art": "ART-035755",
    "location": "RS 20 AF 04",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V95"
  },
  {
    "art": "ART-035776",
    "location": "RS 20 AF 05",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V07 Ivoor"
  },
  {
    "art": "ART-001166",
    "location": "RS 20 AF 06",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber antraciet"
  },
  {
    "art": "ART-035697",
    "location": "RS 20 AF 07",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V19 Antraciet"
  },
  {
    "art": "ART-035639",
    "location": "RS 20 AF 08",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V20 Verkeerswit"
  },
  {
    "art": "ART-035823",
    "location": "RS 20 AF 09",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V01 Wit"
  },
  {
    "art": "ART-035765",
    "location": "RS 20 AF 10",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V07 Ivoor"
  },
  {
    "art": "ART-035667",
    "location": "RS 20 AF 11",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V72 Zwartgrijs"
  },
  {
    "art": "ART-035671",
    "location": "RS 20 AF 12",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V19 Antraciet"
  },
  {
    "art": "ART-035648",
    "location": "RS 20 AF 13",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V20 Verkeerswit"
  },
  {
    "art": "ART-035779",
    "location": "RS 20 AF 14",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V01 Wit"
  },
  {
    "art": "ART-035638",
    "location": "RS 20 AF 16",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V72 Zwartgrijs"
  },
  {
    "art": "ART-040423",
    "location": "RS 20 AF 17",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V03 Hell-Beige"
  },
  {
    "art": "ART-040426",
    "location": "RS 20 AF 18",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V08 Bosgroen"
  },
  {
    "art": "ART-000541",
    "location": "RS 20 AF 19",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 Bruin Verano Disc."
  },
  {
    "art": "ART-000548",
    "location": "RS 20 AG 01",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 Ivoor Verano"
  },
  {
    "art": "ART-035702",
    "location": "RS 20 AG 02",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V01 Wit"
  },
  {
    "art": "ART-035650",
    "location": "RS 20 AG 03",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V19 Antraciet"
  },
  {
    "art": "ART-000534",
    "location": "RS 20 AG 04",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 Ivoor Verano"
  },
  {
    "art": "ART-035709",
    "location": "RS 20 AG 05",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V07 Ivoor"
  },
  {
    "art": "ART-035718",
    "location": "RS 20 AG 06",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V07 Ivoor"
  },
  {
    "art": "ART-000533",
    "location": "RS 20 AG 07",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 Antraciet Verano"
  },
  {
    "art": "ART-035654",
    "location": "RS 20 AG 08",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V19 Antraciet"
  },
  {
    "art": "ART-035615",
    "location": "RS 20 AG 09",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V72 Zwartgrijs"
  },
  {
    "art": "ART-000525",
    "location": "RS 20 AG 10",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 Wit Verano"
  },
  {
    "art": "ART-035605",
    "location": "RS 20 AG 11",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V20 Verkeerswit"
  },
  {
    "art": "ART-035759",
    "location": "RS 20 AG 12",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V01 Wit"
  },
  {
    "art": "ART-035677",
    "location": "RS 20 AG 13",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V07 Ivoor"
  },
  {
    "art": "ART-035604",
    "location": "RS 20 AG 14",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V72 Zwartgrijs"
  },
  {
    "art": "ART-035617",
    "location": "RS 20 AG 15",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V19 Antraciet"
  },
  {
    "art": "ART-035598",
    "location": "RS 20 AG 16",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V20 Verkeerswit"
  },
  {
    "art": "ART-035665",
    "location": "RS 20 AG 17",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V03 Hell-Beige"
  },
  {
    "art": "ART-040432",
    "location": "RS 20 AG 18",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V04 Bruin"
  },
  {
    "art": "ART-035696",
    "location": "RS 20 AG 19",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V08 Bosgroen"
  },
  {
    "art": "ART-040433",
    "location": "RS 20 AG 20",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V05 Creme"
  },
  {
    "art": "ART-035612",
    "location": "RS 20 AH 01",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V19 Antraciet"
  },
  {
    "art": "ART-035792",
    "location": "RS 20 AH 02",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V01 Wit"
  },
  {
    "art": "ART-001167",
    "location": "RS 20 AH 03",
    "materialType": "zijgeleider",
    "description": "RV40/41 Onderlijst met rubber ivoor"
  },
  {
    "art": "ART-040443",
    "location": "RS 20 AH 04",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V01 Wit"
  },
  {
    "art": "ART-035695",
    "location": "RS 20 AH 05",
    "materialType": "zijgeleider",
    "description": "V0X0 Onderlijst met rubber V19 Antraciet"
  },
  {
    "art": "ART-000583",
    "location": "RS 20 AH 06",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hw25 Antraciet Verano"
  },
  {
    "art": "ART-040435",
    "location": "RS 20 AH 07",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V95"
  },
  {
    "art": "ART-035684",
    "location": "RS 20 AH 08",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V19 Antraciet"
  },
  {
    "art": "ART-040421",
    "location": "RS 20 AH 09",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V73 Ombergrijs"
  },
  {
    "art": "ART-040419",
    "location": "RS 20 AH 10",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V72 Zwartgrijs"
  },
  {
    "art": "ART-040441",
    "location": "RS 20 AH 11",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V95"
  },
  {
    "art": "ART-040422",
    "location": "RS 20 AH 12",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V19 Antraciet"
  },
  {
    "art": "ART-040416",
    "location": "RS 20 AH 13",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V73 Ombergrijs"
  },
  {
    "art": "ART-040415",
    "location": "RS 20 AH 14",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V20 Verkeerswit"
  },
  {
    "art": "ART-040438",
    "location": "RS 20 AH 17",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V04 Bruin"
  },
  {
    "art": "ART-040429",
    "location": "RS 20 AH 18",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V08 Bosgroen"
  },
  {
    "art": "ART-040436",
    "location": "RS 20 AH 19",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V69"
  },
  {
    "art": "ART-040430",
    "location": "RS 20 AH 20",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V14 Naturel"
  },
  {
    "art": "ART-040434",
    "location": "RS 20 AI 01",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V07 Ivoor"
  },
  {
    "art": "ART-035756",
    "location": "RS 20 AI 03",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V69"
  },
  {
    "art": "ART-040425",
    "location": "RS 20 AI 05",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V72 Zwartgrijs"
  },
  {
    "art": "ART-040444",
    "location": "RS 20 AI 07",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V01 Wit"
  },
  {
    "art": "ART-040420",
    "location": "RS 20 AI 09",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V20 Verkeerswit"
  },
  {
    "art": "ART-040440",
    "location": "RS 20 AI 13",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V07 Ivoor"
  },
  {
    "art": "ART-040439",
    "location": "RS 20 AI 17",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V05 Creme"
  },
  {
    "art": "ART-000553",
    "location": "RS 20 DA 02",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H17 Grijs Verano Disc."
  },
  {
    "art": "ART-000554",
    "location": "RS 20 DA 04",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H17 Bruin Verano Disc."
  },
  {
    "art": "ART-000555",
    "location": "RS 20 DA 06",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H17 Hbeige Verano"
  },
  {
    "art": "ART-000557",
    "location": "RS 20 DA 08",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H17 Creme Verano"
  },
  {
    "art": "ART-000558",
    "location": "RS 20 DA 10",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H17 Dgroen Verano"
  },
  {
    "art": "ART-000559",
    "location": "RS 20 DA 12",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H17 Staalblauw Verano"
  },
  {
    "art": "ART-000629",
    "location": "RS 20 DA 12",
    "materialType": "zijgeleider",
    "description": "Zijgeleider M-Htf Dgroen Verano"
  },
  {
    "art": "ART-000565",
    "location": "RS 20 DA 14",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 Grijs Verano Disc."
  },
  {
    "art": "ART-000907",
    "location": "RS 20 DA 14",
    "materialType": "zijgeleider",
    "description": "Zijgeleider F-Htf/20 D.Groen Heroal"
  },
  {
    "art": "ART-000566",
    "location": "RS 20 DA 16",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 Bruin Verano Disc."
  },
  {
    "art": "ART-000567",
    "location": "RS 20 DA 18",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 Hbeige Verano"
  },
  {
    "art": "ART-000569",
    "location": "RS 20 DA 20",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 Creme Verano"
  },
  {
    "art": "ART-001067",
    "location": "RS 20 DA 22",
    "materialType": "zijgeleider",
    "description": "Afdekprofiel Rond Ivoor"
  },
  {
    "art": "ART-000420",
    "location": "RS 20 DA 24",
    "materialType": "zijgeleider",
    "description": "Hoekprofiel 70X20X2 Antr.Grijs 7016"
  },
  {
    "art": "ART-000423",
    "location": "RS 20 DA 26",
    "materialType": "zijgeleider",
    "description": "Hoekprofiel 70X30X2 Wit 9010"
  },
  {
    "art": "ART-000939",
    "location": "RS 20 DA 28",
    "materialType": "zijgeleider",
    "description": "Zijgeleider M-Htf Ivoor Heroal"
  },
  {
    "art": "ART-000570",
    "location": "RS 20 DB 01",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 Dgroen Verano"
  },
  {
    "art": "ART-000582",
    "location": "RS 20 DB 02",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hw25 Staalbl. Verano"
  },
  {
    "art": "ART-000571",
    "location": "RS 20 DB 03",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs17 Staalblauw Verano"
  },
  {
    "art": "ART-000587",
    "location": "RS 20 DB 04",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 Grijs Verano Disc."
  },
  {
    "art": "ART-000529",
    "location": "RS 20 DB 05",
    "materialType": "zijgeleider",
    "description": "Zijgeleider H25 Naturel Verano"
  },
  {
    "art": "ART-000588",
    "location": "RS 20 DB 06",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 Bruin Verano Disc."
  },
  {
    "art": "ART-000543",
    "location": "RS 20 DB 07",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 Naturel Verano"
  },
  {
    "art": "ART-000589",
    "location": "RS 20 DB 08",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 Hbeige Verano"
  },
  {
    "art": "ART-000546",
    "location": "RS 20 DB 09",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hs25 Staalbl. Verano"
  },
  {
    "art": "ART-000590",
    "location": "RS 20 DB 10",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 Naturel Verano"
  },
  {
    "art": "ART-000576",
    "location": "RS 20 DB 11",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hw25 Grijs Verano Disc."
  },
  {
    "art": "ART-000591",
    "location": "RS 20 DB 12",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 Creme Verano"
  },
  {
    "art": "ART-000577",
    "location": "RS 20 DB 13",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hw25 Bruin Verano Disc."
  },
  {
    "art": "ART-000592",
    "location": "RS 20 DB 14",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 D.Groen Verano"
  },
  {
    "art": "ART-000579",
    "location": "RS 20 DB 15",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hw25 Naturel Verano"
  },
  {
    "art": "ART-000593",
    "location": "RS 20 DB 16",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hwl25 Staalbl. Verano"
  },
  {
    "art": "ART-000580",
    "location": "RS 20 DB 17",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hw25 Creme Verano"
  },
  {
    "art": "ART-000835",
    "location": "RS 20 DB 18",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Htf Grijs Heroal"
  },
  {
    "art": "ART-000581",
    "location": "RS 20 DB 19",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Hw25 Dgroen Verano"
  },
  {
    "art": "ART-000836",
    "location": "RS 20 DB 20",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Htf Bruin Heroal"
  },
  {
    "art": "ART-000632",
    "location": "RS 20 DB 21",
    "materialType": "zijgeleider",
    "description": "Zijgeleider M-Htf Ivoor Verano"
  },
  {
    "art": "ART-000633",
    "location": "RS 20 DB 23",
    "materialType": "zijgeleider",
    "description": "Zijgeleider M-Htf 9016 Verano"
  },
  {
    "art": "ART-001066",
    "location": "RS 20 DB 24",
    "materialType": "zijgeleider",
    "description": "Afdekprofiel Rond Antraciet"
  },
  {
    "art": "ART-035713",
    "location": "RS 20 DB 25",
    "materialType": "zijgeleider",
    "description": "V0X0 Middengeleider MHTF V19 Antraciet"
  },
  {
    "art": "ART-000421",
    "location": "RS 20 DB 26",
    "materialType": "zijgeleider",
    "description": "Hoekprofiel 70X20X2 Ivoor"
  },
  {
    "art": "ART-035798",
    "location": "RS 20 DB 27",
    "materialType": "zijgeleider",
    "description": "V0X0 Middengeleider MHTF V07 Ivoor"
  },
  {
    "art": "ART-000623",
    "location": "RS 20 DB 28",
    "materialType": "zijgeleider",
    "description": "Zijgeleider M-Htf Wit Verano"
  },
  {
    "art": "ART-000837",
    "location": "RS 20 DC 01",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Htf Hell-Beige Heroal"
  },
  {
    "art": "ART-035670",
    "location": "RS 20 DC 02",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V73 Ombergrijs"
  },
  {
    "art": "ART-000838",
    "location": "RS 20 DC 03",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Htf Naturel Heroal"
  },
  {
    "art": "ART-035686",
    "location": "RS 20 DC 04",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V03 Hell-Beige"
  },
  {
    "art": "ART-000839",
    "location": "RS 20 DC 05",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Htf Creme Heroal"
  },
  {
    "art": "ART-035687",
    "location": "RS 20 DC 06",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V18 Staalblauw"
  },
  {
    "art": "ART-000841",
    "location": "RS 20 DC 07",
    "materialType": "zijgeleider",
    "description": "Zijgeleider Htf D-Groen Heroal"
  },
  {
    "art": "ART-035712",
    "location": "RS 20 DC 08",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V08 Bosgroen"
  },
  {
    "art": "ART-000849",
    "location": "RS 20 DC 09",
    "materialType": "zijgeleider",
    "description": "Zijgeleid. Lhtf+Folie Grijs Heroal"
  },
  {
    "art": "ART-035734",
    "location": "RS 20 DC 10",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V14 Naturel"
  },
  {
    "art": "ART-000850",
    "location": "RS 20 DC 11",
    "materialType": "zijgeleider",
    "description": "Zijgeleid. Lhtf+Folie Bruin Heroal"
  },
  {
    "art": "ART-035772",
    "location": "RS 20 DC 12",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V02 Grijs"
  },
  {
    "art": "ART-000851",
    "location": "RS 20 DC 13",
    "materialType": "zijgeleider",
    "description": "Zijgeleid. Lhtf+Folie H.Beige Heroal"
  },
  {
    "art": "ART-035773",
    "location": "RS 20 DC 14",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V04 Bruin"
  },
  {
    "art": "ART-000852",
    "location": "RS 20 DC 15",
    "materialType": "zijgeleider",
    "description": "Zijgeleid. Lhtf+Folie Naturel Heroal"
  },
  {
    "art": "ART-035774",
    "location": "RS 20 DC 16",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V05 Creme"
  },
  {
    "art": "ART-000855",
    "location": "RS 20 DC 17",
    "materialType": "zijgeleider",
    "description": "Zijgeleid. Lhtf+Folie D.Groen Heroal"
  },
  {
    "art": "ART-035777",
    "location": "RS 20 DC 18",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V95"
  },
  {
    "art": "ART-035778",
    "location": "RS 20 DC 20",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H17 / HF V69"
  },
  {
    "art": "ART-035800",
    "location": "RS 20 DC 21",
    "materialType": "zijgeleider",
    "description": "V0X0 Middengeleider MHTF V69"
  },
  {
    "art": "ART-035689",
    "location": "RS 20 DC 22",
    "materialType": "zijgeleider",
    "description": "V0X0 Middengeleider MHTF V20 Verkeerswit"
  },
  {
    "art": "ART-035851",
    "location": "RS 20 DC 23",
    "materialType": "zijgeleider",
    "description": "V0X0 Middengeleider MHTF V01 Wit"
  },
  {
    "art": "ART-035799",
    "location": "RS 20 DC 24",
    "materialType": "zijgeleider",
    "description": "V0X0 Middengeleider MHTF V95"
  },
  {
    "art": "ART-040424",
    "location": "RS 20 DC 25",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V18 Staalblauw"
  },
  {
    "art": "ART-000938",
    "location": "RS 20 DC 26",
    "materialType": "zijgeleider",
    "description": "Zijgeleider M-Htf Antraciet Heroal"
  },
  {
    "art": "ART-040417",
    "location": "RS 20 DC 27",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V03 Hell-Beige"
  },
  {
    "art": "ART-040437",
    "location": "RS 20 DC 28",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel H25 / HTF V02 Grijs"
  },
  {
    "art": "ART-035640",
    "location": "RS 20 DD 01",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V73 Ombergrijs"
  },
  {
    "art": "ART-035606",
    "location": "RS 20 DD 02",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V73 Ombergrijs"
  },
  {
    "art": "ART-035651",
    "location": "RS 20 DD 03",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V03 Hell-Beige"
  },
  {
    "art": "ART-035613",
    "location": "RS 20 DD 04",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V03 Hell-Beige"
  },
  {
    "art": "ART-035652",
    "location": "RS 20 DD 05",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V18 Staalblauw"
  },
  {
    "art": "ART-035614",
    "location": "RS 20 DD 06",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V18 Staalblauw"
  },
  {
    "art": "ART-035691",
    "location": "RS 20 DD 07",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V08 Bosgroen"
  },
  {
    "art": "ART-035633",
    "location": "RS 20 DD 08",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V08 Bosgroen"
  },
  {
    "art": "ART-035701",
    "location": "RS 20 DD 09",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V14 Naturel"
  },
  {
    "art": "ART-035644",
    "location": "RS 20 DD 10",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V14 Naturel"
  },
  {
    "art": "ART-035736",
    "location": "RS 20 DD 11",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V02 Grijs"
  },
  {
    "art": "ART-035673",
    "location": "RS 20 DD 12",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V02 Grijs"
  },
  {
    "art": "ART-035737",
    "location": "RS 20 DD 13",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V04 Bruin"
  },
  {
    "art": "ART-035674",
    "location": "RS 20 DD 14",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V04 Bruin"
  },
  {
    "art": "ART-035738",
    "location": "RS 20 DD 15",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V05 Creme"
  },
  {
    "art": "ART-035675",
    "location": "RS 20 DD 16",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V05 Creme"
  },
  {
    "art": "ART-035741",
    "location": "RS 20 DD 17",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V95"
  },
  {
    "art": "ART-035678",
    "location": "RS 20 DD 18",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V95"
  },
  {
    "art": "ART-035742",
    "location": "RS 20 DD 19",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS17 / LHF V69"
  },
  {
    "art": "ART-035679",
    "location": "RS 20 DD 20",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HSL25 / BLHTF  V69"
  },
  {
    "art": "ART-040431",
    "location": "RS 20 DD 21",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V02 Grijs"
  },
  {
    "art": "ART-040418",
    "location": "RS 20 DD 23",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V18 Staalblauw"
  },
  {
    "art": "ART-040428",
    "location": "RS 20 DD 25",
    "materialType": "zijgeleider",
    "description": "V0X0 zijgel.+borstel HS25 / LHTF V14 Naturel"
  },
  {
    "art": "ART-000631",
    "location": "RS 20 DD 27",
    "materialType": "zijgeleider",
    "description": "Zijgeleider M-Htf Antraciet Verano"
  },
  {
    "art": "ART-035649",
    "location": "RS 20 DE 01",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V73 Ombergrijs"
  },
  {
    "art": "ART-035707",
    "location": "RS 20 DE 02",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V05 Creme"
  },
  {
    "art": "ART-035666",
    "location": "RS 20 DE 03",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V18 Staalblauw"
  },
  {
    "art": "ART-035631",
    "location": "RS 20 DE 04",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V73 Ombergrijs"
  },
  {
    "art": "ART-035750",
    "location": "RS 20 DE 05",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V02 Grijs"
  },
  {
    "art": "ART-035641",
    "location": "RS 20 DE 06",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V03 Hell-Beige"
  },
  {
    "art": "ART-035751",
    "location": "RS 20 DE 07",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider H25 / HTF V04 Bruin"
  },
  {
    "art": "ART-035642",
    "location": "RS 20 DE 08",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V18 Staalblauw"
  },
  {
    "art": "ART-035629",
    "location": "RS 20 DE 09",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V73 Ombergrijs"
  },
  {
    "art": "ART-035672",
    "location": "RS 20 DE 10",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V08 Bosgroen"
  },
  {
    "art": "ART-035637",
    "location": "RS 20 DE 11",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V18 Staalblauw"
  },
  {
    "art": "ART-035692",
    "location": "RS 20 DE 12",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V14 Naturel"
  },
  {
    "art": "ART-035668",
    "location": "RS 20 DE 13",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V08 Bosgroen"
  },
  {
    "art": "ART-035714",
    "location": "RS 20 DE 14",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V02 Grijs"
  },
  {
    "art": "ART-035685",
    "location": "RS 20 DE 15",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V14 Naturel"
  },
  {
    "art": "ART-035715",
    "location": "RS 20 DE 16",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V04 Bruin"
  },
  {
    "art": "ART-035705",
    "location": "RS 20 DE 17",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V02 Grijs"
  },
  {
    "art": "ART-035716",
    "location": "RS 20 DE 18",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V05 Creme"
  },
  {
    "art": "ART-035706",
    "location": "RS 20 DE 19",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HS25 / LHTF V04 Bruin"
  },
  {
    "art": "ART-035719",
    "location": "RS 20 DE 20",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HW25 / FHTF 12 V95"
  },
  {
    "art": "ART-035599",
    "location": "RS 20 DF 01",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V73 Ombergrijs"
  },
  {
    "art": "ART-035602",
    "location": "RS 20 DF 03",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V03 Hell-Beige"
  },
  {
    "art": "ART-035603",
    "location": "RS 20 DF 05",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V18 Staalblauw"
  },
  {
    "art": "ART-035616",
    "location": "RS 20 DF 07",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V08 Bosgroen"
  },
  {
    "art": "ART-035632",
    "location": "RS 20 DF 09",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V14 Naturel"
  },
  {
    "art": "ART-035655",
    "location": "RS 20 DF 11",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V02 Grijs"
  },
  {
    "art": "ART-035656",
    "location": "RS 20 DF 13",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V04 Bruin"
  },
  {
    "art": "ART-035657",
    "location": "RS 20 DF 15",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V05 Creme"
  },
  {
    "art": "ART-035660",
    "location": "RS 20 DF 17",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V95"
  },
  {
    "art": "ART-035661",
    "location": "RS 20 DF 19",
    "materialType": "zijgeleider",
    "description": "V0X0 Zijgeleider HWL25 / FHTF 20 V69"
  },
  {
    "art": "ART-000648",
    "location": "RS 20 AI 02",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Wit"
  },
  {
    "art": "ART-000693",
    "location": "RS 20 AI 04",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150-S Wit"
  },
  {
    "art": "ART-000654",
    "location": "RS 20 AI 06",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 D.Groen"
  },
  {
    "art": "ART-000699",
    "location": "RS 20 AI 08",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150 D.Groen"
  },
  {
    "art": "ART-000655",
    "location": "RS 20 AI 10",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Ivoor"
  },
  {
    "art": "ART-000700",
    "location": "RS 20 AI 12",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150-S Ivoor"
  },
  {
    "art": "ART-000656",
    "location": "RS 20 AI 14",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Wit"
  },
  {
    "art": "ART-000701",
    "location": "RS 20 AI 16",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165-S Wit"
  },
  {
    "art": "ART-000679",
    "location": "RS 20 AI 18",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Grijs Disc."
  },
  {
    "art": "ART-000724",
    "location": "RS 20 AI 20",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205-S Grijs Disc."
  },
  {
    "art": "ART-000665",
    "location": "RS 20 AJ 01",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Ivoor"
  },
  {
    "art": "ART-000687",
    "location": "RS 20 AJ 02",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Ivoor"
  },
  {
    "art": "ART-000710",
    "location": "RS 20 AJ 03",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165-S Ivoor"
  },
  {
    "art": "ART-000732",
    "location": "RS 20 AJ 04",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205-S Ivoor"
  },
  {
    "art": "ART-000667",
    "location": "RS 20 AJ 05",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Wit"
  },
  {
    "art": "ART-001103",
    "location": "RS 20 AJ 06",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Rond Ivoor"
  },
  {
    "art": "ART-000712",
    "location": "RS 20 AJ 07",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180-S Wit"
  },
  {
    "art": "ART-001139",
    "location": "RS 20 AJ 08",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205 Rond Ivoor"
  },
  {
    "art": "ART-000676",
    "location": "RS 20 AJ 09",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Ivoor"
  },
  {
    "art": "ART-000721",
    "location": "RS 20 AJ 11",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180-S Ivoor"
  },
  {
    "art": "ART-000678",
    "location": "RS 20 AJ 13",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Wit"
  },
  {
    "art": "ART-001096",
    "location": "RS 20 AJ 14",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Rond Wit 9010"
  },
  {
    "art": "ART-000723",
    "location": "RS 20 AJ 15",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205-S Wit"
  },
  {
    "art": "ART-001132",
    "location": "RS 20 AJ 16",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205 Rond Wit 9010"
  },
  {
    "art": "ART-000680",
    "location": "RS 20 AJ 17",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Bruin Disc."
  },
  {
    "art": "ART-000725",
    "location": "RS 20 AJ 18",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205-S Bruin Disc."
  },
  {
    "art": "ART-000684",
    "location": "RS 20 AJ 19",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 D.Groen"
  },
  {
    "art": "ART-000729",
    "location": "RS 20 AJ 20",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205 D.Groen"
  },
  {
    "art": "ART-036030",
    "location": "RS 20 AK 02",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V01 Wit"
  },
  {
    "art": "ART-036029",
    "location": "RS 20 AK 04",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V01 Wit"
  },
  {
    "art": "ART-035907",
    "location": "RS 20 AK 05",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V19 Antraciet"
  },
  {
    "art": "ART-001095",
    "location": "RS 20 AK 06",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Rond Wit 9016"
  },
  {
    "art": "ART-035908",
    "location": "RS 20 AK 07",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V19 Antraciet"
  },
  {
    "art": "ART-001131",
    "location": "RS 20 AK 08",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180 Rond Wit 9016"
  },
  {
    "art": "ART-001094",
    "location": "RS 20 AK 10",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Rond Ivoor"
  },
  {
    "art": "ART-001130",
    "location": "RS 20 AK 12",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180 Rond Ivoor"
  },
  {
    "art": "ART-001084",
    "location": "RS 20 AK 14",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Rond Antraciet"
  },
  {
    "art": "ART-001120",
    "location": "RS 20 AK 16",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165 Rond Antraciet"
  },
  {
    "art": "ART-000668",
    "location": "RS 20 AK 17",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Grijs Disc."
  },
  {
    "art": "ART-000713",
    "location": "RS 20 AK 18",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180-S Grijs Disc."
  },
  {
    "art": "ART-000669",
    "location": "RS 20 AK 19",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Bruin Disc."
  },
  {
    "art": "ART-000714",
    "location": "RS 20 AK 20",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180-S Bruin Disc."
  },
  {
    "art": "ART-001102",
    "location": "RS 20 AL 01",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Rond Antraciet"
  },
  {
    "art": "ART-001181",
    "location": "RS 20 AL 02",
    "materialType": "onderkap. bovenkap",
    "description": "RV bovenkap 150 antraciet"
  },
  {
    "art": "ART-001138",
    "location": "RS 20 AL 03",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205 Rond Antraciet"
  },
  {
    "art": "ART-001193",
    "location": "RS 20 AL 04",
    "materialType": "onderkap. bovenkap",
    "description": "RV onderkap 45/150 antraciet"
  },
  {
    "art": "ART-001087",
    "location": "RS 20 AL 05",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Rond Wit 9010"
  },
  {
    "art": "ART-001086",
    "location": "RS 20 AL 06",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Rond Wit 9016"
  },
  {
    "art": "ART-001123",
    "location": "RS 20 AL 07",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180 Rond Wit 9010"
  },
  {
    "art": "ART-001122",
    "location": "RS 20 AL 08",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165 Rond Wit 9016"
  },
  {
    "art": "ART-035905",
    "location": "RS 20 AL 09",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V19 Antraciet"
  },
  {
    "art": "ART-001184",
    "location": "RS 20 AL 10",
    "materialType": "onderkap. bovenkap",
    "description": "RV bovenkap 165 antraciet"
  },
  {
    "art": "ART-035906",
    "location": "RS 20 AL 11",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V19 Antraciet"
  },
  {
    "art": "ART-001197",
    "location": "RS 20 AL 12",
    "materialType": "onderkap. bovenkap",
    "description": "RV onderkap 45/165 antraciet"
  },
  {
    "art": "ART-001085",
    "location": "RS 20 AL 13",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Rond Ivoor"
  },
  {
    "art": "ART-001183",
    "location": "RS 20 AL 14",
    "materialType": "onderkap. bovenkap",
    "description": "RV bovenkap 150 verkeerswit"
  },
  {
    "art": "ART-001121",
    "location": "RS 20 AL 15",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165 Rond Ivoor"
  },
  {
    "art": "ART-001195",
    "location": "RS 20 AL 16",
    "materialType": "onderkap. bovenkap",
    "description": "RV onderkap 45/150 verkeerswit"
  },
  {
    "art": "ART-000673",
    "location": "RS 20 AL 17",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 D.Groen"
  },
  {
    "art": "ART-000718",
    "location": "RS 20 AL 18",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180 D.Groen"
  },
  {
    "art": "ART-000657",
    "location": "RS 20 AL 19",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Grijs Disc."
  },
  {
    "art": "ART-000702",
    "location": "RS 20 AL 20",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165-S Grijs Disc."
  },
  {
    "art": "ART-001104",
    "location": "RS 20 AM 01",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Rond Wit 9016"
  },
  {
    "art": "ART-001189",
    "location": "RS 20 AM 02",
    "materialType": "onderkap. bovenkap",
    "description": "RV bovenkap 180 verkeerswit"
  },
  {
    "art": "ART-001140",
    "location": "RS 20 AM 03",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205 Rond Wit 9016"
  },
  {
    "art": "ART-001203",
    "location": "RS 20 AM 04",
    "materialType": "onderkap. bovenkap",
    "description": "RV onderkap 45/180 verkeerswit"
  },
  {
    "art": "ART-001186",
    "location": "RS 20 AM 05",
    "materialType": "onderkap. bovenkap",
    "description": "RV bovenkap 165 verkeerswit"
  },
  {
    "art": "ART-001190",
    "location": "RS 20 AM 06",
    "materialType": "onderkap. bovenkap",
    "description": "RV bovenkap 205 antraciet"
  },
  {
    "art": "ART-001199",
    "location": "RS 20 AM 07",
    "materialType": "onderkap. bovenkap",
    "description": "RV onderkap 45/165 verkeerswit"
  },
  {
    "art": "ART-001204",
    "location": "RS 20 AM 08",
    "materialType": "onderkap. bovenkap",
    "description": "RV onderkap 45/205 antraciet"
  },
  {
    "art": "ART-001187",
    "location": "RS 20 AM 09",
    "materialType": "onderkap. bovenkap",
    "description": "RV bovenkap 180 antraciet"
  },
  {
    "art": "ART-001078",
    "location": "RS 20 AM 10",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Rond Wit 9010"
  },
  {
    "art": "ART-001201",
    "location": "RS 20 AM 11",
    "materialType": "onderkap. bovenkap",
    "description": "RV onderkap 45/180 antraciet"
  },
  {
    "art": "ART-001114",
    "location": "RS 20 AM 12",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165 Rond Wit 9010"
  },
  {
    "art": "ART-001076",
    "location": "RS 20 AM 13",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Rond Ivoor"
  },
  {
    "art": "ART-001192",
    "location": "RS 20 AM 14",
    "materialType": "onderkap. bovenkap",
    "description": "RV bovenkap 205 verkeerswit"
  },
  {
    "art": "ART-001112",
    "location": "RS 20 AM 15",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150 Rond Ivoor"
  },
  {
    "art": "ART-001206",
    "location": "RS 20 AM 16",
    "materialType": "onderkap. bovenkap",
    "description": "RV onderkap 45/205 verkeerswit"
  },
  {
    "art": "ART-000658",
    "location": "RS 20 AM 17",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Bruin Disc."
  },
  {
    "art": "ART-000703",
    "location": "RS 20 AM 18",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165-S Bruin Disc."
  },
  {
    "art": "ART-000662",
    "location": "RS 20 AM 19",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 D.Groen"
  },
  {
    "art": "ART-000707",
    "location": "RS 20 AM 20",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165 D.Groen"
  },
  {
    "art": "ART-035830",
    "location": "RS 20 AN 01",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V20 Verkeerswit"
  },
  {
    "art": "ART-036025",
    "location": "RS 20 AN 02",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V01 Wit"
  },
  {
    "art": "ART-035832",
    "location": "RS 20 AN 03",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V20 Verkeerswit"
  },
  {
    "art": "ART-036026",
    "location": "RS 20 AN 04",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V01 Wit"
  },
  {
    "art": "ART-035859",
    "location": "RS 20 AN 05",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V72 Zwartgrijs"
  },
  {
    "art": "ART-035834",
    "location": "RS 20 AN 06",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V20 Verkeerswit"
  },
  {
    "art": "ART-035862",
    "location": "RS 20 AN 07",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V72 Zwartgrijs"
  },
  {
    "art": "ART-035836",
    "location": "RS 20 AN 08",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V20 Verkeerswit"
  },
  {
    "art": "ART-035903",
    "location": "RS 20 AN 09",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V19 Antraciet"
  },
  {
    "art": "ART-035865",
    "location": "RS 20 AN 10",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V72 Zwartgrijs"
  },
  {
    "art": "ART-035904",
    "location": "RS 20 AN 11",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V19 Antraciet"
  },
  {
    "art": "ART-035868",
    "location": "RS 20 AN 12",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V72 Zwartgrijs"
  },
  {
    "art": "ART-035974",
    "location": "RS 20 AN 13",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V07 Ivoor"
  },
  {
    "art": "ART-001093",
    "location": "RS 20 AN 14",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Rond Antraciet"
  },
  {
    "art": "ART-035979",
    "location": "RS 20 AN 15",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V07 Ivoor"
  },
  {
    "art": "ART-001129",
    "location": "RS 20 AN 16",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180 Rond Antraciet"
  },
  {
    "art": "ART-035831",
    "location": "RS 20 AN 17",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V73 Ombergrijs"
  },
  {
    "art": "ART-035833",
    "location": "RS 20 AN 18",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V73 Ombergrijs"
  },
  {
    "art": "ART-035914",
    "location": "RS 20 AN 19",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V08 Bosgroen"
  },
  {
    "art": "ART-035915",
    "location": "RS 20 AN 20",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V08 Bosgroen"
  },
  {
    "art": "ART-035984",
    "location": "RS 20 AO 01",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V07 Ivoor"
  },
  {
    "art": "ART-035989",
    "location": "RS 20 AO 03",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V07 Ivoor"
  },
  {
    "art": "ART-036027",
    "location": "RS 20 AO 05",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V01 Wit"
  },
  {
    "art": "ART-035994",
    "location": "RS 20 AO 06",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V07 Ivoor"
  },
  {
    "art": "ART-036028",
    "location": "RS 20 AO 07",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V01 Wit"
  },
  {
    "art": "ART-035999",
    "location": "RS 20 AO 08",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V07 Ivoor"
  },
  {
    "art": "ART-035838",
    "location": "RS 20 AO 09",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V20 Verkeerswit"
  },
  {
    "art": "ART-035840",
    "location": "RS 20 AO 11",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V20 Verkeerswit"
  },
  {
    "art": "ART-035871",
    "location": "RS 20 AO 13",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V72 Zwartgrijs"
  },
  {
    "art": "ART-035842",
    "location": "RS 20 AO 14",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V20 Verkeerswit"
  },
  {
    "art": "ART-035874",
    "location": "RS 20 AO 15",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V72 Zwartgrijs"
  },
  {
    "art": "ART-035844",
    "location": "RS 20 AO 16",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V20 Verkeerswit"
  },
  {
    "art": "ART-035971",
    "location": "RS 20 AO 17",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V04 Bruin"
  },
  {
    "art": "ART-035976",
    "location": "RS 20 AO 18",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V04 Bruin"
  },
  {
    "art": "ART-035835",
    "location": "RS 20 AO 19",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V73 Ombergrijs"
  },
  {
    "art": "ART-035837",
    "location": "RS 20 AO 20",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V73 Ombergrijs"
  },
  {
    "art": "ART-035877",
    "location": "RS 20 AP 01",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V72 Zwartgrijs"
  },
  {
    "art": "ART-035846",
    "location": "RS 20 AP 02",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V20 Verkeerswit"
  },
  {
    "art": "ART-035880",
    "location": "RS 20 AP 03",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V72 Zwartgrijs"
  },
  {
    "art": "ART-035848",
    "location": "RS 20 AP 04",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V20 Verkeerswit"
  },
  {
    "art": "ART-035909",
    "location": "RS 20 AP 05",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V19 Antraciet"
  },
  {
    "art": "ART-035883",
    "location": "RS 20 AP 06",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V72 Zwartgrijs"
  },
  {
    "art": "ART-035910",
    "location": "RS 20 AP 07",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V19 Antraciet"
  },
  {
    "art": "ART-035886",
    "location": "RS 20 AP 08",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V72 Zwartgrijs"
  },
  {
    "art": "ART-036004",
    "location": "RS 20 AP 09",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V07 Ivoor"
  },
  {
    "art": "ART-035911",
    "location": "RS 20 AP 10",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V19 Antraciet"
  },
  {
    "art": "ART-036009",
    "location": "RS 20 AP 11",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V07 Ivoor"
  },
  {
    "art": "ART-035912",
    "location": "RS 20 AP 12",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V19 Antraciet"
  },
  {
    "art": "ART-036031",
    "location": "RS 20 AP 13",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V01 Wit"
  },
  {
    "art": "ART-036014",
    "location": "RS 20 AP 14",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V07 Ivoor"
  },
  {
    "art": "ART-036032",
    "location": "RS 20 AP 15",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V01 Wit"
  },
  {
    "art": "ART-036019",
    "location": "RS 20 AP 16",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V07 Ivoor"
  },
  {
    "art": "ART-035916",
    "location": "RS 20 AP 17",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V08 Bosgroen"
  },
  {
    "art": "ART-035917",
    "location": "RS 20 AP 18",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V08 Bosgroen"
  },
  {
    "art": "ART-035981",
    "location": "RS 20 AP 19",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V04 Bruin"
  },
  {
    "art": "ART-035986",
    "location": "RS 20 AP 20",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V04 Bruin"
  },
  {
    "art": "ART-036033",
    "location": "RS 20 AQ 01",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V01 Wit"
  },
  {
    "art": "ART-036034",
    "location": "RS 20 AQ 03",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V01 Wit"
  },
  {
    "art": "ART-035991",
    "location": "RS 20 AQ 05",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V04 Bruin"
  },
  {
    "art": "ART-035996",
    "location": "RS 20 AQ 07",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V04 Bruin"
  },
  {
    "art": "ART-035843",
    "location": "RS 20 AQ 09",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V73 Ombergrijs"
  },
  {
    "art": "ART-035845",
    "location": "RS 20 AQ 11",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V73 Ombergrijs"
  },
  {
    "art": "ART-035920",
    "location": "RS 20 AQ 13",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V08 Bosgroen"
  },
  {
    "art": "ART-035921",
    "location": "RS 20 AQ 15",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V08 Bosgroen"
  },
  {
    "art": "ART-036001",
    "location": "RS 20 AQ 17",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V04 Bruin"
  },
  {
    "art": "ART-036006",
    "location": "RS 20 AQ 19",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V04 Bruin"
  },
  {
    "art": "ART-035588",
    "location": "RS 20 AR 02",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V69"
  },
  {
    "art": "ART-035589",
    "location": "RS 20 AR 04",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V69"
  },
  {
    "art": "ART-035590",
    "location": "RS 20 AR 06",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V69"
  },
  {
    "art": "ART-035591",
    "location": "RS 20 AR 08",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V69"
  },
  {
    "art": "ART-035592",
    "location": "RS 20 AR 10",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V69"
  },
  {
    "art": "ART-035593",
    "location": "RS 20 AR 12",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V69"
  },
  {
    "art": "ART-035594",
    "location": "RS 20 AR 14",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V69"
  },
  {
    "art": "ART-035595",
    "location": "RS 20 AR 16",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V69"
  },
  {
    "art": "ART-035839",
    "location": "RS 20 AR 18",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V73 Ombergrijs"
  },
  {
    "art": "ART-035841",
    "location": "RS 20 AR 20",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V73 Ombergrijs"
  },
  {
    "art": "ART-035624",
    "location": "RS 20 AS 01",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V95"
  },
  {
    "art": "ART-035625",
    "location": "RS 20 AS 03",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V95"
  },
  {
    "art": "ART-035622",
    "location": "RS 20 AS 05",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V95"
  },
  {
    "art": "ART-035623",
    "location": "RS 20 AS 07",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V95"
  },
  {
    "art": "ART-035620",
    "location": "RS 20 AS 09",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V95"
  },
  {
    "art": "ART-035621",
    "location": "RS 20 AS 11",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V95"
  },
  {
    "art": "ART-035618",
    "location": "RS 20 AS 13",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V95"
  },
  {
    "art": "ART-035619",
    "location": "RS 20 AS 15",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V95"
  },
  {
    "art": "ART-035918",
    "location": "RS 20 AS 17",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V08 Bosgroen"
  },
  {
    "art": "ART-035919",
    "location": "RS 20 AS 19",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V08 Bosgroen"
  },
  {
    "art": "ART-000649",
    "location": "RS 20 DF 02",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Grijs Disc."
  },
  {
    "art": "ART-000694",
    "location": "RS 20 DF 04",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150-S Grijs Disc."
  },
  {
    "art": "ART-000650",
    "location": "RS 20 DF 06",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Bruin Disc."
  },
  {
    "art": "ART-000695",
    "location": "RS 20 DF 08",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150-S Bruin Disc."
  },
  {
    "art": "ART-000651",
    "location": "RS 20 DF 10",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Hell-Beige Disc."
  },
  {
    "art": "ART-000696",
    "location": "RS 20 DF 12",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150-S Hell-Beige Disc."
  },
  {
    "art": "ART-000652",
    "location": "RS 20 DF 14",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Naturel"
  },
  {
    "art": "ART-000697",
    "location": "RS 20 DF 16",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150-S Naturel"
  },
  {
    "art": "ART-000681",
    "location": "RS 20 DF 18",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Hell-Beige Disc."
  },
  {
    "art": "ART-000726",
    "location": "RS 20 DF 20",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205-S Hell-Beige Disc."
  },
  {
    "art": "ART-000653",
    "location": "RS 20 DG 01",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Creme"
  },
  {
    "art": "ART-000663",
    "location": "RS 20 DG 02",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Staalblauw"
  },
  {
    "art": "ART-000698",
    "location": "RS 20 DG 03",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150-S Creme"
  },
  {
    "art": "ART-000708",
    "location": "RS 20 DG 04",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165 Staalblauw"
  },
  {
    "art": "ART-000659",
    "location": "RS 20 DG 05",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Hell-Beige Disc."
  },
  {
    "art": "ART-000670",
    "location": "RS 20 DG 06",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Hell-Beige Disc."
  },
  {
    "art": "ART-000704",
    "location": "RS 20 DG 07",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165-S Hell-Beige Disc."
  },
  {
    "art": "ART-000715",
    "location": "RS 20 DG 08",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180-S Hell-Beige Disc."
  },
  {
    "art": "ART-000660",
    "location": "RS 20 DG 09",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Naturel"
  },
  {
    "art": "ART-000671",
    "location": "RS 20 DG 10",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Naturel"
  },
  {
    "art": "ART-000705",
    "location": "RS 20 DG 11",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165-S Naturel"
  },
  {
    "art": "ART-000716",
    "location": "RS 20 DG 12",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180-S Naturel"
  },
  {
    "art": "ART-000661",
    "location": "RS 20 DG 13",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 165 Creme"
  },
  {
    "art": "ART-000672",
    "location": "RS 20 DG 14",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Creme"
  },
  {
    "art": "ART-000706",
    "location": "RS 20 DG 15",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 165-S Creme"
  },
  {
    "art": "ART-000717",
    "location": "RS 20 DG 16",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180-S Creme"
  },
  {
    "art": "ART-000682",
    "location": "RS 20 DG 17",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Naturel"
  },
  {
    "art": "ART-000683",
    "location": "RS 20 DG 18",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Creme"
  },
  {
    "art": "ART-000727",
    "location": "RS 20 DG 19",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205-S Naturel"
  },
  {
    "art": "ART-000728",
    "location": "RS 20 DG 20",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205-S Creme"
  },
  {
    "art": "ART-000674",
    "location": "RS 20 DH 01",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 180 Staalblauw"
  },
  {
    "art": "ART-035858",
    "location": "RS 20 DH 02",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V18 Staalblauw"
  },
  {
    "art": "ART-000719",
    "location": "RS 20 DH 03",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 180 Staalblauw"
  },
  {
    "art": "ART-035861",
    "location": "RS 20 DH 04",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V18 Staalblauw"
  },
  {
    "art": "ART-000685",
    "location": "RS 20 DH 05",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 205 Staalblauw"
  },
  {
    "art": "ART-035972",
    "location": "RS 20 DH 06",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V05 Creme"
  },
  {
    "art": "ART-000730",
    "location": "RS 20 DH 07",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 205 Staalblauw"
  },
  {
    "art": "ART-035977",
    "location": "RS 20 DH 08",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V05 Creme"
  },
  {
    "art": "ART-035857",
    "location": "RS 20 DH 09",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V03 Hell-Beige"
  },
  {
    "art": "ART-035863",
    "location": "RS 20 DH 10",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V03 Hell-Beige"
  },
  {
    "art": "ART-035860",
    "location": "RS 20 DH 11",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V03 Hell-Beige"
  },
  {
    "art": "ART-035866",
    "location": "RS 20 DH 12",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V03 Hell-Beige"
  },
  {
    "art": "ART-035953",
    "location": "RS 20 DH 13",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V14 Naturel"
  },
  {
    "art": "ART-035864",
    "location": "RS 20 DH 14",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V18 Staalblauw"
  },
  {
    "art": "ART-035954",
    "location": "RS 20 DH 15",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V14 Naturel"
  },
  {
    "art": "ART-035867",
    "location": "RS 20 DH 16",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V18 Staalblauw"
  },
  {
    "art": "ART-035970",
    "location": "RS 20 DH 17",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 137 V02 Grijs"
  },
  {
    "art": "ART-035955",
    "location": "RS 20 DH 18",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V14 Naturel"
  },
  {
    "art": "ART-035975",
    "location": "RS 20 DH 19",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 137 V02 Grijs"
  },
  {
    "art": "ART-035956",
    "location": "RS 20 DH 20",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V14 Naturel"
  },
  {
    "art": "ART-035980",
    "location": "RS 20 DI 01",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V02 Grijs"
  },
  {
    "art": "ART-035990",
    "location": "RS 20 DI 02",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V02 Grijs"
  },
  {
    "art": "ART-035985",
    "location": "RS 20 DI 03",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V02 Grijs"
  },
  {
    "art": "ART-035995",
    "location": "RS 20 DI 04",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V02 Grijs"
  },
  {
    "art": "ART-035982",
    "location": "RS 20 DI 05",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 150 V05 Creme"
  },
  {
    "art": "ART-035992",
    "location": "RS 20 DI 06",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V05 Creme"
  },
  {
    "art": "ART-035987",
    "location": "RS 20 DI 07",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 150 V05 Creme"
  },
  {
    "art": "ART-035997",
    "location": "RS 20 DI 08",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V05 Creme"
  },
  {
    "art": "ART-035869",
    "location": "RS 20 DI 09",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V03 Hell-Beige"
  },
  {
    "art": "ART-035875",
    "location": "RS 20 DI 10",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V03 Hell-Beige"
  },
  {
    "art": "ART-035872",
    "location": "RS 20 DI 11",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V03 Hell-Beige"
  },
  {
    "art": "ART-035878",
    "location": "RS 20 DI 12",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V03 Hell-Beige"
  },
  {
    "art": "ART-035870",
    "location": "RS 20 DI 13",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V18 Staalblauw"
  },
  {
    "art": "ART-035876",
    "location": "RS 20 DI 14",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V18 Staalblauw"
  },
  {
    "art": "ART-035873",
    "location": "RS 20 DI 15",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V18 Staalblauw"
  },
  {
    "art": "ART-035879",
    "location": "RS 20 DI 16",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V18 Staalblauw"
  },
  {
    "art": "ART-035957",
    "location": "RS 20 DI 17",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 165 V14 Naturel"
  },
  {
    "art": "ART-035959",
    "location": "RS 20 DI 18",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V14 Naturel"
  },
  {
    "art": "ART-035958",
    "location": "RS 20 DI 19",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 165 V14 Naturel"
  },
  {
    "art": "ART-035960",
    "location": "RS 20 DI 20",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V14 Naturel"
  },
  {
    "art": "ART-036000",
    "location": "RS 20 DJ 01",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V02 Grijs"
  },
  {
    "art": "ART-035881",
    "location": "RS 20 DJ 02",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V03 Hell-Beige"
  },
  {
    "art": "ART-036005",
    "location": "RS 20 DJ 03",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V02 Grijs"
  },
  {
    "art": "ART-035884",
    "location": "RS 20 DJ 04",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V03 Hell-Beige"
  },
  {
    "art": "ART-036002",
    "location": "RS 20 DJ 05",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 180 V05 Creme"
  },
  {
    "art": "ART-035882",
    "location": "RS 20 DJ 06",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V18 Staalblauw"
  },
  {
    "art": "ART-036007",
    "location": "RS 20 DJ 07",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 180 V05 Creme"
  },
  {
    "art": "ART-035885",
    "location": "RS 20 DJ 08",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V18 Staalblauw"
  },
  {
    "art": "ART-035596",
    "location": "RS 20 DJ 09",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V69"
  },
  {
    "art": "ART-035922",
    "location": "RS 20 DJ 10",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V08 Bosgroen"
  },
  {
    "art": "ART-035597",
    "location": "RS 20 DJ 11",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V69"
  },
  {
    "art": "ART-035923",
    "location": "RS 20 DJ 12",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V08 Bosgroen"
  },
  {
    "art": "ART-035626",
    "location": "RS 20 DJ 13",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V95"
  },
  {
    "art": "ART-035961",
    "location": "RS 20 DJ 14",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V14 Naturel"
  },
  {
    "art": "ART-035627",
    "location": "RS 20 DJ 15",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V95"
  },
  {
    "art": "ART-035962",
    "location": "RS 20 DJ 16",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V14 Naturel"
  },
  {
    "art": "ART-035847",
    "location": "RS 20 DJ 17",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V73 Ombergrijs"
  },
  {
    "art": "ART-036010",
    "location": "RS 20 DJ 18",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V02 Grijs"
  },
  {
    "art": "ART-035849",
    "location": "RS 20 DJ 19",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V73 Ombergrijs"
  },
  {
    "art": "ART-036015",
    "location": "RS 20 DJ 20",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V02 Grijs"
  },
  {
    "art": "ART-036011",
    "location": "RS 20 DK 01",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V04 Bruin"
  },
  {
    "art": "ART-036016",
    "location": "RS 20 DK 03",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V04 Bruin"
  },
  {
    "art": "ART-036012",
    "location": "RS 20 DK 05",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Bovenkap 205 V05 Creme"
  },
  {
    "art": "ART-036017",
    "location": "RS 20 DK 07",
    "materialType": "onderkap. bovenkap",
    "description": "V0X0 Onderkap 205 V05 Creme"
  },
  {
    "art": "ART-001069",
    "location": "RS 20 DK 09",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Rond Wit 9010"
  },
  {
    "art": "ART-001105",
    "location": "RS 20 DK 11",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150 Rond Wit 9010"
  },
  {
    "art": "ART-001075",
    "location": "RS 20 DK 13",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Rond Antraciet"
  },
  {
    "art": "ART-001111",
    "location": "RS 20 DK 15",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150 Rond Antraciet"
  },
  {
    "art": "ART-001077",
    "location": "RS 20 DK 17",
    "materialType": "onderkap. bovenkap",
    "description": "Bovenkap 150 Rond Wit 9016"
  },
  {
    "art": "ART-001113",
    "location": "RS 20 DK 19",
    "materialType": "onderkap. bovenkap",
    "description": "Onderkap 150 Rond Wit 9016"
  }
];

function compactLocation(value) {
  return uppercaseText(value).replace(/[^A-Z0-9]/g, '');
}
function compactMaterialType(value) {
  return uppercaseText(value).replace(/[^A-Z0-9]/g, '');
}
export const PRODUCTION_MATERIAL_OPTIONS = [
  { id: 'tende', label: 'Tende', description: 'Tende / platna' },
  { id: 'lamele', label: 'Lamele', description: 'Lamel box lokacije' },
  { id: 'zijkap', label: 'Zijkap', description: 'Zijkap L/R' },
  { id: 'zijgeleider', label: 'Zijgeleideri', description: 'Gelajderi / vođice' },
  { id: 'onderkap. bovenkap', label: 'Bovenkap / Onderkap', description: 'Gornje i donje kape' }
];
function normalizeMaterialFilter(value) {
  const compact = compactMaterialType(value);
  if (!compact) return '';
  if (['TND','TENDE','TENDA'].includes(compact)) return 'tende';
  if (['LAMEL','LAMELE','LAMELLEN'].includes(compact)) return 'lamele';
  if (['ZIJKAP','ZIKAP','ZIJKAPI'].includes(compact)) return 'zijkap';
  if (['ZIJGELEIDER','ZIJGELEIDERI','GELAJDER','GELAJDERI','ZIGELAJDER','ZIGEL'].includes(compact)) return 'zijgeleider';
  if (['ONDERKAPBOVENKAP','BOVENKAPONDERKAP','ONDERKAP','BOVENKAP','BOV','OND'].includes(compact)) return 'onderkap. bovenkap';
  const exact = PRODUCTION_MATERIAL_OPTIONS.find(option => compactMaterialType(option.id) === compact);
  return exact?.id || value;
}
function materialMatches(item, materialFilter) {
  const filter = normalizeMaterialFilter(materialFilter);
  if (!filter) return true;
  return compactMaterialType(item.materialType) === compactMaterialType(filter);
}
export function getProductionMaterialOptions() {
  return PRODUCTION_MATERIAL_OPTIONS.map(option => ({
    ...option,
    count: PRODUCTION_ARTICLE_LOCATIONS.filter(item => materialMatches(item, option.id)).length
  }));
}
function normalizeProductionArtNumber(value) {
  const compact = compactLocation(value);
  const explicit = compact.match(/^ART(\d{6})$/);
  if (explicit) return `ART-${explicit[1]}`;
  const digitsOnly = compact.match(/^(\d{6})$/);
  if (digitsOnly) return `ART-${digitsOnly[1]}`;
  return '';
}
function normalizeExplicitRsLocation(raw) {
  const compact = compactLocation(raw);
  const match = compact.match(/^RS(20|30)([A-Z]+)(\d{1,2})$/);
  if (!match) return '';
  const [, warehouse, row, number] = match;
  return `RS ${warehouse} ${row} ${number.padStart(2, '0')}`;
}
function normalizeLamelBox(raw) {
  const compact = compactLocation(raw);
  const match = compact.match(/^(?:LAMEL)?BOX(\d{1,2})$/);
  if (!match) return '';
  return `LAMEL BOX ${match[1].padStart(2, '0')}`;
}
function shortLocationParts(raw) {
  const compact = compactLocation(raw);
  const match = compact.match(/^([A-Z]{1,6})(\d{1,2})$/);
  if (!match) return null;
  return { row: match[1], digits: match[2] };
}
function locationSuffixParts(location) {
  const compact = compactLocation(location);
  const box = compact.match(/^LAMELBOX(\d{2})$/);
  if (box) return { row: 'BOX', digits: box[1] };
  const rs = compact.match(/^RS(?:20|30)([A-Z]+)(\d{2})$/);
  if (!rs) return null;
  return { row: rs[1], digits: rs[2] };
}
function shortMatches(raw, materialFilter = '') {
  const parts = shortLocationParts(raw);
  if (!parts) return [];
  return PRODUCTION_ARTICLE_LOCATIONS.filter(item => {
    if (!materialMatches(item, materialFilter)) return false;
    const suffix = locationSuffixParts(item.location);
    if (!suffix || suffix.row !== parts.row) return false;
    if (parts.digits.length === 1) {
      return suffix.digits === parts.digits.padStart(2, '0') || suffix.digits.startsWith(parts.digits);
    }
    return suffix.digits === parts.digits;
  });
}
export function isProductionLocationInputAmbiguous(value, materialFilter = '') {
  const parts = shortLocationParts(value);
  return Boolean(parts && parts.digits.length === 1 && shortMatches(value, materialFilter).length > 1);
}
export function normalizeProductionLocation(value, materialFilter = '') {
  const raw = uppercaseText(value).trim().replace(/\s+/g, ' ');
  if (!raw) return '';
  const art = normalizeProductionArtNumber(raw);
  if (art) return art;
  const explicit = normalizeExplicitRsLocation(raw) || normalizeLamelBox(raw);
  if (explicit) return explicit;
  const matches = shortMatches(raw, materialFilter);
  if (matches.length === 1) return matches[0].location;
  if (matches.length > 1) return raw;
  if (materialFilter) return raw;
  return normalizeWarehouseLocation(raw) || raw;
}
export function uppercaseProductionLocation(value) {
  return uppercaseText(value);
}
export function findProductionInventoryEntry(value, materialFilter = '') {
  const raw = uppercaseText(value).trim();
  if (!raw) return null;
  const normalizedArt = normalizeProductionArtNumber(raw);
  if (normalizedArt) {
    return PRODUCTION_ARTICLE_LOCATIONS.find(item => item.art === normalizedArt && materialMatches(item, materialFilter)) || null;
  }
  const short = shortMatches(raw, materialFilter);
  if (short.length === 1) return short[0];
  if (short.length > 1) return null;
  const normalized = normalizeProductionLocation(raw, materialFilter);
  if (!normalized || normalizeProductionArtNumber(normalized)) return null;
  const exact = PRODUCTION_ARTICLE_LOCATIONS.filter(item => materialMatches(item, materialFilter) && compactLocation(item.location) === compactLocation(normalized));
  return exact.length === 1 ? exact[0] : null;
}
export function findProductionInventoryEntriesByLocation(value, materialFilter = '') {
  const raw = uppercaseText(value).trim();
  if (!raw || normalizeProductionArtNumber(raw)) return [];
  const normalized = normalizeProductionLocation(raw, materialFilter);
  if (!normalized || normalizeProductionArtNumber(normalized)) return [];
  const compact = compactLocation(normalized);
  return PRODUCTION_ARTICLE_LOCATIONS.filter(item =>
    materialMatches(item, materialFilter) && compactLocation(item.location) === compact
  );
}

export function findArticleByLocation(location, materialFilter = '') {
  const matches = findProductionInventoryEntriesByLocation(location, materialFilter);
  return matches.length === 1 ? matches[0] : null;
}
export function findLocationsByArticle(art, materialFilter = '') {
  const normalizedArt = normalizeProductionArtNumber(art);
  if (!normalizedArt) return [];
  return PRODUCTION_ARTICLE_LOCATIONS.filter(item => item.art === normalizedArt && materialMatches(item, materialFilter));
}
function scoreSearchItem(item, raw, compactQuery, normalizedArt) {
  const locCompact = compactLocation(item.location);
  const suffix = locationSuffixParts(item.location);
  const short = shortLocationParts(raw);
  if (normalizedArt && item.art === normalizedArt) return 0;
  if (item.art.startsWith(raw)) return 1;
  if (short && suffix && suffix.row === short.row) {
    if (short.digits.length === 2 && suffix.digits === short.digits) return 0;
    if (short.digits.length === 1 && suffix.digits === short.digits.padStart(2, '0')) return 1;
    if (suffix.digits.startsWith(short.digits)) return 2;
  }
  if (locCompact.startsWith(compactQuery)) return 3;
  if (locCompact.includes(compactQuery)) return 4;
  return 10;
}
export function searchProductionInventory(query, limit = 8, materialFilter = '') {
  const raw = uppercaseText(query).trim();
  if (!raw) return [];
  const normalizedArt = normalizeProductionArtNumber(raw);
  const compactQuery = compactLocation(raw);
  const shortResults = shortMatches(raw, materialFilter);
  const shortSet = new Set(shortResults.map(item => `${item.art}|${item.location}`));
  return PRODUCTION_ARTICLE_LOCATIONS
    .filter(item => {
      if (!materialMatches(item, materialFilter)) return false;
      if (shortSet.has(`${item.art}|${item.location}`)) return true;
      return (normalizedArt && item.art === normalizedArt) || item.art.includes(raw) || compactLocation(item.location).includes(compactQuery);
    })
    .sort((a, b) => scoreSearchItem(a, raw, compactQuery, normalizedArt) - scoreSearchItem(b, raw, compactQuery, normalizedArt)
      || a.location.localeCompare(b.location) || a.art.localeCompare(b.art))
    .slice(0, limit);
}
export function getProductionInventoryStats() {
  return getProductionMaterialOptions().reduce((acc, option) => {
    acc[option.id] = option.count;
    return acc;
  }, {});
}

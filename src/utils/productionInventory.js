import { normalizeWarehouseLocation, uppercaseText } from './dataFormat.js';

// Source: lokacijeZaotpis.xlsx. Each row is normalized to art + location + materialType.
// materialType is stored only for internal logic (for example Unit in export), not shown in the otpis UI.
export const PRODUCTION_ARTICLE_LOCATIONS = [
  {
    "art": "ART-006887",
    "location": "RS 30 AB 01",
    "materialType": "tende"
  },
  {
    "art": "ART-006884",
    "location": "RS 30 AB 02",
    "materialType": "tende"
  },
  {
    "art": "ART-006932",
    "location": "RS 30 AB 03",
    "materialType": "tende"
  },
  {
    "art": "ART-006929",
    "location": "RS 30 AB 04",
    "materialType": "tende"
  },
  {
    "art": "ART-007008",
    "location": "RS 30 AB 05",
    "materialType": "tende"
  },
  {
    "art": "ART-007013",
    "location": "RS 30 AB 06",
    "materialType": "tende"
  },
  {
    "art": "ART-007032",
    "location": "RS 30 AB 07",
    "materialType": "tende"
  },
  {
    "art": "ART-007037",
    "location": "RS 30 AB 08",
    "materialType": "tende"
  },
  {
    "art": "ART-007021",
    "location": "RS 30 AB 09",
    "materialType": "tende"
  },
  {
    "art": "ART-007025",
    "location": "RS 30 AB 10",
    "materialType": "tende"
  },
  {
    "art": "ART-044299",
    "location": "RS 30 AB 11",
    "materialType": "tende"
  },
  {
    "art": "ART-044303",
    "location": "RS 30 AB 12",
    "materialType": "tende"
  },
  {
    "art": "ART-006968",
    "location": "RS 30 AC 01",
    "materialType": "tende"
  },
  {
    "art": "ART-006985",
    "location": "RS 30 AC 02",
    "materialType": "tende"
  },
  {
    "art": "ART-006990",
    "location": "RS 30 AC 03",
    "materialType": "tende"
  },
  {
    "art": "ART-007003",
    "location": "RS 30 AC 04",
    "materialType": "tende"
  },
  {
    "art": "ART-007015",
    "location": "RS 30 AC 05",
    "materialType": "tende"
  },
  {
    "art": "ART-044306",
    "location": "RS 30 AC 06",
    "materialType": "tende"
  },
  {
    "art": "ART-007039",
    "location": "RS 30 AC 07",
    "materialType": "tende"
  },
  {
    "art": "ART-044313",
    "location": "RS 30 AC 08",
    "materialType": "tende"
  },
  {
    "art": "ART-007027",
    "location": "RS 30 AC 09",
    "materialType": "tende"
  },
  {
    "art": "ART-044311",
    "location": "RS 30 AC 10",
    "materialType": "tende"
  },
  {
    "art": "ART-044298",
    "location": "RS 30 AC 11",
    "materialType": "tende"
  },
  {
    "art": "ART-044302",
    "location": "RS 30 AC 12",
    "materialType": "tende"
  },
  {
    "art": "ART-044300",
    "location": "RS 30 AE 01",
    "materialType": "tende"
  },
  {
    "art": "ART-006980",
    "location": "RS 30 AE 02",
    "materialType": "tende"
  },
  {
    "art": "ART-044304",
    "location": "RS 30 AE 03",
    "materialType": "tende"
  },
  {
    "art": "ART-006999",
    "location": "RS 30 AE 04",
    "materialType": "tende"
  },
  {
    "art": "ART-007006",
    "location": "RS 30 AE 05",
    "materialType": "tende"
  },
  {
    "art": "ART-006982",
    "location": "RS 30 AE 06",
    "materialType": "tende"
  },
  {
    "art": "ART-007028",
    "location": "RS 30 AE 07",
    "materialType": "tende"
  },
  {
    "art": "ART-007000",
    "location": "RS 30 AE 08",
    "materialType": "tende"
  },
  {
    "art": "ART-007018",
    "location": "RS 30 AE 09",
    "materialType": "tende"
  },
  {
    "art": "ART-006978",
    "location": "RS 30 AF 01",
    "materialType": "tende"
  },
  {
    "art": "ART-006967",
    "location": "RS 30 AF 02",
    "materialType": "tende"
  },
  {
    "art": "ART-032209",
    "location": "RS 30 AF 03",
    "materialType": "tende"
  },
  {
    "art": "ART-006989",
    "location": "RS 30 AF 04",
    "materialType": "tende"
  },
  {
    "art": "ART-007011",
    "location": "RS 30 AF 05",
    "materialType": "tende"
  },
  {
    "art": "ART-044307",
    "location": "RS 30 AF 06",
    "materialType": "tende"
  },
  {
    "art": "ART-007035",
    "location": "RS 30 AF 07",
    "materialType": "tende"
  },
  {
    "art": "ART-044314",
    "location": "RS 30 AF 08",
    "materialType": "tende"
  },
  {
    "art": "ART-007023",
    "location": "RS 30 AF 09",
    "materialType": "tende"
  },
  {
    "art": "ART-044312",
    "location": "RS 30 AF 10",
    "materialType": "tende"
  },
  {
    "art": "ART-044297",
    "location": "RS 30 AF 11",
    "materialType": "tende"
  },
  {
    "art": "ART-044301",
    "location": "RS 30 AF 12",
    "materialType": "tende"
  },
  {
    "art": "ART-007033",
    "location": "RS 30 BOX 01",
    "materialType": "tende"
  },
  {
    "art": "ART-007009",
    "location": "RS 30 BOX 02",
    "materialType": "tende"
  },
  {
    "art": "ART-007022",
    "location": "RS 30 BOX 03",
    "materialType": "tende"
  },
  {
    "art": "ART-006996",
    "location": "RS 30 BOX 04",
    "materialType": "tende"
  },
  {
    "art": "ART-006976",
    "location": "RS 30 BOX 05",
    "materialType": "tende"
  },
  {
    "art": "ART-035929",
    "location": "RS 20 BA 01",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035898",
    "location": "RS 20 BA 02",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035781",
    "location": "RS 20 BA 03",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035852",
    "location": "RS 20 BA 04",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035934",
    "location": "RS 20 BA 05",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035899",
    "location": "RS 20 BA 06",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035783",
    "location": "RS 20 BA 07",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035853",
    "location": "RS 20 BA 08",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035939",
    "location": "RS 20 BA 09",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035900",
    "location": "RS 20 BA 10",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035785",
    "location": "RS 20 BA 11",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035854",
    "location": "RS 20 BA 12",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035944",
    "location": "RS 20 BA 13",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035901",
    "location": "RS 20 BA 14",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035787",
    "location": "RS 20 BA 15",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035855",
    "location": "RS 20 BA 16",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035949",
    "location": "RS 20 BA 17",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035902",
    "location": "RS 20 BA 18",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035965",
    "location": "RS 20 BB 01",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035825",
    "location": "RS 20 BB 02",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035805",
    "location": "RS 20 BB 03",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035804",
    "location": "RS 20 BB 04",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035966",
    "location": "RS 20 BB 05",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035808",
    "location": "RS 20 BB 07",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035807",
    "location": "RS 20 BB 08",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035967",
    "location": "RS 20 BB 09",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035827",
    "location": "RS 20 BB 10",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035811",
    "location": "RS 20 BB 11",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035810",
    "location": "RS 20 BB 12",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035968",
    "location": "RS 20 BB 13",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035828",
    "location": "RS 20 BB 14",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035814",
    "location": "RS 20 BB 15",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035813",
    "location": "RS 20 BB 16",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035969",
    "location": "RS 20 BB 17",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035829",
    "location": "RS 20 BB 18",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035780",
    "location": "RS 20 BC 01",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035607",
    "location": "RS 20 BC 02",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035932",
    "location": "RS 20 BC 03",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035826",
    "location": "RS 20 BC 04",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035782",
    "location": "RS 20 BC 05",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035608",
    "location": "RS 20 BC 06",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035937",
    "location": "RS 20 BC 07",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035784",
    "location": "RS 20 BC 09",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035609",
    "location": "RS 20 BC 10",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035942",
    "location": "RS 20 BC 11",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035786",
    "location": "RS 20 BC 13",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035610",
    "location": "RS 20 BC 14",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035947",
    "location": "RS 20 BC 15",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035788",
    "location": "RS 20 BC 17",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035611",
    "location": "RS 20 BC 18",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035930",
    "location": "RS 20 BD 01",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035928",
    "location": "RS 20 BD 02",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035806",
    "location": "RS 20 BD 03",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035581",
    "location": "RS 20 BD 04",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035935",
    "location": "RS 20 BD 05",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035933",
    "location": "RS 20 BD 06",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035809",
    "location": "RS 20 BD 07",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035582",
    "location": "RS 20 BD 08",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035940",
    "location": "RS 20 BD 09",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035938",
    "location": "RS 20 BD 10",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035812",
    "location": "RS 20 BD 11",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035583",
    "location": "RS 20 BD 12",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035945",
    "location": "RS 20 BD 13",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035943",
    "location": "RS 20 BD 14",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035815",
    "location": "RS 20 BD 15",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035584",
    "location": "RS 20 BD 16",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035950",
    "location": "RS 20 BD 17",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035948",
    "location": "RS 20 BD 18",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035818",
    "location": "RS 20 BE 01",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035585",
    "location": "RS 20 BE 02",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035952",
    "location": "RS 20 BE 03",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035817",
    "location": "RS 20 BE 04",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035816",
    "location": "RS 20 BE 05",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035856",
    "location": "RS 20 BE 06",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035789",
    "location": "RS 20 BE 07",
    "materialType": "zijkap"
  },
  {
    "art": "ART-000096",
    "location": "RS 20 BE 08",
    "materialType": "zijkap"
  },
  {
    "art": "ART-000072",
    "location": "RS 20 BE 09",
    "materialType": "zijkap"
  },
  {
    "art": "ART-000084",
    "location": "RS 20 BE 10",
    "materialType": "zijkap"
  },
  {
    "art": "ART-035771",
    "location": "LAMEL BOX 01",
    "materialType": "lamele"
  },
  {
    "art": "ART-035927",
    "location": "LAMEL BOX 02",
    "materialType": "lamele"
  },
  {
    "art": "ART-037690",
    "location": "LAMEL BOX 03",
    "materialType": "lamele"
  },
  {
    "art": "ART-037704",
    "location": "LAMEL BOX 04",
    "materialType": "lamele"
  },
  {
    "art": "ART-035820",
    "location": "LAMEL BOX 05",
    "materialType": "lamele"
  },
  {
    "art": "ART-035925",
    "location": "LAMEL BOX 06",
    "materialType": "lamele"
  },
  {
    "art": "ART-035896",
    "location": "LAMEL BOX 07",
    "materialType": "lamele"
  },
  {
    "art": "ART-035819",
    "location": "LAMEL BOX 08",
    "materialType": "lamele"
  },
  {
    "art": "ART-037706",
    "location": "LAMEL BOX 09",
    "materialType": "lamele"
  },
  {
    "art": "ART-035732",
    "location": "LAMEL BOX 10",
    "materialType": "lamele"
  },
  {
    "art": "ART-035770",
    "location": "LAMEL BOX 11",
    "materialType": "lamele"
  },
  {
    "art": "ART-035587",
    "location": "LAMEL BOX 12",
    "materialType": "lamele"
  },
  {
    "art": "ART-037681",
    "location": "LAMEL BOX 13",
    "materialType": "lamele"
  },
  {
    "art": "ART-035749",
    "location": "LAMEL BOX 14",
    "materialType": "lamele"
  },
  {
    "art": "ART-035891",
    "location": "LAMEL BOX 15",
    "materialType": "lamele"
  },
  {
    "art": "ART-037678",
    "location": "LAMEL BOX 16",
    "materialType": "lamele"
  },
  {
    "art": "ART-035926",
    "location": "LAMEL BOX 17",
    "materialType": "lamele"
  },
  {
    "art": "ART-037689",
    "location": "LAMEL BOX 18",
    "materialType": "lamele"
  },
  {
    "art": "ART-035963",
    "location": "RS 20 LA 01",
    "materialType": "lamele"
  },
  {
    "art": "ART-035769",
    "location": "RS 20 LA 02",
    "materialType": "lamele"
  },
  {
    "art": "ART-037694",
    "location": "RS 20 LA 03",
    "materialType": "lamele"
  },
  {
    "art": "ART-037705",
    "location": "RS 20 LA 04",
    "materialType": "lamele"
  },
  {
    "art": "ART-035746",
    "location": "RS 20 LA 05",
    "materialType": "lamele"
  },
  {
    "art": "ART-035733",
    "location": "RS 20 LA 06",
    "materialType": "lamele"
  },
  {
    "art": "ART-037687",
    "location": "RS 20 LA 07",
    "materialType": "lamele"
  },
  {
    "art": "ART-035586",
    "location": "RS 20 LA 08",
    "materialType": "lamele"
  },
  {
    "art": "ART-035892",
    "location": "RS 20 LA 09",
    "materialType": "lamele"
  },
  {
    "art": "ART-037688",
    "location": "RS 20 LA 10",
    "materialType": "lamele"
  },
  {
    "art": "ART-037699",
    "location": "RS 20 LA 11",
    "materialType": "lamele"
  },
  {
    "art": "ART-035964",
    "location": "RS 20 LA 12",
    "materialType": "lamele"
  },
  {
    "art": "ART-037676",
    "location": "RS 20 LA 13",
    "materialType": "lamele"
  },
  {
    "art": "ART-035924",
    "location": "RS 20 LA 14",
    "materialType": "lamele"
  },
  {
    "art": "ART-035601",
    "location": "RS 20 LA 15",
    "materialType": "lamele"
  },
  {
    "art": "ART-035600",
    "location": "RS 20 LA 16",
    "materialType": "lamele"
  },
  {
    "art": "ART-035790",
    "location": "RS 20 LB 01",
    "materialType": "lamele"
  },
  {
    "art": "ART-037684",
    "location": "RS 20 LB 02",
    "materialType": "lamele"
  },
  {
    "art": "ART-035748",
    "location": "RS 20 LB 03",
    "materialType": "lamele"
  },
  {
    "art": "ART-035893",
    "location": "RS 20 LB 04",
    "materialType": "lamele"
  },
  {
    "art": "ART-037685",
    "location": "RS 20 LB 05",
    "materialType": "lamele"
  },
  {
    "art": "ART-035895",
    "location": "RS 20 LB 06",
    "materialType": "lamele"
  },
  {
    "art": "ART-037686",
    "location": "RS 20 LB 07",
    "materialType": "lamele"
  },
  {
    "art": "ART-037703",
    "location": "RS 20 LB 08",
    "materialType": "lamele"
  },
  {
    "art": "ART-037679",
    "location": "RS 20 LB 09",
    "materialType": "lamele"
  },
  {
    "art": "ART-035768",
    "location": "RS 20 LB 10",
    "materialType": "lamele"
  },
  {
    "art": "ART-035731",
    "location": "RS 20 LB 11",
    "materialType": "lamele"
  },
  {
    "art": "ART-035791",
    "location": "RS 20 LB 12",
    "materialType": "lamele"
  },
  {
    "art": "ART-037675",
    "location": "RS 20 LB 13",
    "materialType": "lamele"
  },
  {
    "art": "ART-035822",
    "location": "RS 20 LB 14",
    "materialType": "lamele"
  },
  {
    "art": "ART-037677",
    "location": "RS 20 LB 15",
    "materialType": "lamele"
  },
  {
    "art": "ART-035887",
    "location": "RS 20 LB 16",
    "materialType": "lamele"
  },
  {
    "art": "ART-035894",
    "location": "RS 20 LB 17",
    "materialType": "lamele"
  },
  {
    "art": "ART-037682",
    "location": "RS 20 LB 18",
    "materialType": "lamele"
  },
  {
    "art": "ART-037700",
    "location": "RS 20 LB 19",
    "materialType": "lamele"
  },
  {
    "art": "ART-035730",
    "location": "RS 20 LB 20",
    "materialType": "lamele"
  },
  {
    "art": "ART-037691",
    "location": "RS 20 LC 01",
    "materialType": "lamele"
  },
  {
    "art": "ART-037692",
    "location": "RS 20 LC 02",
    "materialType": "lamele"
  },
  {
    "art": "ART-037697",
    "location": "RS 20 LC 03",
    "materialType": "lamele"
  },
  {
    "art": "ART-037702",
    "location": "RS 20 LC 04",
    "materialType": "lamele"
  },
  {
    "art": "ART-037696",
    "location": "RS 20 LC 05",
    "materialType": "lamele"
  },
  {
    "art": "ART-035889",
    "location": "RS 20 LC 06",
    "materialType": "lamele"
  },
  {
    "art": "ART-037698",
    "location": "RS 20 LC 07",
    "materialType": "lamele"
  },
  {
    "art": "ART-035888",
    "location": "RS 20 LC 08",
    "materialType": "lamele"
  },
  {
    "art": "ART-035745",
    "location": "RS 20 LC 09",
    "materialType": "lamele"
  },
  {
    "art": "ART-037680",
    "location": "RS 20 LC 10",
    "materialType": "lamele"
  },
  {
    "art": "ART-037683",
    "location": "RS 20 LC 11",
    "materialType": "lamele"
  },
  {
    "art": "ART-035744",
    "location": "RS 20 LC 12",
    "materialType": "lamele"
  },
  {
    "art": "ART-035890",
    "location": "RS 20 LC 13",
    "materialType": "lamele"
  },
  {
    "art": "ART-037701",
    "location": "RS 20 LC 14",
    "materialType": "lamele"
  },
  {
    "art": "ART-037695",
    "location": "RS 20 LC 15",
    "materialType": "lamele"
  },
  {
    "art": "ART-035821",
    "location": "RS 20 LC 16",
    "materialType": "lamele"
  },
  {
    "art": "ART-037693",
    "location": "RS 20 LC 17",
    "materialType": "lamele"
  },
  {
    "art": "ART-035747",
    "location": "RS 20 LC 18",
    "materialType": "lamele"
  },
  {
    "art": "ART-036238",
    "location": "RS 20 LC 19",
    "materialType": "lamele"
  },
  {
    "art": "ART-036239",
    "location": "RS 20 LC 20",
    "materialType": "lamele"
  },
  {
    "art": "ART-000648",
    "location": "RS 20 AI 02",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000693",
    "location": "RS 20 AI 04",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000654",
    "location": "RS 20 AI 06",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000699",
    "location": "RS 20 AI 08",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000655",
    "location": "RS 20 AI 10",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000700",
    "location": "RS 20 AI 12",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000656",
    "location": "RS 20 AI 14",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000701",
    "location": "RS 20 AI 16",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000679",
    "location": "RS 20 AI 18",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000724",
    "location": "RS 20 AI 20",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000665",
    "location": "RS 20 AJ 01",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000687",
    "location": "RS 20 AJ 02",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000710",
    "location": "RS 20 AJ 03",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000732",
    "location": "RS 20 AJ 04",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000667",
    "location": "RS 20 AJ 05",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001103",
    "location": "RS 20 AJ 06",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000712",
    "location": "RS 20 AJ 07",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001139",
    "location": "RS 20 AJ 08",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000676",
    "location": "RS 20 AJ 09",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000721",
    "location": "RS 20 AJ 11",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000678",
    "location": "RS 20 AJ 13",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001096",
    "location": "RS 20 AJ 14",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000723",
    "location": "RS 20 AJ 15",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001132",
    "location": "RS 20 AJ 16",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000680",
    "location": "RS 20 AJ 17",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000725",
    "location": "RS 20 AJ 18",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000684",
    "location": "RS 20 AJ 19",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000729",
    "location": "RS 20 AJ 20",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036030",
    "location": "RS 20 AK 02",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036029",
    "location": "RS 20 AK 04",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035907",
    "location": "RS 20 AK 05",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001095",
    "location": "RS 20 AK 06",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035908",
    "location": "RS 20 AK 07",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001131",
    "location": "RS 20 AK 08",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001094",
    "location": "RS 20 AK 10",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001130",
    "location": "RS 20 AK 12",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001084",
    "location": "RS 20 AK 14",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001120",
    "location": "RS 20 AK 16",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000668",
    "location": "RS 20 AK 17",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000713",
    "location": "RS 20 AK 18",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000669",
    "location": "RS 20 AK 19",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000714",
    "location": "RS 20 AK 20",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001102",
    "location": "RS 20 AL 01",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001181",
    "location": "RS 20 AL 02",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001138",
    "location": "RS 20 AL 03",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001193",
    "location": "RS 20 AL 04",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001087",
    "location": "RS 20 AL 05",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001086",
    "location": "RS 20 AL 06",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001123",
    "location": "RS 20 AL 07",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001122",
    "location": "RS 20 AL 08",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035905",
    "location": "RS 20 AL 09",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001184",
    "location": "RS 20 AL 10",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035906",
    "location": "RS 20 AL 11",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001197",
    "location": "RS 20 AL 12",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001085",
    "location": "RS 20 AL 13",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001183",
    "location": "RS 20 AL 14",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001121",
    "location": "RS 20 AL 15",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001195",
    "location": "RS 20 AL 16",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000673",
    "location": "RS 20 AL 17",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000718",
    "location": "RS 20 AL 18",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000657",
    "location": "RS 20 AL 19",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000702",
    "location": "RS 20 AL 20",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001104",
    "location": "RS 20 AM 01",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001189",
    "location": "RS 20 AM 02",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001140",
    "location": "RS 20 AM 03",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001203",
    "location": "RS 20 AM 04",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001186",
    "location": "RS 20 AM 05",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001190",
    "location": "RS 20 AM 06",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001199",
    "location": "RS 20 AM 07",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001204",
    "location": "RS 20 AM 08",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001187",
    "location": "RS 20 AM 09",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001078",
    "location": "RS 20 AM 10",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001201",
    "location": "RS 20 AM 11",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001114",
    "location": "RS 20 AM 12",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001076",
    "location": "RS 20 AM 13",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001192",
    "location": "RS 20 AM 14",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001112",
    "location": "RS 20 AM 15",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001206",
    "location": "RS 20 AM 16",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000658",
    "location": "RS 20 AM 17",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000703",
    "location": "RS 20 AM 18",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000662",
    "location": "RS 20 AM 19",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-000707",
    "location": "RS 20 AM 20",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035830",
    "location": "RS 20 AN 01",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036025",
    "location": "RS 20 AN 02",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035832",
    "location": "RS 20 AN 03",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036026",
    "location": "RS 20 AN 04",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035859",
    "location": "RS 20 AN 05",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035834",
    "location": "RS 20 AN 06",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035862",
    "location": "RS 20 AN 07",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035836",
    "location": "RS 20 AN 08",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035903",
    "location": "RS 20 AN 09",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035865",
    "location": "RS 20 AN 10",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035904",
    "location": "RS 20 AN 11",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035868",
    "location": "RS 20 AN 12",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035974",
    "location": "RS 20 AN 13",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001093",
    "location": "RS 20 AN 14",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035979",
    "location": "RS 20 AN 15",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001129",
    "location": "RS 20 AN 16",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035831",
    "location": "RS 20 AN 17",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035833",
    "location": "RS 20 AN 18",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035914",
    "location": "RS 20 AN 19",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035915",
    "location": "RS 20 AN 20",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035984",
    "location": "RS 20 AO 01",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035989",
    "location": "RS 20 AO 03",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036027",
    "location": "RS 20 AO 05",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035994",
    "location": "RS 20 AO 06",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036028",
    "location": "RS 20 AO 07",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035999",
    "location": "RS 20 AO 08",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035838",
    "location": "RS 20 AO 09",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035840",
    "location": "RS 20 AO 11",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035871",
    "location": "RS 20 AO 13",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035842",
    "location": "RS 20 AO 14",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035874",
    "location": "RS 20 AO 15",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035844",
    "location": "RS 20 AO 16",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035971",
    "location": "RS 20 AO 17",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035976",
    "location": "RS 20 AO 18",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035835",
    "location": "RS 20 AO 19",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035837",
    "location": "RS 20 AO 20",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035877",
    "location": "RS 20 AP 01",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035846",
    "location": "RS 20 AP 02",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035880",
    "location": "RS 20 AP 03",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035848",
    "location": "RS 20 AP 04",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035909",
    "location": "RS 20 AP 05",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035883",
    "location": "RS 20 AP 06",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035910",
    "location": "RS 20 AP 07",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035886",
    "location": "RS 20 AP 08",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036004",
    "location": "RS 20 AP 09",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035911",
    "location": "RS 20 AP 10",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036009",
    "location": "RS 20 AP 11",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035912",
    "location": "RS 20 AP 12",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036031",
    "location": "RS 20 AP 13",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036014",
    "location": "RS 20 AP 14",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036032",
    "location": "RS 20 AP 15",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036019",
    "location": "RS 20 AP 16",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035916",
    "location": "RS 20 AP 17",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035917",
    "location": "RS 20 AP 18",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035981",
    "location": "RS 20 AP 19",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035986",
    "location": "RS 20 AP 20",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036033",
    "location": "RS 20 AQ 01",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036034",
    "location": "RS 20 AQ 03",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035991",
    "location": "RS 20 AQ 05",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035996",
    "location": "RS 20 AQ 07",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035843",
    "location": "RS 20 AQ 09",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035845",
    "location": "RS 20 AQ 11",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035920",
    "location": "RS 20 AQ 13",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035921",
    "location": "RS 20 AQ 15",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036001",
    "location": "RS 20 AQ 17",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-036006",
    "location": "RS 20 AQ 19",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035588",
    "location": "RS 20 AR 02",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035589",
    "location": "RS 20 AR 04",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035590",
    "location": "RS 20 AR 06",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035591",
    "location": "RS 20 AR 08",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035592",
    "location": "RS 20 AR 10",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035593",
    "location": "RS 20 AR 12",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035594",
    "location": "RS 20 AR 14",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035595",
    "location": "RS 20 AR 16",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035839",
    "location": "RS 20 AR 18",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035841",
    "location": "RS 20 AR 20",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035624",
    "location": "RS 20 AS 01",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035625",
    "location": "RS 20 AS 03",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035622",
    "location": "RS 20 AS 05",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035623",
    "location": "RS 20 AS 07",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035620",
    "location": "RS 20 AS 09",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035621",
    "location": "RS 20 AS 11",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035618",
    "location": "RS 20 AS 13",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035619",
    "location": "RS 20 AS 15",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035918",
    "location": "RS 20 AS 17",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-035919",
    "location": "RS 20 AS 19",
    "materialType": "onderkap. bovenkap"
  },
  {
    "art": "ART-001168",
    "location": "RS 20 AA 02",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-001161",
    "location": "RS 20 AA 04",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035653",
    "location": "RS 20 AA 06",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035659",
    "location": "RS 20 AA 08",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000515",
    "location": "RS 20 AA 10",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035688",
    "location": "RS 20 AA 12",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-001164",
    "location": "RS 20 AA 14",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-001165",
    "location": "RS 20 AA 16",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-001163",
    "location": "RS 20 AA 18",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-001162",
    "location": "RS 20 AA 20",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000606",
    "location": "RS 20 AA 22",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035726",
    "location": "RS 20 AA 24",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-001160",
    "location": "RS 20 AA 26",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000568",
    "location": "RS 20 AA 28",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035683",
    "location": "RS 20 AB 01",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000823",
    "location": "RS 20 AB 02",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000829",
    "location": "RS 20 AB 04",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000531",
    "location": "RS 20 AB 05",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035740",
    "location": "RS 20 AB 06",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035693",
    "location": "RS 20 AB 08",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000831",
    "location": "RS 20 AB 09",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000596",
    "location": "RS 20 AB 10",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000830",
    "location": "RS 20 AB 11",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035767",
    "location": "RS 20 AB 12",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000821",
    "location": "RS 20 AB 13",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035663",
    "location": "RS 20 AB 14",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000826",
    "location": "RS 20 AB 15",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000828",
    "location": "RS 20 AB 17",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035761",
    "location": "RS 20 AB 18",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000825",
    "location": "RS 20 AB 19",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035703",
    "location": "RS 20 AB 20",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000921",
    "location": "RS 20 AB 21",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000824",
    "location": "RS 20 AB 23",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000822",
    "location": "RS 20 AB 25",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000909",
    "location": "RS 20 AB 27",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035729",
    "location": "RS 20 AC 01",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035630",
    "location": "RS 20 AC 02",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035763",
    "location": "RS 20 AC 03",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035757",
    "location": "RS 20 AC 04",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035664",
    "location": "RS 20 AC 05",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035643",
    "location": "RS 20 AC 06",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035762",
    "location": "RS 20 AC 07",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000535",
    "location": "RS 20 AC 08",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035681",
    "location": "RS 20 AC 09",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000560",
    "location": "RS 20 AC 10",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035766",
    "location": "RS 20 AC 11",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000552",
    "location": "RS 20 AC 12",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035682",
    "location": "RS 20 AC 13",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000561",
    "location": "RS 20 AC 14",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000528",
    "location": "RS 20 AC 15",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000562",
    "location": "RS 20 AC 16",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000526",
    "location": "RS 20 AC 17",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035720",
    "location": "RS 20 AC 18",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000530",
    "location": "RS 20 AC 20",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000564",
    "location": "RS 20 AD 01",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000545",
    "location": "RS 20 AD 02",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000572",
    "location": "RS 20 AD 03",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000544",
    "location": "RS 20 AD 04",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000573",
    "location": "RS 20 AD 05",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000575",
    "location": "RS 20 AD 06",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000574",
    "location": "RS 20 AD 07",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035710",
    "location": "RS 20 AD 08",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000539",
    "location": "RS 20 AD 09",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000584",
    "location": "RS 20 AD 10",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000547",
    "location": "RS 20 AD 11",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000585",
    "location": "RS 20 AD 12",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035628",
    "location": "RS 20 AD 13",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000586",
    "location": "RS 20 AD 14",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000549",
    "location": "RS 20 AD 15",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000532",
    "location": "RS 20 AD 17",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000527",
    "location": "RS 20 AD 18",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000542",
    "location": "RS 20 AD 19",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000540",
    "location": "RS 20 AD 20",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000595",
    "location": "RS 20 AE 01",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035711",
    "location": "RS 20 AE 02",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035803",
    "location": "RS 20 AE 03",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000848",
    "location": "RS 20 AE 04",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000843",
    "location": "RS 20 AE 05",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000857",
    "location": "RS 20 AE 06",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000844",
    "location": "RS 20 AE 07",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000858",
    "location": "RS 20 AE 08",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000834",
    "location": "RS 20 AE 09",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040442",
    "location": "RS 20 AE 10",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000594",
    "location": "RS 20 AE 11",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040427",
    "location": "RS 20 AE 14",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035636",
    "location": "RS 20 AE 18",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035704",
    "location": "RS 20 AE 19",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035752",
    "location": "RS 20 AE 20",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035669",
    "location": "RS 20 AF 01",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035754",
    "location": "RS 20 AF 02",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000513",
    "location": "RS 20 AF 03",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035755",
    "location": "RS 20 AF 04",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035776",
    "location": "RS 20 AF 05",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-001166",
    "location": "RS 20 AF 06",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035697",
    "location": "RS 20 AF 07",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035639",
    "location": "RS 20 AF 08",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035823",
    "location": "RS 20 AF 09",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035765",
    "location": "RS 20 AF 10",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035667",
    "location": "RS 20 AF 11",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035671",
    "location": "RS 20 AF 12",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035648",
    "location": "RS 20 AF 13",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035779",
    "location": "RS 20 AF 14",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035638",
    "location": "RS 20 AF 16",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040423",
    "location": "RS 20 AF 17",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040426",
    "location": "RS 20 AF 18",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000541",
    "location": "RS 20 AF 19",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000548",
    "location": "RS 20 AG 01",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035702",
    "location": "RS 20 AG 02",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035650",
    "location": "RS 20 AG 03",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000534",
    "location": "RS 20 AG 04",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035709",
    "location": "RS 20 AG 05",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035718",
    "location": "RS 20 AG 06",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000533",
    "location": "RS 20 AG 07",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035654",
    "location": "RS 20 AG 08",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035615",
    "location": "RS 20 AG 09",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000525",
    "location": "RS 20 AG 10",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035605",
    "location": "RS 20 AG 11",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035759",
    "location": "RS 20 AG 12",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035677",
    "location": "RS 20 AG 13",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035604",
    "location": "RS 20 AG 14",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035617",
    "location": "RS 20 AG 15",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035598",
    "location": "RS 20 AG 16",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035665",
    "location": "RS 20 AG 17",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040432",
    "location": "RS 20 AG 18",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035696",
    "location": "RS 20 AG 19",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040433",
    "location": "RS 20 AG 20",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035612",
    "location": "RS 20 AH 01",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035792",
    "location": "RS 20 AH 02",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-001167",
    "location": "RS 20 AH 03",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040443",
    "location": "RS 20 AH 04",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035695",
    "location": "RS 20 AH 05",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-000583",
    "location": "RS 20 AH 06",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040435",
    "location": "RS 20 AH 07",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035684",
    "location": "RS 20 AH 08",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040421",
    "location": "RS 20 AH 09",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040419",
    "location": "RS 20 AH 10",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040441",
    "location": "RS 20 AH 11",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040422",
    "location": "RS 20 AH 12",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040416",
    "location": "RS 20 AH 13",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040415",
    "location": "RS 20 AH 14",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040438",
    "location": "RS 20 AH 17",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040429",
    "location": "RS 20 AH 18",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040436",
    "location": "RS 20 AH 19",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040430",
    "location": "RS 20 AH 20",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040434",
    "location": "RS 20 AI 01",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-035756",
    "location": "RS 20 AI 03",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040425",
    "location": "RS 20 AI 05",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040444",
    "location": "RS 20 AI 07",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040420",
    "location": "RS 20 AI 09",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040440",
    "location": "RS 20 AI 13",
    "materialType": "zijgeleider"
  },
  {
    "art": "ART-040439",
    "location": "RS 20 AI 17",
    "materialType": "zijgeleider"
  }
];

function compactLocation(value) {
  return uppercaseText(value).replace(/[^A-Z0-9]/g, '');
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

function suffixFromShortLocation(raw) {
  const compact = compactLocation(raw);
  const match = compact.match(/^([A-Z]{2,4})(\d{1,2})$/);
  if (!match) return '';
  return `${match[1]} ${match[2].padStart(2, '0')}`;
}

function locationBySuffix(raw) {
  const suffix = suffixFromShortLocation(raw);
  if (!suffix) return { location: '', ambiguous: false };
  const matches = PRODUCTION_ARTICLE_LOCATIONS.filter(item => item.location.endsWith(` ${suffix}`));
  if (matches.length === 1) return { location: matches[0].location, ambiguous: false };
  // If the suffix exists in more than one warehouse/type, do not guess. The user must type RS 20/RS 30 or select a suggestion.
  if (matches.length > 1) return { location: '', ambiguous: true };
  return { location: '', ambiguous: false };
}

export function normalizeProductionLocation(value) {
  const raw = uppercaseText(value).trim().replace(/\s+/g, ' ');
  if (!raw) return '';
  const art = normalizeProductionArtNumber(raw);
  if (art) return art;
  const explicit = normalizeExplicitRsLocation(raw) || normalizeLamelBox(raw);
  if (explicit) return explicit;
  const suffixMatch = locationBySuffix(raw);
  if (suffixMatch.location) return suffixMatch.location;
  if (suffixMatch.ambiguous) return raw;
  return normalizeWarehouseLocation(raw) || raw;
}

export function uppercaseProductionLocation(value) {
  return uppercaseText(value);
}

export function findProductionInventoryEntry(value) {
  const raw = uppercaseText(value).trim();
  if (!raw) return null;

  const normalizedArt = normalizeProductionArtNumber(raw);
  if (normalizedArt) {
    return PRODUCTION_ARTICLE_LOCATIONS.find(item => item.art === normalizedArt) || null;
  }

  const normalized = normalizeProductionLocation(raw);
  if (!normalized || normalizeProductionArtNumber(normalized)) return null;
  const normalizedCompact = compactLocation(normalized);
  return PRODUCTION_ARTICLE_LOCATIONS.find(item => compactLocation(item.location) === normalizedCompact) || null;
}

export function findArticleByLocation(location) {
  return findProductionInventoryEntry(location);
}

export function findLocationsByArticle(art) {
  const normalizedArt = normalizeProductionArtNumber(art);
  if (!normalizedArt) return [];
  return PRODUCTION_ARTICLE_LOCATIONS.filter(item => item.art === normalizedArt);
}

export function searchProductionInventory(query, limit = 8) {
  const raw = uppercaseText(query).trim();
  if (!raw || raw.length < 2) return [];
  const normalizedArt = normalizeProductionArtNumber(raw);
  const normalizedLocation = normalizeProductionLocation(raw);
  const compactQuery = compactLocation(raw);
  const compactNormalizedLocation = compactLocation(normalizedLocation);

  return PRODUCTION_ARTICLE_LOCATIONS
    .filter(item => {
      const itemLocationCompact = compactLocation(item.location);
      return (normalizedArt && item.art.includes(normalizedArt))
        || item.art.includes(raw)
        || item.location.includes(normalizedLocation)
        || itemLocationCompact.includes(compactQuery)
        || itemLocationCompact.includes(compactNormalizedLocation);
    })
    .slice(0, limit);
}

export function getProductionInventoryStats() {
  return {
  "tende": 50,
  "zijkap": 78,
  "lamele": 74,
  "onderkap. bovenkap": 168,
  "zijgeleider": 151
};
}

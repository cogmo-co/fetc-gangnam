import type { Equipment } from "./equipment";

// 영어 로케일 장비 데이터. name/fullName/img는 공통, tagline·body만 영어.

export const EQUIPMENTS_EN: Equipment[] = [
  {
    id: "vald",
    name: "VALD",
    fullName: "VALD PERFORMANCE",
    tagline: "Precise strength & movement assessment",
    body: `A precision assessment platform used by the world's top sports leagues — the English Premier League (EPL), NBA, NFL, MLB, AFL — and by national sports institutions in the UK.
Force Decks (jump & strength asymmetry) and Dynamo (joint mobility & strength) measure injury risk and performance changes as objective numbers.
Because you're measured and managed by the same standards pro clubs use to evaluate athletes, it's an essential assessment system if you aim for elite-level performance.`,
    img: "a_vald.jpg",
    detailImgs: ["a_vald_1.jpg", "a_vald_2.jpg"],
  },
  {
    id: "keiser",
    name: "KEISER",
    fullName: "KEISER PNEUMATIC RESISTANCE",
    tagline: "Pneumatic resistance training",
    body: `Pneumatic resistance training equipment used by about two-thirds of NBA, NHL, and NFL teams and 29 MLB teams.
Used by EXOS (renowned as a prep facility for the NFL Combine, the Olympics, and MLB spring training) and by the U.S. Navy SEALs, its air-based resistance enables explosive power and speed training without stressing the joints. It applies in stages from rehab to in-season performance.
Essential for athletes who must build explosiveness, power, and agility without joint strain, and for anyone who needs to safely increase training intensity after rehab.`,
    img: "b_keiser.jpg",
    detailImgs: ["b_keiser_1.jpg", "b_keiser_2.jpg"],
  },
  {
    id: "speediance",
    name: "SPEEDIANCE",
    fullName: "SPEEDIANCE",
    tagline: "Smart digital training",
    body: `A cable-based digital resistance system — next-generation smart training equipment that measures exercise data (speed, distance, angle, power) in real time while finely adjusting resistance in 0.1 kg increments.
With left-right asymmetry correction, automatic optimal-intensity setting per movement, and cumulative session-history tracking, you can follow your body's changes as objective numbers.
Recommended for those who want to track their growth by the numbers and stay consistent, and for those who want precise training in a short amount of time.`,
    img: "c_speediance.jpg",
    detailImgs: ["c_speediance_1.jpg", "c_speediance_2.jpg"],
  },
  {
    id: "winback",
    name: "WINBACK",
    fullName: "WINBACK Tecar Therapy",
    tagline: "Radiofrequency recovery & rehab",
    body: `A radiofrequency (Tecar) recovery system used by 350+ pro sports teams including Paris Saint-Germain (PSG), FC Barcelona, Stade Toulousain (rugby), the Cleveland Cavaliers (NBA), and the New York Yankees (MLB).
It relieves muscle pain, promotes tissue regeneration, and accelerates post-injury recovery, and served as recovery equipment for a British national diver who won six medals across four Olympics.
An essential recovery system for a fast return to daily life after injury, for maintaining condition in-season, and for recovery after intense training.`,
    img: "d_winback.jpg",
    detailImgs: ["d_winback_1.jpg", "d_winback_2.jpg"],
  },
  {
    id: "reaction-light",
    name: "REACTION LIGHT",
    fullName: "Reaction Light Training",
    tagline: "Reaction speed & cognitive training",
    body: `A visual-reaction system used as a standard in sports where quick judgment and reaction speed decide performance — basketball, combat sports, soccer, tennis, and boxing.
Through immediate-response training to lights and colors, it measures and improves cognitive-motor integration, decision speed, and bilateral coordination as objective numbers.
Needed for athletes in sports where split-second reaction and cognition determine performance, and for anyone recovering cognitive and reaction ability lost to injury or aging.`,
    img: "e_reaction_light.jpg",
    detailImgs: ["e_reaction_light_1.jpg", "e_reaction_light_2.jpg"],
  },
  {
    id: "matrix-s-drive",
    name: "MATRIX S-DRIVE",
    fullName: "MATRIX S-DRIVE",
    tagline: "Self-powered treadmill",
    body: `A self-powered treadmill used in training by the NFL Combine, NBA training camps, and U.S. special forces.
The belt moves by the user's feet alone without a motor, burning about 30% more calories than a regular treadmill. It encourages a natural running posture while strongly activating the posterior chain (hamstrings, glutes) and enables varied high-intensity training such as sprints, intervals, and sled pushes.
Needed for athletes who must raise sprint and running performance, and for anyone who needs explosive cardio and lower-body strengthening without joint strain.`,
    img: "f_matrix_self_drive.jpg",
    detailImgs: ["f_matrix_self_drive_1.jpg", "f_matrix_self_drive_2.jpg"],
  },
];

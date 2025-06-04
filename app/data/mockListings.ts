// data/mockListings.ts
// types/index.ts or types/listing.ts
export type Listing = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  location: string;
};


export const mockListings: Listing[] = [
  {
    id: "1",
    title: "Complete Tool Box",
    price: 200,
    image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t45.5328-4/503022420_1433808694456577_1252368793232242469_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=110&ccb=1-7&_nc_sid=247b10&_nc_ohc=SYj9nFRlBhIQ7kNvwGscbbr&_nc_oc=AdnXRVg6ZlimmC4_h2eWxZuPavQ3erOZQc3q7N7cpLlNO_AlSmxYyHWPoE_RztDeAPE&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=ErG1dcxtqKUVo65LT3kO4A&oh=00_AfKMh-2iyh9Iv1lQJlwfBDCP0f99BRs4zuuiWCu3uXMgvg&oe=68451142",
    category: "Tools & DIY",
    location: "Johannesburg",
  },
  {
    id: "2",
    title: "4x4 Overland Truck",
    price: 1600,
    image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t45.5328-4/496013697_2075004553004763_1651637185184047647_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=108&ccb=1-7&_nc_sid=247b10&_nc_ohc=Ip48KaQbtrUQ7kNvwFvbJcV&_nc_oc=AdniFDl3EoGuvp8bb63TY0vRrjU5jz7Hpdz5uaxWDOy0ejlapL5ChiAtXSpSD3O2oFM&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=jepVm5hbDrjHCyJRZDpGnw&oh=00_AfLGiduq_ltI28Uj20VADzEfz-5SqJ4FhtM01KLmjyrn1w&oe=6844FA17",
    category: "Camping & Outdoor",
    location: "Randburg",
  },
  {
    id: "3",
    title: "Camp Trailer",
    price: 800,
    image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t45.5328-4/500119661_1017993250470947_6883301228928314967_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=103&ccb=1-7&_nc_sid=247b10&_nc_ohc=T_Jy3SLJ79cQ7kNvwGUP7Th&_nc_oc=AdmKbhJictmuQDDtAOyMEUNqmOa6HcSACYmdi61IDyhHMDBUfWLKPEB4O8yYkbQ5pTg&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=lwXkZIn65tKSwY865TXX5g&oh=00_AfJ9Cs00FWi2wcZjAeK1egfotz-WIkxaFGRL3YnD7i7qMQ&oe=68451497",
    category: "Camping & Outdoor",
    location: "Pretoria",
  },
  {
    id: "4",
    title: "Camping Chairs",
    price: 150,
    image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t45.5328-4/485899586_9316259201754347_1658877043214109003_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=111&ccb=1-7&_nc_sid=247b10&_nc_ohc=iwlkSQOKH8oQ7kNvwGI4Esd&_nc_oc=AdmHhQ-DnrTIWw9EHoGMvi4PRy23Ra2jQkn_McmeefqEAi5-Cs0yV5PVEqaRFfcXG2M&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=cZYlYpFJKpu0nsoWifqs8Q&oh=00_AfIkmV9keF2JKGaWeOokbF7sNmnzPXPM5UIIUrP1-9ArEw&oe=68451574",
    category: "Camping & Outdoor",
    location: "Johannesburg",
  },
  {
    id: "5",
    title: "GoPro 13",
    price: 300,
    image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t45.5328-4/503129791_3784961155135526_1787398454271146537_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=109&ccb=1-7&_nc_sid=247b10&_nc_ohc=2IJveNRTvdoQ7kNvwE7Exre&_nc_oc=AdmiZpvfR9V7Icwie8S1iLPP08oboUiSBODDuHHJpHe5TwamDm60kaIz9qzZovCtIss&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=6Yl18SLyPbp7UbIYDgLFrQ&oh=00_AfK9zAXKdKV1LarUyit1_8Jh2yVOGQSc3S3ERilVww8uiA&oe=6844E692",
    category: "Cameras & Audio",
    location: "Centurion",
  },
  {
    id: "6",
    title: "Matric Dance Dress",
    price: 300,
    image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t45.5328-4/499383117_1064075495577659_8102623241004293993_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=4DTF8Va4je8Q7kNvwENV_XI&_nc_oc=Adnb5ZzqYJ2wCnL4obehkDlvltYAcjQqLADC98HLS4f0aBpr1W4R_qV9WYWrjIulQqw&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=xY7YeKIJzTfTlG67_LRDlg&oh=00_AfIJL_zapHDIUBtAyyZGkRhAm5x0mYEzreRqQH5F3adhBg&oe=6844E356",
    category: "Clothing & Fashion",
    location: "Roodepoort",
  },
  {
    id: "7",
    title: "Ford F250 Single Cab V8",
    price: 1900,
    image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/501799652_1868233510685410_4028135737387502550_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=103&ccb=1-7&_nc_sid=946e27&_nc_ohc=Y3UFKHUo8dUQ7kNvwFu2R0T&_nc_oc=AdnkrpJA6ZEzGVpLK_jLZWvPSbC795gIP0voM2RhqSYB71skqq9LrV-SIk-oOSji-p8&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=o8BzaA47EsHlB96s5dG_6Q&oh=00_AfL8JnLfEAZ-HUR-jLANGnst6Pkn_OdCei4idN6-zlkVNg&oe=68451868",
    category: "Vehicles & Trailers",
    location: "Roodepoort",
  },
  {
    id: "8",
    title: "Vanhunks Zambezi Kayak x2",
    price: 500,
    image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t45.5328-4/502892302_676201405175068_6570912162202482633_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=105&ccb=1-7&_nc_sid=247b10&_nc_ohc=h4yyPMYxFbUQ7kNvwHQgQyY&_nc_oc=AdkkQhmqgAkq3CnM-1N9uOK5m6E7nMkbvhnxpAiGqOgfY2WidNkKvpEipaYjGvxlny4&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=eihWZqj_YaBbBIKmDGmJug&oh=00_AfJ3hJTcaKlBaBDf-Sm8s-cGM0xLRFjc2rG7d4f94FQryA&oe=6844EA69",
    category: "Camping & Outdoor",
    location: "Krugersdorp",
  },
  {
    id: "9",
    title: "Plastic Extrusion Machine",
    price: 750,
    image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t45.5328-4/502687997_720023220610140_7204007261679790071_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=107&ccb=1-7&_nc_sid=247b10&_nc_ohc=Q8JxWSPYZPMQ7kNvwH-oaVP&_nc_oc=AdnR14kqOdblgmRGGO6lH6RAhjGmzKSRpH81Z2dGHJBNS8_LMkNCY4ZQA-3MLbqgvFY&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=YO3yWiDEKrf4aCEjO4G1HQ&oh=00_AfKis-TGve9Nevoe97SPANJ37TnhRM_Gvrs5mO4pOXFc-Q&oe=6844FBD7",
    category: "Tools & DIY",
    location: "Springs",
  },
  {
    id: "10",
    title: "DJI Mavic 3 Enterprise Drone",
    price: 1900,
    image: "https://scontent-jnb2-1.xx.fbcdn.net/v/t45.5328-4/498699994_1199680604669008_6103356424494548970_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=107&ccb=1-7&_nc_sid=247b10&_nc_ohc=7P86xlu5V4IQ7kNvwHaJaNO&_nc_oc=AdmV1_j7T5tszRaVRa3VbXpoE6QayA9bWZ_RBhwcZJmkQS2g-TbzkEvryutoLbYDWq0&_nc_zt=23&_nc_ht=scontent-jnb2-1.xx&_nc_gid=1sA-PLqSs5h4zCxPAdjy2A&oh=00_AfKgLj3O7QpTPEVDSWH526Mz7HiaaEFgVTPANhSm0Fu9_A&oe=6844F803",
    category: "Cameras & Audio",
    location: "Roodepoort",
  },
  // Add 10–20 more
];

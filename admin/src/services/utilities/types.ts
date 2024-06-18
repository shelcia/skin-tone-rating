export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  token: string;
  userId: string;
  name?: string;
  uname?: string;
}

export interface ApiResponse {
  status: string;
  message: string;
}

export interface SurveyResponse {
  [key: string]: string;
  id: string;
  index: string;
  number: string;
  first_name: string;
  last_name: string;
  university: string;
  position: string;
  "hazardous postion": string;
  height: string;
  weight: string;
  class: string;
  birthplace: string;
  season_year: string;
  photo_url: string;
  Name: string;
  cmp_passing: string;
  att_passing: string;
  yds_passing: string;
  cmp_percent_passing: string;
  avg_passing: string;
  lng_passing: string;
  td_passing: string;
  int_passing: string;
  sack_passing: string;
  syl_passing: string;
  rtg_passing: string;
  car_rushing: string;
  yds_rushing: string;
  avg_rushing: string;
  lng_rushing: string;
  td_rushing: string;
  rec_receiving: string;
  yds_receiving: string;
  avg_receiving: string;
  lng_receiving: string;
  td_receiving: string;
  xpm_kicking: string;
  xpa_kicking: string;
  xp_percent_kicking: string;
  fgm_kicking: string;
  fga_kicking: string;
  fg_percent_kicking: string;
  x1_19_kicking: string;
  x20_29_kicking: string;
  x30_39_kicking: string;
  x40_49_kicking: string;
  x50_kicking: string;
  lng_kicking: string;
  pts_kicking: string;
  solo_defense: string;
  ast_defense: string;
  tot_defense: string;
  sack_defense: string;
  sckyds_defense: string;
  pd_defense: string;
  int_defense: string;
  yds_defense: string;
  lng_defense: string;
  td_defense: string;
  ff_defense: string;
  fr_defense: string;
  ftd_defense: string;
  last_name_cleaned: string;
  photo_uni: string;
  key: string;
  filename: string;
  image_name: string;
  dominant_color: string;
  dominant_tone: string;
  skin_color: string;
  skin_tone: string;
  race_asian: string;
  race_indian: string;
  race_black: string;
  race_white: string;
  race_middle_eastern: string;
  race_latino_hispanic: string;
  dominant_race: string;
  face_confidence: string;
  rater1_st: string;
  rater1_race: string;
  rater1_featuresa: string;
  rater1_featuresb: string;
  rater1_featuresc: string;
  rater2_st: string;
  rater2_race: string;
  rater2_featuresa: string;
  rater2_featuresb: string;
  rater2_featuresc: string;
  rater3_st: string;
  rater3_race: string;
  rater3_featuresa: string;
  rater3_featuresb: string;
  rater3_featuresc: string;
}

import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const PLAYER_DATA: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
    valueGetter: (params: GridValueGetterParams) => parseInt(params.row.id),
  },
  // {
  //   field: "index",
  //   headerName: "Index",
  //   width: 100,
  // },
  {
    field: "number",
    headerName: "Number",
    width: 100,
  },
  {
    field: "first_name",
    headerName: "First Name",
    width: 150,
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 150,
  },
  {
    field: "university",
    headerName: "University",
    width: 150,
  },
  // {
  //   field: "position",
  //   headerName: "Position",
  //   width: 100,
  // },
  // {
  //   field: "hazardous position",
  //   headerName: "Hazardous Position",
  //   width: 150,
  // },
  // {
  //   field: "height",
  //   headerName: "Height",
  //   width: 100,
  // },
  // {
  //   field: "weight",
  //   headerName: "Weight",
  //   width: 100,
  // },
  // {
  //   field: "class",
  //   headerName: "Class",
  //   width: 100,
  // },
  // {
  //   field: "birthplace",
  //   headerName: "Birthplace",
  //   width: 150,
  // },
  // {
  //   field: "season_year",
  //   headerName: "Season Year",
  //   width: 150,
  // },
  // {
  //   field: "photo_url",
  //   headerName: "Photo URL",
  //   width: 250,
  // },
  // {
  //   field: "Name",
  //   headerName: "Name",
  //   width: 200,
  // },
  // {
  //   field: "cmp_passing",
  //   headerName: "Completed Passing",
  //   width: 150,
  // },
  // {
  //   field: "att_passing",
  //   headerName: "Attempted Passing",
  //   width: 150,
  // },
  // {
  //   field: "yds_passing",
  //   headerName: "Yards Passing",
  //   width: 150,
  // },
  // {
  //   field: "cmp_percent_passing",
  //   headerName: "Completion Percent Passing",
  //   width: 200,
  // },
  // {
  //   field: "avg_passing",
  //   headerName: "Average Passing",
  //   width: 150,
  // },
  // {
  //   field: "lng_passing",
  //   headerName: "Longest Passing",
  //   width: 150,
  // },
  // {
  //   field: "td_passing",
  //   headerName: "Touchdowns Passing",
  //   width: 150,
  // },
  // {
  //   field: "int_passing",
  //   headerName: "Interceptions Passing",
  //   width: 150,
  // },
  // {
  //   field: "sack_passing",
  //   headerName: "Sacks Passing",
  //   width: 150,
  // },
  // {
  //   field: "syl_passing",
  //   headerName: "Sack Yards Lost Passing",
  //   width: 200,
  // },
  // {
  //   field: "rtg_passing",
  //   headerName: "Rating Passing",
  //   width: 150,
  // },
  // {
  //   field: "car_rushing",
  //   headerName: "Carries Rushing",
  //   width: 150,
  // },
  // {
  //   field: "yds_rushing",
  //   headerName: "Yards Rushing",
  //   width: 150,
  // },
  // {
  //   field: "avg_rushing",
  //   headerName: "Average Rushing",
  //   width: 150,
  // },
  // {
  //   field: "lng_rushing",
  //   headerName: "Longest Rushing",
  //   width: 150,
  // },
  // {
  //   field: "td_rushing",
  //   headerName: "Touchdowns Rushing",
  //   width: 150,
  // },
  // {
  //   field: "rec_receiving",
  //   headerName: "Receptions Receiving",
  //   width: 150,
  // },
  // {
  //   field: "yds_receiving",
  //   headerName: "Yards Receiving",
  //   width: 150,
  // },
  // {
  //   field: "avg_receiving",
  //   headerName: "Average Receiving",
  //   width: 150,
  // },
  // {
  //   field: "lng_receiving",
  //   headerName: "Longest Receiving",
  //   width: 150,
  // },
  // {
  //   field: "td_receiving",
  //   headerName: "Touchdowns Receiving",
  //   width: 150,
  // },
  // {
  //   field: "xpm_kicking",
  //   headerName: "Extra Points Made Kicking",
  //   width: 200,
  // },
  // {
  //   field: "xpa_kicking",
  //   headerName: "Extra Points Attempted Kicking",
  //   width: 220,
  // },
  // {
  //   field: "xp_percent_kicking",
  //   headerName: "Extra Point Percent Kicking",
  //   width: 220,
  // },
  // {
  //   field: "fgm_kicking",
  //   headerName: "Field Goals Made Kicking",
  //   width: 200,
  // },
  // {
  //   field: "fga_kicking",
  //   headerName: "Field Goals Attempted Kicking",
  //   width: 220,
  // },
  // {
  //   field: "fg_percent_kicking",
  //   headerName: "Field Goal Percent Kicking",
  //   width: 220,
  // },
  // {
  //   field: "x1_19_kicking",
  //   headerName: "Field Goals 1-19 Yards Kicking",
  //   width: 250,
  // },
  // {
  //   field: "x20_29_kicking",
  //   headerName: "Field Goals 20-29 Yards Kicking",
  //   width: 250,
  // },
  // {
  //   field: "x30_39_kicking",
  //   headerName: "Field Goals 30-39 Yards Kicking",
  //   width: 250,
  // },
  // {
  //   field: "x40_49_kicking",
  //   headerName: "Field Goals 40-49 Yards Kicking",
  //   width: 250,
  // },
  // {
  //   field: "x50_kicking",
  //   headerName: "Field Goals 50+ Yards Kicking",
  //   width: 250,
  // },
  // {
  //   field: "lng_kicking",
  //   headerName: "Longest Field Goal Kicking",
  //   width: 200,
  // },
  // {
  //   field: "pts_kicking",
  //   headerName: "Points Kicking",
  //   width: 150,
  // },
  // {
  //   field: "solo_defense",
  //   headerName: "Solo Tackles Defense",
  //   width: 200,
  // },
  // {
  //   field: "ast_defense",
  //   headerName: "Assisted Tackles Defense",
  //   width: 200,
  // },
  // {
  //   field: "tot_defense",
  //   headerName: "Total Tackles Defense",
  //   width: 200,
  // },
  // {
  //   field: "sack_defense",
  //   headerName: "Sacks Defense",
  //   width: 150,
  // },
  // {
  //   field: "sckyds_defense",
  //   headerName: "Sack Yards Lost Defense",
  //   width: 200,
  // },
  // {
  //   field: "pd_defense",
  //   headerName: "Passes Defended Defense",
  //   width: 200,
  // },
  // {
  //   field: "int_defense",
  //   headerName: "Interceptions Defense",
  //   width: 200,
  // },
  // {
  //   field: "yds_defense",
  //   headerName: "Interception Return Yards Defense",
  //   width: 250,
  // },
  // {
  //   field: "lng_defense",
  //   headerName: "Longest Interception Return Defense",
  //   width: 300,
  // },
  // {
  //   field: "td_defense",
  //   headerName: "Touchdowns Defense",
  //   width: 200,
  // },
  // {
  //   field: "ff_defense",
  //   headerName: "Forced Fumbles Defense",
  //   width: 200,
  // },
  // {
  //   field: "fr_defense",
  //   headerName: "Fumble Recoveries Defense",
  //   width: 200,
  // },
  // {
  //   field: "ftd_defense",
  //   headerName: "Fumble Return Touchdowns Defense",
  //   width: 300,
  // },
  // {
  //   field: "last_name_cleaned",
  //   headerName: "Last Name Cleaned",
  //   width: 200,
  // },
  // {
  //   field: "photo_uni",
  //   headerName: "Photo University",
  //   width: 200,
  // },
  // {
  //   field: "key",
  //   headerName: "Key",
  //   width: 200,
  // },
  // {
  //   field: "filename",
  //   headerName: "Filename",
  //   width: 200,
  // },
  // {
  //   field: "image_name",
  //   headerName: "Image Name",
  //   width: 200,
  // },
  // {
  //   field: "dominant_color",
  //   headerName: "Dominant Color",
  //   width: 200,
  // },
  // {
  //   field: "dominant_tone",
  //   headerName: "Dominant Tone",
  //   width: 200,
  // },
  // {
  //   field: "skin_color",
  //   headerName: "Skin Color",
  //   width: 200,
  // },
  // {
  //   field: "skin_tone",
  //   headerName: "Skin Tone",
  //   width: 200,
  // },
  // {
  //   field: "race_asian",
  //   headerName: "Race Asian",
  //   width: 150,
  // },
  // {
  //   field: "race_indian",
  //   headerName: "Race Indian",
  //   width: 150,
  // },
  // {
  //   field: "race_black",
  //   headerName: "Race Black",
  //   width: 150,
  // },
  // {
  //   field: "race_white",
  //   headerName: "Race White",
  //   width: 150,
  // },
  // {
  //   field: "race_middle_eastern",
  //   headerName: "Race Middle Eastern",
  //   width: 200,
  // },
  // {
  //   field: "race_latino_hispanic",
  //   headerName: "Race Latino Hispanic",
  //   width: 200,
  // },
  // {
  //   field: "dominant_race",
  //   headerName: "Dominant Race",
  //   width: 200,
  // },
  // {
  //   field: "face_confidence",
  //   headerName: "Face Confidence",
  //   width: 200,
  // },
  {
    field: "rater1_name",
    headerName: "Rater 1 Name",
    width: 150,
  },
  {
    field: "rater1_gender",
    headerName: "Rater 1 Gender",
    width: 150,
  },
  {
    field: "rater1_age",
    headerName: "Rater 1 Age",
    width: 150,
  },
  {
    field: "rater1_edu",
    headerName: "Rater 1 Education",
    width: 150,
  },
  {
    field: "rater1_u_race",
    headerName: "Rater 1's Race",
    width: 150,
  },
  {
    field: "rater1_skin",
    headerName: "Rater 1 Skin",
    width: 150,
  },

  {
    field: "rater1_st",
    headerName: "Rater 1 ST",
    width: 150,
  },
  {
    field: "rater1_race",
    headerName: "Rater 1 Race",
    width: 150,
  },
  {
    field: "rater1_featuresa",
    headerName: "Rater 1 Features A",
    width: 200,
  },
  {
    field: "rater1_featuresb",
    headerName: "Rater 1 Features B",
    width: 200,
  },
  {
    field: "rater1_featuresc",
    headerName: "Rater 1 Features C",
    width: 200,
  },

  {
    field: "rater2_name",
    headerName: "Rater 2 Name",
    width: 150,
  },
  {
    field: "rater2_gender",
    headerName: "Rater 2 Gender",
    width: 150,
  },
  {
    field: "rater2_age",
    headerName: "Rater 2 Age",
    width: 150,
  },
  {
    field: "rater2_edu",
    headerName: "Rater 2 Education",
    width: 150,
  },
  {
    field: "rater2_u_race",
    headerName: "Rater 2's Race",
    width: 150,
  },
  {
    field: "rater2_skin",
    headerName: "Rater 2 Skin",
    width: 150,
  },
  {
    field: "rater2_st",
    headerName: "Rater 2 ST",
    width: 150,
  },
  {
    field: "rater2_race",
    headerName: "Rater 2 Race",
    width: 150,
  },
  {
    field: "rater2_featuresa",
    headerName: "Rater 2 Features A",
    width: 200,
  },
  {
    field: "rater2_featuresb",
    headerName: "Rater 2 Features B",
    width: 200,
  },
  {
    field: "rater2_featuresc",
    headerName: "Rater 2 Features C",
    width: 200,
  },

  {
    field: "rater3_name",
    headerName: "Rater 3 Name",
    width: 150,
  },
  {
    field: "rater3_gender",
    headerName: "Rater 3 Gender",
    width: 150,
  },
  {
    field: "rater3_age",
    headerName: "Rater 3 Age",
    width: 150,
  },
  {
    field: "rater3_edu",
    headerName: "Rater 3 Education",
    width: 150,
  },
  {
    field: "rater3_u_race",
    headerName: "Rater 3's Race",
    width: 150,
  },
  {
    field: "rater3_skin",
    headerName: "Rater 3 Skin",
    width: 150,
  },
  {
    field: "rater3_st",
    headerName: "Rater 3 ST",
    width: 150,
  },
  {
    field: "rater3_race",
    headerName: "Rater 3 Race",
    width: 150,
  },
  {
    field: "rater3_featuresa",
    headerName: "Rater 3 Features A",
    width: 200,
  },
  {
    field: "rater3_featuresb",
    headerName: "Rater 3 Features B",
    width: 200,
  },
  {
    field: "rater3_featuresc",
    headerName: "Rater 3 Features C",
    width: 200,
  },
];

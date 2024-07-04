import React, { useEffect, useState } from "react";
import {
  // SurveyAnswerPayload,
  SurveyResponse,
} from "../../../services/utilities/types";
import { PLAYER_DATA } from "../../../constant";
import {
  DataGrid,
  GridColDef,
  // GridRenderCellParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { Box } from "@mui/material";
// import { DeleteRounded } from "@mui/icons-material";
// import { error, secondary } from "../../../theme/themeColors";
import {
  documentService,
  evaluationService,
} from "../../../services/utilities/provider";

const ExcelData: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [surveys, setSurveys] = useState<SurveyResponse[]>([]);
  // const [surveys, setSurveys] = useState();

  const token = localStorage.getItem("moral-token");

  const fetchSurveyData = async () => {
    setIsLoading(true);
    // const key = "id";
    try {
      let combinedCSV = await documentService.getById("DEMO");
      const evalutions = await evaluationService.getById("evaluations");

      combinedCSV = combinedCSV.map((row) => {
        const updatedRow = { ...row };
        evalutions.message.map((evalu) => {
          if (row.id === evalu.id) {
            updatedRow.st = evalu.st;
            updatedRow.race = evalu.race;
            updatedRow.featuresa = evalu.featuresa;
            updatedRow.featuresb = evalu.featuresb;
            updatedRow.featuresc = evalu.featuresc;
          }
        });

        return updatedRow;
      });
      // const RATER1 = await documentService.getById("RATER1");
      // const RATER2 = await documentService.getById("RATER2");
      // const RATER3 = await documentService.getById("RATER3");
      // console.log(DEMO.splice(0, 5));
      // const res = [...DEMO.slice(0, 100)];
      // const combinedCSV = DEMO.map((row, index: number) => ({
      //   ...row,
      //   // ...RATER1[index],
      //   // ...RATER2[index],
      //   // ...RATER3[index],
      // }));

      // res.sort((a, b) => {
      //   if (parseInt(a[key]) < parseInt(b[key])) return -1;
      //   if (parseInt(a[key]) > parseInt(b[key])) return 1;
      //   return 0;
      // });

      // console.log(combinedCSV);
      setSurveys(combinedCSV);
      // const evalRes = await evaluationService.getById("evaluations");
      // const evaluations = evalRes.message;

      // const mergedData = combinedCSV.map((csvRow) => {
      //   const evaluation = evaluations.find(
      //     (evalRow) => evalRow.id === csvRow.id
      //   );
      //   return {
      //     ...csvRow,
      //     evalRow,
      //   };
      // });

      // setSurveys(mergedData);

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching survey data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // const delSurveyData = async (id: string) => {
  //   await surveyUserService
  //     .delete(id)
  //     .then((res) => {
  //       if (res.status === "200") {
  //         fetchSurveyData();
  //       }
  //     })
  //     .catch(() => {
  //       console.log("error");
  //     });
  // };

  const SURVEY_COL: GridColDef[] = [
    // {
    //   field: "delete",
    //   headerName: "Delete",
    //   width: 80,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <strong>
    //       <IconButton
    //         onClick={() => delSurveyData(params.row._id)}
    //         color="error"
    //         sx={{ backgroundColor: error.main, color: secondary.main }}
    //       >
    //         <DeleteRounded />
    //       </IconButton>
    //     </strong>
    //   ),
    // },
    ...PLAYER_DATA,
  ];

  return (
    <Box sx={{ height: "70vh", width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.id}
        rows={surveys}
        columns={SURVEY_COL}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 25 },
          },
        }}
        loading={isLoading}
        pageSizeOptions={[25, 50, 100]}
        slots={{ toolbar: GridToolbar }}
        density="compact"
      />
    </Box>
  );
};

export default ExcelData;

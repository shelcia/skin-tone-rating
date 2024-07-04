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
    try {
      let combinedCSV = await documentService.getById("DEMO");
      const evaluations = await evaluationService.getById("evaluations");

      combinedCSV = combinedCSV.map((row: SurveyResponse) => {
        const updatedRow = { ...row };
        const matchedEvaluations = evaluations.message.filter(
          (evalu) => parseInt(row.id) === parseInt(evalu.id)
        );

        matchedEvaluations.forEach((evalu, index) => {
          const raterSlot = `rater${index + 1}`;
          if (index < 3) {
            updatedRow[`${raterSlot}_name`] = evalu.name;
            updatedRow[`${raterSlot}_gender`] = evalu.gender;
            updatedRow[`${raterSlot}_age`] = JSON.stringify(evalu.age);
            updatedRow[`${raterSlot}_edu`] = evalu.edu;
            updatedRow[`${raterSlot}_u_race`] = evalu.u_race;
            updatedRow[`${raterSlot}_skin`] = evalu.skin;

            updatedRow[`${raterSlot}_st`] = evalu.evaluations[0].st;
            updatedRow[`${raterSlot}_race`] = evalu.evaluations[0].race;
            updatedRow[`${raterSlot}_featuresa`] =
              evalu.evaluations[0].featuresa;
            updatedRow[`${raterSlot}_featuresb`] =
              evalu.evaluations[0].featuresb;
            updatedRow[`${raterSlot}_featuresc`] =
              evalu.evaluations[0].featuresc;
          }
        });

        return updatedRow;
      });

      setSurveys(combinedCSV);
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

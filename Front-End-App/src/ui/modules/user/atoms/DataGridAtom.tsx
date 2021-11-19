import * as React from "react"
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid"
import { UserCoreResponse } from "types"


export interface DataGridProps {
  readonly columns:  GridColDef[]
  readonly rows: UserCoreResponse[]
}

const DataGridAtom = ({
  rows = [],
  columns
}: DataGridProps) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  )
}

export default DataGridAtom
import React from "react"
import { connect } from "react-redux"
import { AppModules, AppState, sitka } from "../../../../common/sitka"
import  { UserModule } from "../../../../common/modules/user/common_user_mod"
import  { UserState } from "../../../../common/modules/user/common_user_state"
import { DataGrid } from "@mui/x-data-grid"

export interface UserScreenProps {
  readonly userModule: UserModule
  readonly userState: UserState
}

export const UserScreen = ({
  userModule,
  userState
}) => {
const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90, 
  },
  {
    field: 'favoriteColor',
    headerName: 'Favorite Color',
    description: 'Our user has a favorite color.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue(params.id, 'firstName') || ''} ${
        params.getValue(params.id, 'lastName') || ''
      }`,
  },
]

const rows = userState.users

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );

}

export default connect((state: AppState) => {
  const modules: AppModules = sitka.getModules()
  return {
    userModule: modules.user,
    userState: state.user
  }
})(UserScreen)
import { GridColDef } from '@mui/x-data-grid'

export const userGridColumns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 300 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 150,
    editable: true,
  },
  {
    field: 'favoriteColor',
    headerName: 'Favorite Color',
    description: 'Some users have a favorite color.',
    sortable: false,
    width: 150,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.getValue(params.id, 'firstName') || ''} ${
    //     params.getValue(params.id, 'lastName') || ''
    //   }`,
  },
];
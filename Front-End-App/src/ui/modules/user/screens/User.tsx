import React, { useState } from "react"
import { connect } from "react-redux"
import { AppModules, AppState, sitka } from "../../../../common/sitka"
import { UserModule } from "../../../../common/modules/user/common_user_mod"
import { UserState } from "../../../../common/modules/user/common_user_state"
import DataGridAtom from "../atoms/DataGridAtom"
import { userGridColumns } from "../userTableConfig"
import { Box } from "@mui/system"
import { Button, Card, Input, Typography } from "@material-ui/core"
import { ToggleButtonGroup, ToggleButton } from "@mui/material"

export interface UserScreenProps {
  readonly userModule: UserModule
  readonly userState: UserState
}

const UserScreen = ({ userModule, userState }: UserScreenProps) => {
  const rows = userState ? userState.users : []
  const [alignment, setAlignment] = React.useState("mocks")

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState(0)
  const [faveColor, setFaveColor] = useState("")

  const [updateUserId, setUpdateUserId] = useState("")
  const [updateFirstName, setUpdateFirstName] = useState("")
  const [updateLastName, setUpdateLastName] = useState("")
  const [updateAge, setUpdateAge] = useState(0)
  const [updateFaveColor, setUpdateFaveColor] = useState("")

  const [getUserId, setGetUserId] = useState("")

  const [deleteUserId, setDeleteUserId] = useState("")

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment)
    userModule.handleSetMocks(newAlignment)
  }

  const user = {
    firstName: firstName,
    lastName: lastName,
    age: age,
    favoriteColor: faveColor,
  }
  const updatedUser = {
    id: updateUserId,
    firstName: updateFirstName,
    lastName: updateLastName,
    age: updateAge,
    favoriteColor: updateFaveColor,
  }

  return (
    <>
      <Typography variant="h2">
        Olio Apps FullStack Serverless Archetecture Template
      </Typography>
      <Box style={{ paddingLeft: 16, paddingTop: 16 }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="live">Live Data</ToggleButton>
          <ToggleButton value="mocks">Mocks</ToggleButton>
        </ToggleButtonGroup>
      </Box>
          <Box style={{ paddingBottom: 10, paddingTop: 20 }}>
            <Button
              onClick={() => userModule.handleCheckApiHealth()}
              variant="outlined"
            >
              Check API Health
            </Button>
          </Box>
      <Box
        style={{
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 25,
          paddingBottom: 25,
        }}
      >
        <DataGridAtom columns={userGridColumns} rows={rows} />
      </Box>
      <Box style={{ paddingBottom: 10 }}>
        <Button
          onClick={() => userModule.handleGetAllUsers()}
          variant="outlined"
        >
          Get Users
        </Button>
      </Box>
      <div>
        <Button
          onClick={() => userModule.handleGetUser(getUserId)}
          variant="contained"
        >
          Get a User
        </Button>
        <Input
          style={{ marginLeft: 15, marginBottom: 15 }}
          placeholder="Id"
          onChange={(e) => setGetUserId(e.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={() => userModule.handleCreateUser(user)}
          variant="contained"
        >
          Add a User
        </Button>
        <Input
          style={{ marginLeft: 15, marginBottom: 15 }}
          placeholder="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          placeholder="age"
          onChange={(e) => setAge(parseInt(e.target.value))}
        />
        <Input
          placeholder="Favorite Color"
          onChange={(e) => setFaveColor(e.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={() => userModule.handleUpdateUser(updatedUser)}
          variant="contained"
        >
          Update a User
        </Button>
        <Input
          style={{ marginLeft: 15, marginBottom: 15 }}
          placeholder="Id"
          onChange={(e) => setUpdateUserId(e.target.value)}
        />
        <Input
          style={{ marginLeft: 15 }}
          placeholder="First Name"
          onChange={(e) => setUpdateFirstName(e.target.value)}
        />
        <Input
          placeholder="Last Name"
          onChange={(e) => setUpdateLastName(e.target.value)}
        />
        <Input
          placeholder="age"
          onChange={(e) => setUpdateAge(parseInt(e.target.value))}
        />
        <Input
          placeholder="Favorite Color"
          onChange={(e) => setUpdateFaveColor(e.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={() => userModule.handleDeleteUser(deleteUserId)}
          variant="contained"
        >
          Delete a User
        </Button>
        <Input
          style={{ marginLeft: 15, marginBottom: 15 }}
          placeholder="Id"
          onChange={(e) => setDeleteUserId(e.target.value)}
        />
      </div>
      <div>
        <Button
          onClick={() => {
            setAge(0)
            setFirstName("")
            setLastName("")
            setFaveColor("")
            setUpdateAge(0)
            setUpdateFirstName("")
            setUpdateLastName("")
            setUpdateFaveColor("")
            setDeleteUserId("")
            userModule.handleResetState()
            window.location.reload()
          }}
          variant="outlined"
        >
          Clear Data
        </Button>
      </div>
    </>
  )
}

export default connect((state: AppState) => {
  const modules: AppModules = sitka.getModules()
  return {
    userModule: modules.user,
    userState: state.user,
  }
})(UserScreen)

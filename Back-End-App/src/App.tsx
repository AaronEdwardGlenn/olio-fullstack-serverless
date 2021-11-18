import { connect } from "react-redux"
import { AppState } from "./common/sitka"

export const UserScreen = () => {
  return <div> COOL </div>
}

export default connect((state: AppState) => {
  return {
    userState: state.user
  }
})(UserScreen)
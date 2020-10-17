import React from "react"
import { OnlyDarkThemeStoreType } from "backup/stores/DarkThemeStore"
import { inject, observer } from "mobx-react"
import { AuthenticatedStoreType } from "backup/stores/AuthenticatedStore"
import { isNightNow } from "@utils/utils"

interface LocalStatesInjectProps
    extends OnlyDarkThemeStoreType,
        AuthenticatedStoreType {}

/**
 * 本地状态注入盒子
 */
@inject("darkThemeStore", "authenticatedStore")
@observer
export default class LocalStatesInjectBox extends React.Component<
    LocalStatesInjectProps
> {
    static async getServerSideProps({ mobxStore }) {
        return {
            darkThemeStore: mobxStore.darkThemeStore,
            authenticatedStore: mobxStore.authenticatedStore,
        }
    }
    componentDidMount() {
        const { setLocalDark } = this.props.darkThemeStore
        if (sessionStorage.getItem("darkNow")) {
            setLocalDark(!!parseInt(sessionStorage.getItem("darkNow")))
        } else {
            setLocalDark(isNightNow())
        }

        const uid = sessionStorage.getItem("uid")
        if (uid) {
            const { setLocalAuthed } = this.props.authenticatedStore
            switch (/^([\S])/.exec(uid)[0]) {
                case "u": {
                    setLocalAuthed(uid, "user")
                    break
                }
                case "g": {
                    setLocalAuthed(uid, "group")
                    break
                }
                default: {
                    return
                }
            }
        }
    }
    render() {
        return <>{this.props.children}</>
    }
}

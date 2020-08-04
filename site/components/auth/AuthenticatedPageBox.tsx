import React from "react"
import { OnlyDarkThemeStoreType } from "@stores/DarkThemeStore"
import { inject, observer } from "mobx-react"
import { AuthenticatedStoreType } from "@stores/AuthenticatedStore"

interface AuthedPageBoxProps
    extends OnlyDarkThemeStoreType,
        AuthenticatedStoreType {}

/**
 * 认证之后才可操作的页面盒子
 */
@inject("darkThemeStore")
@inject("authenticatedStore")
@observer
export default class AuthenticatedPageBox extends React.Component<
    AuthedPageBoxProps
> {
    static async getInitialProps({ mobxStore }) {
        return {
            darkThemeStore: mobxStore.darkThemeStore,
            authenticatedStore: mobxStore.authenticatedStore,
        }
    }

    componentDidMount() {
        const { authed, utype } = this.props.authenticatedStore
        if (!authed || utype !== "group") {
            location.replace("/login")
        }
    }

    render() {
        const { darkNow } = this.props.darkThemeStore
        return (
            <div
                style={{
                    background: darkNow
                        ? "var(--theme-bg-color-night)"
                        : "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
                    minHeight: "100vh",
                    color: darkNow ? "white" : "black",
                }}
            >
                {this.props.children}
            </div>
        )
    }
}

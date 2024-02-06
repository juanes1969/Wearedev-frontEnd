import React from "react"

export const ColoredIcon = ({ icon, color }) => {
    return (
        React.cloneElement(icon, { style: { color } })
    )
}

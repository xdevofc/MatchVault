import type { Dispatch } from "react"

export interface exportProps {
    setShowExport: Dispatch<React.SetStateAction<boolean>>
    showExport: boolean

}
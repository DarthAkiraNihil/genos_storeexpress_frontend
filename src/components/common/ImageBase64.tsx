import React from "react"

export const ImageBase64: React.FC<{ source: string, alt: string }> = ({ source, alt }) => {

    return (
        <img src={`data:image/png;base64,${source}`} alt={alt} />
    )
}

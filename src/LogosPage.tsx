import React from "react";
import { Interfaces } from "./interfaces";
import { Utils } from "./Utils";

const Entry = (props: { caption: string; value: string }) => {
    const { caption, value } = props;

    return (
        <div className="grid grid-cols-2">
          <span className="font-bold">{caption}</span>
          <span className="truncate">{value}</span>
        </div>
    )
}

const Palette = (props: { palette: string[] }) => {
    const { palette } = props;

    return (
        <div className={`grid grid-cols-5`}>
            {palette.map((color, index) =>
            <div key={index} className="h-5" style={{ background: color }}/>
            )}
        </div>
    )
}

export const LogosPage = (props: {
    dp_manifests: Interfaces.Manifest[]
}) => {
    return (
        <div className="flex-1 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8">
            {props.dp_manifests.map((manifest: Interfaces.Manifest, index: number) =>
                !manifest.disabled && (
                    <div key={index} className="flex flex-col">
                        <div
                            className="flex items-center justify-center px-4 py-1 font-bold text-base bg-gray-100 rounded-t-md">
                            {manifest.brandName}
                        </div>
                        <div
                            className="flex items-center justify-center px-4 py-1 italic font-bold text-sm bg-gray-100 border-b border-b-gray-300">
                            {manifest.slogan || '(no slogan)'}
                        </div>
                        <div className="flex items-center justify-center p-6 bg-gray-100">
                            <img className="w-48 h-48" src={Utils.OutputFile(`logo-${index + 1}.svg`)}
                                 alt={manifest.image}/>
                        </div>
                        <div className="grid bg-gray-100 border-t border-t-gray-300 p-4 gap-1 rounded-b-md">
                            <Entry caption="Tier" value={Utils.TierName(manifest.sku)}/>
                            <Entry caption="Layout" value={manifest.params.p_layout}/>
                            <Entry caption="Theme" value={manifest.theme}/>
                            <Entry caption="Split Alignment" value={manifest.params.p_splitAlignment}/>
                            <Entry caption="Logo Font" value={manifest.params.p_logoFont}/>
                            <Entry caption="Tagline Font" value={manifest.params.p_logoFont || 'N/A'}/>
                            <Entry caption="Icon" value={manifest.params.p_icon || "N/A"}/>
                            <div className="grid grid-cols-2">
                                <span className="font-bold">Palette</span>
                                <span><Palette palette={manifest.params.p_brandColors}/></span>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}
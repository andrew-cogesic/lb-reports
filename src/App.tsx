import React from 'react';
import './App.css';
import './tailwind.css';
import { Interfaces } from "./interfaces";

const TIER_BASIC = 'DEAD5AE0F62A4A0FA74796C2B262BEC3';
const TIER_PREMIUM = '184A7CF4E145426D852F708418CF2F23';

const Entry = (props: { caption: string; value: string }) => {
    const { caption, value } = props;

    return (
        <div className="grid grid-cols-2">
          <span className="font-bold">{caption}</span>
          <span>{value}</span>
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

function App() {
    const [manifests, setManifests] = React.useState<Interfaces.Manifest[]>([]);

    const TierName = (sku: string): string => {
        return sku === TIER_BASIC
           ? "Basic"
           : "Premium"
    }

    const OutputFile = (path: string): string => {
        return `/output/${path}`
    }
    
    React.useEffect(() => {
        fetch(OutputFile('manifests.json'))
        .then(response => {
            response.json()
            .then(manifests => {
                setManifests(manifests);
            });
        });
    });
    
    return (
      <div className="container mx-auto p-4">
          <div className="heading">
          </div>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-8">
              {manifests.map((manifest: Interfaces.Manifest, index: number) =>
                  <div key={index} className="flex flex-col">
                      <div
                          className="flex items-center justify-center px-4 py-1 font-bold text-base bg-gray-100">
                          {manifest.brandName}
                      </div>
                      <div
                          className="flex items-center justify-center px-4 py-1 italic font-bold text-sm bg-gray-100 border-b border-b-gray-300">
                          {manifest.slogan || '(no slogan)'}
                      </div>
                      <div className="flex items-center justify-center p-6 bg-gray-100">
                          <img className="w-48 h-48" src={OutputFile(`logo-${index + 1}.svg`)} alt={manifest.image}/>
                      </div>
                      <div className="grid bg-gray-100 border-t border-t-gray-300 p-4 gap-1">
                          <Entry caption="Tier" value={TierName(manifest.sku)}/>
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
              )}
          </div>
      </div>
    );
}

export default App;

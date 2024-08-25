import React from 'react';
import './App.css';
import './tailwind.css';
import { Interfaces } from "./interfaces";
import { Utils } from "./Utils";
import { LogosPage } from "./LogosPage";
import { StatsPage } from "./StatsPage";

// "top" | "left" | "right" | "bottom" | "inside" | "outside" |
// "insideLeft" | "insideRight" | "insideTop" | "insideBottom" |
// "insideTopLeft" | "insideBottomLeft" | "insideTopRight" |
// "insideBottomRight" | "insideStart" | "insideEnd" | "end" |
// "center"

const CLS_BTN = "bg-gray-100 p-4 rounded-md font-bold hover:bg-gray-200 cursor-pointer";

enum PageEnum {
    logos,
    stats
}

function App() {
    const [manifests, setManifests] = React.useState<Interfaces.Manifest[]>([]);
    const [page, setPage] = React.useState<PageEnum>(PageEnum.logos);

    React.useEffect(() => {
        fetch(Utils.OutputFile('manifests.json'))
        .then(response => {
            response.json()
            .then(manifests => {
                setManifests(manifests);
            });
        });
    });
    
    return (
      <div className="flex flex-col p-4 h-full">
          <div className="heading text-center p-4 text-lg bg-gray-100 font-bold border border-grey rounded-md mb-4">
              LOGOBEAN PURCHASED LOGO REPORT
          </div>

          <div className="flex flex-1">
              <div className="pr-4 gap-2">
                  <div className="sticky top-0">
                      <div className={`${CLS_BTN} mb-2`} onClick={() => setPage(PageEnum.logos)}>
                          LOGOS
                      </div>
                      <div className={CLS_BTN} onClick={() => setPage(PageEnum.stats)}>
                          STATS
                      </div>
                  </div>
              </div>

              <div className="flex flex-col flex-1 h-full">
              {(() => {
              switch (page) {
                  case PageEnum.logos:
                      return <LogosPage dp_manifests={manifests}/>
                  case PageEnum.stats:
                      return <StatsPage dp_manifests={manifests}/>
              }
              })()}
              </div>
          </div>
      </div>
    );
}

export default App;

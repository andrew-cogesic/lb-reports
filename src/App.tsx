import React from 'react';
import './App.css';
import './tailwind.css';
import { Interfaces } from "./interfaces";
import { Utils } from "./Utils";
import { LogosPage } from "./LogosPage";
import { StatsPage } from "./StatsPage";
import { enableReactComponents } from "@legendapp/state/config/enableReactComponents";
import { observer, useObservable } from "@legendapp/state/react";

enableReactComponents();

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

const App = observer(function () {
    const state = useObservable<{
        manifests: Interfaces.Manifest[],
        page: PageEnum
    }>({
        manifests: [],
        page: PageEnum.logos
    });

    React.useEffect(() => {
        fetch(Utils.OutputFile('manifests.json'))
        .then(response => {
            response.json()
            .then(manifestsJson => {
                state.manifests.set(manifestsJson);
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
                      <div className={`${CLS_BTN} mb-2`} onClick={() => state.page.set(PageEnum.logos)}>
                          LOGOS
                      </div>
                      <div className={CLS_BTN} onClick={() => state.page.set(PageEnum.stats)}>
                          STATS
                      </div>
                  </div>
              </div>

              <div className="flex flex-col flex-1 h-full">
              {(() => {
              switch (state.page.get()) {
                  case PageEnum.logos:
                      return <LogosPage dp_manifests={state.manifests.get()}/>
                  case PageEnum.stats:
                      return <StatsPage dp_manifests={state.manifests.get()}/>
              }
              })()}
              </div>
          </div>
      </div>
    );
});

export default App;

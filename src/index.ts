import React, { useEffect } from 'react';
import VantevoAnalytics, { VantevoEvent } from 'vantevo-analytics-tracker';


export type ParamsContext = {
  [key: string]: string;
};

export type VantevoOptions = {
  "excludePath"?: string[];
  "dev"?: boolean;
  "manualPageview"?: boolean;
  "outboundLinks"?: boolean;
  "trackFiles"?: string;
  "saveExtesionFiles"?: boolean;
  "hash"?: boolean;
  "domain"?: string;
  "params"?: ParamsContext;
};

type IProps = {
  "options": VantevoOptions
  "children": React.ReactNode
};

var initOptions: VantevoOptions = {};

var defaultOptions: VantevoOptions = {
  "excludePath": [],
  "dev": false,
  "manualPageview": false,
  "outboundLinks": false,
  "trackFiles": null,
  "saveExtesionFiles": false,
  "hash": false,
  "domain": null,
  "params": {}
};

export default function VantevoProvider({ options, children }: IProps) {
  initOptions = { ...defaultOptions, ...options };

  const { enableTracker, enableTrackFiles, enableOutboundLinks } = VantevoAnalytics(options);

  useEffect(() => {
    var cleanTracker, cleanOutboundLinks, clearTrackFiles;
    if (!options.manualPageview && typeof window !== 'undefined') {
      cleanTracker = enableTracker();
    }

    if (options.trackFiles && typeof window !== 'undefined') {
      clearTrackFiles = enableTrackFiles(options.trackFiles, options.saveExtesionFiles);
    }

    if (options.outboundLinks && typeof window !== 'undefined') {
      cleanOutboundLinks = enableOutboundLinks();
    }
    return () => {
      if (cleanTracker) {
        cleanTracker();
      }
      if (clearTrackFiles) {
        enableTrackFiles();
      }
      if (cleanOutboundLinks) {
        cleanOutboundLinks();
      }
    }
  }, []);

  return children;
};

export function useVantevo() {
  const { vantevo: sendEvent, enableOutboundLinks, enableTrackFiles } = VantevoAnalytics(initOptions);
  const vantevo: VantevoEvent = (event, meta, callback) => {
    return sendEvent(event, meta, callback);
  }
  
  return {
    vantevo,
    enableOutboundLinks,
    enableTrackFiles
  };
}
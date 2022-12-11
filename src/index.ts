import React, { useEffect } from 'react';
import VantevoAnalytics, { VantevoEvent, VantevoEcommerce } from 'vantevo-analytics-tracker';


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
  "api_url"?: string;
  "api_url_ecommerce"?: string;
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
  "params": {},
  "api_url": "https://api.vantevo.io/event",
  "api_url_ecommerce": "https://api.vantevo.io/event-ecommerce"
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
        clearTrackFiles();
      }
      if (cleanOutboundLinks) {
        cleanOutboundLinks();
      }
    }
  }, []);

  return children;
};

export function useVantevo() {
  const { vantevo: sendEvent, trackEcommerce: sendEventEcommerce, enableOutboundLinks, enableTrackFiles } = VantevoAnalytics(initOptions);

  const vantevo: VantevoEvent = (event, meta, callback) => {
    return sendEvent(event, meta, callback);
  }

  const trackEcommerce: VantevoEcommerce = (event, values, callback) => {
    return sendEventEcommerce(event, values, callback);
  }

  return {
    vantevo,
    trackEcommerce,
    enableOutboundLinks,
    enableTrackFiles
  };
}
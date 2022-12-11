import React from 'react';
import { VantevoEvent, VantevoEcommerce } from 'vantevo-analytics-tracker';
export declare type ParamsContext = {
    [key: string]: string;
};
export declare type VantevoOptions = {
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
declare type IProps = {
    "options": VantevoOptions;
    "children": React.ReactNode;
};
export default function VantevoProvider({ options, children }: IProps): React.ReactNode;
export declare function useVantevo(): {
    vantevo: VantevoEvent;
    trackEcommerce: VantevoEcommerce;
    enableOutboundLinks: () => () => void;
    enableTrackFiles: (extensions: string, saveExtension?: boolean) => () => void;
};
export {};

import * as vscode from "vscode";

export default class News {
    private newsAPIKey: any;
    private refreshTime : any;
    private headlineTimeInterval : any;
    private sources : any;
    private query : any;
    private catagory : any;
    private country : any;
    private language : any;

    getJSONConfig(str : string) : any{
        return vscode.workspace.getConfiguration().get(str);
    }
    
    getNewsAPIKey() : any{
        this.newsAPIKey = this.getJSONConfig("vscode-news.api-key");
        return this.newsAPIKey;
    }

    getHeadlineTimeInterval() : any{
        this.headlineTimeInterval = this.getJSONConfig("vscode-news.headline-time-interval");
        return this.headlineTimeInterval;
    }

    getSources() : any{
        this.sources = this.getJSONConfig("vscode-news.sources");
        return this.sources;
    }

    getRefreshTime() : any{
        this.refreshTime = this.getJSONConfig("vscode-news.refresh-time");
        return this.refreshTime;
    }

    getLanguage() : any{
        this.language = this.getJSONConfig("vscode-news.language");
        return this.language;
    }

    getQuery() : any{
        this.query = this.getJSONConfig("vscode-news.query");
        return this.query;
    }

    getCatagory() : any{
        this.catagory = this.getJSONConfig("vscode-news.catagory");
        return this.catagory;
    }

    getCountry() : any{
        this.language = this.getJSONConfig("vscode-news.country");
        return this.country;
    }
}
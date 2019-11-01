import * as vscode from "vscode";
const NewsAPI = require("newsapi");

export default class News {
    private newsAPIKey: any;
    private refreshTime : any;
    private headlineTimeInterval : any;
    private sources : any;
    private query : any;
    private catagory : any;
    private country : any;
    private language : any;

    constructor(){}

    
    getNewsAPIKey() : any{
        this.newsAPIKey = vscode.workspace.getConfiguration().get("vscode-news.api-key");
        return this.newsAPIKey;
    }

    getHeadlineTimeInterval() : any{
        this.headlineTimeInterval = vscode.workspace.getConfiguration().get("vscode-news.headline-time-interval");
        return this.headlineTimeInterval;
    }

    getSources() : any{
        this.sources = vscode.workspace.getConfiguration().get("vscode-news.sources");
        return this.sources;
    }

    getRefreshTime() : any{
        this.refreshTime = vscode.workspace.getConfiguration().get("vscode-news.refresh-time");
        return this.refreshTime;
    }

    getLanguage() : any{
        this.language = vscode.workspace.getConfiguration().get("vscode-news.language");
        return this.language;
    }

    getQuery() : any{
        this.query = vscode.workspace.getConfiguration().get("vscode-news.query");
        return this.query;
    }

    getCatagory() : any{
        this.catagory = vscode.workspace.getConfiguration().get("vscode-news.catagory");
        return this.catagory;
    }

    getCountry() : any{
        this.language = vscode.workspace.getConfiguration().get("vscode-news.country");
        return this.country;
    }
}
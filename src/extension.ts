import * as vscode from "vscode";
import { performance } from "perf_hooks";
const NewsAPI = require("newsapi");

let myStatusBarItem: vscode.StatusBarItem;

let myCommandId: string = "vscodenews.showNews";
let newsapi : any,
  refreshTime : any,
  headlineTimeInterval : any,
  sourcesIn : any,
  queryIn : any,
  catagoryIn : any,
  countryIn : any,
  languageIn : any;

export async function activate({ subscriptions }: vscode.ExtensionContext) {
  console.log("EXTENSION ACTIVATED");

  // create a new status bar item that we can now manage
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000
  );
  myStatusBarItem.command = myCommandId;
  subscriptions.push(myStatusBarItem);

  configUpdate();

  while (true) {
    getHeadlines();
    await sleep(refreshTime + 1000);
  }
}

function getHeadlines(): void {
  try {
    const timeStart = performance.now();
    newsapi.v2
      .topHeadlines({
        sources: sourcesIn,
        language: languageIn,
        q: queryIn,
        catagory: catagoryIn,
        country: countryIn
      })
      .then(async (response: any) => {
        let index = 0;
          while (true) {
            myStatusBarItem.text = response.articles[index].title;
            myStatusBarItem.show();
            await sleep(headlineTimeInterval);
            index++;
            if (index === response.articles.length) {
              index = 0;
            }
            if (performance.now() - timeStart >= refreshTime) {
              return;
            }
        }
      });
  } catch (error) {
    myStatusBarItem.text = "Unable to retrieve news from source";
    myStatusBarItem.show();
    console.log(error);
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function configUpdate(): any[] {
  let config = vscode.workspace.getConfiguration();
  newsapi = new NewsAPI(config.get("vscode-news.api-key"));
  refreshTime = config.get("vscode-news.refresh-time");
  headlineTimeInterval = config.get("vscode-news.headline-time-interval");
  sourcesIn = config.get("vscode-news.sources");
  languageIn = config.get("vscode-news.language");
  catagoryIn = config.get("vscode-news.catagory");
  countryIn = config.get("vscode-news.country");
  return [newsapi, refreshTime, headlineTimeInterval, sourcesIn, languageIn, catagoryIn, countryIn];
}

async function infoUpdate(sub: any, text: any) {
  sub.push(
    vscode.commands.registerCommand(myCommandId, () => {
      vscode.window.showInformationMessage(text);
    })
  );
}

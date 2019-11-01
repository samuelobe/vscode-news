import * as vscode from "vscode";
import { performance } from "perf_hooks";
import News from "./news";
const NewsAPI = require("newsapi");

let news = new News();

let myStatusBarItem: vscode.StatusBarItem;

let myCommandId: string = "vscodenews.showNews";

export async function activate({ subscriptions }: vscode.ExtensionContext) {
  console.log("EXTENSION ACTIVATED");
  // create a new status bar item that we can now manage
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000
  );
  myStatusBarItem.command = myCommandId;
  subscriptions.push(myStatusBarItem);

  //configUpdate();

  while (true) {
    getHeadlines();
    await sleep(news.getRefreshTime() + 1000);
  }
}

function getHeadlines(): void {
  try {
    const timeStart = performance.now();
    let newsapi = new NewsAPI(news.getNewsAPIKey());
    newsapi.v2
      .topHeadlines({
        sources: news.getSources(),
        language: news.getLanguage(),
        q: news.getQuery(),
        catagory: news.getCatagory(),
        country: news.getCountry()
      })
      .then(async (response: any) => {
        let index = 0;
        while (true) {
          myStatusBarItem.text = response.articles[index].title;
          myStatusBarItem.show();
          await sleep(news.getHeadlineTimeInterval());
          index++;
          if (index === response.articles.length) {
            index = 0;
          }
          if (performance.now() - timeStart >= news.getRefreshTime()) {
            return;
          }
        }
      });
  } 
  
  catch (error) {
    myStatusBarItem.text = "Unable to retrieve news from source";
    myStatusBarItem.show();
    console.log(error);
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function infoUpdate(sub: any, text: any) {
  sub.push(
    vscode.commands.registerCommand(myCommandId, () => {
      vscode.window.showInformationMessage(text);
    })
  );
}

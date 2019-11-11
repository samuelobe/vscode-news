import * as vscode from "vscode";
import { performance } from "perf_hooks";
import News from "./news";
const NewsAPI = require("newsapi");

let news = new News();
let message: string = "";

export async function activate({ subscriptions }: vscode.ExtensionContext) {
  let myStatusBarItem: vscode.StatusBarItem;
  let myCommandId: string = "vscodenews.showNews";

  console.log("EXTENSION ACTIVATED");
  // create a new status bar item that we can now manage
  myStatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    1000
  );
  myStatusBarItem.command = myCommandId;
  subscriptions.push(myStatusBarItem);

  let infoMessage = vscode.commands.registerCommand(
    myCommandId,
    showNewsMessage
  );
  subscriptions.push(infoMessage);

  while (true) {
    try {
      let timeStart = performance.now();
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
            message = response.articles[index].description;
            myStatusBarItem.show();
            await sleep(news.getHeadlineTimeInterval());
            index++;
            if (index === response.articles.length) {
              index = 0;
            }
            if (performance.now() - timeStart >= news.getRefreshTime()) {
              continue;
            }
          }
        });
    } catch (error) {
      myStatusBarItem.text = "Unable to retrieve news from source";
      myStatusBarItem.show();
      console.log(error);
    }
    await sleep(news.getRefreshTime() + 1000);
  }
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function showNewsMessage() {
  vscode.window.showInformationMessage(message);
}

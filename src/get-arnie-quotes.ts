import { httpGet } from "./mock-http-interface";

enum ResponseEnum {
  "Arnie Quote",
  FAILURE,
}

type TResult = { [key in keyof typeof ResponseEnum]?: string };

const requestQuoteHttp = async (url: string): Promise<TResult> => {
  const { status, body } = await httpGet(url);

  const { message }: { message: string } = JSON.parse(body);

  if (status === 200) {
    return { "Arnie Quote": message };
  } else {
    return { FAILURE: message };
  }
};

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  // check if urls are passed when calling the function
  if (urls.length === 0) {
    return [];
  } else {
    const arnieQuotes = await Promise.all(
      urls.map(async (url) => await requestQuoteHttp(url))
    );

    return arnieQuotes;
  }
};
